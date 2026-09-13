import React, { useEffect } from 'react';
import { MapContainer, TileLayer, ImageOverlay, CircleMarker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Plus, Minus, Compass, AlertTriangle } from 'lucide-react';

// Fix default leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

import { STATE_CENTERS } from '../data/indiaLocations';

// Strict Map Bounding Box for India Viewport
const INDIA_MAP_BOUNDS = [
  [6.0, 67.0],  // Southwest corner
  [38.0, 98.0]  // Northeast corner
];

function MapClickHandler({ onSelectCoordinate }) {
  useMapEvents({
    click(e) {
      onSelectCoordinate(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function MapViewController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

// Custom On-Map Zoom & Control Component
function CustomMapControls({ onResetIndia }) {
  const map = useMap();
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-1.5">
      <button
        onClick={() => map.zoomIn()}
        className="w-8 h-8 rounded-xl bg-white/95 hover:bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center transition-all cursor-pointer"
        title="Zoom In"
      >
        <Plus className="w-4 h-4" />
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="w-8 h-8 rounded-xl bg-white/95 hover:bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center transition-all cursor-pointer"
        title="Zoom Out"
      >
        <Minus className="w-4 h-4" />
      </button>
      <button
        onClick={onResetIndia}
        className="w-8 h-8 rounded-xl bg-white/95 hover:bg-white text-blue-600 shadow-md border border-slate-200 flex items-center justify-center transition-all cursor-pointer"
        title="Center India View"
      >
        <Compass className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function MapViewer({
  currentRegion = 'india',
  predictionData,
  observedData,
  showPredictionLayer = true,
  showObservedLayer = false,
  selectedCoordinate,
  onSelectCoordinate,
  inspectorData,
  basemapStyle = 'osm',
  onResetIndiaView
}) {
  const activeRegionConfig = STATE_CENTERS[currentRegion] || STATE_CENTERS['all'];

  const getTileConfig = () => {
    if (basemapStyle === 'satellite') {
      return {
        base: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        reference: 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics',
        maxZoom: 18,
      };
    }
    if (basemapStyle === 'terrain') {
      return {
        base: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
        reference: null,
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 17,
      };
    }
    if (basemapStyle === 'light') {
      return {
        base: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        reference: null,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      };
    }
    // Default: Clean Standard Leaflet OpenStreetMap
    return {
      base: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      reference: null,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    };
  };

  const tileConfig = getTileConfig();
  const predictionBounds = predictionData?.bounds;
  const observedBounds = observedData?.bounds || predictionBounds;

  return (
    <div className="relative w-full h-full min-h-[440px] lg:min-h-[520px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-xs font-poppins">
      <MapContainer
        center={activeRegionConfig.center}
        zoom={activeRegionConfig.zoom}
        className="w-full h-full z-10"
        zoomControl={false}
        minZoom={4.5}
        maxZoom={14}
        maxBounds={INDIA_MAP_BOUNDS}
        maxBoundsViscosity={1.0}
      >
        {/* Base Map Tiles */}
        <TileLayer
          key={`base-${basemapStyle}`}
          attribution={tileConfig.attribution}
          url={tileConfig.base}
          maxZoom={tileConfig.maxZoom}
        />

        {/* English Reference Labels Layer (Satellite mode) */}
        {tileConfig.reference && (
          <TileLayer
            key={`ref-${basemapStyle}`}
            url={tileConfig.reference}
            maxZoom={tileConfig.maxZoom}
            pane="shadowPane"
          />
        )}

        <MapClickHandler onSelectCoordinate={onSelectCoordinate} />
        <MapViewController
          center={selectedCoordinate ? [selectedCoordinate.lat, selectedCoordinate.lon] : activeRegionConfig.center}
          zoom={activeRegionConfig.zoom || 7}
        />
        <CustomMapControls onResetIndia={onResetIndiaView} />

        {/* 1. CONTINUOUS MODEL PREDICTED SPATIAL RISK RASTER OVERLAY */}
        {showPredictionLayer && predictionData?.raster_png_url && predictionBounds && (
          <ImageOverlay
            key={`pred-raster-${predictionData.event_id}-${predictionData.date}`}
            url={predictionData.raster_png_url}
            bounds={predictionBounds}
            opacity={0.88}
            interactive={false}
          />
        )}

        {/* 2. CONTINUOUS OBSERVED HISTORICAL FLOOD EXTENT OVERLAY (Cobalt Blue Mask) */}
        {showObservedLayer && observedData?.observed_png_url && observedBounds && (
          <ImageOverlay
            key={`obs-raster-${observedData.event_id}`}
            url={observedData.observed_png_url}
            bounds={observedBounds}
            opacity={0.82}
            interactive={false}
          />
        )}

        {/* Clicked / Active Coordinate Pin Marker & Interactive Popup */}
        {selectedCoordinate && (
          <CircleMarker
            center={[selectedCoordinate.lat, selectedCoordinate.lon]}
            radius={9}
            pathOptions={{
              color: inspectorData?.in_study_region === false ? '#d97706' : '#2563eb',
              weight: 3,
              fillColor: '#ffffff',
              fillOpacity: 0.95,
            }}
          >
            <Popup className="clean-popup" autoPan={false}>
              <div className="p-1.5 max-w-[220px]">
                {inspectorData?.in_study_region === false ? (
                  <div>
                    <div className="flex items-center space-x-1 text-amber-600 font-bold text-[10px] uppercase tracking-wider mb-1">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>Out of India</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-800 leading-snug">
                      Only data available for India
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1">
                      {selectedCoordinate.lat.toFixed(4)}°N, {selectedCoordinate.lon.toFixed(4)}°E
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {inspectorData?.state_region || 'India'}
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      Risk Score: {inspectorData?.risk_score ?? '--'}/100
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {selectedCoordinate.lat.toFixed(4)}°N, {selectedCoordinate.lon.toFixed(4)}°E
                    </div>
                  </div>
                )}
              </div>
            </Popup>
          </CircleMarker>
        )}
      </MapContainer>

      {/* Floating Flood Risk Level Legend */}
      <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-3 shadow-md min-w-[180px] font-poppins">
        <h4 className="text-[11px] font-bold text-slate-800 mb-1.5">Flood Risk Score (0–100)</h4>
        
        {/* Continuous Color Gradient Bar */}
        <div className="w-full h-2.5 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 via-orange-500 to-red-600 mb-2 shadow-xs" />
        
        <div className="space-y-1 text-[10px]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500 shrink-0"></span>
            <span className="font-mono text-slate-500">0 – 30</span>
            <span className="text-slate-700 font-medium ml-auto">Low</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded bg-amber-400 shrink-0"></span>
            <span className="font-mono text-slate-500">30 – 60</span>
            <span className="text-slate-700 font-medium ml-auto">Moderate</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded bg-orange-500 shrink-0"></span>
            <span className="font-mono text-slate-500">60 – 80</span>
            <span className="text-slate-700 font-medium ml-auto">High</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded bg-red-600 shrink-0"></span>
            <span className="font-mono text-slate-500">80 – 100</span>
            <span className="text-slate-700 font-medium ml-auto">Very High</span>
          </div>
        </div>
      </div>

      {/* Scale bar indicator */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-xs border border-slate-200 rounded-lg px-2.5 py-1 text-[10px] text-slate-600 font-mono shadow-2xs flex items-center space-x-2">
        <span className="w-8 border-b-2 border-slate-700 inline-block"></span>
        <span>0 &nbsp; 250 &nbsp; 500 &nbsp; 1,000 km</span>
      </div>
    </div>
  );
}
