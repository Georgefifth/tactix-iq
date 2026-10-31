# Devpost Submission Checklist — AQX Sports Analytics Data Bowl 4.0

This checklist guides the human through submitting TactixIQ to the hackathon.

> **Hackathon Page**: [https://aqxanalyticsfour.devpost.com/](https://aqxanalyticsfour.devpost.com/)  
> **Deadline**: November 1, 2026 @ 12:00 AM PDT (October 31st @ 11:59 PM PT)

---

## Pre-Submission Verification (Automated Checks Already Passed)
- [x] Public GitHub Repository: [https://github.com/Georgefifth/tactix-iq](https://github.com/Georgefifth/tactix-iq) (Public, clean, 0 secrets)
- [x] Live Deployed Web App: [https://aqx-sports.vercel.app](https://aqx-sports.vercel.app) (HTTP/2 200 OK verified)
- [x] Playwright End-to-End QA: 16/16 tests passed across Desktop and Mobile on production and local
- [x] Real-World Ground Truth Validation: 10/10 test cases passed against 14,905 tournament events
- [x] 1080p Narrated Demo Video: `submission/assets/demo.mp4` (81.3 seconds, 7.35 MB)
- [x] Thumbnail: `submission/assets/thumbnail.png` (1200x800, 3:2 ratio)
- [x] Image Gallery: 6 high-resolution 3:2 screenshots with captions &le; 150 characters

---

## Step-by-Step Submission Instructions

### Step 1: Open the Submission Form
1. Log into your Devpost account.
2. Navigate to [https://aqxanalyticsfour.devpost.com/](https://aqxanalyticsfour.devpost.com/).
3. Click the **"Enter submission"** or **"Create project"** button.

### Step 2: Basic Info
- **Project Name**: Copy from `submission/fields.md` Section 1:
  ```text
  TactixIQ — Football Tactical Turnover & High-Press Resistance Intelligence
  ```
- **Elevator Pitch**: Copy from `submission/fields.md` Section 2:
  ```text
  Open-source football tactical command studio mapping high-risk turnover zones, player press-resistance, and automated counter-press triggers from StatsBomb event telemetry.
  ```

### Step 3: Project Thumbnail
- Upload `submission/assets/thumbnail.png` (1200x800 px, 3:2 ratio, 400 KB).

### Step 4: About the Project (Story / Description)
- Copy the complete Markdown text from `submission/fields.md` Section 4 and paste it into the **"About the project"** text area.
- Verify sections appear:
  - `## Inspiration`
  - `## What it does`
  - `## How we built it`
  - `## Challenges we ran into`
  - `## Accomplishments that we're proud of`
  - `## What we learned`
  - `## What's next for TactixIQ`

### Step 5: Built With (Tags)
- In the **"Built with"** input, paste the tags from `submission/fields.md` Section 5:
  `react`, `typescript`, `vite`, `tailwindcss`, `statsbomb`, `sports-analytics`, `soccer`, `football`, `data-visualization`, `data-science`, `predictive-modeling`, `playwright`, `vercel`, `svg`, `d3`, `machine-learning`, `analytics`

### Step 6: Try It Out Links
- **Web App / Deployed URL**: `https://aqx-sports.vercel.app`
- **GitHub Repository**: `https://github.com/Georgefifth/tactix-iq`

### Step 7: Video Demo
- If Devpost allows uploading a video file directly: upload `submission/assets/demo.mp4`.
- If Devpost requires a video URL (e.g. YouTube or Vimeo):
  1. Upload `submission/assets/demo.mp4` to YouTube (set privacy to **Unlisted**).
  2. Paste the YouTube link into the Devpost video field.

### Step 8: Image Gallery
Upload the 6 images from `submission/assets/` and copy their exact English captions:
1. `gallery-01-pitch-grid.png` &rarr; `18-Zone Spatial Pitch Danger Grid displaying turnover density, conceded transition threat, and ball loss vectors.`
2. `gallery-02-zone-inspector.png` &rarr; `Zone Deep-Dive Inspector showing Pitch Danger Index, turnover causes distribution, and key responsible players.`
3. `gallery-03-press-matrix.png` &rarr; `Press-Resistance and Composure quadrant matrix separating press-resistant engines from high-vulnerability targets.`
4. `gallery-04-matchup-clash.png` &rarr; `Tactical Matchup and Press Clash Simulator comparing pressing dynamics and forecasting tactical exploitation scores.`
5. `gallery-05-opposition-brief.png` &rarr; `Official Match Preparation Dossier with prioritized opposition press trigger directives and statistical evidence.`
6. `gallery-06-validation-benchmarks.png` &rarr; `Stage 3.5 Real-World Ground Truth Validation benchmarks across 14,905 tournament events with 100% test suite pass.`

### Step 9: Final Review & Submit
1. Check the preview to make sure Markdown headers, math formulas, and images look crisp.
2. Ensure both `https://aqx-sports.vercel.app` and `https://github.com/Georgefifth/tactix-iq` links are clickable.
3. Click **"Save and submit"** / **"Submit project"**.

---

## Post-Submission Verification
Once submitted on Devpost:
- [ ] Devpost submission status shows "Submitted".
- [ ] Public project URL is active and readable.
- [ ] Thumbnail displays properly on the AQX Data Bowl 4.0 project gallery.
