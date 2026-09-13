import React from 'react';
import { AlertTriangle, BellRing, Info, ShieldAlert } from 'lucide-react';

export default function AlertBanner({
  stepInfo,
  eventInfo,
  criticalCellCount = 0
}) {
  if (!stepInfo) return null;

  const isCritical = stepInfo.lead_time_days <= 2 || criticalCellCount > 150;
  const isHigh = stepInfo.lead_time_days <= 5;

  if (!isHigh && !isCritical) {
    return (
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-blue-900">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>Pre-Surge Advisory:</strong> Early catchment monitoring active for Assam Brahmaputra & Barak basins ({stepInfo.lead_time_days} days to historical peak).
          </span>
        </div>
        <span className="font-semibold text-blue-700 hidden sm:inline">Baseline Monitoring</span>
      </div>
    );
  }

  return (
    <div className={`rounded-xl px-4 py-2.5 flex items-center justify-between text-xs border ${
      isCritical
        ? 'bg-red-50/80 border-red-200 text-red-900'
        : 'bg-orange-50/80 border-orange-200 text-orange-900'
    }`}>
      <div className="flex items-center space-x-2">
        {isCritical ? (
          <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0" />
        )}
        <span>
          <strong>{isCritical ? 'Critical Inundation Alert:' : 'High Flood Risk Alert:'}</strong>{' '}
          Model detected severe risk concentration in low-lying floodplain cells ({criticalCellCount} critical zones detected).
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`px-2 py-0.5 rounded-md font-bold uppercase text-[10px] ${
          isCritical ? 'bg-red-600 text-white' : 'bg-orange-600 text-white'
        }`}>
          {stepInfo.lead_time_days > 0 ? `T-${stepInfo.lead_time_days} Early Warning` : 'Peak Inundation'}
        </span>
      </div>
    </div>
  );
}
