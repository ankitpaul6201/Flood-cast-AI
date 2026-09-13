"""
API Tests for FloodCast AI FastAPI Backend (India-Wide)
"""

import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["hazard"] == "Flood"
    assert "India" in data["scope"]

def test_regions():
    response = client.get("/regions")
    assert response.status_code == 200
    data = response.json()
    assert data["country"] == "India"
    assert len(data["supported_regions"]) >= 4
    region_ids = [r["id"] for r in data["supported_regions"]]
    assert "assam" in region_ids
    assert "bihar" in region_ids
    assert "kerala" in region_ids

def test_events():
    response = client.get("/events")
    assert response.status_code == 200
    events = response.json()
    assert len(events) >= 4
    event_ids = [e["id"] for e in events]
    assert "assam_flood_2024" in event_ids
    assert "bihar_flood_2020" in event_ids
    assert "kerala_flood_2018" in event_ids

def test_predictions_valid():
    response = client.get("/predictions?event_id=assam_flood_2024&date=2024-07-02")
    assert response.status_code == 200
    data = response.json()
    assert data["event_id"] == "assam_flood_2024"
    assert data["date"] == "2024-07-02"
    assert "mean_risk" in data
    assert "raster_png_url" in data and data["raster_png_url"] is not None
    assert "bounds" in data and len(data["bounds"]) == 2

def test_risk_point_inside_assam():
    # Lat: 26.2N, Lon: 91.7E (Guwahati / Brahmaputra basin)
    response = client.get("/risk-point?lat=26.2&lon=91.7&event_id=assam_flood_2024&date=2024-07-02")
    assert response.status_code == 200
    data = response.json()
    assert data["in_study_region"] is True
    assert 0 <= data["risk_score"] <= 100
    assert data["features"] is not None
    assert "NDWI" in data["features"]
    assert "rain_3d_mm" in data["features"]

def test_risk_point_inside_bihar():
    # Lat: 25.6N, Lon: 85.1E (Patna / Gangetic basin)
    response = client.get("/risk-point?lat=25.6&lon=85.1&event_id=bihar_flood_2020&date=2020-07-27")
    assert response.status_code == 200
    data = response.json()
    assert data["in_study_region"] is True
    assert data["features"] is not None

def test_risk_point_inside_kerala():
    # Lat: 10.0N, Lon: 76.3E (Kochi / Periyar basin)
    response = client.get("/risk-point?lat=10.0&lon=76.3&event_id=kerala_flood_2018&date=2018-08-15")
    assert response.status_code == 200
    data = response.json()
    assert data["in_study_region"] is True
    assert data["features"] is not None

def test_risk_point_outside_india():
    # Coordinates in London (51.5N, -0.1W)
    response = client.get("/risk-point?lat=51.5&lon=-0.1")
    assert response.status_code == 200
    data = response.json()
    assert data["in_study_region"] is False
    assert data["risk_category"] == "UNSUPPORTED"
    assert "Out of India" in data["message"] or "India" in data["message"]

def test_risk_point_neighboring_countries():
    # Coordinates in Lahore (31.52N, 74.35E), Dhaka (23.81N, 90.41E), Kathmandu (27.71N, 85.32E)
    for lat, lon, city in [(31.52, 74.35, "Lahore"), (23.81, 90.41, "Dhaka"), (27.71, 85.32, "Kathmandu")]:
        response = client.get(f"/risk-point?lat={lat}&lon={lon}")
        assert response.status_code == 200
        data = response.json()
        assert data["in_study_region"] is False, f"Expected {city} to be outside India"
        assert data["risk_category"] == "UNSUPPORTED"

def test_timeline():
    response = client.get("/timeline?event_id=assam_flood_2024")
    assert response.status_code == 200
    timeline = response.json()
    assert len(timeline) >= 4
    assert timeline[0]["mean_risk"] <= timeline[-1]["mean_risk"]

def test_metrics():
    response = client.get("/metrics/assam_flood_2024")
    assert response.status_code == 200
    data = response.json()
    assert data["peak_spatial_iou"] > 0.5
    assert data["measured_earliest_critical_alert_lead_time_days"] >= 1

def test_model_metadata():
    response = client.get("/metadata/model")
    assert response.status_code == 200
    data = response.json()
    assert "RandomForest" in data["algorithm"]
    assert "slope" in data["feature_importances"]
