# FLOODCAST AI — AUTONOMOUS PHASED DEVELOPMENT INSTRUCTION

## Project Objective

Build the complete **Satellite-Based Real-Time Natural Disaster Prediction** project as defined in the project documents.

The project folder already contains:

- `PRD.md`
- `TRD.md`
- `ARCHITECTURE_WORKFLOW.md`
- `PHASED_DEVELOPMENT_PLAN.md`
- `AGENTS.md`

These documents are the primary source of truth. Read all of them before writing or modifying code.

### Locked MVP Scope

- **Hazard:** Flood
- **Region:** Assam, India
- **Primary satellite/data source:** Sentinel-2 Level-2A Surface Reflectance
- **Supporting public data:** CHIRPS rainfall and DEM/elevation data
- **ML:** Random Forest baseline first
- **Backend:** FastAPI
- **Frontend:** React + Leaflet
- **Geospatial processing:** Google Earth Engine, rasterio/GDAL, GeoPandas where appropriate

The final system must produce a **spatial flood risk score**, not only a flood/no-flood classification.

The final product should allow users to:

1. Open the application.
2. See a map.
3. Navigate from the world/India view to Assam.
4. Select a historical date/event.
5. View the predicted flood-risk heatmap.
6. Click an area/cell.
7. Inspect its risk score and input features.
8. Replay risk over time.
9. Compare predictions against observed historical flood extent.
10. See model validation metrics.
11. See prediction/data timestamps and the lag between satellite observation and prediction.
12. See threshold-based alerts where implemented.

This is a **historical research/demo system** using public historical data.

> Do not falsely claim that the system is currently receiving a live satellite feed.

---

# 1. First Action — Understand the Project

Before implementing anything:

1. Read:
   - `PRD.md`
   - `TRD.md`
   - `ARCHITECTURE_WORKFLOW.md`
   - `PHASED_DEVELOPMENT_PLAN.md`
   - `AGENTS.md`
2. Inspect the entire repository.
3. Identify existing source files, configuration, dependencies, frontend/backend code, datasets, scripts, environment files, documentation, and generated artifacts.
4. Do not overwrite existing working code blindly.
5. Compare the repository state against the planning documents.
6. Create or update `docs/IMPLEMENTATION_STATUS.md`.

It should contain:

- Current phase
- Completed work
- In-progress work
- Remaining work
- Blockers
- Required developer actions
- Important decisions made
- Tests completed
- Dataset status
- Model status
- Frontend/backend status

---

# 2. Development Must Be Phased

Follow `PHASED_DEVELOPMENT_PLAN.md` strictly.

Work sequentially through:

- **PHASE 0** — Requirements & Environment
- **PHASE 1** — Dataset & Historical Event Selection
- **PHASE 2** — Google Earth Engine Data Pipeline
- **PHASE 3** — Geospatial Preprocessing
- **PHASE 4** — Flood Labels
- **PHASE 5** — Training Dataset
- **PHASE 6** — Baseline ML
- **PHASE 7** — Historical Validation
- **PHASE 8** — Spatial Prediction Engine
- **PHASE 9** — FastAPI Backend
- **PHASE 10** — React + Leaflet Frontend
- **PHASE 11** — Historical Replay
- **PHASE 12** — Alerts + Explainability
- **PHASE 13** — Testing + Scientific Audit
- **PHASE 14** — Deployment + Demo Preparation

Follow the exact phase definitions in `PHASED_DEVELOPMENT_PLAN.md`.

---

# 3. How You Should Work

For every phase:

### Step 1 — READ
Read the relevant requirements from the project documents.

### Step 2 — INSPECT
Inspect the current repository and determine what already exists.

### Step 3 — PLAN
Before making substantial changes, briefly explain:

- what the phase requires
- files that will be created/modified
- commands that need to be executed
- external services/accounts/data that are required
- what success looks like

### Step 4 — IMPLEMENT
Implement the phase completely.

### Step 5 — TEST
Run appropriate tests/checks.

