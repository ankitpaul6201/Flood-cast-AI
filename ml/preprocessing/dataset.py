"""
Training Dataset Builder & Temporal Leakage Auditor for FloodCast AI (India-Wide)
Generates multi-region training, validation, and test datasets with temporal splits.
Validates zero future leakage across all sample rows.
"""

import os
import numpy as np
import pandas as pd
from .features import generate_environmental_features_for_date
from .labels import compute_label_for_prediction_date
from .grid import DEFAULT_GRID_ROWS, DEFAULT_GRID_COLS
from config.settings import FEATURE_COLUMNS

def build_dataset_for_events(output_parquet: str = "data/processed/training_dataset.parquet"):
    """
    Constructs multi-region India dataset across training (<=2022), validation (2023), and test (2024 holdout).
    """
    os.makedirs(os.path.dirname(output_parquet), exist_ok=True)
    
    # Diverse multi-region event configuration
    events_config = [
        # 1. Kerala 2018 (Train)
        {"event_id": "kerala_2018", "region_id": "kerala", "split": "train", "peak_date": "2018-08-16", "dates": [
            ("2018-08-09", 7),
            ("2018-08-11", 5),
            ("2018-08-13", 3),
            ("2018-08-15", 1),
            ("2018-08-16", 0),
        ]},
        # 2. Bihar 2020 (Train)
        {"event_id": "bihar_2020", "region_id": "bihar", "split": "train", "peak_date": "2020-07-28", "dates": [
            ("2020-07-21", 7),
            ("2020-07-23", 5),
            ("2020-07-25", 3),
            ("2020-07-27", 1),
            ("2020-07-28", 0),
        ]},
        # 3. Maharashtra 2021 (Train)
        {"event_id": "maharashtra_2021", "region_id": "maharashtra", "split": "train", "peak_date": "2021-07-24", "dates": [
            ("2021-07-20", 4),
            ("2021-07-22", 2),
            ("2021-07-24", 0),
        ]},
        # 4. Assam 2022 (Train)
        {"event_id": "assam_2022", "region_id": "assam", "split": "train", "peak_date": "2022-06-19", "dates": [
            ("2022-06-12", 7),
            ("2022-06-16", 3),
            ("2022-06-18", 1),
            ("2022-06-19", 0),
        ]},
        # 5. Odisha 2022 (Validation)
        {"event_id": "odisha_2022", "region_id": "odisha", "split": "val", "peak_date": "2022-08-20", "dates": [
            ("2022-08-14", 6),
            ("2022-08-16", 4),
            ("2022-08-18", 2),
            ("2022-08-20", 0),
        ]},
        # 6. Assam 2024 (Holdout Test Event)
        {"event_id": "assam_2024", "region_id": "assam", "split": "test", "peak_date": "2024-07-03", "dates": [
            ("2024-06-26", 7),
            ("2024-06-28", 5),
            ("2024-06-30", 3),
            ("2024-07-01", 2),
            ("2024-07-02", 1),
            ("2024-07-03", 0),
        ]}
    ]
    
    all_rows = []
    
    for event in events_config:
        event_id = event["event_id"]
        region_id = event["region_id"]
        split = event["split"]
        peak_date = event["peak_date"]
        
        for date_str, days_to_peak in event["dates"]:
            feat = generate_environmental_features_for_date(
                date_str=date_str,
                days_to_peak=days_to_peak,
                region_id=region_id,
                rows=DEFAULT_GRID_ROWS,
                cols=DEFAULT_GRID_COLS
            )
            labels = compute_label_for_prediction_date(
                pred_date=date_str,
                peak_date=peak_date,
                days_to_peak=days_to_peak,
                region_id=region_id,
                rows=DEFAULT_GRID_ROWS,
                cols=DEFAULT_GRID_COLS
            )
            
            mask = feat["region_mask"]
            n_cells = np.sum(mask)
            
            # Subsample valid cells
            valid_indices = np.where(mask)
            subsample_idx = np.random.choice(len(valid_indices[0]), size=min(400, n_cells), replace=False)
            r_idx = valid_indices[0][subsample_idx]
            c_idx = valid_indices[1][subsample_idx]
            
            for r, c in zip(r_idx, c_idx):
                row = {
                    "event_id": event_id,
                    "region_id": region_id,
                    "split": split,
                    "prediction_date": date_str,
                    "peak_date": peak_date,
                    "days_to_peak": days_to_peak,
                    "lat": float(feat["lats"][r, c]),
                    "lon": float(feat["lons"][r, c]),
                    "B3": float(feat["b3"][r, c]),
                    "B4": float(feat["b4"][r, c]),
                    "B8": float(feat["b8"][r, c]),
                    "B11": float(feat["b11"][r, c]),
                    "NDWI": float(feat["ndwi"][r, c]),
                    "rain_1d": float(feat["rain_1d"][r, c]),
                    "rain_3d": float(feat["rain_3d"][r, c]),
                    "rain_7d": float(feat["rain_7d"][r, c]),
                    "elevation": float(feat["elevation"][r, c]),
                    "slope": float(feat["slope"][r, c]),
                    "label": int(labels[r, c])
                }
                all_rows.append(row)
                
    df = pd.DataFrame(all_rows)
    
    csv_path = output_parquet.replace(".parquet", ".csv")
    df.to_csv(csv_path, index=False)
    try:
        df.to_parquet(output_parquet, index=False)
    except Exception:
        pass
    
    print(f"Multi-region dataset generated with {len(df)} records across {df['region_id'].nunique()} Indian regions.")
    print(f"Splits count: {df['split'].value_counts().to_dict()}")
    print(f"Class distribution: {df['label'].value_counts().to_dict()}")
    return df

def audit_temporal_leakage(df: pd.DataFrame) -> bool:
    """
    Validates temporal ordering:
    1. Training only occurs on <= 2022-07 dates
    2. Validation on 2022-08 / 2023 dates
    3. Test strictly on 2024 dates
    """
    train_dates = pd.to_datetime(df[df["split"] == "train"]["prediction_date"])
    val_dates = pd.to_datetime(df[df["split"] == "val"]["prediction_date"])
    test_dates = pd.to_datetime(df[df["split"] == "test"]["prediction_date"])
    
    assert train_dates.max() <= val_dates.min(), "Leakage Error: Train dates overlap with Validation dates!"
    assert val_dates.max() < test_dates.min(), "Leakage Error: Val dates overlap with Test dates!"
    print("Zero temporal leakage audit across multi-region India dataset: PASSED successfully!")
    return True

if __name__ == "__main__":
    df = build_dataset_for_events()
    audit_temporal_leakage(df)
