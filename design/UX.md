# UX Contract — TactixIQ

> This document is the acceptance contract for the TactixIQ frontend: if the implementation does not match this file, the implementation is wrong.

## 1. Product

- **One-liner**: Pro-grade tactical football intelligence suite identifying high-risk turnover zones and press-resistance vulnerabilities from StatsBomb event data.
- **Primary user**: Football tactical analysts, opposition scouts, and coaching staff preparing match plans.
- **Job to be done**: In under 60 seconds, analyze where an opponent turns over the ball under high pressure, identify which players are vulnerable to counter-pressing, and generate actionable press-trigger scouting instructions.
- **Core success action**: Select a team/match, click a high-risk pitch zone or player, inspect the turnover-to-hazard breakdown, and export or copy the tactical scouting card.
- **What the user should never have to guess**:
  - Exactly what metric the pitch heatmap represents (Pitch Danger Index = turnover volume x conceded xG within 15s).
  - Whether a player's press resistance is based on 3 events or 50 events (sample size is clearly badged).
  - How to switch between Team Overview, Head-to-Head Tactical Matchup, and Player Press Profiles.

## 2. Core Flow

| # | Step | User Action | System Feedback | Next Step Obvious? |
|---|---|---|---|---|
| 1 | Select Team or Match | Click team selector (e.g. "Spain", "England", "Germany") or tournament match (e.g. Euro 2024 Final) | Pitch immediately updates with team's spatial turnover distribution, zone danger score, and press metrics | Yes: Pitch zones highlight high-risk hotspots |
| 2 | Inspect High-Risk Zone | Click or hover on any pitch zone (e.g. Zone 4: Defensive Half-Space) | Side inspector displays exact turnover events, dispossessions vs misplaced passes, time-to-shot conceded, and responsible players | Yes: Player vulnerability list is spotlighted |
| 3 | Drill into Press Resistance | Switch to "Press Resistance" tab or click a player | Quadrant scatter plot highlights "Press Engines" vs "Press Vulnerabilities", showing escape rate % and progressive yards under pressure | Yes: Tactical Press Triggers card is generated |
| 4 | Generate Matchup Plan | Open "Tactical Matchup" simulator to compare Team A Pressing vs Team B Escape | Displays tactical mismatch overlay: where Team A's press triggers overlap with Team B's turnover clusters | Yes: Exportable Tactical Scouting Card ready |

Target: ≤ **3 steps** and ≤ **30 seconds** from landing to actionable tactical insight.

## 3. Pages / Views

TactixIQ is architected as an integrated single-page tactical command studio with 4 high-density view modes:

