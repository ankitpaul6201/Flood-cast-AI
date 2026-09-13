"""
ML Scientific Safety, Temporal Leakage & Geospatial Tests for FloodCast AI (India-Wide)
"""

import os
import numpy as np
import pandas as pd
from ml.preprocessing.features import compute_ndwi
from ml.preprocessing.dataset import audit_temporal_leakage
from ml.preprocessing.grid import get_region_transform, REGIONAL_BOUNDS

def test_ndwi_formula_and_bounds():
    b3 = np.array([0.15, 0.05, 0.0])
    b8 = np.array([0.05, 0.35, 0.0])
    ndwi = compute_ndwi(b3, b8)
    
    # In water: Green > NIR -> NDWI > 0
    assert ndwi[0] > 0.0
    # In vegetation: Green < NIR -> NDWI < 0
    assert ndwi[1] < 0.0
    # Zero denominator handled cleanly
    assert ndwi[2] == 0.0
    assert np.all(ndwi >= -1.0) and np.all(ndwi <= 1.0)

def test_temporal_leakage_in_training_dataset():
    csv_path = "data/processed/training_dataset.csv"
    assert os.path.exists(csv_path), "Training dataset CSV must exist"
    df = pd.read_csv(csv_path)
    assert audit_temporal_leakage(df) is True

def test_multi_region_transforms():
    for reg_id in ["assam", "bihar", "kerala", "odisha"]:
        transform = get_region_transform(reg_id, 120, 180)
        bbox = REGIONAL_BOUNDS[reg_id]["bbox"]
        west, north = transform * (0, 0)
        east, south = transform * (180, 120)
        assert np.isclose(west, bbox["min_lon"])
        assert np.isclose(north, bbox["max_lat"])
        assert np.isclose(east, bbox["max_lon"])
        assert np.isclose(south, bbox["min_lat"])
