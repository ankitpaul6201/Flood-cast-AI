import React from 'react';
import { Waves, Calendar, ChevronDown, BarChart3, Info, Globe, History, AlertTriangle } from 'lucide-react';

export default function Header({
  events = [],
  selectedEventId,
  onSelectEvent,
  timeline = [],
  currentStepIndex = 0,
  onSelectStep,
  onOpenMetrics,
  onOpenInfo,
  onOpenDisasters,
  onResetIndiaView,
  selectedDisasterName
}) {
  const currentStep = timeline[currentStepIndex];
  const currentDateFormatted = currentStep?.date
    ? new Date(currentStep.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'May 20, 2025';

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs font-poppins">
      <div className="w-full px-4 sm:px-6 lg:px-7">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onResetIndiaView}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">
                  FloodCast India
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hidden md:inline">
                  India-Wide Spatial Prediction
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Satellite-Based Flood Risk &amp; Inundation Forecasting
              </p>
            </div>
          </div>

          {/* Right: Previous Flood Disasters Catalog (2000–2026), Date Selector & Model Insights */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* 1. PREVIOUS FLOOD DISASTERS (2000–2026) BUTTON */}
            <button
              onClick={onOpenDisasters}
              title="Browse all major flood disasters in India from 2000 to 2026"
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer group"
            >
              <History className="w-4 h-4 text-blue-100 group-hover:rotate-[-30deg] transition-transform" />
              <span className="tracking-tight">Previous Flood Disasters (2000–2026)</span>
              <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded-md font-mono">
                16 Events
              </span>
            </button>

            {/* 2. Timeline / Forecast Date Selector */}
            <div className="relative flex items-center bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl px-3 py-1.5 transition-colors cursor-pointer group shadow-2xs">
              <Calendar className="w-4 h-4 text-slate-500 mr-2 shrink-0 group-hover:text-blue-600 transition-colors" />
              <div className="flex items-center space-x-1">
                <span className="text-xs font-semibold text-slate-800">
                  {currentDateFormatted}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>

              {/* Native Dropdown overlay for timeline switching */}
              {timeline.length > 0 && (
                <select
                  value={currentStepIndex}
                  onChange={(e) => onSelectStep(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  title="Select Forecast Horizon Date"
                >
                  {timeline.map((step, idx) => (
                    <option key={step.date} value={idx}>
                      {new Date(step.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} ({step.horizon || `T-${timeline.length - idx}`})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* 3. Validation Insights */}
            <button
              onClick={onOpenMetrics}
              title="View Model Validation Metrics"
              className="hidden lg:inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>Model Insights</span>
            </button>

            {/* 4. Scientific Audit / Methodology */}
            <button
              onClick={onOpenInfo}
              title="View Scientific Methodology"
              className="hidden xl:inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              <Info className="w-4 h-4 text-slate-600" />
              <span>Methodology</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
