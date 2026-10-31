# Stage 5 — Submission Package Evidence

## 1. Submission Package Files & Inventory

All Devpost submission artifacts have been assembled in `submission/`:

| Artifact | File Path | Format & Dimensions | Size | Purpose |
|---|---|---|---|---|
| **Field Values** | `submission/fields.md` | Markdown text | 8.8 KB | Copy-paste ready fields for Devpost online form |
| **Submission Checklist** | `submission/checklist.md` | Markdown text | 4.2 KB | Human step-by-step submission operation checklist |
| **Project Thumbnail** | `submission/assets/thumbnail.png` | PNG, 1200x800 (3:2) | 400 KB | High-resolution tactical cover for project gallery |
| **Demo Video** | `submission/assets/demo.mp4` | MP4 (H.264/AAC, 1080p) | 7.35 MB | 81.3-second narrated demo video with burned-in subtitles |
| **Gallery Image 1** | `submission/assets/gallery-01-pitch-grid.png` | PNG, 1200x800 (3:2) | 255 KB | 18-Zone Spatial Pitch Danger Grid |
| **Gallery Image 2** | `submission/assets/gallery-02-zone-inspector.png` | PNG, 1200x800 (3:2) | 255 KB | Zone Deep-Dive Inspector |
| **Gallery Image 3** | `submission/assets/gallery-03-press-matrix.png` | PNG, 1200x800 (3:2) | 108 KB | Press-Resistance & Composure Scatter Plot |
| **Gallery Image 4** | `submission/assets/gallery-04-matchup-clash.png` | PNG, 1200x800 (3:2) | 127 KB | Tactical Matchup & Press Clash Simulator |
| **Gallery Image 5** | `submission/assets/gallery-05-opposition-brief.png` | PNG, 1200x800 (3:2) | 107 KB | Official Match Preparation Dossier & Press Triggers |
| **Gallery Image 6** | `submission/assets/gallery-06-validation-benchmarks.png` | PNG, 1200x800 (3:2) | 88 KB | Ground Truth Validation Benchmarks Table |

---

## 2. Verification of Public URLs

Both external public URLs were verified live with HTTP/2 HEAD requests:
1. **Live Deployed Web Application**:
   - URL: `https://aqx-sports.vercel.app`
   - Status: **HTTP/2 200 OK**
   - Content-Type: `text/html; charset=utf-8`
   - Playwright automated headless Chromium & Firefox testing: 16/16 tests passed.
2. **GitHub Public Open-Source Repository**:
   - URL: `https://github.com/Georgefifth/tactix-iq`
   - Status: **HTTP/2 200 OK**
   - Visibility: Public, MIT License, 0 secrets/tokens committed.

---

## 3. Human Submission Handoff Status
In accordance with `AGENTS.md` and `prompts/05-submission.md`:
- The AI agent does not log into Devpost, manipulate the web form, or click Submit.
- The complete submission package is assembled in `submission/`.
- Execution is now paused to allow the human user to paste the fields, upload the assets, and submit on Devpost.
