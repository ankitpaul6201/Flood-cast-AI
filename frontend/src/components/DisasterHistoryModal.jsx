import React, { useState } from 'react';
import {
  X,
  History,
  MapPin,
  Calendar,
  Waves,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  CloudRain,
  Mountain,
  Droplets,
  Search,
  Filter
} from 'lucide-react';

export const HISTORICAL_DISASTERS_2000_2026 = [
  {
    id: 'assam_flood_2024',
    name: 'Assam Monsoon & Brahmaputra Floods',
    year: 2024,
    dateRange: 'June 25 – July 15, 2024',
    state: 'Assam',
    region_id: 'assam',
    center: [26.20, 92.80],
    riverBasin: 'Brahmaputra & Barak Basins',
    districts: 'Barpeta, Dhubri, Kamrup, Morigaon, Nagaon, Darrang, Dhemaji, Cachar',
    peakRiskScore: 94,
    riskLevel: 'Critical',
    affectedPopulation: '3.1 Million People',
    inundatedAreaKm2: '4,150 km²',
    rainfallAccumulation: '480 mm / 7-day',
    meteorologicalCause: 'Continuous monsoon trough coupled with extreme upstream catchment downpours in Arunachal and Bhutan.',
    leadTimeDays: 7,
    hasRaster: true,
    summary: 'Widespread severe monsoon flooding inundated millions across 30 districts of Assam following continuous heavy discharge into the Brahmaputra.'
  },
  {
    id: 'north_india_2023',
    name: 'North India & Yamuna River Surge',
    year: 2023,
    dateRange: 'July 8 – July 22, 2023',
    state: 'Uttar Pradesh & Delhi',
    region_id: 'uttar-pradesh',
    center: [28.61, 77.23],
    riverBasin: 'Yamuna & Upper Ganga Basins',
    districts: 'Delhi NCR, Noida, Mathura, Agra, Saharanpur',
    peakRiskScore: 91,
    riskLevel: 'Critical',
    affectedPopulation: '1.8 Million People',
    inundatedAreaKm2: '2,800 km²',
    rainfallAccumulation: '365 mm / 5-day',
    meteorologicalCause: 'Interaction of severe Western Disturbance with active Monsoon surge causing record Hathnikund barrage discharge.',
    leadTimeDays: 5,
    hasRaster: false,
    summary: 'Yamuna river surpassed 45-year all-time high water level (208.66m), inundating key parts of national capital and western UP floodplains.'
  },
  {
    id: 'assam_flood_2022',
    name: 'Assam Silchar & Barak Valley Deluge',
    year: 2022,
    dateRange: 'June 10 – June 28, 2022',
    state: 'Assam',
    region_id: 'assam',
    center: [24.83, 92.77],
    riverBasin: 'Barak Valley & Central Brahmaputra',
    districts: 'Cachar, Hailakandi, Karimganj, Barpeta, Nagaon',
    peakRiskScore: 96,
    riskLevel: 'Critical',
    affectedPopulation: '5.4 Million People',
    inundatedAreaKm2: '5,200 km²',
    rainfallAccumulation: '590 mm / 7-day',
    meteorologicalCause: 'Bethukandi embankment breach during extreme precipitation causing Silchar town to remain submerged for over 11 days.',
    leadTimeDays: 7,
    hasRaster: true,
    summary: 'Historic disaster in Barak Valley; Silchar city experienced unprecedented flooding with water rising to second-story roofs.'
  },
  {
    id: 'odisha_flood_2022',
    name: 'Odisha Mahanadi Basin Deluge',
    year: 2022,
    dateRange: 'August 14 – August 28, 2022',
    state: 'Odisha',
    region_id: 'odisha',
    center: [20.40, 85.80],
    riverBasin: 'Mahanadi & Baitarani Delta',
    districts: 'Puri, Khurda, Cuttack, Jagatsinghpur, Kendrapara',
    peakRiskScore: 89,
    riskLevel: 'Very High',
    affectedPopulation: '1.4 Million People',
    inundatedAreaKm2: '3,100 km²',
    rainfallAccumulation: '410 mm / 7-day',
    meteorologicalCause: 'Back-to-back deep depressions in Bay of Bengal causing Hirakud reservoir to open over 40 sluice gates.',
    leadTimeDays: 6,
    hasRaster: true,
    summary: 'Severe deltaic flooding across coastal Odisha when Mahanadi discharge peaked at 12 lakh cusecs at Mundali.'
  },
  {
    id: 'maharashtra_flood_2021',
    name: 'Maharashtra Mahad & Chiplun Floods',
    year: 2021,
    dateRange: 'July 20 – July 30, 2021',
    state: 'Maharashtra',
    region_id: 'maharashtra',
    center: [17.53, 73.51],
    riverBasin: 'Vashishti, Krishna & Panchganga',
    districts: 'Ratnagiri, Raigad, Kolhapur, Sangli, Satara',
    peakRiskScore: 93,
    riskLevel: 'Critical',
    affectedPopulation: '850,000 People',
    inundatedAreaKm2: '1,950 km²',
    rainfallAccumulation: '594 mm / 48-hour',
    meteorologicalCause: 'Offshore trough cloudburst in Mahabaleshwar/Western Ghats releasing extreme discharge in narrow coastal rivers.',
    leadTimeDays: 4,
    hasRaster: true,
    summary: 'Chiplun and Mahad markets were submerged under 15-20 feet of water within hours, causing massive economic and life loss.'
  },
  {
    id: 'bihar_flood_2020',
    name: 'Bihar Gangetic & Kosi Surge',
    year: 2020,
    dateRange: 'July 18 – August 10, 2020',
    state: 'Bihar',
    region_id: 'bihar',
    center: [25.90, 85.80],
    riverBasin: 'Kosi, Gandak, Bagmati & Ganga',
    districts: 'Darbhanga, Muzaffarpur, Gopalganj, East Champaran, Supaul',
    peakRiskScore: 92,
    riskLevel: 'Critical',
    affectedPopulation: '8.3 Million People',
    inundatedAreaKm2: '6,400 km²',
    rainfallAccumulation: '440 mm / 7-day',
    meteorologicalCause: 'Intense torrential rainfall in Nepal terai regions channelled through Kosi and Gandak barrages into north Bihar plains.',
    leadTimeDays: 7,
    hasRaster: true,
    summary: 'Historic flood surge submerging 16 districts of North Bihar during the peak of the 2020 monsoon season.'
  },
  {
    id: 'hyderabad_flood_2020',
    name: 'Hyderabad Flash Inundation Deluge',
    year: 2020,
    dateRange: 'October 13 – October 19, 2020',
    state: 'Telangana',
    region_id: 'india',
    center: [17.3850, 78.4867],
    riverBasin: 'Musi River & Osmansagar Basin',
    districts: 'Hyderabad, Rangareddy, Medchal-Malkajgiri',
    peakRiskScore: 88,
    riskLevel: 'Very High',
    affectedPopulation: '1.2 Million People',
    inundatedAreaKm2: '650 km²',
    rainfallAccumulation: '324 mm / 24-hour',
    meteorologicalCause: 'Deep depression passing directly over Telangana causing urban catchment saturation and Musi river swelling.',
    leadTimeDays: 3,
    hasRaster: false,
    summary: 'Highest single-day October downpour in over a century paralyzed Telangana capital and submerged extensive residential layouts.'
  },
  {
    id: 'maharashtra_karnataka_2019',
    name: 'Krishna Basin Floods (Kolhapur & Sangli)',
    year: 2019,
    dateRange: 'August 2 – August 18, 2019',
    state: 'Maharashtra & Karnataka',
    region_id: 'maharashtra',
    center: [16.70, 74.24],
    riverBasin: 'Upper Krishna & Panchganga Basins',
    districts: 'Kolhapur, Sangli, Belagavi, Bagalkote',
    peakRiskScore: 95,
    riskLevel: 'Critical',
    affectedPopulation: '2.1 Million People',
    inundatedAreaKm2: '3,800 km²',
    rainfallAccumulation: '620 mm / 7-day',
    meteorologicalCause: 'Continuous torrential rains in Koyna, Radhanagari, and Almatti dam catchment areas triggering severe backwater swell.',
    leadTimeDays: 6,
    hasRaster: false,
    summary: 'Kolhapur and Sangli cities were cut off for over a week with NH-4 submerged under several feet of floodwater.'
  },
  {
    id: 'kerala_flood_2018',
    name: 'Kerala Extreme Monsoon Deluge',
    year: 2018,
    dateRange: 'August 8 – August 22, 2018',
    state: 'Kerala',
    region_id: 'kerala',
    center: [10.20, 76.50],
    riverBasin: 'Periyar, Pamba, Chalakudy & Bharathappuzha',
    districts: 'Ernakulam, Idukki, Thrissur, Alappuzha, Wayanad, Pathanamthitta',
    peakRiskScore: 98,
    riskLevel: 'Critical',
    affectedPopulation: '5.4 Million People',
    inundatedAreaKm2: '4,800 km²',
    rainfallAccumulation: '758 mm / 7-day',
    meteorologicalCause: 'Extreme low pressure over Arabian Sea caused unprecedented cloud bursts across Western Ghats forcing simultaneous opening of 35 dams.',
    leadTimeDays: 7,
    hasRaster: true,
    summary: 'The worst floods in Kerala since 1924, impacting all 14 districts and displacing over a million citizens.'
  },
  {
    id: 'gujarat_flood_2017',
    name: 'Gujarat Banaskantha & Saurashtra Floods',
    year: 2017,
    dateRange: 'July 21 – August 4, 2017',
    state: 'Gujarat',
    region_id: 'gujarat',
    center: [24.17, 72.43],
    riverBasin: 'Banas, Machchhu & Sabarmati Basins',
    districts: 'Banaskantha, Patan, Morbi, Surendranagar',
    peakRiskScore: 87,
    riskLevel: 'Very High',
    affectedPopulation: '1.6 Million People',
    inundatedAreaKm2: '2,900 km²',
    rainfallAccumulation: '450 mm / 48-hour',
    meteorologicalCause: 'Monsoon low-pressure system stalled over North Gujarat and southwest Rajasthan causing flash dam overflows.',
    leadTimeDays: 4,
    hasRaster: false,
    summary: 'Severe inundation across Banaskantha with Dantiwada and Sipu dams releasing massive discharges onto agricultural floodplains.'
  },
  {
    id: 'chennai_flood_2015',
    name: 'Chennai & Coastal Tamil Nadu Deluge',
    year: 2015,
    dateRange: 'November 28 – December 8, 2015',
    state: 'Tamil Nadu',
    region_id: 'tamil-nadu',
    center: [13.0827, 80.2707],
    riverBasin: 'Adyar, Cooum & Chembarambakkam Basin',
    districts: 'Chennai, Kanchipuram, Tiruvallur, Cuddalore',
    peakRiskScore: 97,
    riskLevel: 'Critical',
    affectedPopulation: '4.2 Million People',
    inundatedAreaKm2: '2,100 km²',
    rainfallAccumulation: '494 mm / 24-hour',
    meteorologicalCause: 'Super-charged Northeast Monsoon depression over Bay of Bengal triggering historic Chembarambakkam reservoir release (29,000 cusecs).',
    leadTimeDays: 5,
    hasRaster: false,
    summary: 'Catastrophic urban inundation submerged Chennai airport, arterial roads, and multiple residential neighborhoods under 8-10 feet of water.'
  },
  {
    id: 'kashmir_flood_2014',
    name: 'Jammu & Kashmir Jhelum Basin Deluge',
    year: 2014,
    dateRange: 'September 2 – September 15, 2014',
    state: 'Jammu and Kashmir',
    region_id: 'india',
    center: [34.0837, 74.7973],
    riverBasin: 'Jhelum & Chenab Basins',
    districts: 'Srinagar, Anantnag, Pulwama, Baramulla, Jammu',
    peakRiskScore: 96,
    riskLevel: 'Critical',
    affectedPopulation: '2.5 Million People',
    inundatedAreaKm2: '3,200 km²',
    rainfallAccumulation: '570 mm / 5-day',
    meteorologicalCause: 'Late-season monsoon low collided with mid-latitude Westerly trough causing Jhelum to breach embankments at Ram Munshi Bagh.',
    leadTimeDays: 6,
    hasRaster: false,
    summary: 'Srinagar city was inundated for several weeks with hospitals, administrative offices, and commercial hubs completely submerged.'
  },
  {
    id: 'uttarakhand_flood_2013',
    name: 'Uttarakhand Himalayan Cloudburst & Deluge',
    year: 2013,
    dateRange: 'June 14 – June 22, 2013',
    state: 'Uttarakhand',
    region_id: 'india',
    center: [30.7346, 79.0669],
    riverBasin: 'Mandakini, Alaknanda & Upper Bhagirathi',
    districts: 'Rudraprayag, Chamoli, Uttarkashi, Pithoragarh',
    peakRiskScore: 99,
    riskLevel: 'Critical',
    affectedPopulation: '1.1 Million People',
    inundatedAreaKm2: '1,750 km²',
    rainfallAccumulation: '375 mm / 24-hour (375% of normal)',
    meteorologicalCause: 'Early monsoon surge collided with Westerly trough; Chorabari glacial lake burst unleashing debris-laden flash torrents.',
    leadTimeDays: 4,
    hasRaster: false,
    summary: 'One of India’s worst mountain disasters; Mandakini river ravaged Kedarnath valley and downstream pilgrimage routes.'
  },
  {
    id: 'bihar_kosi_2008',
    name: 'Bihar Kosi Avulsion & Embankment Breach',
    year: 2008,
    dateRange: 'August 18 – September 20, 2008',
    state: 'Bihar',
    region_id: 'bihar',
    center: [26.15, 86.95],
    riverBasin: 'Kosi River Eastern Paleochannel',
    districts: 'Supaul, Madhepura, Saharsa, Purnia, Araria',
    peakRiskScore: 98,
    riskLevel: 'Critical',
    affectedPopulation: '4.8 Million People',
    inundatedAreaKm2: '7,800 km²',
    rainfallAccumulation: '390 mm / 7-day',
    meteorologicalCause: 'Breach of Kusaha embankment in Nepal diverted the entire Kosi river course 120 km eastward into ancient abandoned channels.',
    leadTimeDays: 7,
    hasRaster: false,
    summary: 'Declared a national calamity; millions of residents who had not experienced floods in 50 years were marooned overnight.'
  },
  {
    id: 'mumbai_flood_2005',
    name: 'Mumbai Deluge (944mm/24h Cloudburst)',
    year: 2005,
    dateRange: 'July 26 – July 29, 2005',
    state: 'Maharashtra',
    region_id: 'maharashtra',
    center: [19.0760, 72.8777],
    riverBasin: 'Mithi River & Mumbai Coastal Catchments',
    districts: 'Mumbai Suburban, Mumbai City, Thane',
    peakRiskScore: 99,
    riskLevel: 'Critical',
    affectedPopulation: '7.5 Million People',
    inundatedAreaKm2: '450 km²',
    rainfallAccumulation: '944 mm in 24 hours',
    meteorologicalCause: 'Mesoscale convective storm system coincided with high tide (4.48m) blocking Mithi river discharge into Mahim Creek.',
    leadTimeDays: 3,
    hasRaster: false,
    summary: 'India’s most infamous urban flood disaster, recording 944 mm rain in a single day and completely halting city infrastructure.'
  },
  {
    id: 'west_bengal_2000',
    name: 'West Bengal & Gangetic Delta Floods',
    year: 2000,
    dateRange: 'September 18 – October 5, 2000',
    state: 'West Bengal',
    region_id: 'west-bengal',
    center: [23.24, 87.86],
    riverBasin: 'Bhagirathi-Hooghly & Damodar Basins',
    districts: 'Murshidabad, Nadia, Birbhum, Bardhaman, Hooghly',
    peakRiskScore: 93,
    riskLevel: 'Critical',
    affectedPopulation: '21.8 Million People',
    inundatedAreaKm2: '9,200 km²',
    rainfallAccumulation: '680 mm / 5-day',
    meteorologicalCause: 'Massive depression over southern Bengal combined with simultaneous releases from DVC and Mayurakshi barrages.',
    leadTimeDays: 7,
    hasRaster: false,
    summary: 'One of the most extensive deltaic floods in Indian history, affecting over 20 million residents across 9 southern districts.'
  }
];