### Step 6 — VERIFY
Verify the result against the PRD/TRD/AGENTS rules.

### Step 7 — DOCUMENT
Update relevant documentation and `docs/IMPLEMENTATION_STATUS.md`.

### Step 8 — CHECK FOR BLOCKERS
Determine whether the next phase requires a decision, credential, account, dataset, API access, or human verification.

### Step 9 — PROCEED
If everything required is available and unambiguous, continue to the next phase automatically.

---

# 4. When to Ask the Developer

Work autonomously whenever possible.

Ask the developer only when you genuinely cannot continue safely or correctly.

Examples:

- Google Earth Engine access is required but unavailable.
- A required dataset/event cannot be selected without human confirmation.
- Credentials/API keys are required.
- Multiple technically valid choices would materially change the project and the documents do not specify which to use.
- Existing code conflicts with the architecture and cannot safely be reconciled.
- A destructive action could delete/overwrite important work.
- Deployment requires a human-owned account or secret.
- A scientific assumption would materially affect validity.

When asking:

1. Explain why you are blocked.
2. Give the exact required action/information.
3. Provide the recommended choice.
4. Do not ask multiple unnecessary questions at once.

---

# 5. Do Not Fabricate Data or Results

Never invent:

- datasets
- flood events
- model accuracy
- ROC-AUC
- PR-AUC
- precision
- recall
- F1
- IoU
- Dice score
- lead time
- probability
- feature importance
- validation results
- satellite observations
- rainfall values
- geographic coordinates
- historical flood extents

If something has not actually been calculated, clearly mark it as:

`NOT YET COMPUTED`

or

`PENDING VALIDATION`

Never create fake metrics just to make the dashboard look complete.

---

# 6. Scientific Validity

The project is a **prediction system**, not merely a flood detector.

For prediction timestamp `t`, all model input features must be available at or before `t`.

The target must represent future flooding:

`t + 1 ... t + H`

Do not use future information to predict the past.

### Bad

Use flood-day satellite imagery to "predict" flooding on the same day.

### Good

Use information available at `T-7` to predict flooding during the future target window.

Prevent:

- temporal leakage
- label leakage
- future rainfall leakage
- future satellite imagery leakage
- random neighboring-pixel leakage
- event contamination between train and test

Validation should be temporal/event-aware as specified by the project documents.

---

# 7. Satellite Data Rules

Use the exact data sources defined by `TRD.md`.

### Primary Satellite

**Sentinel-2 Level-2A Surface Reflectance**

Use appropriate:

- cloud/quality masking
- band selection
- timestamp handling
- spatial clipping
- reprojection
- resampling
- nodata handling

### Core Features

- B3
- B4
- B8
- B11
- NDWI
- rain_1d
- rain_3d
- rain_7d
- elevation
- slope

### NDWI

`(B3 - B8) / (B3 + B8)`

Document all preprocessing assumptions.

### Important Limitation

Sentinel-2 optical imagery can be affected by clouds, especially during Assam's monsoon season.

Do not hide this limitation.

If a fallback or improved satellite source such as Sentinel-1 is considered, do not silently change the project's scope. Document the change and ask for developer approval if it materially changes the architecture or requirements.

---

# 8. Risk Score

The model must ultimately produce a **spatial risk score from 0–100**.

If Random Forest produces:

`P(flood = 1)`

a transformation may be:

`risk_score = probability * 100`

Do not call the number a **calibrated probability** unless calibration has actually been performed and validated.

If uncalibrated, describe it as:

- `Model Risk Score`
- `Flood Risk Score`

The UI must make this distinction clear.

---

# 9. Geospatial Correctness

Every spatial processing step must verify:

- CRS
- projection
- resolution
- extent
- bounds
- grid alignment
- nodata
- pixel dimensions
- timestamps
- spatial clipping

The recommended MVP analysis grid is approximately **100 m**, unless project documents specify otherwise.

