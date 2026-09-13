"""
SRTM DEM Elevation & Slope Extraction Script
Dataset: USGS/SRTMGL1_003
Study Region: Assam, India
Features: Elevation (meters), Slope (degrees)
"""

import json

def get_srtm_info():
    return {
        "dataset": "USGS/SRTMGL1_003",
        "description": "NASA Shuttle Radar Topography Mission Global 1 arc second (~30m)",
        "target_resolution": "100m aligned grid",
        "features": [
            "elevation (meters above sea level)",
            "slope (degrees derived from elevation gradient)"
        ],
        "static": True
    }

if __name__ == "__main__":
    print(json.dumps(get_srtm_info(), indent=2))
