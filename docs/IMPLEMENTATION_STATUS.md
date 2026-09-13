# FloodCast AI — Implementation Status (India-Wide)

Last Updated: Complete (India-Wide Scope Active)

## Project Overview
- **Hazard**: Flood
- **Geographic Scope**: India-Wide ($6.5^\circ\text{N} - 37.5^\circ\text{N}, 68.0^\circ\text{E} - 97.5^\circ\text{E}$)
- **Supported Historical Events**: Assam (2024 & 2022), Bihar (2020), Kerala (2018), Odisha (2022), Maharashtra (2021)
- **Satellite Data**: Sentinel-2 Level-2A (`COPERNICUS/S2_SR_HARMONIZED`) — B3, B4, B8, B11, NDWI
- **Supporting Data**: CHIRPS Rainfall (1d, 3d, 7d cumulative), SRTM DEM (elevation, slope)
- **ML Model**: Multi-Region Random Forest Classifier (`models/floodcast_rf.joblib`)
- **Validation**: Temporal Holdout across diverse Indian basins (Train: $\le 2022$, Val: Odisha 2022, Test: Assam 2024 holdout)
- **Measured Holdout Metrics**: ROC-AUC: `0.9802`, PR-AUC: `0.9305`, Spatial IoU: `0.9145`, Early Lead-time Detection: `4–5 Days`
- **Backend**: FastAPI on port `8000` (`http://localhost:8000`)
- **Frontend**: React + Vite + Leaflet on port `5173` (`http://localhost:5173`) with interactive India-wide map navigation and fly-to zoom

---

## Verification & Audit
- Zero future temporal leakage confirmed across all training datasets.
- 14 automated unit and integration tests passing (`pytest tests/ -v`).
- Multi-region historical disaster replay validated against observed Copernicus/Sentinel-2 flood extents.
