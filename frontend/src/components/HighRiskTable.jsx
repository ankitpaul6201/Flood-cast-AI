import React from 'react';
import { AlertTriangle, MapPin, Cpu, CheckCircle } from 'lucide-react';

const REGIONAL_AFFECTED_AREAS = {
  assam: [
    { id: 'barpeta', location: 'Barpeta Downstream Plains', state: 'Assam', channel: 'Brahmaputra / Manas', lat: 26.32, lon: 91.00, score: 96, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'silchar', location: 'Silchar Urban & Rural Basin', state: 'Assam', channel: 'Barak River', lat: 24.83, lon: 92.77, score: 95, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'dhubri', location: 'Dhubri Border Inundation Zone', state: 'Assam', channel: 'Brahmaputra / Gadadhar', lat: 26.02, lon: 89.98, score: 94, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'kamrup', location: 'Kamrup & Guwahati Floodplains', state: 'Assam', channel: 'Brahmaputra / Digaru', lat: 26.18, lon: 91.75, score: 88, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'morigaon', location: 'Morigaon Low-Lying Wetlands', state: 'Assam', channel: 'Kopili / Kolong', lat: 26.25, lon: 92.34, score: 86, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'nagaon', location: 'Nagaon Kopili Tributary Basin', state: 'Assam', channel: 'Kopili River', lat: 26.35, lon: 92.68, score: 74, level: 'High', levelColor: 'bg-orange-50 text-orange-700 border-orange-200' },
    { id: 'dhemaji', location: 'Dhemaji Flash Surge Basin', state: 'Assam', channel: 'Subansiri / Jiadhal', lat: 27.48, lon: 94.58, score: 68, level: 'High', levelColor: 'bg-orange-50 text-orange-700 border-orange-200' },
    { id: 'tezpur', location: 'Tezpur Semi-Elevated Catchment', state: 'Assam', channel: 'Brahmaputra Upper Bank', lat: 26.63, lon: 92.80, score: 45, level: 'Moderate', levelColor: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'guwahati_ridge', location: 'Guwahati North Foothill Ridge', state: 'Assam', channel: 'High Ground Buffer', lat: 26.22, lon: 91.70, score: 18, level: 'Low', levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'manas_terrace', location: 'Manas Upper Safety Terrace', state: 'Assam', channel: 'Manas Uplands', lat: 26.55, lon: 90.95, score: 14, level: 'Low', levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  ],
  bihar: [
    { id: 'kosi_paleo', location: 'Kosi Active Paleochannel', state: 'Bihar', channel: 'Kosi River', lat: 25.85, lon: 86.85, score: 95, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'gandak', location: 'Gandak Embankment Floodplains', state: 'Bihar', channel: 'Gandak River', lat: 26.47, lon: 84.44, score: 92, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'bagmati', location: 'Bagmati Lowland Basin', state: 'Bihar', channel: 'Bagmati River', lat: 26.12, lon: 85.39, score: 89, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'darbhanga', location: 'Darbhanga Inundation Zone', state: 'Bihar', channel: 'Kamla Balan', lat: 26.15, lon: 85.89, score: 87, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'supaul', location: 'Supaul & Madhepura Plains', state: 'Bihar', channel: 'Kosi Eastern Canal', lat: 26.12, lon: 86.60, score: 72, level: 'High', levelColor: 'bg-orange-50 text-orange-700 border-orange-200' },
    { id: 'patna_ganga', location: 'Patna Gangetic Confluence', state: 'Bihar', channel: 'Ganga / Son Rivers', lat: 25.61, lon: 85.14, score: 55, level: 'Moderate', levelColor: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'gaya_uplands', location: 'Gaya Falgu Raised Ridge', state: 'Bihar', channel: 'Falgu Buffer Zone', lat: 24.79, lon: 85.00, score: 22, level: 'Low', levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'rajgir_terrace', location: 'Rajgir Hills Safety Terrace', state: 'Bihar', channel: 'High Plateau', lat: 25.03, lon: 85.42, score: 12, level: 'Low', levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  ],
  kerala: [
    { id: 'aluva', location: 'Aluva & Lower Periyar Delta', state: 'Kerala', channel: 'Periyar River', lat: 10.11, lon: 76.35, score: 97, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'kuttanad', location: 'Kuttanad Below-Sea-Level Plain', state: 'Kerala', channel: 'Pamba / Meenachil', lat: 9.49, lon: 76.43, score: 94, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'chalakudy', location: 'Chalakudy River Spillway Zone', state: 'Kerala', channel: 'Chalakudy River', lat: 10.30, lon: 76.33, score: 91, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'idukki', location: 'Idukki Catchment & Dam Basin', state: 'Kerala', channel: 'Cheruthoni River', lat: 9.85, lon: 76.97, score: 86, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'thrissur', location: 'Thrissur Lowland Kole Basin', state: 'Kerala', channel: 'Karuvannur River', lat: 10.52, lon: 76.21, score: 62, level: 'High', levelColor: 'bg-orange-50 text-orange-700 border-orange-200' },
    { id: 'palakkad_gap', location: 'Palakkad Inland Basin', state: 'Kerala', channel: 'Bharathappuzha', lat: 10.78, lon: 76.65, score: 48, level: 'Moderate', levelColor: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'wayanad_ridge', location: 'Wayanad High Altitude Ridge', state: 'Kerala', channel: 'Kabini Catchment Highs', lat: 11.68, lon: 76.13, score: 26, level: 'Low', levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'munnar_peak', location: 'Munnar High Range Buffer', state: 'Kerala', channel: 'Western Ghats Peak', lat: 10.08, lon: 77.06, score: 15, level: 'Low', levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  ],
  odisha: [
    { id: 'mundali', location: 'Mundali / Mahanadi Delta Apex', state: 'Odisha', channel: 'Mahanadi River', lat: 20.44, lon: 85.74, score: 94, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'kendrapara', location: 'Kendrapara & Jagatsinghpur Estuary', state: 'Odisha', channel: 'Kathajodi / Devi Rivers', lat: 20.50, lon: 86.42, score: 91, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'cuttack', location: 'Cuttack Low-Lying Floodways', state: 'Odisha', channel: 'Mahanadi / Birupa', lat: 20.46, lon: 85.88, score: 88, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'baitarani', location: 'Baitarani Basin & Jajpur Plains', state: 'Odisha', channel: 'Baitarani River', lat: 20.85, lon: 86.33, score: 75, level: 'High', levelColor: 'bg-orange-50 text-orange-700 border-orange-200' },
    { id: 'puri_coastal', location: 'Puri Coastal Inundation Basin', state: 'Odisha', channel: 'Daya / Bhargavi Rivers', lat: 19.81, lon: 85.83, score: 52, level: 'Moderate', levelColor: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'koraput_ridge', location: 'Eastern Ghats High Plateau', state: 'Odisha', channel: 'Highland Ridge', lat: 18.81, lon: 82.71, score: 19, level: 'Low', levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'sambalpur_hills', location: 'Sambalpur Elevated Ridge', state: 'Odisha', channel: 'Hirakud Uplands', lat: 21.46, lon: 83.98, score: 16, level: 'Low', levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  ],
  maharashtra: [
    { id: 'chiplun', location: 'Chiplun Urban Floodplain', state: 'Maharashtra', channel: 'Vashishti River', lat: 17.53, lon: 73.51, score: 96, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'mahad', location: 'Mahad Lowland Estuary', state: 'Maharashtra', channel: 'Savitri River', lat: 18.08, lon: 73.42, score: 93, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'panchganga', location: 'Panchganga Sangam / Kolhapur', state: 'Maharashtra', channel: 'Panchganga River', lat: 16.70, lon: 74.24, score: 91, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'sangli', location: 'Sangli Krishna River Front', state: 'Maharashtra', channel: 'Krishna River', lat: 16.85, lon: 74.58, score: 78, level: 'High', levelColor: 'bg-orange-50 text-orange-700 border-orange-200' },
    { id: 'mumbai_mithi', location: 'Mumbai Mithi River Basin', state: 'Maharashtra', channel: 'Mithi River / Mahim Creek', lat: 19.07, lon: 72.87, score: 65, level: 'High', levelColor: 'bg-orange-50 text-orange-700 border-orange-200' },
    { id: 'pune_mutha', location: 'Pune Mutha River Bank', state: 'Maharashtra', channel: 'Mula-Mutha', lat: 18.52, lon: 73.85, score: 42, level: 'Moderate', levelColor: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'mahabaleshwar_peak', location: 'Mahabaleshwar High Ridge', state: 'Maharashtra', channel: 'Ghats Mountain Top', lat: 17.92, lon: 73.65, score: 20, level: 'Low', levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'nashik_plateau', location: 'Nashik Elevated Plateau', state: 'Maharashtra', channel: 'Upper Godavari Ridge', lat: 19.99, lon: 73.78, score: 14, level: 'Low', levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  ],
  india: [
    { id: 'barpeta', location: 'Barpeta Downstream Plains', state: 'Assam', channel: 'Brahmaputra / Manas', lat: 26.32, lon: 91.00, score: 96, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'kosi', location: 'Kosi River Active Basin', state: 'Bihar', channel: 'Kosi River', lat: 25.85, lon: 86.85, score: 95, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'periyar', location: 'Lower Periyar & Pamba Basins', state: 'Kerala', channel: 'Periyar / Pamba', lat: 10.11, lon: 76.35, score: 92, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'chiplun_nat', location: 'Chiplun & Konkan Coastal Plains', state: 'Maharashtra', channel: 'Vashishti River', lat: 17.53, lon: 73.51, score: 91, level: 'Very High', levelColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'mahanadi_nat', location: 'Mahanadi Coastal Delta Plain', state: 'Odisha', channel: 'Mahanadi / Devi', lat: 20.44, lon: 85.74, score: 76, level: 'High', levelColor: 'bg-orange-50 text-orange-700 border-orange-200' },
    { id: 'patna_nat', location: 'Patna Gangetic Basin', state: 'Bihar', channel: 'Ganga / Son', lat: 25.61, lon: 85.14, score: 48, level: 'Moderate', levelColor: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'gaya_nat', location: 'Falgu Elevated Buffer Ridge', state: 'Bihar', channel: 'High Ground Terrace', lat: 24.79, lon: 85.00, score: 22, level: 'Low', levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'guwahati_nat', location: 'Guwahati Foothills Plateau', state: 'Assam', channel: 'Elevated Safety Zone', lat: 26.22, lon: 91.70, score: 16, level: 'Low', levelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  ]
};

export default function HighRiskTable({
  currentRegion = 'india',
  selectedDisaster,
  selectedCoordinate,
  selectedDistrict = 'All Districts',
  isTargetedPredictionActive = false,
  onSelectArea,
  onRunTargetedPrediction
}) {
  const effectiveRegion = selectedDisaster?.region_id || (currentRegion === 'all' ? 'india' : currentRegion) || 'india';
  const baseList = REGIONAL_AFFECTED_AREAS[effectiveRegion] || REGIONAL_AFFECTED_AREAS['assam'] || REGIONAL_AFFECTED_AREAS['india'];

  // Calculate local surrounding zones if a coordinate/district is selected
  let displayedList = baseList;
  let filterScopeLabel = selectedDisaster ? `${selectedDisaster.name} (${selectedDisaster.state})` : (effectiveRegion === 'india' ? 'National Overview (All India)' : effectiveRegion.replace(/-/g, ' ').toUpperCase());

  if (selectedCoordinate && selectedCoordinate.lat && selectedCoordinate.lon) {
    const { lat, lon } = selectedCoordinate;
    // Calculate Euclidean distance to each zone and sort by proximity
    const sortedByDistance = [...baseList].map(zone => {
      const dLat = zone.lat - lat;
      const dLon = zone.lon - lon;
      const dist = Math.sqrt(dLat * dLat + dLon * dLon);
      return { ...zone, dist };
    }).sort((a, b) => a.dist - b.dist);

    displayedList = sortedByDistance;
    filterScopeLabel = selectedDistrict !== 'All Districts' ? `Surrounding ${selectedDistrict}` : `Surrounding Area (${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E)`;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between font-poppins h-full">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-orange-50 text-orange-600 border border-orange-200">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                {selectedCoordinate ? 'Surrounding Affected Inundation Zones' : (effectiveRegion === 'india' ? 'Top High Risk Areas' : 'Affected & Vulnerable Inundation Zones')}
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                Scope: <strong className="text-blue-700">{filterScopeLabel}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {onRunTargetedPrediction && (
              <button
                onClick={() => onRunTargetedPrediction(selectedCoordinate)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Run Prediction</span>
              </button>
            )}
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
              {displayedList.length} Zones
            </span>
          </div>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-2 px-2">Location &amp; Inundation Zone</th>
                <th className="py-2 px-2">River / Channel</th>
                <th className="py-2 px-2 text-center">Risk Score</th>
                <th className="py-2 px-2 text-right">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayedList.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectArea && onSelectArea(item)}
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                >
                  <td className="py-2.5 px-2 font-medium text-slate-800 flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold text-slate-900 truncate max-w-[180px]">{item.location}</span>
                  </td>
                  <td className="py-2.5 px-2 text-slate-500 font-medium text-[11px]">{item.channel || item.state}</td>
                  <td className="py-2.5 px-2 text-center font-bold font-mono text-slate-900">{item.score}</td>
                  <td className="py-2.5 px-2 text-right">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.levelColor}`}>
                      {item.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
