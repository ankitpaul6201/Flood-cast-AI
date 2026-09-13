# Satellite-Based Real-Time Natural Disaster Prediction

## Domain
**Remote Sensing / Geospatial AI**

## The Problem

Build a model that uses satellite data to predict **flood, cyclone, or landslide risk** in a chosen high-risk region, producing an actionable **spatial risk map** rather than a single classification score.

Use a public satellite dataset and a defined historical time window — **not a live feed**.

## Background

Floods, cyclones, and landslides cause massive damage in high-risk regions, and early-warning systems that rely on sparse ground sensors often miss or lag the event.

Satellite imagery offers wide, repeated coverage but is underused for genuinely predictive, rather than after-the-fact, risk mapping because turning raw satellite bands into an actionable spatial risk score is non-trivial.

## Core Requirements

### 1. Select One Hazard and One Region

- Pick exactly **one hazard type**: flood, cyclone, or landslide.
- Select **one specific high-risk region**.
- Do not attempt all three hazards generically.

### 2. Use a Public Satellite Dataset

Use a publicly available satellite dataset, such as:

- Sentinel Hub / Copernicus
- NASA MODIS / Landsat
- ISRO Bhuvan open data

Disclose:

- Dataset/source
- Satellite or sensor
- Spatial resolution
- Revisit time
- Relevant bands/features
- Historical time window

### 3. Generate a Spatial Risk Score

Go from raw/preprocessed satellite bands relevant to the selected hazard to a **spatial risk score across the region**.

Examples:

- **Flood:** NDWI, flood extent, rainfall, surface conditions
- **Cyclone:** cloud-top temperature, cloud structure, intensity-related features
- **Landslide:** slope, precipitation, elevation/DEM, land cover

### 4. Validate Against a Historical Disaster

Validate the model against at least **one real historical disaster event** present in the selected dataset's time window.

Determine whether the model's risk score actually rises **before or during the known event**.

### 5. Produce a Clear Visual Output

Create a:

- Risk heatmap
- Map overlay of the selected region
- Clear risk-level legend

Also be explicit about the **lag between a satellite pass and the prediction**.

## Bonus / Stretch

### Multi-Modal Risk Score

Fuse a second public data source, such as:

- Rainfall gauge data
- Elevation/DEM data
- Historical disaster records

Use the additional source to create a multi-modal risk score.

### Threshold-Based Alert System

Add a simple threshold-based alert system.

Example:

> Flag an area when the predicted risk crosses a defined threshold, such as 75%.

## Suggested Stack

### Programming & Machine Learning

- Python
- PyTorch / TensorFlow
- CNN / U-Net

### Satellite & Geospatial Processing

- Google Earth Engine or Sentinel Hub API
- Rasterio / GDAL
- NumPy
- Pandas

### Visualization & Mapping

- Folium / Leaflet
- Matplotlib
- GeoPandas

## Expected Output

The final project should produce an **actionable spatial risk map** showing the predicted disaster risk across the selected region and should demonstrate its performance against at least one real historical disaster event.
