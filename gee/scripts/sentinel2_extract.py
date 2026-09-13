"""
Sentinel-2 Surface Reflectance Extraction and Cloud Masking Script
Collection: COPERNICUS/S2_SR_HARMONIZED
Study Region: Assam, India
"""

import os
import json

# Assam Bounding Box Coordinates: [min_lon, min_lat, max_lon, max_lat]
ASSAM_BBOX = [89.6, 24.0, 96.0, 28.2]
ANALYSIS_RESOLUTION_M = 100

def get_sentinel2_collection_info():
    return {
        "collection": "COPERNICUS/S2_SR_HARMONIZED",
        "description": "Sentinel-2 Level-2A Surface Reflectance Harmonized",
        "bands": {
            "B3": "Green (560 nm) - 10m native",
            "B4": "Red (665 nm) - 10m native",
            "B8": "NIR (842 nm) - 10m native",
            "B11": "SWIR (1610 nm) - 20m native",
            "QA60": "Cloud/Cirrus mask band",
            "SCL": "Scene Classification Layer"
        },
        "analysis_resolution": "100m resampled grid",
        "cloud_filtering": "QA60 & SCL cloud probability < 20%",
        "ndwi_formula": "(B3 - B8) / (B3 + B8)",
        "region_bbox": ASSAM_BBOX
    }

if __name__ == "__main__":
    print(json.dumps(get_sentinel2_collection_info(), indent=2))
