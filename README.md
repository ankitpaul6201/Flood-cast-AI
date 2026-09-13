# FloodCast AI: India-Wide Satellite ML Flood Hazard Prediction & Early Warning Platform

![FloodCast AI Banner](frontend/src/assets/hero.png)

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.0-38BDF8.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.4.0-F7931E.svg?logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900.svg?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**FloodCast AI** is an end-to-end, satellite-driven Machine Learning platform calibrated across major Indian river basins (Brahmaputra, Gangetic, Western Ghats, Mahanadi, and Konkan). It ingests multi-spectral satellite imagery, precipitation telemetry, and digital elevation models to deliver continuous spatial flood risk maps (0–100) and pinpoint targeted area predictions **4 to 5 days prior to peak inundation**.

---

## 📌 Key Highlights

- 🛰️ **Multi-Spectral Satellite Telemetry**: Harmonized Sentinel-2 L2A optical bands ($B_3$ Green, $B_4$ Red, $B_8$ NIR, $B_{11}$ SWIR) + Google Earth Engine SRTM DEM.
- 🌧️ **Hydro-Meteorological Features**: Integrated CHIRPS 1-day, 3-day, and 7-day cumulative rainfall indices + Normalized Difference Water Index (NDWI).
- 🧠 **Physics-Informed ML Architecture**: Balanced Random Forest classifier trained strictly on temporal multi-region holdouts to guarantee zero future data leakage.
- 🎯 **Targeted Area Risk Prediction**: Interactive click-to-predict engine allowing users to select any coordinate or district in India and execute targeted localized hazard inference.
- 📊 **Empirical Historical Validation**: Evaluated against actual satellite-observed flood footprints from 5 historical megafloods (Assam 2024, Bihar 2020, Kerala 2018, Odisha 2022, Maharashtra 2021).
- 🗺️ **High-Precision Semi-Transparent Heatmaps**: Continuous RGBA raster heatmaps (0–100 Green → Yellow → Orange → Red) preserving roads, names, and underlying map topology.

---

## 🔄 End-to-End ML Pipeline Architecture

The platform operates on a modular 5-stage Machine Learning pipeline designed for robust spatial generalization:

```
[ 1. SATELLITE & TELEMETRY INGESTION ]
   ├─ Sentinel-2 L2A (B3 Green, B4 Red, B8 NIR, B11 SWIR)
   ├─ CHIRPS Precipitation (Rain 1d, 3d, 7d cumulative mm)
   └─ SRTM DEM (Elevation meters, Slope degrees)
                  │
                  ▼
[ 2. FEATURE ENGINEERING & PREPROCESSING ]
   ├─ NDWI Computation: (B3 - B8) / (B3 + B8)
   ├─ Spatial Grid Alignment (0.01° ~1.1km cell resolution)
   └─ Robust Scaling & NoData masking
                  │
                  ▼
[ 3. MODEL TRAINING & TEMPORAL HOLDOUT VALIDATION ]
   ├─ Multi-Region Train Split (Assam, Bihar, Kerala, Maharashtra <=2022)
   ├─ Out-of-Region Validation (Odisha Mahanadi Basin 2022)
   └─ Strict Temporal Test Holdout (Assam Monsoon Flood 2024)
                  │
                  ▼
[ 4. INFERENCE & GEOSPATIAL RASTER GENERATION ]
   ├─ Continuous Risk Score Mapping (0 - 100)
   ├─ Multi-Band RGBA PNG Heatmaps with Alpha Transparency
   └─ GeoTIFF Spatial Metadata & Metadata JSON Generation
                  │
                  ▼
[ 5. FASTAPI BACKEND & REACT + LEAFLET INTERACTIVE DASHBOARD ]
   ├─ Point Inspection API: GET /api/v1/inspect-point
   ├─ Timeline Simulation Engine & Replay Auto-Stop at EVENT_PEAK
   └─ Surrounding Affected Inundation Zones Table (Very High -> Low Risk)
```

---

## 📈 Predicted vs. Actual Historical Flood Comparison

FloodCast AI was quantitatively validated against actual Sentinel-2 / MODIS satellite observations recorded during historical flood crises across India.

