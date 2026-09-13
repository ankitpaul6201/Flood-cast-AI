import React from 'react';
import { X, CheckCircle, ShieldAlert, Cpu, Clock, Layers, BookOpen } from 'lucide-react';

export default function ScientificInfoModal({ isOpen, onClose, modelMetadata }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Scientific Integrity &amp; Model Architecture</h3>
              <p className="text-xs text-slate-500">India-Wide FloodCast AI Calibration Principles</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs text-slate-600 leading-relaxed">
          {/* Section 1: Geographic Scope & Baseline Model */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-800 flex items-center space-x-1.5 text-xs">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>India-Wide Scope &amp; Machine Learning Baseline</span>
            </h4>
            <p>
              FloodCast AI is trained across representative Indian flood-prone hydrological basins (Brahmaputra, Gangetic plains, Western Ghats, Mahanadi delta, and Krishna/Konkan rivers). The baseline engine uses a calibrated <strong>Random Forest Classifier (120 estimators)</strong> mapping 10-dimensional environmental and spectral features to a 0–100 uncalibrated Flood Risk Score.
            </p>
          </div>

          {/* Section 2: Zero Future Temporal Leakage Rule */}
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 space-y-1.5">
            <h4 className="font-bold text-emerald-800 flex items-center space-x-1.5 text-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Zero Future Temporal Leakage Assertion</span>
            </h4>
            <p className="text-emerald-700">
              For any prediction generated at timestamp <em>t</em>, the model strictly ingests observations available <strong>prior to or at <em>t</em></strong> (Sentinel-2 SR bands $B3, B4, B8, B11$, NDWI, and 1d/3d/7d cumulative CHIRPS precipitation). Zero future images, future rainfall forecasts, or post-event masks enter the feature vector.
            </p>
          </div>

          {/* Section 3: Satellite Lag vs Forecast Horizon */}
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-800 flex items-center space-x-1.5 text-xs">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Distinction: Satellite Ingestion Lag vs. Forecast Horizon</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div className="font-semibold text-slate-800 mb-0.5">Satellite Lag (~1.2 hrs)</div>
                <p className="text-[11px] text-slate-500">
                  The physical delay between satellite sensor orbit pass, downlink, atmospheric correction, and raster ingestion.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div className="font-semibold text-slate-800 mb-0.5">Forecast Horizon (T-7 to T-1)</div>
                <p className="text-[11px] text-slate-500">
                  How far ahead the model projects spatial inundation risk relative to historical flood peak events.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Feature Importance Breakdown */}
          {modelMetadata?.feature_importances && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 flex items-center space-x-1.5 text-xs">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Feature Importance Weights</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {Object.entries(modelMetadata.feature_importances).map(([feat, weight]) => (
                  <div key={feat} className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                    <span className="text-[10px] text-slate-400 font-semibold block">{feat}</span>
                    <span className="text-xs font-mono font-bold text-slate-700">{(weight * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
