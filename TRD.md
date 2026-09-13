# FloodCast AI --- Technical Requirements Document (TRD)

**Version:** 2.0 (India-Wide)\
**Hazard:** Flood\
**Scope:** India-Wide ($6.5^\circ\text{N} - 37.5^\circ\text{N}, 68.0^\circ\text{E} - 97.5^\circ\text{E}$)\
**Primary Satellite:** Copernicus Sentinel-2 Level-2A Surface Reflectance (B3, B4, B8, B11, NDWI)\
**Precipitation:** CHIRPS daily precipitation (1d, 3d, 7d cumulative)\
**Terrain:** SRTM Digital Elevation Model (Elevation, Slope)\
**ML Engine:** Random Forest Classifier (Multi-region trained, temporal holdout validated)\
**Backend:** FastAPI + Uvicorn + Pydantic\
**Frontend:** React + Leaflet + Tailwind CSS

## 1. Feature Engineering & Schema
- `B3`: Green reflectance (560 nm)
- `B4`: Red reflectance (665 nm)
- `B8`: NIR reflectance (842 nm)
- `B11`: SWIR-1 reflectance (1610 nm)
- `NDWI`: $(B3 - B8) / (B3 + B8)$
- `rain_1d`, `rain_3d`, `rain_7d`: Precipitation accumulation (mm)
- `elevation`, `slope`: Terrain elevation (m) and slope (degrees)

## 2. API Endpoints
- `GET /health`: System status and India-wide scope metadata.
- `GET /regions`: India bounding box and list of supported regional basin configurations.
- `GET /events`: Historical disaster event manifest across Indian states.
- `GET /predictions?event_id=...&date=...`: Spatial prediction grid and GeoTIFF references.
- `GET /risk-point?lat=...&lon=...`: Lat/lon coordinate risk inspection anywhere in India.
- `GET /timeline?event_id=...`: Dynamic timeline progression for disaster event.
- `GET /metrics/{event_id}`: Event-specific validation metrics (Precision, Recall, F1, IoU, Lead Time).
- `GET /observed/{event_id}`: Observed flood footprint ground truth for that event.
- `GET /metadata/model`: Trained baseline Random Forest configuration and feature importances.
