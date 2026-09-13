# FloodCast AI --- Phased Development Plan

## Development Strategy

Build the project in phases. **Do not start with the website.**

The correct order is:

``` text
Requirements
   ↓
Environment
   ↓
Data
   ↓
Geospatial preprocessing
   ↓
Labels
   ↓
ML baseline
   ↓
Validation
   ↓
Spatial inference
   ↓
Backend
   ↓
Frontend map
   ↓
Historical replay
   ↓
Polish + demo
```

------------------------------------------------------------------------

# PHASE 0 --- Requirements & Environment

## Objective

Prepare the machine and repository before touching ML.

## Install

### Required

-   Git
-   VS Code
-   Python 3.11 or a project-compatible Python version
-   Node.js LTS
-   npm
-   Google Chrome/Chromium
-   GitHub account

### Python packages

Create a virtual environment:

``` bash
python -m venv .venv
```

Windows:

``` bash
.venv\Scripts\activate
```

macOS/Linux:

``` bash
source .venv/bin/activate
```

Install baseline packages:

``` bash
pip install numpy pandas scikit-learn matplotlib seaborn
pip install geopandas rasterio shapely pyproj fiona
pip install earthengine-api geemap
pip install fastapi uvicorn pydantic
pip install joblib pyarrow
```

Optional:

``` bash
pip install shap
```

Frontend:

``` bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install leaflet react-leaflet
npm install -D tailwindcss @tailwindcss/vite
```

If the current Tailwind/Vite setup differs, follow the version-specific
installation instructions for the installed packages rather than forcing
an outdated configuration.

## Accounts

Create/verify: - GitHub - Google account - Google Earth Engine access

You do not need paid cloud infrastructure for the initial pipeline.

## Phase 0 Deliverable

A Git repository with:

``` text
floodcast-ai/
├── frontend/
├── backend/
├── ml/
├── gee/
├── data/
├── models/
└── docs/
```

And a working Python environment.

------------------------------------------------------------------------

# PHASE 1 --- Dataset & Event Selection

## Objective

Lock the scientific scope.

### Fixed choices

Hazard: **Flood**

Region: **Assam, India**

Primary satellite: **Sentinel-2**

Recommended additional data: **CHIRPS rainfall + DEM**

## Tasks

1.  Define Assam boundary.
2.  Choose historical window.
3.  Identify candidate flood events.
4.  Check satellite availability.
5.  Check cloud coverage.
6.  Check rainfall coverage.
7.  Identify a usable observed flood layer.
8.  Select the final event.
9.  Write the event/date into project configuration.

## Deliverable

``` text
data_manifest.json
event_manifest.json
```

These should document sources, dates, spatial resolution, and selected
event.

------------------------------------------------------------------------

# PHASE 2 --- Google Earth Engine Data Pipeline

## Objective

Successfully extract raw/preprocessed data.

## Tasks

1.  Authenticate Earth Engine.
2.  Load Sentinel-2 collection.
3.  Filter Assam.
4.  Filter date range.
5.  Apply cloud/quality filtering.
6.  Select required bands.
7.  Calculate NDWI.
8.  Export or sample data.
9.  Load CHIRPS rainfall.
10. Load DEM.

## Deliverable

A notebook/script that can reproduce extraction.

Example:

``` text
gee/
├── sentinel2.js
├── rainfall.js
└── dem.js
```

------------------------------------------------------------------------

# PHASE 3 --- Geospatial Preprocessing

## Objective

Make all data compatible.

## Tasks

-   choose analysis CRS
-   choose 100 m analysis grid
-   align raster bounds
-   align resolution
-   align grid origin
-   handle nodata
-   clip to Assam
-   generate feature layers

## Deliverable

Example:

``` text
data/processed/
├── ndwi/
├── rainfall/
├── elevation/
└── slope/
```

------------------------------------------------------------------------

# PHASE 4 --- Build Flood Labels

## Objective

Create the supervised-learning target.

For every prediction time:

``` text
X = information available <= t
y = flood observed after t
```

## Tasks

1.  Acquire/use observed flood extent.
2.  Convert it to a binary mask.
3.  Align it to the model grid.
4.  Define prediction horizon.
5.  Create cell-level labels.
6.  Verify labels visually.

## Deliverable

A dataset like:

``` text
cell_id | timestamp | label
001     | 2024-07-10 | 0
002     | 2024-07-10 | 1
```

------------------------------------------------------------------------

# PHASE 5 --- Build the Training Dataset

## Objective

Create the ML-ready table.

Example:

``` text
cell_id
timestamp
B3
B4
B8
B11
NDWI
rain_1d
rain_3d
rain_7d
elevation
slope
label
```

## Critical check

For every row verify:

``` text
max(input_timestamps) <= prediction_timestamp
```

If this fails, the row is invalid.

## Deliverable

``` text
data/processed/training_dataset.parquet
```

------------------------------------------------------------------------

# PHASE 6 --- Train Baseline ML Model

## Objective

Get the first real prediction.

Start with:

**Random Forest Classifier**

## Tasks

1.  Split by time/event.
2.  Train.
3.  Generate validation predictions.
4.  Calculate metrics.
5.  Save model.
6.  Save feature list.
7.  Save training metadata.

