# QA Test Scenarios — TactixIQ

## Overview
TactixIQ is a pro-grade tactical football intelligence platform evaluating spatial turnover danger, press resistance, and counter-press triggers using StatsBomb event data.

All scenarios are validated in headless Firefox and Chromium across both Desktop (1440x900) and Mobile (390x844) viewports on both the deployed production site (`https://aqx-sports.vercel.app`) and the local build.

---

## Scenario Catalog & Prioritization

### P0 — Mission-Critical Core Workflows (Blocks Core Purpose)
- **`p0-landing-and-pitch`**: First visit / landing experience.
  - Assert page title, brand header, StatsBomb metadata badge.
  - Assert SVG pitch canvas renders with 18 distinct tactical zones and turnover vectors.
  - Assert zero horizontal page overflow (`scrollWidth <= innerWidth + 1`).
- **`p0-zone-spatial-inspection`**: Interactive 18-zone pitch coordinate slicing.
  - User clicks Zone 7 (Middle Left Wing) on the tactical pitch canvas.
  - Assert Zone Inspector updates to "Middle Left Wing (Zone 7)".
  - Assert Pitch Danger Index (PDI) gauge displays with threat classification.
  - Assert turnover causes (pass errors vs dispossessions) and key culprits (e.g. Marc Cucurella) are populated with non-zero stats.
- **`p0-squad-telemetry-switch`**: Multi-team tournament switching.
  - Switch team from Spain to England.
  - Assert team code, match count, total turnover tally (704 for England), and defensive third turnovers dynamically re-render.
  - Assert pitch zone hazard ratings update without page crash or console errors.
- **`p0-press-matrix-quadrant`**: Squad press-resistance & composure scatter plot.
  - Navigate to "Press Resistance" view.
  - Assert scatter quadrant canvas renders with volume and escape rate axes.
  - Filter by role ("Defender") and search by player name ("Stones").
  - Click player node or table row and assert detailed player gauge and tactical directive update.

### P1 — Major Tactical Flows & Resilience (High Friction if Broken)
- **`p1-matchup-simulator`**: Head-to-head opposition press clash.
  - Navigate to "Matchup Clash" view.
  - Select Team A (Pressing: Spain) vs Team B (Possession: England).
  - Assert Simulated Press Exploitation Score is calculated ($\in [0, 100]$).
  - Assert actionable tactical battle plan directives are generated.
- **`p1-opposition-brief`**: Official match preparation dossier & clipboard action.
  - Navigate to "Opposition Brief" view.
  - Assert Priority Press Triggers (Critical, High, Moderate) render with zone IDs and evidence.
  - Click "Copy Tactical Brief" and assert clipboard confirmation feedback ("Brief Copied!").
- **`p1-error-state-recovery`**: Pipeline error simulation and graceful recovery.
  - Trigger "Test Error" pipeline alert.
  - Assert clear error notification and instructions are visible.
  - Click "Reload Default Match Data" and assert seamless return to Spain default state with 0 console errors.

### P2 — Accessibility, Mock Toggle & Mobile Polish
- **`p2-mock-mode-toggle`**: Local sandbox dataset toggle.
  - Toggle "Live Data (StatsBomb)" to "Mock Dataset".
  - Assert active squad becomes "FC Tactix (Mock)" and values match simulation parameters.
- **`p2-responsive-and-accessibility`**: Responsive layout and keyboard ergonomics.
  - Verify 390px mobile layout stacks cleanly with touch-friendly zone inspection.
  - Verify Tab key navigation visits interactive navigation buttons and controls.
