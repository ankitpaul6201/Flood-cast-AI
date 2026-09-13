import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SidebarLeft from './components/SidebarLeft';
import MapViewer from './components/MapViewer';
import LocationDetailsPanel from './components/LocationDetailsPanel';
import HighRiskTable from './components/HighRiskTable';
import RiskOverviewCard from './components/RiskOverviewCard';
import TimelineControl from './components/TimelineControl';
import MetricsModal from './components/MetricsModal';
import ScientificInfoModal from './components/ScientificInfoModal';
import ReportsModal from './components/ReportsModal';
import DisasterHistoryModal, { HISTORICAL_DISASTERS_2000_2026 } from './components/DisasterHistoryModal';
import AlertBanner from './components/AlertBanner';
import {
  fetchHealth,
  fetchEvents,
  fetchPrediction,
  inspectPointRisk,
  fetchTimeline,
  fetchMetrics,
  fetchObservedFlood,
  fetchModelMetadata
} from './services/api';

import { STATE_CENTERS, DISTRICT_COORDINATES } from './data/indiaLocations';

const STATE_TO_EVENT_MAP = {
  assam: 'assam_flood_2024',
  bihar: 'bihar_flood_2020',
  kerala: 'kerala_flood_2018',
  odisha: 'odisha_flood_2022',
  maharashtra: 'maharashtra_flood_2021',
  'uttar-pradesh': 'bihar_flood_2020',
  'west-bengal': 'odisha_flood_2022',
  gujarat: 'maharashtra_flood_2021',
  'tamil-nadu': 'kerala_flood_2018'
};