Do not claim that the final grid resolution is the same as the native resolution of every source.

Clearly distinguish:

- native source resolution
- processed analysis resolution
- displayed map resolution

---

# 10. Data Pipeline

The data pipeline should be reproducible.

Whenever possible, create scripts rather than manually processing data.

Recommended structure:

```text
gee/
    authentication/
    scripts/
    exports/

data/
    raw/
    interim/
    processed/
    labels/
    predictions/

ml/
    preprocessing/
    training/
    evaluation/
    inference/

models/

backend/

frontend/

docs/
```

Do not commit large generated datasets unnecessarily.

Use appropriate `.gitignore` rules.

---

# 11. Machine Learning Development

Start with the **baseline Random Forest model**.

Do not jump directly to deep learning.

The ML pipeline should include:

1. Dataset loading
2. Feature validation
3. Missing-value handling
4. Temporal split
5. Training
6. Validation
7. Evaluation
8. Model serialization
9. Metadata serialization
10. Inference
11. Spatial prediction generation

Save:

- trained model
- feature list
- training period
- validation period
- test period
- model version
- hyperparameters
- metrics
- preprocessing information

Example:

```text
models/
    flood_rf.joblib
    model_metadata.json
```

---

# 12. Model Validation

At minimum evaluate the metrics defined by `TRD.md`.

Potential metrics include:

- ROC-AUC
- PR-AUC
- precision
- recall
- F1
- Brier score/calibration where applicable
- spatial IoU
- spatial precision
- spatial recall
- Dice/F1

Also evaluate temporal behavior:

- when risk starts increasing
- threshold crossing time
- event time
- measured lead time

The system should demonstrate whether risk rises before a historical flood event.

Do not cherry-pick only successful events. Document failures.

---

# 13. Historical Event Validation

Choose at least one real historical flood event inside the supported dataset period.

Create an event manifest containing:

- event ID
- event name/description
- region
- start date
- peak date
- end date
- source
- observed flood data source
- prediction windows
- validation status

The actual event must be supported by real data.

Do not invent event boundaries.

---

# 14. Spatial Prediction Engine

The prediction engine should:

1. Load the selected prediction date.
2. Load/preprocess features available at that time.
3. Load the trained model.
4. Generate per-cell predictions.
5. Convert them to 0–100 risk scores.
6. Write a spatial raster.
7. Save metadata.
8. Make it available to the backend/frontend.

Example:

```text
data/predictions/
    2024-06-01.tif
    2024-06-05.tif
    ...
```

Metadata:

```text
data/predictions/
    2024-06-01.json
```

Do not train the model every time a user clicks the map.

Do not extract large satellite datasets every time a browser requests a point.

Historical predictions should be precomputed.

---

# 15. Backend

Implement the FastAPI backend according to `TRD.md`.

Expected API functionality:

```text
GET /health
GET /predictions
GET /risk-point
GET /timeline
GET /events
GET /metrics
```

Adapt endpoint names only if TRD specifies different names.

The backend should:

- validate parameters
- return useful errors
- handle missing dates
- handle invalid coordinates
- distinguish unsupported regions
- return prediction metadata
- return timestamps
- return risk scores
- avoid exposing secrets

---

# 16. Frontend

Build the React + Leaflet dashboard according to the PRD.

Core components:

- Map
- RiskLegend
- DateSelector
- LayerControl
- AreaInspector
- RiskCard
- Timeline
- HistoricalReplay
- ModelInfo
- AlertBanner

### UX Flow

```text
WORLD
  ↓
INDIA
  ↓
ASSAM
  ↓
HISTORICAL EVENT
  ↓
PREDICTION DATE
  ↓
RISK HEATMAP
  ↓
CLICK AREA
  ↓
RISK DETAILS
  ↓
TIMELINE
  ↓
OBSERVED FLOOD COMPARISON
  ↓
VALIDATION METRICS
```

Outside Assam, clearly communicate that the model is not validated/supported there. Do not imply global prediction capability.

