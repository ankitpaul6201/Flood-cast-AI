# FloodCast AI --- Architecture & Workflow

## 1. System Architecture

``` text
                   PUBLIC DATA
        ┌──────────────┼───────────────┐
        ▼              ▼               ▼
   Sentinel-2       CHIRPS            DEM
        │              │               │
        └──────────────┼───────────────┘
                       ▼
              Google Earth Engine
                       │
              Cloud/quality filtering
                       │
                       ▼
             Geospatial preprocessing
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
        NDWI        Rainfall      Terrain
          │            │            │
          └────────────┼────────────┘
                       ▼
              Time-safe feature table
                       │
                       ▼
                Random Forest
                       │
                       ▼
              Cell-level probability
                       │
                       ▼
               0–100 risk raster
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
     GeoTIFF store              Metadata store
          │                         │
          └────────────┬────────────┘
                       ▼
                    FastAPI
                       │
                       ▼
                React + Leaflet
                       │
                       ▼
              Interactive dashboard
```

## 2. The Critical Prediction Logic

At every prediction timestamp `t`:

``` text
             INFORMATION AVAILABLE AT t
                         │
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
 Sentinel-2           Rainfall            DEM
   <= t                 <= t              static
       │                 │                 │
       └─────────────────┼─────────────────┘
                         ▼
                    Feature vector
                         │
                         ▼
                     ML model
                         │
                         ▼
                  Flood risk at t
                         │
                         ▼
               Future label window
                    t+1 ... t+H
                         │
                         ▼
                 Actual observation
```

This temporal structure is the central scientific requirement.

## 3. Offline Data Workflow

### Step 1 --- Select event

Choose a historical Assam flood event after checking: - event
documentation - satellite availability - cloud conditions - usable
observed flood extent - rainfall coverage

### Step 2 --- Define prediction dates

Create a sequence of dates before and during the event.

### Step 3 --- Extract satellite features

For each prediction date: - query Sentinel-2 - filter poor-quality
observations - calculate spectral features - calculate NDWI - record
acquisition timestamp

### Step 4 --- Add rainfall

Calculate rolling rainfall features up to each prediction timestamp.

### Step 5 --- Add terrain

Generate static elevation/slope layers.

### Step 6 --- Generate labels

Use a future observed flood layer to label cells.

### Step 7 --- Build dataset

Each row:

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

### Step 8 --- Train

Train only on earlier dates/events.

### Step 9 --- Test

Evaluate on later/unseen dates/events.

### Step 10 --- Generate spatial predictions

Create a risk raster for each prediction date.

## 4. Browser Workflow

``` text
Judge opens dashboard
        ↓
Selects date
        ↓
Frontend requests prediction
        ↓
FastAPI finds corresponding raster
        ↓
Raster is rendered on Leaflet
        ↓
Judge clicks location
        ↓
API returns cell data
        ↓
Risk card appears
```

## 5. Historical Replay

``` text
T-7 days → prediction map
      ↓
T-5 days → prediction map
      ↓
T-3 days → prediction map
      ↓
T-1 day  → prediction map
      ↓
Event day → observed flood layer
      ↓
Comparison → IoU / precision / recall / lead time
```

## 6. Recommended Demo Sequence

1.  Start at the world map.
2.  Zoom into Assam.
3.  Select the historical event.
4.  Show a pre-event prediction.
5.  Explain the risk legend.
6.  Click a red/high-risk location.
7.  Show its features and timestamps.
8.  Start replay.
9.  Show risk intensifying.
10. Reveal actual flood extent.
11. Show measured overlap and lead time.
12. Open model metrics.

## 7. Architecture Boundaries

### GEE

Responsible for: - satellite/environmental extraction - spatial
filtering - raster preprocessing

### ML

Responsible for: - feature matrix - training - inference - evaluation

### FastAPI

Responsible for: - serving predictions - point queries - timeline
metadata - metrics

### React/Leaflet

Responsible for: - visualization - user interaction - risk cards -
replay controls

## 8. Important Design Decision

For the hackathon, **precompute the historical predictions**.

The dashboard should not depend on a live satellite feed to demonstrate
the model.

This makes the demo: - faster - deterministic - reproducible - easier to
debug - aligned with the challenge requirement for a historical
dataset/time window

## 9. Future Architecture

Only after the historical MVP works:

``` text
New satellite observation
        ↓
Automated preprocessing
        ↓
Feature update
        ↓
Model inference
        ↓
New risk raster
        ↓
API cache
        ↓
Dashboard
        ↓
Threshold alert
```

This future path can be described as an extension, not as a claim that
the hackathon MVP is operationally live.
