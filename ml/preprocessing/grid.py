"""
Geospatial Grid & Regional Boundary Utilities for FloodCast AI (India-Wide)
Ensures matching CRS (EPSG:4326), extent, resolution (approx 100m analysis), and grid alignment.
"""

import numpy as np
import rasterio
from rasterio.transform import from_bounds
import json
import os
from config.settings import (
    INDIA_BBOX,
    REGIONAL_BOUNDS,
    DEFAULT_CRS,
    DEFAULT_GRID_ROWS,
    DEFAULT_GRID_COLS
)
from .river_networks import get_state_mask

ASSAM_BBOX = REGIONAL_BOUNDS["assam"]["bbox"]
GRID_ROWS = DEFAULT_GRID_ROWS
GRID_COLS = DEFAULT_GRID_COLS

def get_region_bbox(region_id: str = "assam") -> dict:
    """Returns bounding box dictionary for a specific region/state or India-wide."""
    region_id = region_id.lower()
    if region_id in REGIONAL_BOUNDS:
        return REGIONAL_BOUNDS[region_id]["bbox"]
    elif region_id in ["india", "all_india"]:
        return INDIA_BBOX
    return REGIONAL_BOUNDS["assam"]["bbox"]

def get_region_transform(region_id: str = "assam", rows: int = DEFAULT_GRID_ROWS, cols: int = DEFAULT_GRID_COLS):
    """Returns the rasterio affine transform for the selected region."""
    bbox = get_region_bbox(region_id)
    return from_bounds(
        bbox["min_lon"],
        bbox["min_lat"],
        bbox["max_lon"],
        bbox["max_lat"],
        cols,
        rows
    )

def get_assam_transform(rows: int = DEFAULT_GRID_ROWS, cols: int = DEFAULT_GRID_COLS):
    """Backward compatibility wrapper."""
    return get_region_transform("assam", rows, cols)

def generate_spatial_coordinates(region_id: str = "assam", rows: int = DEFAULT_GRID_ROWS, cols: int = DEFAULT_GRID_COLS):
    """
    Generate 2D arrays of latitudes and longitudes for a given region or country.
    """
    bbox = get_region_bbox(region_id)
    lons = np.linspace(bbox["min_lon"], bbox["max_lon"], cols)
    lats = np.linspace(bbox["max_lat"], bbox["min_lat"], rows)
    lon_grid, lat_grid = np.meshgrid(lons, lats)
    return lat_grid, lon_grid

def get_region_mask(region_id: str, lat_grid: np.ndarray, lon_grid: np.ndarray) -> np.ndarray:
    """
    Creates precise state/floodplain mask using official state polygons.
    """
    return get_state_mask(region_id, lat_grid, lon_grid)

def get_brahmaputra_basin_mask(lat_grid: np.ndarray, lon_grid: np.ndarray) -> np.ndarray:
    """Backward compatibility alias."""
    return get_region_mask("assam", lat_grid, lon_grid)

def write_geotiff(output_path: str, array_data: np.ndarray, transform=None, crs=DEFAULT_CRS, nodata=None):
    """
    Writes a 2D numpy array to a georeferenced GeoTIFF.
    """
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    if transform is None:
        transform = get_region_transform("assam", array_data.shape[0], array_data.shape[1])
        
    if nodata is None:
        if np.issubdtype(array_data.dtype, np.integer):
            nodata = 255 if array_data.dtype == np.uint8 else -9999
        else:
            nodata = -9999.0
    
    with rasterio.open(
        output_path,
        'w',
        driver='GTiff',
        height=array_data.shape[0],
        width=array_data.shape[1],
        count=1,
        dtype=array_data.dtype,
        crs=crs,
        transform=transform,
        nodata=nodata
    ) as dst:
        dst.write(array_data, 1)

if __name__ == "__main__":
    for reg in ["assam", "bihar", "kerala", "odisha", "maharashtra"]:
        lat, lon = generate_spatial_coordinates(reg)
        mask = get_region_mask(reg, lat, lon)
        print(f"Region {reg}: grid {lat.shape}, valid cells {np.sum(mask)}")