export default function DisasterHistoryModal({
  isOpen,
  onClose,
  onSelectDisaster
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState('ALL');
  const [activeDisaster, setActiveDisaster] = useState(HISTORICAL_DISASTERS_2000_2026[0]);

  if (!isOpen) return null;

  const states = ['ALL', ...Array.from(new Set(HISTORICAL_DISASTERS_2000_2026.map(d => d.state)))];

  const filteredDisasters = HISTORICAL_DISASTERS_2000_2026.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.riverBasin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(d.year).includes(searchQuery);

    const matchesState = selectedStateFilter === 'ALL' || d.state === selectedStateFilter;
    return matchesSearch && matchesState;
  });

  const handleSelectAndLoad = (disaster) => {
    setActiveDisaster(disaster);
    if (onSelectDisaster) {
      onSelectDisaster(disaster);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs font-poppins">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-5xl w-full h-[90vh] max-h-[820px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* 1. Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Historical Flood Disasters Catalog (2000 – 2026)
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {HISTORICAL_DISASTERS_2000_2026.length} Indian Disasters
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Comprehensive archive of major Indian flood disasters with telemetry and spatial prediction models
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-200/70 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Filters & Search Header */}
        <div className="px-6 py-3 border-b border-slate-100 bg-white flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, state, river, year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* State Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
            {states.slice(0, 7).map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStateFilter(st)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedStateFilter === st
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Main Split Content (Left List + Right Deep Details) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left: Scrollable Disaster Cards List */}
          <div className="w-full lg:w-1/2 border-r border-slate-100 overflow-y-auto p-4 space-y-2.5 bg-slate-50/40">
            {filteredDisasters.map((disaster) => {
              const isSelected = activeDisaster?.id === disaster.id;
              return (
                <div
                  key={disaster.id}
                  onClick={() => setActiveDisaster(disaster)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/15'
                      : 'bg-white hover:bg-slate-50/90 border-slate-200/80 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono">
                          {disaster.year}
                        </span>
                        <h3 className="text-xs font-bold text-slate-900">
                          {disaster.name}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-1 text-[11px] text-slate-500 font-medium mt-1">
                        <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                        <span>{disaster.state} &bull; {disaster.riverBasin}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-red-50 text-red-700 border-red-200 shrink-0">
                      Score: {disaster.peakRiskScore}/100
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {disaster.summary}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>🗓️ {disaster.dateRange}</span>
                    <span className="text-blue-600 font-semibold flex items-center space-x-0.5">
                      <span>Inspect Details</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Active Disaster Full Telemetry & Model Prediction Profile */}
          <div className="w-full lg:w-1/2 p-5 sm:p-6 overflow-y-auto bg-white flex flex-col justify-between">
            {activeDisaster ? (
              <div className="space-y-4">
                {/* Event Header Banner */}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono font-bold text-xs border border-blue-200">
                      Year {activeDisaster.year}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                      {activeDisaster.riskLevel} Flood Inundation
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    {activeDisaster.name}
                  </h3>
                  <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>{activeDisaster.state} ({activeDisaster.riverBasin})</span>
                  </div>
                </div>

                {/* Quantitative Impact Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Peak Risk Score</div>
                    <div className="text-lg font-black text-slate-900 font-mono mt-0.5">
                      {activeDisaster.peakRiskScore}<span className="text-xs text-slate-400">/100</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Affected Population</div>
                    <div className="text-xs font-bold text-slate-900 mt-1">
                      {activeDisaster.affectedPopulation}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Inundated Area</div>
                    <div className="text-xs font-bold text-slate-900 mt-1">
                      {activeDisaster.inundatedAreaKm2}
                    </div>
                  </div>
                </div>

                {/* Key Environmental Telemetry */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
                  <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    Disaster Telemetry &amp; Meteorological Trigger
                  </div>

                  <div className="flex items-start space-x-2 text-slate-700">
                    <CloudRain className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Rainfall Accumulation: </span>
                      <span>{activeDisaster.rainfallAccumulation}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 text-slate-700">
                    <Waves className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">River Basins &amp; Channels: </span>
                      <span>{activeDisaster.riverBasin}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 text-slate-700">
                    <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Event Timeline: </span>
                      <span>{activeDisaster.dateRange}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 mt-2 leading-relaxed">
                    <strong>Cause: </strong>{activeDisaster.meteorologicalCause}
                  </p>
                </div>

                {/* Impacted Districts */}
                <div className="text-xs">
                  <span className="font-bold text-slate-800 block mb-1">Impacted Districts:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDisaster.districts.split(', ').map((d, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prediction Action CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => handleSelectAndLoad(activeDisaster)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                  >
                    <Waves className="w-4 h-4" />
                    <span>Load &amp; Simulate Model Prediction on Map</span>
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-1.5">
                    Transfers spatial grid, camera center, and feature inspect data to this disaster
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-xs">
                Select a disaster from the catalog to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
