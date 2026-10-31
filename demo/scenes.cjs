// Scene specification for TactixIQ Demo Video
// AQX Sports Analytics Data Bowl 4.0 Entry

module.exports = [
  // Scene 1: Cover Title Card
  {
    name: "01-cover",
    card: {
      title: "TactixIQ Intelligence",
      kicker: "AQX Sports Analytics Data Bowl 4.0",
      sub: "Spatial turnover hazard and press-resistance intelligence from StatsBomb event telemetry",
      foot: "github.com/Georgefifth/tactix-iq · MIT Open Source",
      preset: "dark-premium",
      accent: "#10B981",
    },
    duration: 4.5,
    vo: "Welcome to TactixIQ, an open source football intelligence platform built for the AQX Sports Analytics Data Bowl.",
    pause: 0.3,
  },

  // Scene 2: The Transition Problem Slide
  {
    name: "02-problem",
    card: {
      title: "The Transition Problem",
      kicker: "Domain Challenge",
      sub: "Modern matches are decided in defensive transition, yet existing tools take hours of video tagging",
      foot: "Commercial tools cost up to fifty thousand dollars yearly",
      preset: "dark-premium",
      accent: "#EF4444",
      image: "demo/assets/slide-1-problem.png",
    },
    duration: 5.5,
    vo: "In modern football, elite matches are decided in transition. But existing video tools require twelve hours of manual tagging.",
    pause: 0.3,
  },

  // Scene 3: Live Pitch Command Studio
  {
    name: "03-live-pitch",
    url: "https://aqx-sports.vercel.app",
    actions: [
      { type: "waitFor", sel: "header", timeout: 15000 },
      { type: "wait", ms: 1000 },
      { type: "click", sel: 'button:has-text("Middle")' },
      { type: "wait", ms: 1200 },
      { type: "click", sel: 'button:has-text("All Thirds")' },
      { type: "wait", ms: 1500 },
    ],
    vo: "TactixIQ ingests thousands of StatsBomb events, partitioning the pitch into eighteen tactical zones with instant danger ratings.",
    pause: 0.3,
  },

  // Scene 4: Architecture Pipeline Slide
  {
    name: "04-architecture",
    card: {
      title: "Data Architecture",
      kicker: "Engineering Pipeline",
      sub: "Four-stage telemetry processing from raw event coordinates to prescriptive triggers",
      foot: "Sub-fifty millisecond local client response",
      preset: "dark-premium",
      accent: "#10B981",
      image: "demo/assets/slide-2-architecture.png",
    },
    duration: 5.5,
    vo: "Our pipeline looks forward fifteen seconds post turnover to quantify conceded shots and calculate the pitch danger index.",
    pause: 0.3,
  },

  // Scene 5: Live Press-Resistance Matrix
  {
    name: "05-live-press-matrix",
    url: "https://aqx-sports.vercel.app",
    actions: [
      { type: "waitFor", sel: "header", timeout: 15000 },
      { type: "click", sel: 'button:has-text("Press Resistance")' },
      { type: "waitFor", sel: 'text=PRESS-RESISTANT ENGINES', timeout: 10000 },
      { type: "wait", ms: 800 },
      { type: "click", sel: 'button:has-text("Defender")' },
      { type: "wait", ms: 1500 },
    ],
    vo: "The press resistance matrix measures player composure under counter pressing, separating press resistant engines from pressing targets.",
    pause: 0.3,
  },

  // Scene 6: Live Tactical Matchup Clash
  {
    name: "06-live-matchup",
    url: "https://aqx-sports.vercel.app",
    actions: [
      { type: "waitFor", sel: "header", timeout: 15000 },
      { type: "click", sel: 'button:has-text("Matchup Clash")' },
      { type: "waitFor", sel: 'h2:has-text("Tactical Matchup")', timeout: 10000 },
      { type: "wait", ms: 1800 },
    ],
    vo: "Our matchup clash simulator overlays pressing dynamics between tournament rivals to forecast tactical exploitation scores.",
    pause: 0.3,
  },

  // Scene 7: Live Opposition Briefing Dossier
  {
    name: "07-live-scouting-card",
    url: "https://aqx-sports.vercel.app",
    actions: [
      { type: "waitFor", sel: "header", timeout: 15000 },
      { type: "click", sel: 'button:has-text("Opposition Brief")' },
      { type: "waitFor", sel: 'h2:has-text("Opposition Press Triggers")', timeout: 10000 },
      { type: "wait", ms: 800 },
      { type: "click", sel: 'button:has-text("Copy Tactical Brief")' },
      { type: "wait", ms: 1500 },
    ],
    vo: "Coaching staff can export prioritized press triggers with exact zone instructions and statistical evidence in a single click.",
    pause: 0.3,
  },

  // Scene 8: Empirical Validation Evidence Slide
  {
    name: "08-validation",
    card: {
      title: "Ground Truth Validation",
      kicker: "Stage 3.5 Results",
      sub: "Empirical verification across fourteen thousand tournament events with hundred percent test suite pass",
      foot: "Validated against Euro 2024 and World Cup 2022 finals",
      preset: "dark-premium",
      accent: "#38BDF8",
      image: "demo/assets/slide-3-validation.png",
    },
    duration: 5.5,
    vo: "We rigorously validated our models against fifteen thousand tournament events across European Championship and World Cup finals.",
    pause: 0.3,
  },

  // Scene 9: Closing CTA Slide
  {
    name: "09-closing",
    card: {
      title: "Empowering Modern Coaches",
      kicker: "AQX Data Bowl 4.0",
      sub: "TactixIQ is live on Vercel and completely open source on GitHub",
      foot: "https://aqx-sports.vercel.app · github.com/Georgefifth/tactix-iq",
      preset: "dark-premium",
      accent: "#10B981",
      image: "demo/assets/slide-4-cta.png",
    },
    duration: 5.5,
    vo: "TactixIQ proves that elite sports analytics can be accessible, transparent, and actionable. Try it live today.",
    pause: 0.5,
  },
];