## Deliverable

``` text
models/
├── floodcast_rf.joblib
└── model_metadata.json
```

------------------------------------------------------------------------

# PHASE 7 --- Validate the Historical Event

## Objective

Answer the challenge's central question:

> Did the model's risk rise before or during a real historical flood?

## Tasks

Create predictions for:

``` text
T-7
T-5
T-3
T-2
T-1
event day
```

Then calculate:

-   risk trend
-   threshold crossing
-   lead time
-   spatial overlap
-   IoU
-   precision
-   recall

## Deliverable

A validation report and plots.

Example:

``` text
prediction date → average/high-risk area
event date       → observed flood area
```

Use only actual measured results.

------------------------------------------------------------------------

# PHASE 8 --- Spatial Prediction Engine

## Objective

Turn the ML model into map-ready output.

## Tasks

1.  Load a selected date.
2.  Generate all features.
3.  Run `predict_proba`.
4.  Convert to 0--100 risk.
5.  Write GeoTIFF.
6.  Save metadata.

## Deliverable

``` text
data/predictions/
├── 2024-07-10.tif
├── 2024-07-12.tif
├── 2024-07-14.tif
└── metadata.json
```

------------------------------------------------------------------------

# PHASE 9 --- FastAPI Backend

## Objective

Serve the predictions.

## First endpoints

``` text
GET /health
GET /predictions
GET /risk-point
GET /timeline
GET /events
GET /metrics
```

## Deliverable

Opening:

``` text
http://localhost:8000/docs
```

should show working API documentation.

------------------------------------------------------------------------

# PHASE 10 --- React + Leaflet Dashboard

## Objective

Build the judge-facing product.

## Build in this order

### 10.1 Base map

World → India → Assam.

### 10.2 Assam boundary

Clearly indicate model coverage.

### 10.3 Risk raster

Render prediction layer.

### 10.4 Legend

Low / Moderate / High / Critical.

### 10.5 Date selector

Switch between historical prediction dates.

### 10.6 Click inspector

Click an area and show:

``` text
Risk score
Category
NDWI
Rainfall
Elevation
Satellite timestamp
Prediction timestamp
```

------------------------------------------------------------------------

# PHASE 11 --- Historical Replay

## Objective

Make the prediction story visually obvious.

Build:

``` text
Timeline slider
      ↓
T-7 → T-5 → T-3 → T-1 → Event
      ↓
Risk map changes
      ↓
Observed flood layer appears
```

Add a chart:

``` text
Risk
100 |                    ●
 80 |                ●
 60 |           ●
 40 |      ●
 20 | ●
    +-------------------------
      T-7 T-5 T-3 T-1 Event
```

Only display actual values produced by the model.

------------------------------------------------------------------------

# PHASE 12 --- Alerts & Explainability

## Objective

Add product polish.

### Alerts

``` text
>= 75 → HIGH/CRITICAL alert
>= 90 → CRITICAL
```

### Explainability

Show feature importance.

Optional: - SHAP

Example UI:

``` text
WHY IS THIS AREA HIGH RISK?

Rainfall          █████████
NDWI              ████████
Elevation         ██████
Slope             ████
```

Do not interpret this as causal evidence.

------------------------------------------------------------------------

# PHASE 13 --- Testing & Scientific Audit

## Checklist

### Data

-   [ ] CRS verified
-   [ ] resolution verified
-   [ ] nodata handled
-   [ ] clouds handled
-   [ ] timestamps recorded

### ML

-   [ ] temporal split
-   [ ] no future leakage
-   [ ] metrics calculated
-   [ ] model version saved

### Map

-   [ ] risk layer correct
-   [ ] observed layer distinct
-   [ ] click values match raster
-   [ ] dates match metadata

### Product

-   [ ] study-region limitation visible
-   [ ] data source visible
-   [ ] revisit/observation limitations visible
-   [ ] not marketed as official warning system

------------------------------------------------------------------------

# PHASE 14 --- Deployment & Demo

## Deployment

Frontend: - Vercel or equivalent

Backend: - Render/Railway/equivalent

For a hackathon, static/precomputed prediction files are acceptable.

## Final Demo

``` text
1. Open dashboard
2. World map
3. Zoom to Assam
4. Select event
5. Show T-7 prediction
6. Click high-risk cell
7. Show feature details
8. Replay timeline
9. Risk increases
10. Reveal actual flood extent
11. Show IoU/precision/recall
12. Show measured lead time
13. Show architecture/model/data transparency
```

------------------------------------------------------------------------

# What to Build First --- Exact Priority

## Priority 1

Environment + Earth Engine access.

## Priority 2

One historical event + usable data.

## Priority 3

One clean feature dataset.

## Priority 4

Random Forest baseline.

## Priority 5

Historical validation.

## Priority 6

Generate one working GeoTIFF risk map.

## Priority 7

Leaflet map.

## Priority 8

Click-to-inspect.

## Priority 9

Historical replay.

## Priority 10

Alerts, explainability, UI polish, deployment.

**Do not spend the first days designing the website. If the model and
risk raster do not work, the website cannot rescue the project.**
