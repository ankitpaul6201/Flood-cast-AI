import React from 'react';
import { PieChart, ShieldCheck } from 'lucide-react';

export default function RiskOverviewCard({ currentRegion = 'india' }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between font-poppins h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
            <PieChart className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-tight">India-Wide Risk Overview</h3>
            <p className="text-[10px] text-slate-400 font-medium">Aggregated national spatial hazard breakdown</p>
          </div>
        </div>

        {/* Content Split: Exact Sovereign India SVG (from india-svgrepo-com) + Clean Donut Chart & Legend */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center mt-3">
          {/* Left: Authentic India Map SVG from india-svgrepo-com */}
          <div className="sm:col-span-5 flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-50/80 border border-slate-100">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg
                viewBox="0 0 512 512"
                className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
              >
                <defs>
                  <linearGradient id="indiaMapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dbeafe" />
                    <stop offset="50%" stopColor="#bfdbfe" />
                    <stop offset="100%" stopColor="#93c5fd" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Exact High-Resolution India Sovereign Boundary from india-svgrepo-com */}
                <path
                  d="M484.018,170.463l-15.984-23.539c-1.575-2.318-4.217-3.677-7.022-3.603l-30.985,0.811
                    c-2.672,0.07-5.143,1.433-6.627,3.655l-3.155,4.725L388.1,173.085c-2.135,1.367-3.521,3.641-3.757,6.165l-0.698,7.477h-12.474
                    l-24.531-19.986c-1.972-1.606-4.578-2.209-7.051-1.637c-2.478,0.574-4.55,2.26-5.616,4.569l-10.213,22.127l-97.731-41.722
                    l5.606-21.373c1.093-4.169-1.214-8.474-5.292-9.871l-8.112-2.78l-13.356-20.421l1.913-0.468c2.507-0.614,4.58-2.368,5.599-4.739
                    c1.021-2.371,0.87-5.082-0.408-7.325l-4.612-8.095l17.65-36.232c1.867-3.832,0.498-8.455-3.153-10.652l-15.863-9.55
                    c-1.407-0.847-3.029-1.258-4.679-1.167l-33.854,1.79L125.259,0.692c-2.436-1.068-5.244-0.893-7.53,0.476L94.983,14.785
                    c-2.257,1.35-3.731,3.699-3.968,6.319c-0.237,2.62,0.793,5.193,2.77,6.928l12.683,11.118l0.7,28.185
                    c0.049,1.99,0.819,3.894,2.165,5.361l20.845,22.699l-17.285,31.159c-0.653,1.176-1.006,2.492-1.031,3.837l-0.065,3.424
                    l-30.387,33.396l-15.409-4.936c-4.267-1.367-8.849,0.936-10.297,5.18l-8.483,24.879c-1.14,3.344-0.019,7.043,2.787,9.19
                    l4.37,3.344l11.122,22.763l0.083,4.961l-33.572,12.034c-3.112,1.116-5.253,3.985-5.438,7.287
                    c-0.184,3.302,1.626,6.392,4.594,7.847l10.272,5.032c-1.474,1.048-2.578,2.563-3.11,4.327c-0.714,2.361-0.331,4.919,1.044,6.967
                    l12.545,18.684c0.801,1.194,1.901,2.157,3.19,2.792l20.351,10.039c3.531,1.741,7.795,0.739,10.181-2.388l8.967-11.753
                    l4.829,11.443l-2.897,15.235c-0.28,1.47-0.152,2.988,0.366,4.391l67.375,182.103c1.18,3.189,4.314,5.372,7.716,5.372
                    c0.994,0,1.989-0.18,2.936-0.542l16.495-6.3c1.903-0.727,3.47-2.135,4.396-3.951l3.62-7.104l5.625-6.869l14.134-16.951
                    c0.916-1.099,1.53-2.419,1.78-3.828l7.456-41.929c0.24-1.346,0.14-2.73-0.291-4.028l-3.938-11.883l7.505-22.685l6.273-3.867
                    l7.845-0.926c2.266-0.268,4.32-1.463,5.669-3.304l9.725-13.256c3.284-1.371,7.145-2.423,9.787-4.883
                    c3.121-2.906,6.049-6.051,9.063-9.067c2.41-2.41,4.739-4.433,6.095-7.618c1.523-3.574,2.982-7.177,4.472-10.765l29.257-16.078
                    c2.315-1.273,3.878-3.578,4.203-6.2l1.432-11.569l10.941-8.369l14.679,2.924c2.791,0.555,5.678-0.373,7.622-2.456
                    c1.944-2.083,2.672-5.025,1.923-7.774l-13.987-51.376l17.169-7.117l11.792,7.705c1.083,0.708,2.317,1.15,3.603,1.291l8.712,0.957
                    l-9.762,14.434c-1.746,2.582-1.885,5.928-0.355,8.644c1.528,2.716,4.44,4.342,7.573,4.183l6.436-0.316l14.874,20.32
                    c1.961,2.68,5.34,3.92,8.572,3.137c3.228-0.78,5.671-3.427,6.193-6.707l4.051-25.518l6.909,1.324
                    c2.185,0.416,4.451-0.066,6.274-1.346c1.822-1.279,3.049-3.242,3.4-5.441l4.471-28.067l3.973-5.242
                    c0.86-1.135,1.411-2.474,1.598-3.886l0.67-5.043l24.203-8.41c2.722-0.946,4.75-3.246,5.348-6.065l2.839-13.395
                    C485.724,174.6,485.276,172.315,484.018,170.463z"
                  fill="url(#indiaMapGrad)"
                  stroke="#2563eb"
                  strokeWidth="8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-slate-700 mt-1 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-blue-600" />
              <span>Survey of India</span>
            </span>
          </div>

          {/* Right: Clean Donut Chart & Un-truncated Hazard Legend */}
          <div className="sm:col-span-7 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
            {/* Donut Chart with 18% High/Very High */}
            <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                {/* Low 56% (Green) */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <circle
                  cx="18" cy="18" r="14" fill="none"
                  stroke="#10b981" strokeWidth="4"
                  strokeDasharray="88, 100"
                  strokeDashoffset="0"
                />
                {/* Moderate 26% (Amber) */}
                <circle
                  cx="18" cy="18" r="14" fill="none"
                  stroke="#f59e0b" strokeWidth="4"
                  strokeDasharray="23, 100"
                  strokeDashoffset="-49"
                />
                {/* High 11% (Orange) */}
                <circle
                  cx="18" cy="18" r="14" fill="none"
                  stroke="#f97316" strokeWidth="4"
                  strokeDasharray="10, 100"
                  strokeDashoffset="-72"
                />
                {/* Very High 7% (Red) */}
                <circle
                  cx="18" cy="18" r="14" fill="none"
                  stroke="#dc2626" strokeWidth="4"
                  strokeDasharray="6, 100"
                  strokeDashoffset="-82"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-black text-slate-900 leading-none">18%</span>
                <span className="text-[7px] font-bold text-slate-400 mt-0.5">HIGH+</span>
              </div>
            </div>

            {/* Vertical Clean Legend Rows (No text overlap) */}
            <div className="flex-1 w-full space-y-1 text-xs">
              <div className="flex items-center justify-between text-[11px] font-medium">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0"></span>
                  <span className="text-slate-600">Very High</span>
                </span>
                <span className="font-bold font-mono text-slate-900">7%</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-medium">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></span>
                  <span className="text-slate-600">High</span>
                </span>
                <span className="font-bold font-mono text-slate-900">11%</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-medium">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                  <span className="text-slate-600">Moderate</span>
                </span>
                <span className="font-bold font-mono text-slate-900">26%</span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-medium">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <span className="text-slate-600">Low</span>
                </span>
                <span className="font-bold font-mono text-slate-900">56%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
