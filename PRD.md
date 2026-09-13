# FloodCast AI --- Product Requirements Document (PRD)

**Version:** 2.0 (India-Wide Architecture)\
**Hazard:** Flood\
**Geographic Scope:** India-Wide (Multi-basin calibration across Assam, Bihar, Kerala, Odisha, Maharashtra)\
**Product:** Historical satellite-based spatial flood-risk prediction and validation platform\
**Purpose:** Research and hackathon validation prototype demonstrating pre-disaster early lead-time prediction without future data leakage.

## 1. Product Vision

FloodCast AI converts historical satellite (Sentinel-2 Level-2A), precipitation (CHIRPS), and terrain (SRTM DEM) observations into an **interactive spatial flood-risk map** across India. Instead of returning a single number for an entire state, the system calculates a 0–100 spatial flood risk score for each 100m analysis cell and displays it on an interactive multi-resolution map.

The platform replays major historical flood disasters across India (e.g. *Assam 2024, Bihar 2020, Kerala 2018, Odisha 2022, Maharashtra 2021*) and proves that the model predicted escalating risk 4 to 5 days prior to peak inundation using strictly preceding observations.

## 2. Key Goals

- Predict spatial flood risk across diverse Indian hydrological basins.
- Support interactive India overview map with smooth zoom/fly-to for disaster-affected states.
- Replay pre-disaster lead times ($T-7$ to $T-1$) and compare against actual observed flood extents ($T-0$).
- Allow point inspection anywhere in India to view exact risk scores, NDWI, 3d/7d rainfall, elevation, and Sentinel-2 spectral bands.
- Enforce zero future temporal leakage across all training, validation, and inference pipelines.
- Expose clear distinction between satellite ingestion lag ($\sim 1.2\text{ hrs}$) and forecast horizon.

## 3. Supported Multi-Region Historical Disasters

1. **Assam Monsoon Flood (2024)** — Brahmaputra and Barak basins.
2. **Bihar Gangetic & Kosi Surge (2020)** — Kosi, Gandak, and Ganga lowlands.
3. **Kerala Extreme Monsoon Floods (2018)** — Periyar and Pamba Western Ghats coastal basins.
4. **Odisha Mahanadi Basin Deluge (2022)** — Mahanadi delta and coastal plains.
5. **Maharashtra Krishna & Konkan Floods (2021)** — Krishna, Koyna, and Vashishti river valleys.
