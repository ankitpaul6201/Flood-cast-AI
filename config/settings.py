"""
Centralized Configuration for FloodCast AI
India-Wide Spatial Flood-Risk Prediction Platform
"""

# Overall India Geographic Bounding Box (EPSG:4326)
# Lat: 6.5N to 37.5N, Lon: 68.0E to 97.5E
INDIA_BBOX = {
    "min_lon": 68.0,
    "max_lon": 97.5,
    "min_lat": 6.5,
    "max_lat": 37.5
}

# Major Flood-Prone Regional Bounding Boxes & Map Centers
REGIONAL_BOUNDS = {
    "assam": {
        "id": "assam",
        "name": "Assam (Brahmaputra & Barak Basins)",
        "state": "Assam",
        "bbox": {"min_lon": 89.6, "max_lon": 96.0, "min_lat": 24.0, "max_lat": 28.2},
        "center": [26.20, 92.80],
        "zoom": 7,
        "primary_rivers": ["Brahmaputra", "Barak", "Manas", "Subansiri"]
    },
    "bihar": {
        "id": "bihar",
        "name": "Bihar (Gangetic & Kosi-Gandak Basins)",
        "state": "Bihar",
        "bbox": {"min_lon": 83.3, "max_lon": 88.3, "min_lat": 24.3, "max_lat": 27.6},
        "center": [25.90, 85.80],
        "zoom": 7,
        "primary_rivers": ["Ganga", "Kosi", "Gandak", "Bagmati"]
    },
    "kerala": {
        "id": "kerala",
        "name": "Kerala (Periyar & Pamba Coastal Basins)",
        "state": "Kerala",
        "bbox": {"min_lon": 74.8, "max_lon": 77.6, "min_lat": 8.1, "max_lat": 12.8},
        "center": [10.15, 76.45],
        "zoom": 8,
        "primary_rivers": ["Periyar", "Pamba", "Bharathapuzha", "Chaliyar"]
    },
    "odisha": {
        "id": "odisha",
        "name": "Odisha (Mahanadi & Baitarani Delta)",
        "state": "Odisha",
        "bbox": {"min_lon": 81.3, "max_lon": 87.5, "min_lat": 17.8, "max_lat": 22.6},
        "center": [20.40, 84.80],
        "zoom": 7,
        "primary_rivers": ["Mahanadi", "Brahmani", "Baitarani", "Rushikulya"]
    },
    "maharashtra": {
        "id": "maharashtra",
        "name": "Maharashtra (Krishna & Konkan Basins)",
        "state": "Maharashtra",
        "bbox": {"min_lon": 72.6, "max_lon": 80.9, "min_lat": 15.6, "max_lat": 22.0},
        "center": [17.80, 74.50],
        "zoom": 7,
        "primary_rivers": ["Krishna", "Godavari", "Vashishti", "Panchganga"]
    }
}

# Standard Feature Columns for Baseline Model
FEATURE_COLUMNS = [
    "B3",       # Sentinel-2 Green (560 nm)
    "B4",       # Sentinel-2 Red (665 nm)
    "B8",       # Sentinel-2 NIR (842 nm)
    "B11",      # Sentinel-2 SWIR-1 (1610 nm)
    "NDWI",     # Normalized Difference Water Index (B3-B8)/(B3+B8)
    "rain_1d",  # CHIRPS 1-Day Rainfall (mm)
    "rain_3d",  # CHIRPS 3-Day Cumulative Rainfall (mm)
    "rain_7d",  # CHIRPS 7-Day Cumulative Rainfall (mm)
    "elevation",# SRTM Elevation (m)
    "slope"     # SRTM Terrain Slope (degrees)
]

# Spatial Risk Thresholds (0-100 Score)
RISK_CATEGORIES = {
    "LOW": {"min": 0, "max": 19, "label": "Low Risk", "color": "#60a5fa"},
    "MODERATE": {"min": 20, "max": 49, "label": "Moderate Risk", "color": "#facc15"},
    "HIGH": {"min": 50, "max": 74, "label": "High Risk", "color": "#fb923c"},
    "CRITICAL": {"min": 75, "max": 100, "label": "Critical Risk", "color": "#ef4444"}
}

# Spatial Resolution & Coordinate Reference System
DEFAULT_CRS = "EPSG:4326"
ANALYSIS_RESOLUTION_M = 100
DEFAULT_GRID_ROWS = 120
DEFAULT_GRID_COLS = 180

# Satellite Lag vs Forecast Horizon
SATELLITE_LAG_HOURS = 1.2
VALIDATED_HORIZONS_DAYS = [7, 5, 3, 2, 1, 0]
