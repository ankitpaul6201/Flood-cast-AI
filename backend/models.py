"""
Pydantic Schema Models for FloodCast AI API (India-Wide)
"""

from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    scope: str
    hazard: str

class BoundingBox(BaseModel):
    min_lon: float = Field(..., alias="min_longitude", validation_alias="min_lon")
    max_lon: float = Field(..., alias="max_longitude", validation_alias="max_lon")
    min_lat: float = Field(..., alias="min_latitude", validation_alias="min_lat")
    max_lat: float = Field(..., alias="max_latitude", validation_alias="max_lat")

    model_config = {
        "populate_by_name": True
    }

class RegionDetail(BaseModel):
    id: str
    name: str
    state: str
    bbox: BoundingBox
    center: List[float]
    zoom: int
    primary_rivers: List[str]

class RegionInfo(BaseModel):
    country: str
    bounding_box: BoundingBox
    crs: str
    supported_regions: List[RegionDetail]
    disclaimer: str

class TimelineStep(BaseModel):
    step: str
    date: str
    description: str
    satellite_observation_time: str
    prediction_time: str
    lead_time_days: int

class EventSummary(BaseModel):
    id: str
    name: str
    state: Optional[str] = "India"
    region_id: Optional[str] = "assam"
    region: str
    impacted_districts: List[str]
    start_date: str
    peak_date: str
    end_date: str
    observed_source: str
    validation_status: str
    summary: str
    prediction_timeline: List[TimelineStep]

class FeatureBreakdown(BaseModel):
    B3: float = Field(..., description="Green reflectance")
    B4: float = Field(..., description="Red reflectance")
    B8: float = Field(..., description="NIR reflectance")
    B11: float = Field(..., description="SWIR reflectance")
    NDWI: float = Field(..., description="Normalized Difference Water Index")
    rain_1d_mm: float = Field(..., description="1-day rainfall (mm)")
    rain_3d_mm: float = Field(..., description="3-day cumulative rainfall (mm)")
    rain_7d_mm: float = Field(..., description="7-day cumulative rainfall (mm)")
    elevation_m: float = Field(..., description="Elevation above sea level (m)")
    slope_deg: float = Field(..., description="Terrain slope (degrees)")

class PointRiskResponse(BaseModel):
    latitude: float
    longitude: float
    in_study_region: bool
    state_region: str
    risk_score: float
    risk_category: str
    alert_level: str
    event_id: str
    prediction_date: str
    prediction_time: str
    satellite_observation_time: str
    data_lag_hours: float
    features: Optional[FeatureBreakdown] = None
    model_version: str
    message: Optional[str] = None

class PredictionGridPoint(BaseModel):
    lat: float
    lon: float
    risk: float

class PredictionResponse(BaseModel):
    event_id: str
    region_id: Optional[str] = "assam"
    state: Optional[str] = "India"
    step: str
    date: str
    lead_time_days: int
    description: str
    satellite_observation_time: str
    prediction_time: str
    mean_risk: float
    high_risk_cells: int
    critical_risk_cells: int
    geotiff_path: str
    raster_png_url: Optional[str] = None
    observed_png_url: Optional[str] = None
    bounds: Optional[List[List[float]]] = None
    grid_points_sample: Optional[List[PredictionGridPoint]] = None
    total_points: Optional[int] = 0

class EventValidationMetrics(BaseModel):
    event_id: str
    event_name: str
    peak_date: str
    measured_earliest_critical_alert_lead_time_days: int
    peak_spatial_iou: float
    peak_spatial_f1_dice: float
    peak_spatial_precision: float
    peak_spatial_recall: float
    timeline_progression: List[Dict[str, Any]]
    validation_events_summary: Optional[List[Dict[str, Any]]] = None
    scientific_conclusion: str

class ModelMetadataResponse(BaseModel):
    model_name: str
    version: str
    geographic_scope: str
    algorithm: str
    hyperparameters: Dict[str, Any]
    feature_schema: List[str]
    feature_importances: Dict[str, float]
    temporal_split_strategy: str
    train_samples: int
    validation_metrics: Dict[str, Any]
    test_holdout_metrics_2024: Dict[str, Any]
    risk_scale_mapping: Dict[str, str]
    scientific_disclaimer: str