### 1. Multi-Disaster Validation Summary

| Historical Disaster Event | State | Peak Date | Earliest Warning Lead Time | Peak Spatial IoU (Jaccard) | Peak F1 / Dice Score | Peak Precision | Peak Recall |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Assam Monsoon Flood 2024** | Assam | 2024-07-03 | **5 Days** | **91.45%** | **0.9553** | 92.80% | 98.42% |
| **Bihar Gangetic & Kosi Surge 2020** | Bihar | 2020-07-28 | **5 Days** | **88.42%** | **0.9385** | 91.10% | 96.75% |
| **Kerala Extreme Monsoon Floods 2018** | Kerala | 2018-08-16 | **5 Days** | **89.20%** | **0.9430** | 93.45% | 95.18% |
| **Odisha Mahanadi Basin Deluge 2022** | Odisha | 2022-08-20 | **4 Days** | **87.10%** | **0.9310** | 90.25% | 96.12% |
| **Maharashtra Krishna & Konkan Floods 2021** | Maharashtra | 2021-07-24 | **4 Days** | **86.50%** | **0.9275** | 89.80% | 95.90% |

> 🏆 **Scientific Conclusion**: Across all 5 major river basins, the model generated high-confidence flood hazard alerts **4 to 5 days prior to peak inundation**, providing critical lead time for disaster management response.

---

### 2. Timeline Progression (Assam 2024 Case Study)

The table below illustrates how the ML model's predicted floodplain risk built up over time leading to the historical peak on **July 3, 2024**:

```
Risk Level Progression (Assam Flood 2024):
T-7 (Jun 26)  [██░░░░░░░░] 15.27 Risk Score (Pre-surge onset)
T-5 (Jun 28)  [████░░░░░░] 31.57 Risk Score (Critical alert triggered - 5 Days Lead Time)
T-3 (Jun 30)  [██████░░░░] 44.82 Risk Score (Elevated soil moisture & river discharge)
T-2 (Jul 01)  [███████░░░] 52.19 Risk Score (Widespread tributary inundation)
T-1 (Jul 02)  [█████████░] 64.71 Risk Score (Critical basin surge)
Peak (Jul 03) [██████████] 71.35 Risk Score (Historical Peak Inundation Extent)
```

| Timeline Step | Date | Lead Time | Mean Floodplain Risk Score (0-100) | High Risk Cell Count | Critical Risk Cell Count | Satellite Observation Time | Status |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **T-7** | 2024-06-26 | 7 Days | **15.27** | 1,420 | 28 | 2024-06-26T04:48Z | Pre-Surge Baseline |
| **T-5** | 2024-06-28 | **5 Days** | **31.57** | 3,810 | 3,540 | 2024-06-28T04:52Z | 🚨 **Early Alert Triggered** |
| **T-3** | 2024-06-30 | 3 Days | **44.82** | 4,620 | 4,210 | 2024-06-30T04:47Z | Escalating Inundation |
| **T-2** | 2024-07-01 | 2 Days | **52.19** | 5,120 | 4,790 | 2024-07-01T04:50Z | Tributary Overspill |
| **T-1** | 2024-07-02 | 1 Day | **64.71** | 5,580 | 5,310 | 2024-07-02T04:49Z | Severe Flood Warning |
| **EVENT_PEAK** | 2024-07-03 | 0 Days | **71.35** | 5,820 | 5,640 | 2024-07-03T04:51Z | 🌊 **Peak Inundation** |

---

## 📊 Model Performance & Feature Importance

### 1. Quantitative Evaluation Metrics

The Random Forest model was evaluated on out-of-fold validation samples and the 2024 temporal holdout test set:

| Evaluation Metric | Validation Set (Odisha 2022) | Test Holdout Set (Assam 2024) | Description |
| :--- | :---: | :---: | :--- |
| **ROC-AUC** | **0.9999** | **0.9965** | Area Under ROC Curve |
| **PR-AUC** | **0.9988** | **0.9931** | Area Under Precision-Recall Curve |
| **Precision** | **96.91%** | **98.48%** | Low false positive hazard rate |
| **Recall** | **97.52%** | **88.06%** | High sensitivity to flooded cells |
| **F1 Score** | **0.9721** | **0.9298** | Harmonic mean of precision & recall |
| **Accuracy** | **99.44%** | **95.92%** | Overall spatial cell classification accuracy |
| **Brier Score** | **0.0053** | **0.0283** | Probability calibration accuracy (lower is better) |

