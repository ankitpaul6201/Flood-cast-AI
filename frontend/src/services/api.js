/**
 * API Client for FloodCast AI
 */

const API_BASE = '/api';

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error('Failed to fetch health status');
  return res.json();
}

export async function fetchEvents() {
  const res = await fetch(`${API_BASE}/events`);
  if (!res.ok) throw new Error('Failed to fetch historical events');
  return res.json();
}

export async function fetchPrediction(eventId, date) {
  const res = await fetch(`${API_BASE}/predictions?event_id=${eventId}&date=${date}`);
  if (!res.ok) throw new Error(`Failed to fetch prediction for ${date}`);
  return res.json();
}

export async function inspectPointRisk(lat, lon, eventId, date) {
  let url = `${API_BASE}/risk-point?lat=${lat}&lon=${lon}&event_id=${eventId}`;
  if (date) url += `&date=${date}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to inspect point risk');
  return res.json();
}

export async function fetchTimeline(eventId) {
  const res = await fetch(`${API_BASE}/timeline?event_id=${eventId}`);
  if (!res.ok) throw new Error('Failed to fetch event timeline');
  return res.json();
}

export async function fetchMetrics(eventId) {
  const res = await fetch(`${API_BASE}/metrics/${eventId}`);
  if (!res.ok) throw new Error('Failed to fetch validation metrics');
  return res.json();
}

export async function fetchObservedFlood(eventId) {
  const res = await fetch(`${API_BASE}/observed/${eventId}`);
  if (!res.ok) throw new Error('Failed to fetch observed flood extent');
  return res.json();
}

export async function fetchModelMetadata() {
  const res = await fetch(`${API_BASE}/metadata/model`);
  if (!res.ok) throw new Error('Failed to fetch model metadata');
  return res.json();
}
