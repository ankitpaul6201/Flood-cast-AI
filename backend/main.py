"""
FastAPI Backend Application for FloodCast AI (India-Wide)
Historical satellite-based spatial flood-risk prediction and validation engine across India.
"""

import os
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import Optional, List, Dict, Any

from .models import (
    HealthResponse,
    RegionInfo,
    EventSummary,
    PointRiskResponse,
    PredictionResponse,
    EventValidationMetrics,
    ModelMetadataResponse
)
from .services import service

app = FastAPI(
    title="FloodCast AI API (India-Wide)",
    description="Historical satellite-based spatial flood-risk prediction and validation engine across Indian river basins.",
    version="1.0.0"
)

# CORS middleware for local Vite frontend and remote access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount data predictions folder for raster static serving
if os.path.exists("data/predictions"):
    app.mount("/rasters", StaticFiles(directory="data/predictions"), name="rasters")

@app.get("/health", response_model=HealthResponse)
def health_check():
    return {
        "status": "ok",
        "service": "FloodCast AI API",
        "version": "1.0.0",
        "scope": "India-Wide",
        "hazard": "Flood"
    }

@app.get("/regions", response_model=RegionInfo)
def get_supported_regions():
    return service.get_supported_region_info()

@app.get("/events", response_model=List[EventSummary])
def get_historical_events():
    events = service.get_events()
    if not events:
        raise HTTPException(status_code=404, detail="No historical events found")
    return events

@app.get("/predictions", response_model=PredictionResponse)
def get_spatial_prediction(
    event_id: str = Query(..., description="ID of the historical event, e.g. assam_flood_2024, bihar_flood_2020, kerala_flood_2018"),
    date: str = Query(..., description="Prediction date in YYYY-MM-DD format")
):
    pred = service.get_prediction(event_id, date)
    if not pred:
        raise HTTPException(status_code=404, detail=f"No prediction found for event {event_id} on date {date}")
    return pred

@app.get("/risk-point", response_model=PointRiskResponse)
def get_risk_at_coordinate(
    lat: float = Query(..., description="Latitude of clicked coordinate"),
    lon: float = Query(..., description="Longitude of clicked coordinate"),
    event_id: Optional[str] = Query(None, description="Event identifier"),
    date: Optional[str] = Query(None, description="Prediction date (YYYY-MM-DD)")
):
    return service.inspect_point_risk(lat=lat, lon=lon, event_id=event_id, date_str=date)

@app.get("/timeline", response_model=List[Dict[str, Any]])
def get_event_timeline(
    event_id: str = Query("assam_flood_2024", description="Historical flood event ID")
):
    timeline = service.get_timeline(event_id)
    if not timeline:
        raise HTTPException(status_code=404, detail=f"Timeline for event {event_id} not found")
    return timeline

@app.get("/metrics/{event_id}", response_model=EventValidationMetrics)
def get_event_validation_metrics(event_id: str):
    metrics = service.get_metrics(event_id)
    if not metrics:
        raise HTTPException(status_code=404, detail=f"Metrics for event {event_id} not found")
    return metrics

@app.get("/observed/{event_id}")
def get_observed_flood_extent(event_id: str):
    return service.get_observed_flood(event_id)

@app.get("/metadata/model", response_model=ModelMetadataResponse)
def get_model_metadata():
    metadata = service.get_model_metadata()
    if not metadata:
        raise HTTPException(status_code=404, detail="Model metadata not found")
    return metadata
