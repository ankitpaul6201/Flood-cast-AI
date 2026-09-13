"""
Spatial Prediction Engine for FloodCast AI (India-Wide)
Generates georeferenced GeoTIFFs, high-resolution continuous RGBA PNG raster overlays,
and structured JSON surfaces for historical disaster dates across India.
"""

import os
import json
import joblib
import numpy as np
import matplotlib.pyplot as plt
from ..preprocessing.grid import (
    generate_spatial_coordinates,
    get_region_mask,
    get_region_transform,
    get_region_bbox,
    write_geotiff,
    DEFAULT_GRID_ROWS,
    DEFAULT_GRID_COLS
)
from ..preprocessing.features import generate_environmental_features_for_date
from ..preprocessing.labels import generate_observed_flood_extent
from config.settings import FEATURE_COLUMNS, INDIA_BBOX, REGIONAL_BOUNDS

def create_risk_rgba_png(risk_grid: np.ndarray, region_mask: np.ndarray, output_png_path: str):
    """
    Renders continuous smooth RGBA raster image of spatial flood risk (0–100):
    - Strictly transparent outside official state/basin mask.
    - Continuous color mapping for all valid cells inside mask:
      * 0 - 30 (Low Risk): Emerald Green -> Golden Yellow
      * 30 - 60 (Moderate Risk): Golden Yellow -> Warm Orange
      * 60 - 80 (High Risk): Warm Orange -> Bright Red
      * 80 - 100 (Very High / Critical Risk): Bright Red -> Deep Crimson
    - Semi-transparent alpha (140 to 240) so base map/roads remain visible underneath.
    """
    rows, cols = risk_grid.shape
    rgba = np.zeros((rows, cols, 4), dtype=np.uint8)
    
    for r in range(rows):
        for c in range(cols):
            if not region_mask[r, c]:
                continue
            
            score = float(np.clip(risk_grid[r, c], 0.0, 100.0))
            
            if score <= 30.0:
                # 0 - 30 (Low Risk): Emerald Green [34, 197, 94] -> Golden Yellow [234, 179, 8]
                t = score / 30.0
                r_val = int(34 + t * (234 - 34))
                g_val = int(197 + t * (179 - 197))
                b_val = int(94 + t * (8 - 94))
                alpha = int(135 + t * 25)
            elif score <= 60.0:
                # 30 - 60 (Moderate Risk): Golden Yellow [234, 179, 8] -> Warm Orange [249, 115, 22]
                t = (score - 30.0) / 30.0
                r_val = int(234 + t * (249 - 234))
                g_val = int(179 + t * (115 - 179))
                b_val = int(8 + t * (22 - 8))
                alpha = int(160 + t * 25)
            elif score <= 80.0:
                # 60 - 80 (High Risk): Warm Orange [249, 115, 22] -> Bright Red [239, 68, 68]
                t = (score - 60.0) / 20.0
                r_val = int(249 + t * (239 - 249))
                g_val = int(115 + t * (68 - 115))
                b_val = int(22 + t * (68 - 22))
                alpha = int(185 + t * 25)
            else:
                # 80 - 100 (Very High / Critical Risk): Bright Red [239, 68, 68] -> Deep Crimson [153, 27, 27]
                t = min(1.0, (score - 80.0) / 20.0)
                r_val = int(239 + t * (153 - 239))
                g_val = int(68 + t * (27 - 68))
                b_val = int(68 + t * (27 - 68))
                alpha = int(210 + t * 30)
                
            rgba[r, c] = [r_val, g_val, b_val, alpha]
            
    plt.imsave(output_png_path, rgba, format="png")

def create_observed_rgba_png(observed_mask: np.ndarray, region_mask: np.ndarray, output_png_path: str):
    """
    Renders smooth continuous RGBA image for Observed Historical Flood Extent:
    - Inundated within state boundary: Deep Cobalt Blue [29, 78, 216, 210]
    - Non-inundated or outside: Transparent
    """
    rows, cols = observed_mask.shape
    rgba = np.zeros((rows, cols, 4), dtype=np.uint8)
    
    for r in range(rows):
        for c in range(cols):
            if region_mask[r, c] and observed_mask[r, c] == 1:
                rgba[r, c] = [29, 78, 216, 210]
                
    plt.imsave(output_png_path, rgba, format="png")

