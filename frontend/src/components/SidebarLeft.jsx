import React from 'react';
import {
  Map as MapIcon,
  History,
  BarChart3,
  FileText,
  Settings,
  ChevronDown,
  CloudRain,
  Droplets,
  Mountain,
  Wind,
  Layers,
  MapPin,
  Check
} from 'lucide-react';
import { INDIAN_STATES_AND_UTS, DISTRICTS_BY_STATE } from '../data/indiaLocations';

export default function SidebarLeft({
  activeNavTab = 'map',
  setActiveNavTab,
  currentRegion = 'india',
  onSelectState,
  selectedDistrict = 'All Districts',
  onSelectDistrict,
  layersState,
  onToggleLayer,
  basemapStyle = 'osm',
  setBasemapStyle,
  onOpenMetrics,
  onOpenReports,
  onOpenSettings,
  onToggleHistoricalReplay
}) {
  const currentDistricts = DISTRICTS_BY_STATE[currentRegion] || DISTRICTS_BY_STATE['all'] || ['All Districts'];

  return (
    <aside className="w-full lg:w-72 shrink-0 bg-white border-r border-slate-200 p-4 flex flex-col space-y-5 overflow-y-auto max-h-[calc(100vh-4rem)] shadow-2xs font-poppins">
      {/* 1. Main Navigation Menu */}
      <nav className="space-y-1">
        <button
          onClick={() => setActiveNavTab('map')}
          className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeNavTab === 'map'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <MapIcon className="w-4 h-4 shrink-0" />
          <span>Map View</span>
        </button>

        <button
          onClick={() => {
            setActiveNavTab('replay');
            if (onToggleHistoricalReplay) onToggleHistoricalReplay();
          }}
          className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeNavTab === 'replay'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <History className="w-4 h-4 shrink-0" />
          <span>Historical Replay</span>
        </button>

        <button
          onClick={() => {
            setActiveNavTab('insights');
            if (onOpenMetrics) onOpenMetrics();
          }}
          className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeNavTab === 'insights'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4 shrink-0" />
          <span>Model Insights</span>
        </button>

        <button
          onClick={() => {
            setActiveNavTab('reports');
            if (onOpenReports) onOpenReports();
          }}
          className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeNavTab === 'reports'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4 shrink-0" />
          <span>Disaster Reports</span>
        </button>

        <button
          onClick={() => {
            setActiveNavTab('settings');
            if (onOpenSettings) onOpenSettings();
          }}
          className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeNavTab === 'settings'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span>Settings &amp; Docs</span>
        </button>
      </nav>

      <div className="h-px bg-slate-100" />

      {/* 2. Location View Selectors (ALL 28 States & 8 Union Territories) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Location View
          </h3>
          <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">
            36 States &amp; UTs
          </span>
        </div>

        {/* Country Selector */}
        <div className="relative">
          <div className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800">
            <span className="flex items-center space-x-2">
              <span className="text-sm">🇮🇳</span>
              <span>India</span>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
              National
            </span>
          </div>
        </div>

        {/* State / UT Selector (All 28 States & 8 UTs) */}
        <div className="relative">
          <select
            value={currentRegion === 'india' ? 'all' : currentRegion}
            onChange={(e) => onSelectState(e.target.value)}
            className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer pr-8 transition-colors"
          >
            <option value="all">🇮🇳 All India (National View)</option>
            <optgroup label="── 28 Indian States ──">
              {INDIAN_STATES_AND_UTS.filter(s => s.type === 'State').map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="── 8 Union Territories ──">
              {INDIAN_STATES_AND_UTS.filter(s => s.type === 'UT').map((ut) => (
                <option key={ut.id} value={ut.id}>
                  {ut.name}
                </option>
              ))}
            </optgroup>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* District / River Basin Selector */}
        <div className="relative">
          <select
            value={selectedDistrict}
            onChange={(e) => onSelectDistrict(e.target.value)}
            className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer pr-8 transition-colors"
          >
            {currentDistricts.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* 3. Layers Toggles */}
      <div className="space-y-2.5">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Layers
        </h3>

        <div className="space-y-1.5">
          {/* Flood Risk (Predicted) */}
          <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
            <span className="flex items-center space-x-2.5 text-xs font-medium text-slate-700">
              <span className="w-3.5 h-3.5 rounded bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 shadow-2xs shrink-0"></span>
              <span className="group-hover:text-slate-900">Flood Risk (Predicted)</span>
            </span>
            <input
              type="checkbox"
              checked={layersState.floodRisk}
              onChange={(e) => onToggleLayer('floodRisk', e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
          </label>

          {/* Observed Flood (Historical) */}
          <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
            <span className="flex items-center space-x-2.5 text-xs font-medium text-slate-700">
              <span className="w-3.5 h-3.5 rounded bg-blue-700 shadow-2xs shrink-0"></span>
              <span className="group-hover:text-slate-900">Observed Flood (Historical)</span>
            </span>
            <input
              type="checkbox"
              checked={layersState.observedFlood}
              onChange={(e) => onToggleLayer('observedFlood', e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
          </label>

          {/* Rainfall */}
          <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
            <span className="flex items-center space-x-2.5 text-xs font-medium text-slate-700">
              <CloudRain className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="group-hover:text-slate-900">Rainfall (Accumulation)</span>
            </span>
            <input
              type="checkbox"
              checked={layersState.rainfall}
              onChange={(e) => onToggleLayer('rainfall', e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
          </label>

          {/* NDWI */}
          <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
            <span className="flex items-center space-x-2.5 text-xs font-medium text-slate-700">
              <Droplets className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
              <span className="group-hover:text-slate-900">NDWI (Water Index)</span>
            </span>
            <input
              type="checkbox"
              checked={layersState.ndwi}
              onChange={(e) => onToggleLayer('ndwi', e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
          </label>

          {/* Elevation */}
          <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
            <span className="flex items-center space-x-2.5 text-xs font-medium text-slate-700">
              <Mountain className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="group-hover:text-slate-900">Elevation / DEM</span>
            </span>
            <input
              type="checkbox"
              checked={layersState.elevation}
              onChange={(e) => onToggleLayer('elevation', e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
          </label>

          {/* Wind / Weather */}
          <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
            <span className="flex items-center space-x-2.5 text-xs font-medium text-slate-700">
              <Wind className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span className="group-hover:text-slate-900">Wind / Weather</span>
            </span>
            <input
              type="checkbox"
              checked={layersState.windWeather}
              onChange={(e) => onToggleLayer('windWeather', e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
          </label>
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* 4. Map Style Selector Cards */}
      <div className="space-y-2.5">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Map Style
        </h3>

        <div className="grid grid-cols-3 gap-2">
          {/* Leaflet OSM */}
          <button
            onClick={() => setBasemapStyle('osm')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
              basemapStyle === 'osm'
                ? 'bg-blue-50/80 border-blue-600 text-blue-700 ring-2 ring-blue-500/20'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="w-full h-8 rounded-lg bg-blue-100/70 mb-1.5 overflow-hidden flex items-center justify-center text-[10px] text-blue-800 font-bold border border-blue-200">
              🗺️ Leaflet
            </div>
            <span className="text-[11px] font-semibold">Leaflet Map</span>
          </button>

          {/* Satellite */}
          <button
            onClick={() => setBasemapStyle('satellite')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
              basemapStyle === 'satellite'
                ? 'bg-blue-50/80 border-blue-600 text-blue-700 ring-2 ring-blue-500/20'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="w-full h-8 rounded-lg bg-slate-800 mb-1.5 overflow-hidden flex items-center justify-center text-[10px] text-white font-mono bg-cover bg-center" style={{ backgroundImage: 'radial-gradient(circle, #334155 10%, #0f172a 90%)' }}>
              🛰️
            </div>
            <span className="text-[11px] font-semibold">Satellite</span>
          </button>

          {/* Terrain */}
          <button
            onClick={() => setBasemapStyle('terrain')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
              basemapStyle === 'terrain'
                ? 'bg-blue-50/80 border-blue-600 text-blue-700 ring-2 ring-blue-500/20'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="w-full h-8 rounded-lg bg-emerald-900/60 mb-1.5 overflow-hidden flex items-center justify-center text-[10px] text-white font-mono bg-cover bg-center" style={{ backgroundImage: 'radial-gradient(circle, #15803d 10%, #14532d 90%)' }}>
              🏔️
            </div>
            <span className="text-[11px] font-semibold">Terrain</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