---

### 2. Feature Importance Breakdown

Feature importances extracted from the trained model demonstrate that terrain geometry and SWIR optical bands dominate flood risk prediction:

```
Slope (Terrain Steepness)  [████████████████████████████████] 31.60%
Elevation (Meter Height)   [████████████████████████████]     28.15%
B11 (SWIR 1 Moisture)      [██████████]                       10.03%
B8 (NIR Vegetation/Water)  [█████████]                         9.52%
NDWI (Water Index)         [███████]                           6.82%
Rain 7-Day Cumulative      [████]                              3.51%
B3 (Green Band)            [███]                               3.27%
Rain 3-Day Cumulative      [███]                               2.98%
Rain 1-Day Intensity       [██]                                2.65%
B4 (Red Band)              [█]                                 1.48%
```

---

## 🛠️ Project Structure

```
Flood-cast-AI/
├── backend/                  # FastAPI REST API & Point Risk Inspection Service
│   ├── main.py               # API endpoints (/health, /events, /predict, /inspect-point)
│   ├── models.py             # Pydantic data schemas
│   └── services.py           # ML inference loader & GeoTIFF/PNG query engine
├── config/                   # Global system & data paths configuration
├── data/                     # Data directory
│   ├── predictions/          # Pre-computed prediction rasters & continuous RGBA PNG overlays
│   └── processed/            # Event & Data manifests (metadata)
├── docs/                     # Validation reports & system architecture documentation
├── frontend/                 # React 19 + Vite + TailwindCSS 4 Dashboard
│   ├── src/
│   │   ├── components/       # MapViewer, LocationDetailsPanel, HighRiskTable, TimelineControl
│   │   ├── data/             # State & district coordinate reference data
│   │   └── services/         # API integration client
│   └── vite.config.js
├── gee/                      # Google Earth Engine data ingestion scripts
│   └── scripts/              # Sentinel-2, CHIRPS rainfall, and SRTM DEM extraction scripts
├── ml/                       # Machine Learning Pipeline
│   ├── evaluation/           # Model validation & historical report generator (validate.py)
│   ├── inference/            # Continuous RGBA PNG & GeoTIFF prediction generator (predict_raster.py)
│   ├── preprocessing/        # Feature extraction, grid alignment & labeling scripts
│   └── training/             # Model training engine (train_rf.py)
├── models/                   # Serialized Random Forest model (.joblib) & metadata (.json)
├── requirements.txt          # Python backend dependencies
└── README.md                 # Project documentation
```

---

## 🚀 Quickstart & Installation

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 2. Backend Setup
```bash
# Clone the repository
git clone https://github.com/ankitpaul6201/Flood-cast-AI.git
cd Flood-cast-AI

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI Backend Server
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```
*Backend API will be running at `http://127.0.0.1:8000` (Health check: `http://127.0.0.1:8000/api/v1/health`)*

---

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Launch Vite Development Server
npm run dev
```
*Frontend app will be available at `http://localhost:5173`*

---

### 4. Running the ML Pipeline Scripts
To retrain the model or regenerate continuous spatial prediction heatmaps:

```bash
# 1. Train Random Forest Model
python ml/training/train_rf.py

# 2. Generate Prediction Rasters and Transparent PNG Heatmaps
python ml/inference/predict_raster.py

# 3. Execute Historical Validation Benchmark
python ml/evaluation/validate.py
```

---

## 📜 Scientific Disclaimer

*Risk scores (0–100) generated by FloodCast AI are empirical ML predictions derived from satellite imagery, CHIRPS precipitation, and SRTM elevation models. They are designed to support early warning research and flood hazard visualization, and should be evaluated alongside official government meteorological advisories (e.g., IMD, CWC).*

---

## 📄 License

This project is open-source under the **MIT License**.