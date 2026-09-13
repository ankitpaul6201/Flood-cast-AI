import React from 'react';

export default function RiskLegend() {
  const levels = [
    { label: 'Low', range: '0–30', color: 'bg-emerald-500', desc: 'Minimal surface runoff' },
    { label: 'Moderate', range: '30–60', color: 'bg-amber-400', desc: 'Precipitation buildup' },
    { label: 'High', range: '60–80', color: 'bg-orange-500', desc: 'Catchment saturation' },
    { label: 'Very High / Critical', range: '80–100', color: 'bg-red-600', desc: 'Severe inundation zone' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 font-poppins">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Flood Risk Score (0–100)
        </h4>
        <span className="text-[10px] text-slate-400 font-medium">
          Continuous Spatial Color Scale
        </span>
      </div>

      {/* Smooth Gradient Visual Bar */}
      <div className="space-y-1">
        <div className="w-full h-3 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-400 via-orange-500 to-red-600 shadow-inner"></div>
        <div className="flex justify-between text-[10px] font-mono text-slate-400 font-semibold px-0.5">
          <span>0 (Low)</span>
          <span>30 (Moderate)</span>
          <span>60 (High)</span>
          <span>100 (Critical)</span>
        </div>
      </div>

      {/* Risk Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {levels.map((lvl) => (
          <div key={lvl.label} className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 flex flex-col">
            <div className="flex items-center space-x-1.5 mb-1">
              <span className={`w-2.5 h-2.5 rounded-full ${lvl.color} shrink-0`}></span>
              <span className="text-xs font-bold text-slate-800">{lvl.label}</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 font-semibold">{lvl.range}</span>
            <span className="text-[9px] text-slate-400 leading-tight mt-0.5">{lvl.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
