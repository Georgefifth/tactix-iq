# Stage 4 — Demo Video & Presentation Deliverables

## 1. Executive Summary & Media Specifications
- **Video Title**: TactixIQ — Football Tactical Turnover & High-Press Resistance Intelligence System
- **Video Path**: `evidence/stage-4-demo/demo.mp4`
- **Duration**: **81.36 seconds** (01:21)
- **Resolution**: **1920x1080 (1080p FHD)**
- **Aspect Ratio**: 16:9 widescreen
- **Video Codec**: H.264 / AVC (30 fps, High Profile)
- **Audio Codec**: AAC (48,000 Hz, mono voiceover)
- **Voiceover**: Microsoft Edge Neural TTS (`en-US-AndrewNeural`)
- **Subtitles / Captions**: Baked-in ASS subtitles (DejaVu Sans Bold, 1080p positioned)
- **File Size**: **7.35 MB**
- **Capture Quality**: Zero frame dropping, zero capture errors (`timestamps.json` validated).

---

## 2. Storyboard Structure & Visual Narrative

The demo alternates between high-density designed presentation slides and live interactive software capture to maximize both credibility and explanatory impact:

| Scene # | Scene ID | Type | Content & Visual Technique | Duration |
|:---:|---|:---:|---|:---:|
| 1 | `01-cover` | Card | Title card in `dark-premium` preset: TactixIQ, AQX Sports Analytics Data Bowl 4.0, GitHub & license. | 5.4s |
| 2 | `02-problem` | Slide | `slide-1-problem.png`: The Modern Football Transition Problem. Side-by-side comparison of conventional 12-hour video scrubbing vs TactixIQ sub-second spatial diagnosis. | 6.5s |
| 3 | `03-live-pitch` | Live App | Live interactive 18-Zone Spatial Hazard Pitch with Spain Euro 2024 telemetry. Filtering thirds, showing turnover vectors and Pitch Danger Index (PDI). | 9.3s |
| 4 | `04-architecture` | Slide | `slide-2-architecture.png`: 4-stage engineering pipeline: Ingestion (3,600+ events) &rarr; Spatial Slicing &rarr; Hazard Modeling &rarr; Prescriptive Triggers. | 8.7s |
| 5 | `05-live-press-matrix` | Live App | Live Press-Resistance & Composure scatter plot. Filtering by Defender, showcasing Rodri / Carvajal positioning in the quadrant. | 9.0s |
| 6 | `06-live-matchup` | Live App | Live Tactical Matchup Clash simulator comparing Spain's high press against England's rest-defense structure. | 8.6s |
| 7 | `07-live-scouting-card` | Live App | Live Opposition Press Triggers Briefing Dossier. Clicking "Copy Tactical Brief" with instant visual confirmation ("Brief Copied!"). | 8.6s |
| 8 | `08-validation` | Slide | `slide-3-validation.png`: Stage 3.5 Ground Truth Verification (14,905 tournament events, 10/10 test suites passed across Euro 2024 & WC 2022). | 8.7s |
| 9 | `09-closing` | Slide | `slide-4-cta.png`: Summary of the 3 hackathon judging pillars (Practical Application, Analytical Insight, Data Presentation) with live links. | 9.6s |

---

## 3. Presentation Slides & Asset Inventory
All slide assets were authored in `demo/slides.html` and rendered into pristine 1920x1080 PNG images:
- `demo/assets/slide-1-problem.png` (102 KB)
- `demo/assets/slide-2-architecture.png` (81 KB)
- `demo/assets/slide-3-validation.png` (88 KB)
- `demo/assets/slide-4-cta.png` (81 KB)

---

## 4. Visual QA & Frame-Check Verification
Six time-coded reference frames were extracted and inspected with multimodal vision checks:
- `qa/frame-3.png` (00:03) — Verified: Crisp typography, emerald brand accent, subtitle baseline alignment.
- `qa/frame-12.png` (00:12) — Verified: High-contrast comparison layout, no caption-text collisions.
- `qa/frame-25.png` (00:25) — Verified: Interactive pitch canvas with zone highlight, turnover vectors, and HUD legend.
- `qa/frame-40.png` (00:40) — Verified: Press-Resistance quadrant scatter plot with volume and composure thresholds.
- `qa/frame-62.png` (01:02) — Verified: Opposition briefing dossier with "Brief Copied!" interactive feedback.
- `qa/frame-70.png` (01:10) — Verified: Empirical validation benchmark table matching Stage 3.5 ground truth.

All verification criteria from `prompts/04-demo.md` and `demo-recorder` are satisfied.