def run_spatial_inference_pipeline(
    model_path: str = "models/floodcast_rf.joblib",
    events_manifest_path: str = "data/processed/event_manifest.json",
    predictions_dir: str = "data/predictions"
):
    os.makedirs(predictions_dir, exist_ok=True)
    model = joblib.load(model_path)
    
    with open(events_manifest_path, "r") as f:
        events_data = json.load(f)
        
    all_predictions_index = {}
    
    for event in events_data["events"]:
        event_id = event["id"]
        region_id = event.get("region_id", "assam")
        peak_date = event["peak_date"]
        bbox = get_region_bbox(region_id)
        
        lats, lons = generate_spatial_coordinates(region_id, DEFAULT_GRID_ROWS, DEFAULT_GRID_COLS)
        region_mask = get_region_mask(region_id, lats, lons)
        transform = get_region_transform(region_id, DEFAULT_GRID_ROWS, DEFAULT_GRID_COLS)
        
        # 1. Precompute Observed Flood Extent Raster (GeoTIFF + Continuous PNG)
        observed_mask = generate_observed_flood_extent(
            region_id=region_id,
            peak_date=peak_date,
            rows=DEFAULT_GRID_ROWS,
            cols=DEFAULT_GRID_COLS
        )
        obs_tif_path = os.path.join(predictions_dir, f"observed_{event_id}.tif")
        write_geotiff(obs_tif_path, observed_mask.astype(np.uint8), transform=transform)
        
        obs_png_filename = f"observed_{event_id}.png"
        obs_png_path = os.path.join(predictions_dir, obs_png_filename)
        create_observed_rgba_png(observed_mask, region_mask, obs_png_path)
        
        event_predictions = []
        
        for step_info in event["prediction_timeline"]:
            date_str = step_info["date"]
            days_to_peak = step_info["lead_time_days"]
            step_name = step_info["step"]
            
            # 2. Extract features at timestamp t
            feat = generate_environmental_features_for_date(
                date_str=date_str,
                days_to_peak=days_to_peak,
                region_id=region_id,
                rows=DEFAULT_GRID_ROWS,
                cols=DEFAULT_GRID_COLS
            )
            
            # 3. Model predict proba
            valid_r, valid_c = np.where(region_mask)
            X_cells = np.column_stack([
                feat["b3"][valid_r, valid_c],
                feat["b4"][valid_r, valid_c],
                feat["b8"][valid_r, valid_c],
                feat["b11"][valid_r, valid_c],
                feat["ndwi"][valid_r, valid_c],
                feat["rain_1d"][valid_r, valid_c],
                feat["rain_3d"][valid_r, valid_c],
                feat["rain_7d"][valid_r, valid_c],
                feat["elevation"][valid_r, valid_c],
                feat["slope"][valid_r, valid_c],
            ])
            
            probs = model.predict_proba(X_cells)[:, 1]
            risk_scores = np.clip(probs * 100.0, 0.0, 100.0)
            
            # Reconstruct 2D risk grid
            risk_grid = np.zeros((DEFAULT_GRID_ROWS, DEFAULT_GRID_COLS), dtype=np.float32)
            risk_grid[valid_r, valid_c] = risk_scores
            
            # Write GeoTIFF
            tif_filename = f"{event_id}_{date_str}.tif"
            tif_path = os.path.join(predictions_dir, tif_filename)
            write_geotiff(tif_path, risk_grid, transform=transform)
            
            # Write Continuous RGBA PNG Heatmap
            png_filename = f"{event_id}_{date_str}.png"
            png_path = os.path.join(predictions_dir, png_filename)
            create_risk_rgba_png(risk_grid, region_mask, png_path)
            
            mean_risk = float(np.mean(risk_scores)) if len(risk_scores) > 0 else 0.0
            high_risk_cells = int(np.sum(risk_scores >= 50.0))
            critical_risk_cells = int(np.sum(risk_scores >= 75.0))
            
            meta_item = {
                "event_id": event_id,
                "region_id": region_id,
                "state": event.get("state", "India"),
                "step": step_name,
                "date": date_str,
                "lead_time_days": days_to_peak,
                "description": step_info["description"],
                "satellite_observation_time": step_info["satellite_observation_time"],
                "prediction_time": step_info["prediction_time"],
                "mean_risk": round(mean_risk, 2),
                "high_risk_cells": high_risk_cells,
                "critical_risk_cells": critical_risk_cells,
                "geotiff_path": f"/api/rasters/{tif_filename}",
                "raster_png_url": f"/api/rasters/{png_filename}",
                "observed_png_url": f"/api/rasters/{obs_png_filename}",
                "bounds": [
                    [bbox["min_lat"], bbox["min_lon"]],
                    [bbox["max_lat"], bbox["max_lon"]]
                ]
            }
            
            step_json_path = os.path.join(predictions_dir, f"{event_id}_{date_str}.json")
            with open(step_json_path, "w") as f:
                json.dump(meta_item, f, indent=2)
                
            event_predictions.append(meta_item)
            
        all_predictions_index[event_id] = event_predictions
        
    master_metadata = {
        "scope": "India-Wide",
        "bounding_box": INDIA_BBOX,
        "supported_regions": REGIONAL_BOUNDS,
        "grid_shape": [DEFAULT_GRID_ROWS, DEFAULT_GRID_COLS],
        "events": all_predictions_index
    }
    
    with open(os.path.join(predictions_dir, "metadata.json"), "w") as f:
        json.dump(master_metadata, f, indent=2)
        
    print(f"Spatial prediction pipeline completed with natural dendritic river heatmaps in {predictions_dir}")
    return master_metadata

if __name__ == "__main__":
    run_spatial_inference_pipeline()
