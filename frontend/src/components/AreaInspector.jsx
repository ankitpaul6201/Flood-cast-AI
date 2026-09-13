import React from 'react';
import { Target, CloudRain, Mountain, Droplets, Clock, AlertTriangle, MapPin, Globe } from 'lucide-react';

export default function AreaInspector({
  inspectorData,
  isLoading
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-center min-h-[340px]">
        <div className="text-center text-slate-400">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-xs font-medium">Extracting cell features...</p>
        </div>
      </div>
    );
  }

  if (!inspectorData) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-center min-h-[340px] text-center">
        <div className="max-w-xs">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
            <Target className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-semibold text-slate-800 mb-1">Click Map to Inspect Cell</h4>
          <p className="text-xs text-slate-500">
            Select any location across India to view its spatial flood risk score, Sentinel-2 spectral indices, NDWI, and rainfall aggregates.
          </p>
        </div>
      </div>
    );
  }

  const {
    latitude,
    longitude,
    in_study_region,
    state_region,
    risk_score,
    risk_category,
    prediction_date,
    prediction_time,
    satellite_observation_time,
    data_lag_hours,
    features,
    message
  } = inspectorData;

  // Render when selected coordinate is outside India
  if (!in_study_region) {
    return (
      <div className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-xs flex flex-col justify-between min-h-[340px]">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-amber-100">
            <div className="flex items-center space-x-1.5 text-amber-600">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Geographic Boundary</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
              OUT OF INDIA
            </span>
          </div>

          <div className="my-5 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-amber-900">
              Out of India
            </h4>
            <p className="text-xs text-amber-800 font-medium leading-relaxed">
              {message || 'Flood data is only available for India.'}
            </p>
            <p className="text-[11px] text-amber-700/80 leading-normal pt-1">
              Sentinel-2 satellite features, precipitation accumulation, and machine learning models are exclusively calibrated across Indian territory.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono flex items-center justify-between">
          <span>Coordinate:</span>
          <span className="font-semibold text-slate-700">{latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E</span>
        </div>
      </div>
    );
  }

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'CRITICAL':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'HIGH':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'MODERATE':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header with Coordinates, Region & Risk Category */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{state_region || 'India'} &bull; CELL INSPECTOR</span>
            </div>
            <div className="text-xs font-mono font-medium text-slate-700">
              {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E
            </div>
          </div>

          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getCategoryBadgeClass(risk_category)}`}>
            {risk_category} RISK
          </span>
        </div>

        {/* Risk Score Highlight */}
        <div className="my-4 flex items-baseline justify-between bg-slate-50/80 rounded-xl p-3 border border-slate-100">
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {risk_score}<span className="text-sm text-slate-400 font-semibold">/100</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Model Estimated Flood Score</div>
          </div>
          <div className="text-right text-[10px] text-slate-400">
            <div>Date: <span className="font-semibold text-slate-700">{prediction_date}</span></div>
            <div>Data Lag: <span className="font-semibold text-slate-700">{data_lag_hours} hrs</span></div>
          </div>
        </div>

        {/* Dynamic Features List */}
        {features && (
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Environmental & Spectral Inputs
            </div>

            {/* NDWI */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 flex items-center space-x-1.5">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>NDWI (Water Index)</span>
                </span>
                <span className="font-mono font-semibold text-slate-800">{features.NDWI}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${Math.max(0, Math.min(100, (features.NDWI + 1) * 50))}%` }}
                ></div>
              </div>
            </div>

            {/* Rainfall 3d / 7d */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 flex items-center space-x-1.5">
                  <CloudRain className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Rainfall (3-Day / 7-Day)</span>
                </span>
                <span className="font-mono font-semibold text-slate-800">
                  {features.rain_3d_mm} mm / {features.rain_7d_mm} mm
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full"
                  style={{ width: `${Math.min(100, (features.rain_3d_mm / 350) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Elevation & Slope */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 flex items-center space-x-1.5">
                  <Mountain className="w-3.5 h-3.5 text-amber-500" />
                  <span>Terrain (Elevation / Slope)</span>
                </span>
                <span className="font-mono font-semibold text-slate-800">
                  {features.elevation_m} m / {features.slope_deg}°
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${Math.max(5, Math.min(100, (features.elevation_m / 250) * 100))}%` }}
                ></div>
              </div>
            </div>

            {/* Spectral Bands Mini Badges */}
            <div className="pt-1">
              <div className="text-[10px] text-slate-400 font-semibold mb-1.5">Sentinel-2 SR Reflectance:</div>
              <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[10px]">
                <div className="bg-slate-50 border border-slate-200 rounded p-1">
                  <span className="text-slate-400 block text-[9px]">B3 (Green)</span>
                  <span className="font-bold text-slate-700">{features.B3}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded p-1">
                  <span className="text-slate-400 block text-[9px]">B4 (Red)</span>
                  <span className="font-bold text-slate-700">{features.B4}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded p-1">
                  <span className="text-slate-400 block text-[9px]">B8 (NIR)</span>
                  <span className="font-bold text-slate-700">{features.B8}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded p-1">
                  <span className="text-slate-400 block text-[9px]">B11 (SWIR)</span>
                  <span className="font-bold text-slate-700">{features.B11}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Timestamps */}
      <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Pred: {prediction_time?.slice(0, 16).replace('T', ' ')}Z</span>
        </div>
        <div className="text-slate-500 font-medium">Model v1.0.0 (India)</div>
      </div>
    </div>
  );
}