export default function App() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('assam_flood_2024');
  const [currentRegion, setCurrentRegion] = useState('india');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [activeNavTab, setActiveNavTab] = useState('map');
  const [basemapStyle, setBasemapStyle] = useState('osm');

  const [layersState, setLayersState] = useState({
    floodRisk: true,
    observedFlood: false,
    rainfall: true,
    ndwi: false,
    elevation: false,
    windWeather: false
  });

  const [timeline, setTimeline] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTimelineDrawer, setShowTimelineDrawer] = useState(true);

  const [predictionData, setPredictionData] = useState(null);
  const [observedData, setObservedData] = useState(null);

  const [selectedCoordinate, setSelectedCoordinate] = useState({ lat: 26.20, lon: 92.80 });
  const [inspectorData, setInspectorData] = useState(null);
  const [isInspectorLoading, setIsInspectorLoading] = useState(false);
  const [isTargetedPredictionActive, setIsTargetedPredictionActive] = useState(false);

  const [metricsData, setMetricsData] = useState(null);
  const [modelMetadata, setModelMetadata] = useState(null);
  const [isMetricsOpen, setIsMetricsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isDisastersModalOpen, setIsDisastersModalOpen] = useState(false);
  const [healthStatus, setHealthStatus] = useState(null);

  // Targeted Prediction on Selected Area Handler
  const handleRunTargetedPrediction = async (coordOverride = null) => {
    const targetCoord = coordOverride || selectedCoordinate || { lat: 26.20, lon: 92.80 };
    setSelectedCoordinate(targetCoord);
    setIsTargetedPredictionActive(true);
    setLayersState((prev) => ({ ...prev, floodRisk: true }));

    const dateStr = timeline[currentStepIndex] ? timeline[currentStepIndex].date : null;
    try {
      setIsInspectorLoading(true);
      const data = await inspectPointRisk(targetCoord.lat, targetCoord.lon, selectedEventId, dateStr);
      setInspectorData(data);
    } catch (err) {
      console.error('Error running targeted area prediction:', err);
    } finally {
      setIsInspectorLoading(false);
    }
  };

  // 1. Initial Load: Health, Events, Metadata
  useEffect(() => {
    async function initApp() {
      try {
        const [health, eventsList, meta] = await Promise.all([
          fetchHealth().catch(() => ({ status: 'ok' })),
          fetchEvents().catch(() => []),
          fetchModelMetadata().catch(() => null)
        ]);
        setHealthStatus(health);
        setEvents(eventsList);
        setModelMetadata(meta);

        if (eventsList.length > 0) {
          const defaultEvent = eventsList[0];
          setSelectedEventId(defaultEvent.id);
          loadEventData(defaultEvent.id, defaultEvent.region_id || 'assam');
        }

        // Initial inspection for Brahmaputra epicenter
        handleSelectCoordinate(26.20, 92.80);
      } catch (err) {
        console.error('Initialization error:', err);
      }
    }
    initApp();
  }, []);

  // 2. Load Event Data: Timeline, Observed flood, Metrics
  // 2. Load Event Data: Timeline, Observed flood, Metrics
  async function loadEventData(eventId, regionId) {
    try {
      const [tl, obs, met] = await Promise.all([
        fetchTimeline(eventId).catch(() => []),
        fetchObservedFlood(eventId).catch(() => null),
        fetchMetrics(eventId).catch(() => null)
      ]);

      setTimeline(tl);
      setObservedData(obs);
      setMetricsData(met);
      setCurrentStepIndex(0);

      if (tl.length > 0) {
        await loadPrediction(eventId, tl[0].date);
      }
    } catch (err) {
      console.error('Error loading event data:', err);
    }
  }

  // 3. Load Prediction for specific Date
  async function loadPrediction(eventId, date) {
    try {
      const pred = await fetchPrediction(eventId, date);
      setPredictionData(pred);

      if (selectedCoordinate) {
        handleSelectCoordinate(selectedCoordinate.lat, selectedCoordinate.lon, date, eventId);
      }
    } catch (err) {
      console.error('Error loading prediction:', err);
    }
  }

  // Layer toggle handler
  const handleToggleLayer = (layerKey, checked) => {
    setLayersState((prev) => ({ ...prev, [layerKey]: checked }));
  };

  const [selectedDisaster, setSelectedDisaster] = useState(HISTORICAL_DISASTERS_2000_2026[0]);

  // Historical Disaster Selected from Modal ("Load & Simulate Model Prediction on Map")
  const handleSelectHistoricalDisaster = async (disaster) => {
    setSelectedDisaster(disaster);
    setLayersState((prev) => ({ ...prev, floodRisk: true }));
    setShowTimelineDrawer(true);

    if (disaster.region_id) {
      setCurrentRegion(disaster.region_id);
    }

    const targetEventId = (disaster.hasRaster && events.some(e => e.id === disaster.id))
      ? disaster.id
      : (STATE_TO_EVENT_MAP[disaster.region_id] || 'assam_flood_2024');

    setSelectedEventId(targetEventId);

    if (disaster.center) {
      handleSelectCoordinate(disaster.center[0], disaster.center[1], null, targetEventId);
    }

    await loadEventData(targetEventId, disaster.region_id || 'assam');
    setIsPlaying(true); // Automatically start simulating model prediction on map!
  };

  // State selection handler
  const handleSelectState = (stateId) => {
    if (stateId === 'all') {
      setCurrentRegion('all');
      setSelectedDistrict('All Districts');
      setSelectedDisaster(null);
      handleSelectCoordinate(22.80, 79.50);
      return;
    }
    setCurrentRegion(stateId);
    setSelectedDistrict('All Districts');
    const matchedDisaster = HISTORICAL_DISASTERS_2000_2026.find(d => d.region_id === stateId);
    if (matchedDisaster) {
      setSelectedDisaster(matchedDisaster);
    }

    const stateConfig = STATE_CENTERS[stateId];
    if (stateConfig?.center) {
      handleSelectCoordinate(stateConfig.center[0], stateConfig.center[1]);
    }

    const mappedEventId = STATE_TO_EVENT_MAP[stateId] || 'assam_flood_2024';
    if (mappedEventId !== selectedEventId) {
      setSelectedEventId(mappedEventId);
      loadEventData(mappedEventId, stateId);
    }
  };

  // District / Basin selection handler
  const handleSelectDistrict = (districtName) => {
    setSelectedDistrict(districtName);
    if (DISTRICT_COORDINATES[districtName]) {
      const [dLat, dLon] = DISTRICT_COORDINATES[districtName];
      handleSelectCoordinate(dLat, dLon);
    } else if (districtName === 'All Districts' && STATE_CENTERS[currentRegion]?.center) {
      const [sLat, sLon] = STATE_CENTERS[currentRegion].center;
      handleSelectCoordinate(sLat, sLon);
    }
  };

  // Focus Area from HighRiskTable
  const handleSelectArea = (area) => {
    if (area.lat && area.lon) {
      handleSelectCoordinate(area.lat, area.lon);
    }
  };

  // Timeline Step Change Handler
  const handleSelectStep = (index) => {
    setIsPlaying(false);
    setCurrentStepIndex(index);
    if (timeline[index]) {
      loadPrediction(selectedEventId, timeline[index].date);
    }
  };

  // Play / Pause / Replay Animation Handler
  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentStepIndex >= timeline.length - 1) {
        setCurrentStepIndex(0);
        if (timeline.length > 0) {
          loadPrediction(selectedEventId, timeline[0].date);
        }
      }
      setIsPlaying(true);
    }
  };

  // Play / Pause Animation Effect (Single Authoritative Non-Looping Timer)
  useEffect(() => {
    let interval = null;
    if (isPlaying && timeline.length > 0) {
      interval = setInterval(() => {
        setCurrentStepIndex((prevStep) => {
          if (prevStep >= timeline.length - 1) {
            setIsPlaying(false);
            setLayersState((prev) => ({ ...prev, floodRisk: true, observedFlood: true }));
            return prevStep;
          }

          const nextStep = prevStep + 1;
          loadPrediction(selectedEventId, timeline[nextStep].date);

          if (nextStep >= timeline.length - 1) {
            setIsPlaying(false);
            setLayersState((prev) => ({ ...prev, floodRisk: true, observedFlood: true }));
          }

          return nextStep;
        });
      }, 2200);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, timeline, selectedEventId]);

  // Map Click Inspector Handler
  const handleSelectCoordinate = async (lat, lon, overrideDate = null, overrideEventId = null) => {
    setSelectedCoordinate({ lat, lon });
    setIsInspectorLoading(true);
    const dateStr = overrideDate || (timeline[currentStepIndex] ? timeline[currentStepIndex].date : null);
    const evtId = overrideEventId || selectedEventId;

    try {
      const data = await inspectPointRisk(lat, lon, evtId, dateStr);
      setInspectorData(data);
    } catch (err) {
      console.error('Error inspecting coordinate risk:', err);
    } finally {
      setIsInspectorLoading(false);
    }
  };

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-poppins antialiased select-none">
      {/* 1. Header Bar with Previous Flood Disasters (2000–2026) Catalog */}
      <Header
        events={events}
        selectedEventId={selectedEventId}
        onSelectEvent={(eventId) => {
          setSelectedEventId(eventId);
          const ev = events.find((e) => e.id === eventId);
          const regId = ev?.region_id || 'assam';
          setCurrentRegion(regId);
          loadEventData(eventId, regId);
        }}
        timeline={timeline}
        currentStepIndex={currentStepIndex}
        onSelectStep={handleSelectStep}
        onOpenMetrics={() => setIsMetricsOpen(true)}
        onOpenInfo={() => setIsInfoOpen(true)}
        onOpenDisasters={() => setIsDisastersModalOpen(true)}
        onResetIndiaView={() => setCurrentRegion('india')}
        healthStatus={healthStatus}
      />

      {/* 2. Main Dashboard Layout (Left Sidebar + Center Map/Bottom Cards + Right Sidebar) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar Panel */}
        <SidebarLeft
          activeNavTab={activeNavTab}
          setActiveNavTab={setActiveNavTab}
          currentRegion={currentRegion}
          onSelectState={handleSelectState}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={handleSelectDistrict}
          layersState={layersState}
          onToggleLayer={handleToggleLayer}
          basemapStyle={basemapStyle}
          setBasemapStyle={setBasemapStyle}
          onOpenMetrics={() => setIsMetricsOpen(true)}
          onOpenReports={() => setIsReportsOpen(true)}
          onOpenSettings={() => setIsInfoOpen(true)}
          onToggleHistoricalReplay={() => setIsDisastersModalOpen(true)}
        />

        {/* Center Main Work Area */}
        <main className="flex-1 flex flex-col p-4 sm:p-5 space-y-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {/* Critical Risk Notification Banner */}
          <AlertBanner
            predictionData={predictionData}
            currentStep={timeline[currentStepIndex]}
            event={selectedEvent}
          />

          {/* Interactive Map View */}
          <div className="flex-1 min-h-[440px] lg:min-h-[520px] relative">
            <MapViewer
              currentRegion={currentRegion}
              predictionData={predictionData}
              observedData={observedData}
              showPredictionLayer={layersState.floodRisk}
              showObservedLayer={layersState.observedFlood}
              selectedCoordinate={selectedCoordinate}
              onSelectCoordinate={handleSelectCoordinate}
              inspectorData={inspectorData}
              basemapStyle={basemapStyle}
              onResetIndiaView={() => setCurrentRegion('india')}
            />
          </div>

          {/* Timeline & Replay Scrubber (Collapsible / Dynamic) */}
          {showTimelineDrawer && (
            <TimelineControl
              timeline={timeline}
              currentStepIndex={currentStepIndex}
              onSelectStepIndex={handleSelectStep}
              isPlaying={isPlaying}
              onTogglePlay={handleTogglePlay}
            />
          )}

          {/* Bottom Summary Cards (Dynamic Affected Areas & India-Wide Risk Overview) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1">
            <div className="lg:col-span-7">
              <HighRiskTable
                currentRegion={currentRegion}
                selectedDisaster={selectedDisaster}
                selectedCoordinate={selectedCoordinate}
                selectedDistrict={selectedDistrict}
                isTargetedPredictionActive={isTargetedPredictionActive}
                onSelectArea={handleSelectArea}
                onRunTargetedPrediction={handleRunTargetedPrediction}
              />
            </div>
            <div className="lg:col-span-5">
              <RiskOverviewCard currentRegion={currentRegion} />
            </div>
          </div>
        </main>

        {/* Right Sidebar: Location Details & Real-Time Cell Analysis */}
        <LocationDetailsPanel
          inspectorData={inspectorData}
          isLoading={isInspectorLoading}
          selectedCoordinate={selectedCoordinate}
          currentRegion={currentRegion}
          selectedDistrict={selectedDistrict}
          timeline={timeline}
          currentStepIndex={currentStepIndex}
          isTargetedPredictionActive={isTargetedPredictionActive}
          onRunTargetedPrediction={handleRunTargetedPrediction}
          onToggleHistoricalReplay={() => setIsDisastersModalOpen(true)}
        />
      </div>

      {/* Historical Disasters Catalog Modal (2000 - 2026) */}
      <DisasterHistoryModal
        isOpen={isDisastersModalOpen}
        onClose={() => setIsDisastersModalOpen(false)}
        onSelectDisaster={handleSelectHistoricalDisaster}
      />

      {/* Validation Metrics Modal */}
      <MetricsModal
        isOpen={isMetricsOpen}
        onClose={() => setIsMetricsOpen(false)}
        metricsData={metricsData}
        selectedEvent={selectedEvent}
      />

      {/* Scientific Methodology Modal */}
      <ScientificInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        modelMetadata={modelMetadata}
      />

      {/* Disaster Reports Modal */}
      <ReportsModal
        isOpen={isReportsOpen}
        onClose={() => setIsReportsOpen(false)}
        selectedEvent={selectedEvent}
      />
    </div>
  );
}
