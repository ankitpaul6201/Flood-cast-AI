import React, { useState } from 'react';
import {
  MapPin,
  X,
  CloudRain,
  Droplets,
  Mountain,
  Compass,
  ChevronRight,
  History,
  AlertTriangle,
  Clock,
  Globe,
  Cpu,
  CheckCircle
} from 'lucide-react';

export default function LocationDetailsPanel({
  inspectorData,
  isLoading,
  selectedCoordinate,
  currentRegion = 'all',
  selectedDistrict = 'All Districts',
  onClose,
  timeline = [],
  currentStepIndex = 0,
  isTargetedPredictionActive = false,
  onRunTargetedPrediction,
  onToggleHistoricalReplay
}) {
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  // Dynamic fallback data if no point clicked yet
  const defaultData = {
    latitude: selectedCoordinate?.lat ?? 26.20,
    longitude: selectedCoordinate?.lon ?? 92.80,
    state_region: selectedDistrict !== 'All Districts' ? selectedDistrict : 'India Study Basin',
    in_study_region: true,
    risk_score: 55,
    risk_category: 'MODERATE',
    prediction_date: timeline[currentStepIndex]?.date || 'Active Horizon',
    satellite_observation_time: 'Sentinel-2 L2A (Harmonized)',
    forecast_horizon: 'Next 7 days',
    features: {
      rain_7d_mm: 112.0,
      rain_3d_mm: 64.0,
      NDWI: 0.42,
      elevation_m: 65,
      slope_deg: 1.5,
      B3: 0.138,
      B4: 0.125,
      B8: 0.360,
      B11: 0.098
    }
  };

  const data = inspectorData || defaultData;
  const {
    latitude,
    longitude,
    state_region,
    in_study_region,
    risk_score,
    risk_category,
    prediction_date,
    features,
    message
  } = data;

  // Calculate circular stroke values for score
  const score = risk_score !== undefined ? risk_score : 78;
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (sc) => {
    if (sc >= 80) return { stroke: '#dc2626', badge: 'bg-red-50 text-red-700 border-red-200', text: 'Critical / Very High' };
    if (sc >= 60) return { stroke: '#f97316', badge: 'bg-orange-50 text-orange-700 border-orange-200', text: 'High' };
    if (sc >= 30) return { stroke: '#f59e0b', badge: 'bg-amber-50 text-amber-700 border-amber-200', text: 'Moderate' };
    return { stroke: '#10b981', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: 'Low' };
  };

  const scoreTheme = getScoreColor(score);

  // If clicked coordinate is out of India
  if (in_study_region === false) {
    return (
      <aside className="w-full lg:w-80 shrink-0 bg-white border-l border-slate-200 p-5 flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-4rem)] shadow-2xs font-poppins">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-amber-100">
            <div className="flex items-center space-x-2 text-amber-600">
              <Globe className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Geographic Boundary</h3>
            </div>
            {onClose && (
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="my-5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-amber-900">Out of India</h4>
            <p className="text-xs text-amber-800 font-medium leading-relaxed">
              {message || 'Flood data is only available for India.'}
            </p>
            <p className="text-[11px] text-amber-700/80 leading-normal pt-1">
              Our Sentinel-2 satellite data ingestion, terrain elevation, and ML models are calibrated specifically for India.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono flex items-center justify-between">
          <span>Coordinate:</span>
          <span className="font-semibold text-slate-700">{latitude?.toFixed(4)}°N, {longitude?.toFixed(4)}°E</span>
        </div>
      </aside>
    );
  }

  // Generate 7-day risk trend points
  const trendDays = ['May 14', 'May 15', 'May 16', 'May 17', 'May 18', 'May 19', 'May 20'];
  const trendScores = [
    Math.max(15, score - 45),
    Math.max(20, score - 38),
    Math.max(25, score - 30),
    Math.max(35, score - 20),
    Math.max(48, score - 12),
    Math.max(65, score - 4),
    score
  ];

  return (
    <aside className="w-full lg:w-80 shrink-0 bg-white border-l border-slate-200 p-4 sm:p-5 flex flex-col space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)] shadow-2xs font-poppins">
      {/* 1. Header: Location Details + Close */}
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center space-x-1.5 text-slate-700">
            <MapPin className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold text-slate-900 tracking-tight">Location Details</h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Region & Coordinates */}
        <div className="mt-2.5">
          <h3 className="text-sm font-bold text-slate-900 leading-tight">
            {state_region || 'Varanasi, Uttar Pradesh'}
          </h3>
          <p className="text-[11px] font-mono text-slate-400 font-medium mt-0.5">
            {latitude?.toFixed(4)}° N, {longitude?.toFixed(4)}° E
          </p>
        </div>

        {/* Targeted Prediction Button */}
        <div className="mt-3">
          <button
            onClick={() => onRunTargetedPrediction && onRunTargetedPrediction(selectedCoordinate)}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer group"
          >
            <Cpu className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
            <span>Run Prediction on Selected Area</span>
          </button>
          {isTargetedPredictionActive && (
            <p className="text-[10px] text-emerald-600 font-semibold text-center mt-1 flex items-center justify-center space-x-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>Targeted Area Prediction Active</span>
            </p>
          )}
        </div>
      </div>

      {/* 2. Flood Risk Score Radial Gauge Card */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between shadow-2xs">
        {/* Radial SVG Gauge */}
        <div className="relative w-22 h-22 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
            <circle
              cx="45" cy="45" r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="7"
            />
            <circle
              cx="45" cy="45" r={radius}
              fill="none"
              stroke={scoreTheme.stroke}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-black text-slate-900 leading-none">{score}</span>
            <span className="text-[9px] font-semibold text-slate-400 mt-0.5">/100</span>
          </div>
        </div>

        {/* Score Title & Badge */}
        <div className="flex-1 pl-3.5 space-y-1.5">
          <div className="text-xs font-bold text-slate-700">Flood Risk Score</div>
          <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full border ${scoreTheme.badge}`}>
            {risk_category || scoreTheme.text}
          </span>
        </div>
      </div>

      {/* 3. Prediction Metadata Grid */}
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center justify-between py-1 border-b border-slate-100">
          <span className="text-slate-500 font-medium">Risk Level</span>
          <span className="font-semibold text-slate-800">{risk_category || 'High'}</span>
        </div>
        <div className="flex items-center justify-between py-1 border-b border-slate-100">
          <span className="text-slate-500 font-medium">Predicted Date</span>
          <span className="font-semibold text-slate-800">{prediction_date || 'May 20, 2025'}</span>
        </div>
        <div className="flex items-center justify-between py-1 border-b border-slate-100">
          <span className="text-slate-500 font-medium">Satellite Data (Latest)</span>
          <span className="font-semibold text-slate-800">May 18, 2025</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-slate-500 font-medium">Forecast Horizon</span>
          <span className="font-semibold text-slate-800">Next 7 days</span>
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* 4. Key Environmental Factors */}
      <div className="space-y-2">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Key Environmental Factors
        </h4>

        <div className="space-y-2">
          {/* Rainfall 7 days */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-700">
              <CloudRain className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Rainfall (7 days)</span>
            </div>
            <span className="text-xs font-bold font-mono text-slate-900">
              {features?.rain_7d_mm ?? 142} mm
            </span>
          </div>

          {/* NDWI */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-700">
              <Droplets className="w-4 h-4 text-cyan-500 shrink-0" />
              <span>NDWI (Water Index)</span>
            </div>
            <span className="text-xs font-bold font-mono text-slate-900">
              {features?.NDWI ?? 0.52}
            </span>
          </div>

          {/* Elevation */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-700">
              <Mountain className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Elevation</span>
            </div>
            <span className="text-xs font-bold font-mono text-slate-900">
              {features?.elevation_m ?? 78} m
            </span>
          </div>

          {/* Slope */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-700">
              <Compass className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>Slope</span>
            </div>
            <span className="text-xs font-bold font-mono text-slate-900">
              {features?.slope_deg ?? 1.2}°
            </span>
          </div>
        </div>

        {/* View More Details Collapsible */}
        <button
          onClick={() => setShowMoreDetails(!showMoreDetails)}
          className="w-full flex items-center justify-between text-xs font-semibold text-blue-600 hover:text-blue-700 pt-1 cursor-pointer"
        >
          <span>{showMoreDetails ? 'Hide Details' : 'View More Details'}</span>
          <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${showMoreDetails ? 'rotate-90' : ''}`} />
        </button>

        {showMoreDetails && features && (
          <div className="grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200 text-center font-mono text-[10px] mt-2">
            <div className="bg-white border border-slate-200 rounded p-1">
              <span className="text-slate-400 block text-[9px]">B3 (Grn)</span>
              <span className="font-bold text-slate-700">{features.B3 ?? 0.14}</span>
            </div>
            <div className="bg-white border border-slate-200 rounded p-1">
              <span className="text-slate-400 block text-[9px]">B4 (Red)</span>
              <span className="font-bold text-slate-700">{features.B4 ?? 0.13}</span>
            </div>
            <div className="bg-white border border-slate-200 rounded p-1">
              <span className="text-slate-400 block text-[9px]">B8 (NIR)</span>
              <span className="font-bold text-slate-700">{features.B8 ?? 0.38}</span>
            </div>
            <div className="bg-white border border-slate-200 rounded p-1">
              <span className="text-slate-400 block text-[9px]">B11 (SWIR)</span>
              <span className="font-bold text-slate-700">{features.B11 ?? 0.09}</span>
            </div>
          </div>
        )}
      </div>

      <div className="h-px bg-slate-100" />

      {/* 5. Risk Trend (Last 7 Days) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Risk Trend (Last 7 Days)
          </h4>
          <span className="text-[10px] font-mono text-slate-400">Score 0–100</span>
        </div>

        {/* SVG Trend Chart */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <svg viewBox="0 0 240 70" className="w-full h-16 overflow-visible">
            {/* Grid horizontal line */}
            <line x1="0" y1="15" x2="240" y2="15" stroke="#e2e8f0" strokeDasharray="2,2" />
            <line x1="0" y1="40" x2="240" y2="40" stroke="#e2e8f0" strokeDasharray="2,2" />
            
            {/* Gradient fill below curve */}
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* SVG Path Curve */}
            <path
              d="M 10 52 Q 45 50 80 44 T 150 28 T 230 12 L 230 65 L 10 65 Z"
              fill="url(#trendGradient)"
            />
            <path
              d="M 10 52 Q 45 50 80 44 T 150 28 T 230 12"
              fill="none"
              stroke="#f97316"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Data Points */}
            {[
              { x: 10, y: 52 },
              { x: 45, y: 50 },
              { x: 80, y: 44 },
              { x: 118, y: 38 },
              { x: 155, y: 28 },
              { x: 192, y: 18 },
              { x: 230, y: 12 }
            ].map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r={i === 6 ? 4.5 : 3}
                fill={i === 6 ? '#dc2626' : '#f97316'}
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          {/* Day labels below chart */}
          <div className="flex justify-between text-[8px] font-mono text-slate-400 mt-1 px-1">
            {trendDays.map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Primary CTA Button: View Historical Replay */}
      <button
        onClick={onToggleHistoricalReplay}
        className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
      >
        <History className="w-4 h-4" />
        <span>View Historical Replay</span>
      </button>
    </aside>
  );
}