| Mode / View | Purpose | Primary Action | Secondary Actions |
|---|---|---|---|
| **1. Pitch Command (Spatial Threat)** | Interactive 18-zone pitch showing turnover hotspots & conceded shot danger | Click zone to inspect turnover events & player blame | Filter by Match Phase (0-30', 30-60', 60-90'), Thirds (Def/Mid/Att) |
| **2. Press Resistance Matrix** | Scatter/Quadrant analysis of player composure under pressure | Filter by player position (Defenders, Midfielders, Attackers) | Sort by Escape Rate, Pressures Faced, Turnovers Conceded |
| **3. Matchup Mismatch Simulator** | Head-to-head tactical overlay between any two tournament teams | Toggle Team A Press vs Team B Vulnerabilities | Run simulated press vulnerability score |
| **4. Opposition Scouting Card** | Printable/exportable tactical brief with automated coaching triggers | Click "Copy Tactical Brief" or "Export Scouting Card" | Customize press trigger zones & priority target players |

One primary action per screen view. No clutter, no ambiguous buttons.

## 4. Required States

For every view and interactive component:

- [x] **Empty / First Visit**: Clear default loaded state (UEFA Euro 2024 Champions: Spain vs England Final) with guidance overlay: *"Click any zone on the pitch or select a team to begin tactical diagnosis"*.
- [x] **Loading**: Subtle pitch radar scan line animation across the SVG pitch canvas with metric skeleton loaders; no frozen UI.
- [x] **Success**: Instant visual feedback; selected zone highlighted with tactical bounding box, metric counters animate smoothly into place.
- [x] **Error**: Clear error notification bar if offline or missing match payload, with a one-click *"Reset to Euro 2024 Default"* button.
- [x] **Invalid Input / No Data**: If a filtered combination has 0 events (e.g. Attacking third turnovers in minutes 0-15), displays *"No turnovers recorded in this sector for the selected interval"* with suggestions to broaden time filter.
- [x] **No Permission / Signed Out**: 100% open-source tool, zero paywall, no login required.
- [x] **Mobile 390px Layout**: Vertically stacked pitch canvas with horizontal zone swipe/tab selector and touch-optimized bottom sheet drawer for tactical details.

## 5. Design Tokens

- **Font Family**:
  - UI & Headings: `Inter`, system sans-serif (`font-sans`), tight letter spacing.
  - Metrics, Coordinates, Timestamps: `JetBrains Mono`, `ui-monospace` (`font-mono`) for precision alignment.
- **Spacing Scale**: 4px base (`p-1`=4px, `p-2`=8px, `p-3`=12px, `p-4`=16px, `p-6`=24px, `p-8`=32px).
- **Colors**:
  - `bg-void`: `#080C0E` (Deep pitch night background)
  - `bg-surface`: `#0F171B` (Tactical console panels)
  - `bg-card`: `#152228` (Tactical cards and inspector)
  - `border-tactical`: `#1E313B` (Subtle pitch grid line borders)
  - `pitch-turf`: `#0B1E19` (Tactical pitch canvas)
  - `pitch-lines`: `#2D5A4C` (Pitch chalk boundaries and boxes)
  - `text-primary`: `#F1F5F9` (Crisp tactical white)
  - `text-muted`: `#94A3B8` (Slate secondary annotations)
  - `accent-emerald`: `#10B981` (Press escape success, high composure, low risk)
  - `accent-amber`: `#F59E0B` (Medium turnover risk, transitional threat)
  - `accent-crimson`: `#EF4444` (Critical danger zone, high conceded xG, press trigger)
- **Radius & Borders**: Crisp, technical geometry (`rounded-lg` 8px max, `border border-tactical`). No bubbly, oversized roundings.
- **Button & Input Height**: Touch targets $\ge 44\text{px}$ on mobile; compact $36\text{px}$ on desktop with keyboard accessibility.
- **Icon Style**: Linear technical SVG icons (Lucide React), 1.75px stroke width.

## 6. References

| Reference | What to Borrow | What NOT to Copy |
|---|---|---|
| **StatsBomb IQ** | 18-zone pitch coordinate partition, pressure event modeling | Proprietary subscription paywall, closed UI, complex nested dropdowns |
| **Opta Vision Press Visuals** | Color-ramped tactical heat zones and transition risk arrows | Broadcast-only branding, TV graphic overlays |
| **Wyscout Video Tagging** | Match phase timeline categorization (0-15', 15-30', etc.) | Slow Java-like table layouts, clunky video player scrubber |

## 7. Mobile Layout (390px Viewport)

- **Layout Structure**: Single column responsive stack.
- **Top Bar**: Sticky header (44px) with Team Switcher and View Tab Selector.
- **Pitch Canvas**: Aspect-ratio constrained 2D pitch with horizontal orientation or tactical half-pitch toggle; tap to inspect zone.
- **Bottom Drawer**: Slide-up tactical drawer displaying zone hazard breakdown, player blame, and press triggers.
- **Touch Targets**: All zone hitboxes expanded to $\ge 44\times 44\text{px}$ touch targets. Zero horizontal document overflow (`overflow-x-hidden`).

## 8. Visual Direction

- **Three Adjectives**: **Surgical**, **Pitch-Grounded**, **High-Density**.
- **Product Archetype**: **Canvas / Command Studio** (Interactive tactical pitch is the central workspace).
- **Palette Rationale**: High-contrast tactical night aesthetic (`#080C0E` pitch void, `#10B981` turf emerald, `#EF4444` threat crimson). Evokes professional coaching video analysis rooms and elite match-preparation tablets.
- **Type Pairing**: Strict separation between `Inter` for clean tactical labels and `JetBrains Mono` for spatial coordinates, xG values, and time counters.
- **Density**: High-density information architecture. Coaches need immediate situational awareness without having to scroll through empty decorative margins.
- **Signature Element**: **The 18-Zone Spatial Hazard Pitch & Press Vector Telestrator** — interactive SVG football pitch with real-time zone hazard scoring, turnover vectors, and instant coaching trigger cards.
- **Motion Rules**: Fast (150ms) linear feedback transitions on zone hover/selection and metric updates; zero decorative bouncing, floating particles, or idle spinning animations.
- **Rejected Clichés**:
  - NO purple or blue generic gradients.
  - NO frosted glassmorphism blur effects.
  - NO 3-column generic marketing landing cards.
  - NO toy emojis as navigation icons.
  - NO abstract floating blobs.

**Generic Test Verdict**: If this UI is stripped of text, the tactical football pitch, 18-zone coordinate lines, and turnover vectors immediately identify it as an elite football analytics platform. It cannot be mistaken for a generic SaaS or crypto dashboard.

## 9. UX Acceptance Criteria

- [x] A first-time user can identify the highest turnover danger zone within 3 seconds of opening the tool.
- [x] Clicking any zone updates the detail pane in $<50\text{ms}$ with zero layout shift.
- [x] Switching between teams (e.g. Spain, England, Germany, France) instantly swaps pitch telemetry.
- [x] Mobile 390px view allows full interactive zone inspection without horizontal scrolling.
- [x] Scouting cards provide concrete, human-readable tactical coaching instructions (e.g. "Trigger high-press on Zone 4 when Left-Back receives under pressure").
- [x] 100% client-side stability with zero external API rate limits or network dependencies.
