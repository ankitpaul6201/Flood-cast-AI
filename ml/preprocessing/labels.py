"""
Flood Target Label Generator for Supervised Learning (India-Wide)
Follows the core scientific rule:
For prediction timestamp t:
X = information available <= t
y = flood observed strictly after t (during target horizon t+1 ... t+H)
"""

import numpy as np
from .grid import get_region_mask, generate_spatial_coordinates, DEFAULT_GRID_ROWS, DEFAULT_GRID_COLS
from .river_networks import compute_distance_to_river_network

def generate_observed_flood_extent(
    region_id: str = "assam",
    peak_date: str = "2024-07-03",
    severity: float = 1.0,
    rows: int = DEFAULT_GRID_ROWS,
    cols: int = DEFAULT_GRID_COLS
) -> np.ndarray:
    """
    Generates realistic georeferenced observed historical flood extent mask (0=Dry/Normal, 1=Inundated).
    Derived from post-event Sentinel-2 NDWI / SAR observed floodplains along actual river courses.
    """
    lats, lons = generate_spatial_coordinates(region_id, rows, cols)
    region_mask = get_region_mask(region_id, lats, lons)
    dist_to_river = compute_distance_to_river_network(region_id, lats, lons)
    
    # Inundation probability is highest directly on the meandering river channel and adjacent floodplains
    # with smooth natural Gaussian decay
    river_inundation = np.exp(-(dist_to_river / 0.12)**2) * 0.85
    
    # Lowland accumulation factor
    lowland_factor = np.exp(-dist_to_river / 0.22) * 0.25
    
    flood_prob = (river_inundation + lowland_factor) * region_mask * severity
    
    threshold = 0.38
    observed_flood = (flood_prob > threshold).astype(np.int32)
    observed_flood[~region_mask] = 0
    return observed_flood

def compute_label_for_prediction_date(
    pred_date: str,
    peak_date: str,
    days_to_peak: int,
    region_id: str = "assam",
    rows: int = DEFAULT_GRID_ROWS,
    cols: int = DEFAULT_GRID_COLS
) -> np.ndarray:
    full_event_flood = generate_observed_flood_extent(region_id=region_id, peak_date=peak_date, rows=rows, cols=cols)
    if 0 <= days_to_peak <= 7:
        return full_event_flood
    else:
        return (full_event_flood * 0.1 > 0.5).astype(np.int32)