---

# 17. UI Must Distinguish Prediction from Observation

Use clearly different labels for:

**PREDICTED FLOOD RISK**

and

**OBSERVED HISTORICAL FLOOD EXTENT**

Never visually imply that the observed flood layer was generated by the model.

Show:

- prediction timestamp
- satellite observation timestamp
- data availability timestamp where relevant
- prediction/data lag
- forecast horizon

---

# 18. Historical Replay

Implement a historical timeline.

Example:

```text
T-7
 ↓
T-5
 ↓
T-3
 ↓
T-2
 ↓
T-1
 ↓
EVENT DAY
```

Show how spatial risk changes.

Then reveal the observed historical flood extent.

The demo should make the prediction-vs-observation relationship obvious.

---

# 19. Alerts

If implemented, use configurable thresholds.

Example:

```text
0–24     Low
25–49    Moderate
50–74    High
75–89    Very High
90–100   Critical
```

These thresholds are UI/model-policy thresholds, not automatically scientifically meaningful thresholds.

Document how they are chosen.

Do not imply that `75` means a 75% chance unless the model is calibrated.

---

# 20. Explainability

After the baseline system works, implement feature importance/SHAP if appropriate.

Potential features:

- NDWI
- rainfall
- elevation
- slope
- spectral bands

Explain that feature importance indicates model behavior, not causal proof.

Do not claim that rainfall caused the flood based only on feature importance.

---

# 21. Code Quality

Write production-quality, readable code.

Requirements:

- clear naming
- modular functions
- type hints where appropriate
- useful docstrings
- configuration through environment variables
- no hard-coded secrets
- no unnecessary duplication
- meaningful logging
- error handling
- reproducibility

Avoid giant files.

Separate:

- data ingestion
- preprocessing
- training
- inference
- evaluation
- API
- frontend UI

---

# 22. Testing

Every phase must have appropriate validation.

### Data

- correct CRS
- correct extent
- correct timestamps
- correct resolution
- no unexpected nodata

### ML

- no leakage
- correct train/test split
- expected feature columns
- model loads successfully
- inference works

### Backend

- endpoint tests
- invalid parameter tests
- missing file tests

### Frontend

- map renders
- date selection works
- raster loads
- click inspection works
- timeline works
- errors display correctly

Run tests before marking a phase complete.

---

# 23. Documentation

Keep documentation synchronized with implementation.

Update:

- implementation status
- setup instructions
- data sources
- dataset manifests
- event manifests
- model metadata
- API documentation
- deployment instructions
- known limitations

If implementation differs from PRD/TRD:

**Do not silently change the documents.**

Explain the discrepancy and update documentation after the decision is made.

---

# 24. Git Practices

Use logical commits if Git is available.

Recommended structure:

```text
phase-0: environment setup
phase-1: dataset selection
phase-2: gee pipeline
phase-3: geospatial preprocessing
phase-4: flood labels
phase-5: training dataset
phase-6: random forest baseline
phase-7: historical validation
phase-8: spatial prediction engine
phase-9: fastapi backend
phase-10: react dashboard
phase-11: historical replay
phase-12: alerts and explainability
phase-13: testing and audit
phase-14: deployment and demo
```

Do not commit:

- API keys
- credentials
- `.env` files containing secrets
- massive temporary files
- cache directories
- unnecessary generated data

---

# 25. Autonomy Rule

Operate autonomously whenever possible.

If the next step is completely defined by the project documents and all required resources are available:

**DO IT.**

Do not stop merely to ask:

> Should I continue?

Continue to the next task.

Stop and ask the developer only when a genuine human decision/action is required.

---

# 26. Phase Completion Format

At the end of every phase, report:

```text
PHASE X — COMPLETE

Implemented:
- ...
- ...
- ...

Files created/modified:
- ...
- ...
- ...

Tests:
- ...
- ...

Verification:
- ...

Data:
- ...

Model:
- ...

Known limitations:
- ...

Developer action required:
- None
OR
- <specific action>

Next phase:
- PHASE X+1
```

