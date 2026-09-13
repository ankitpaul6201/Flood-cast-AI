"""
CHIRPS Daily Rainfall Extraction Script
Dataset: UCSB-CHG/CHIRPS/DAILY
Study Region: Assam, India
Features: 1-day, 3-day cumulative, 7-day cumulative rainfall (mm)
"""

import json

def get_chirps_info():
    return {
        "dataset": "UCSB-CHG/CHIRPS/DAILY",
        "description": "Climate Hazards Group InfraRed Precipitation with Station data (CHIRPS)",
        "native_resolution": "0.05 deg (~5.5 km)",
        "target_resolution": "100m resampled grid (bilinear/nearest)",
        "features": [
            "rain_1d (mm)",
            "rain_3d (cumulative mm over 3 days)",
            "rain_7d (cumulative mm over 7 days)"
        ],
        "temporal_constraint": "Only rainfall <= prediction_timestamp t is used for features (time-safe, zero future leakage)"
    }

if __name__ == "__main__":
    print(json.dumps(get_chirps_info(), indent=2))
