# AGENTS.md --- FloodCast AI (India-Wide)

## 1. Project Scope

Project: FloodCast AI

Hazard: **Flood only**

Geographic Scope: **India-Wide (Calibrated across major flood-prone river basins)**

Primary purpose: **Historical satellite-based spatial flood-risk prediction and multi-region validation**

Do not silently expand the hazard to cyclone or landslide prediction.

------------------------------------------------------------------------

## 2. Core Scientific Rule

The system must perform prediction, not merely flood detection.

For prediction time `t`:

``` text
Inputs = information available <= t
Target = flood observed after t
```

Never use future observations as model inputs.

------------------------------------------------------------------------

## 3. Data Sources

Primary satellite:

``` text
COPERNICUS/S2_SR_HARMONIZED (Sentinel-2 Level-2A Surface Reflectance)
```

Supporting sources:

``` text
CHIRPS (Precipitation accumulation: 1d, 3d, 7d)
SRTM / documented public DEM (Elevation, Slope)
```

------------------------------------------------------------------------

## 4. Geospatial Integrity

Before combining rasters verify:

``` text
CRS (EPSG:4326)
resolution (100m analysis grid)
extent & bounding boxes
grid alignment
nodata handling
timestamp
```

Never assume rasters align without checking.

------------------------------------------------------------------------

## 5. Feature Rules

Standard Baseline Features:

``` text
B3 (Green)
B4 (Red)
B8 (NIR)
B11 (SWIR)
NDWI: (B3 - B8) / (B3 + B8)
rain_1d
rain_3d
rain_7d
elevation
slope
```

Do not silently convert invalid pixels to valid zeros.

------------------------------------------------------------------------

## 6. ML Rules

Baseline model: **Random Forest Classifier**

Multi-region training across diverse Indian hydro-climatic zones (Brahmaputra, Gangetic plains, Western Ghats, Mahanadi delta, Konkan).

The model provides a reproducible spatial flood risk score (0–100).

------------------------------------------------------------------------

## 7. Evaluation Rules

Use time/event-aware validation across multi-state disasters:

``` text
Train → earlier periods / events (<= 2022)
Validation → intermediate events (2022-2023)
Test → unseen holdout events (2024)
```

Never randomly split neighboring pixels from one event and claim this proves generalization.

------------------------------------------------------------------------

## 8. UI Rules

The UI must distinguish:

``` text
MODEL PREDICTION
```

from:

``` text
OBSERVED FLOOD EXTENT
```

Every map layer must have: - legend - date - source/meaning

Support India-wide navigation with zoom/fly-to for individual disaster states and river basins.

------------------------------------------------------------------------

## 9. Timestamp Rules

Every prediction must record:

``` text
prediction timestamp
satellite observation timestamp
data ingestion lag (~1.2 hrs)
forecast horizon (T-7 to T-1)
model version
```

------------------------------------------------------------------------

## 10. Backend Rules

FastAPI endpoints must accept geographic and disaster event parameters across India. Never fabricate results for missing data.

------------------------------------------------------------------------

## 11. Performance Rules

Precompute historical predictions, store rasters/GeoJSON, serve via FastAPI, and render in browser with smooth Leaflet tile/marker layers.

------------------------------------------------------------------------

## 12. Repository Rules

``` text
frontend/  → React + Leaflet UI
backend/   → FastAPI service & endpoints
ml/        → preprocessing, multi-region dataset, training, inference
config/    → centralized India-wide settings
data/      → event manifests, processed datasets, prediction rasters
models/    → trained model artifacts & metadata
docs/      → validation reports and documentation
tests/     → automated API, ML safety, and geospatial tests
```