Then continue automatically if there is no blocker.

---

# 27. Failure Handling

If something fails:

1. Read the error carefully.
2. Diagnose the root cause.
3. Attempt a safe fix.
4. Re-run the failed step.
5. Do not hide the failure.
6. Do not fabricate a successful result.
7. Document persistent failures.

If a dependency/API/data source is unavailable:

- determine whether an approved alternative exists in the project documents
- otherwise ask the developer

---

# 28. Important Product Positioning

The final project should be presented as:

> **A satellite/data-driven historical flood prediction research prototype for Assam.**

Do not claim:

- guaranteed flood prediction
- perfect accuracy
- global disaster prediction
- live satellite prediction
- guaranteed early warning
- "AI knows a flood is coming"

The system should honestly communicate:

- historical data
- supported region
- prediction horizon
- data limitations
- cloud limitations
- model limitations
- validation results
- satellite revisit limitations
- uncertainty

---

# 29. Final Hackathon Demo

At the end of development, prepare the application for a judge-facing demonstration.

### Ideal Flow

1. Open dashboard.
2. Show world map.
3. Zoom to India.
4. Zoom to Assam.
5. Select a validated historical flood event.
6. Select T-7.
7. Show predicted flood-risk heatmap.
8. Click a high-risk region.
9. Show risk score and feature values.
10. Show satellite/data timestamps.
11. Move timeline: `T-7 → T-5 → T-3 → T-2 → T-1 → Event`.
12. Demonstrate increasing/decreasing risk.
13. Reveal observed historical flood extent.
14. Compare prediction with observation.
15. Show quantitative validation metrics.
16. Show measured lead time.
17. Show model architecture.
18. Show limitations.
19. Explain how this could later be connected to automated near-real-time data ingestion.

The final demo must be reproducible.

---

# 30. Final Acceptance Criteria

Do not consider the project complete until:

- [ ] PRD requirements implemented
- [ ] TRD architecture implemented or documented deviations approved
- [ ] All phases completed
- [ ] Dataset manifest created
- [ ] Historical event manifest created
- [ ] Satellite pipeline works
- [ ] Supporting data pipeline works
- [ ] Geospatial preprocessing works
- [ ] Future flood labels exist
- [ ] Training dataset exists
- [ ] Random Forest model trained
- [ ] Temporal/event-aware validation completed
- [ ] Real metrics calculated
- [ ] Historical event validation completed
- [ ] Spatial risk rasters generated
- [ ] FastAPI backend works
- [ ] React + Leaflet frontend works
- [ ] Map risk visualization works
- [ ] Area inspection works
- [ ] Historical timeline works
- [ ] Prediction vs observed flood visualization works
- [ ] Alerts implemented/documented
- [ ] Explainability implemented/documented
- [ ] Automated/manual tests completed
- [ ] Scientific leakage audit completed
- [ ] Setup documentation completed
- [ ] Deployment instructions completed
- [ ] Demo workflow completed
- [ ] Known limitations documented
- [ ] No fabricated metrics or claims

---

# 31. Start Now

Start with:

**PHASE 0 — REQUIREMENTS & ENVIRONMENT**

First:

1. Read all project documents.
2. Inspect the repository.
3. Compare repository state with the planned architecture.
4. Create/update `docs/IMPLEMENTATION_STATUS.md`.
5. Determine what is already installed.
6. Determine what is missing.
7. Determine whether Google Earth Engine access is available.
8. Determine whether required data already exists.
9. Install/configure only what can safely be done automatically.
10. If developer action is genuinely required, stop and clearly explain exactly what is needed.
11. Otherwise continue through Phase 0.
12. After Phase 0, proceed to Phase 1 automatically.

Do not skip phases.

Do not fabricate data.

Do not fabricate model results.

Do not silently change the project's scope.

Build the project incrementally, verify every stage, and keep the implementation synchronized with the existing project documents.
