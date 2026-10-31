import { TeamTacticalProfile } from '../types/tactics';

export const MOCK_TEAM: TeamTacticalProfile = {
  id: 'demo-fc',
  name: 'FC Tactix (Mock)',
  code: 'DEMO',
  tournament: 'Tactical Simulation Suite',
  matchesPlayed: 5,
  totalTurnovers: 480,
  turnoversPerMatch: 96.0,
  defensiveThirdTurnovers: 84,
  middleThirdTurnovers: 242,
  concededXgPostTurnover: 3.42,
  overallPressEscapeRate: 64.5,
  avgTimeToConcededShotSec: 8.2,
  zones: {
    1: {
      id: 1,
      name: "Defensive Left Wing",
      third: "defensive",
      lane: "left-wing",
      xRange: [0, 40],
      yRange: [0, 18],
      turnoverCount: 16,
      turnoversPer90: 3.2,
      concededShotsWithin15s: 1,
      concededXgWithin15s: 0.18,
      pitchDangerIndex: 42.5,
      dispossessedCount: 5,
      miscontrolCount: 4,
      misplacedPassCount: 7,
      keyTurnoverPlayers: [
        { name: "L. Davies", position: "Left Back", count: 7, concededXg: 0.12 },
        { name: "K. Miller", position: "Center Back", count: 4, concededXg: 0.06 }
      ],
      recentTurnoverVectors: [
        { startX: 24.5, startY: 12.0, endX: 34.0, endY: 15.0, player: "L. Davies", minute: 18, outcome: "misplaced_pass", isConcededShot: false },
        { startX: 18.2, startY: 8.5, endX: 20.0, endY: 10.0, player: "L. Davies", minute: 42, outcome: "dispossessed", isConcededShot: true }
      ]
    },
    2: {
      id: 2,
      name: "Defensive Left Half-Space",
      third: "defensive",
      lane: "left-halfspace",
      xRange: [0, 40],
      yRange: [18, 30],
      turnoverCount: 19,
      turnoversPer90: 3.8,
      concededShotsWithin15s: 2,
      concededXgWithin15s: 0.44,
      pitchDangerIndex: 68.2,
      dispossessedCount: 7,
      miscontrolCount: 3,
      misplacedPassCount: 9,
      keyTurnoverPlayers: [
        { name: "M. Kovac", position: "Defensive Midfielder", count: 9, concededXg: 0.32 },
        { name: "L. Davies", position: "Left Back", count: 5, concededXg: 0.08 }
      ],
      recentTurnoverVectors: [
        { startX: 28.0, startY: 24.0, endX: 35.0, endY: 26.0, player: "M. Kovac", minute: 31, outcome: "dispossessed", isConcededShot: true }
      ]
    },
    3: {
      id: 3,
      name: "Defensive Central Left",
      third: "defensive",
      lane: "central-left",
      xRange: [0, 40],
      yRange: [30, 40],
      turnoverCount: 14,
      turnoversPer90: 2.8,
      concededShotsWithin15s: 1,
      concededXgWithin15s: 0.28,
      pitchDangerIndex: 58.0,
      dispossessedCount: 4,
      miscontrolCount: 2,
      misplacedPassCount: 8,
      keyTurnoverPlayers: [
        { name: "M. Kovac", position: "Defensive Midfielder", count: 6, concededXg: 0.18 }
      ],
      recentTurnoverVectors: []
    },
    4: {
      id: 4,
      name: "Defensive Central Right",
      third: "defensive",
      lane: "central-right",
      xRange: [0, 40],
      yRange: [40, 50],
      turnoverCount: 18,
      turnoversPer90: 3.6,
      concededShotsWithin15s: 3,
      concededXgWithin15s: 0.72,
      pitchDangerIndex: 94.0,
      dispossessedCount: 8,
      miscontrolCount: 3,
      misplacedPassCount: 7,
      keyTurnoverPlayers: [
        { name: "J. Stones", position: "Center Back", count: 8, concededXg: 0.48 },
        { name: "D. Rice", position: "Pivot", count: 6, concededXg: 0.24 }
      ],
      recentTurnoverVectors: [
        { startX: 22.0, startY: 44.0, endX: 26.0, endY: 48.0, player: "J. Stones", minute: 23, outcome: "dispossessed", isConcededShot: true }
      ]
    },
    5: {
      id: 5,
      name: "Defensive Right Half-Space",
      third: "defensive",
      lane: "right-halfspace",
      xRange: [0, 40],
      yRange: [50, 62],
      turnoverCount: 17,
      turnoversPer90: 3.4,
      concededShotsWithin15s: 2,
      concededXgWithin15s: 0.35,
      pitchDangerIndex: 65.4,
      dispossessedCount: 6,
      miscontrolCount: 4,
      misplacedPassCount: 7,
      keyTurnoverPlayers: [
        { name: "K. Walker", position: "Right Back", count: 8, concededXg: 0.21 }
      ],
      recentTurnoverVectors: []
    },
    6: {
      id: 6,
      name: "Defensive Right Wing",
      third: "defensive",
      lane: "right-wing",
      xRange: [0, 40],
      yRange: [62, 80],
      turnoverCount: 20,
      turnoversPer90: 4.0,
      concededShotsWithin15s: 1,
      concededXgWithin15s: 0.15,
      pitchDangerIndex: 44.0,
      dispossessedCount: 9,
      miscontrolCount: 5,
      misplacedPassCount: 6,
      keyTurnoverPlayers: [
        { name: "K. Walker", position: "Right Back", count: 9, concededXg: 0.11 }
      ],
      recentTurnoverVectors: []
    },
    7: {
      id: 7,
      name: "Middle Left Wing",
      third: "middle",
      lane: "left-wing",
      xRange: [40, 80],
      yRange: [0, 18],
      turnoverCount: 42,
      turnoversPer90: 8.4,
      concededShotsWithin15s: 1,
      concededXgWithin15s: 0.12,
      pitchDangerIndex: 52.0,
      dispossessedCount: 14,
      miscontrolCount: 9,
      misplacedPassCount: 19,
      keyTurnoverPlayers: [
        { name: "F. Kostic", position: "Left Midfielder", count: 18, concededXg: 0.08 }
      ],
      recentTurnoverVectors: []
    },
    8: {
      id: 8,
      name: "Middle Left Half-Space",
      third: "middle",
      lane: "left-halfspace",
      xRange: [40, 80],
      yRange: [18, 30],
      turnoverCount: 48,
      turnoversPer90: 9.6,
      concededShotsWithin15s: 3,
      concededXgWithin15s: 0.38,
      pitchDangerIndex: 78.5,
      dispossessedCount: 18,
      miscontrolCount: 11,
      misplacedPassCount: 19,
      keyTurnoverPlayers: [
        { name: "M. Kovac", position: "Defensive Midfielder", count: 21, concededXg: 0.22 }
      ],
      recentTurnoverVectors: []
    },
    9: {
      id: 9,
      name: "Middle Central Left",
      third: "middle",
      lane: "central-left",
      xRange: [40, 80],
      yRange: [30, 40],
      turnoverCount: 39,
      turnoversPer90: 7.8,
      concededShotsWithin15s: 2,
      concededXgWithin15s: 0.26,
      pitchDangerIndex: 62.0,
      dispossessedCount: 15,
      miscontrolCount: 8,
      misplacedPassCount: 16,
      keyTurnoverPlayers: [
        { name: "L. Modric", position: "Central Midfielder", count: 12, concededXg: 0.14 }
      ],
      recentTurnoverVectors: []
    },
    10: {
      id: 10,
      name: "Middle Central Right",
      third: "middle",
      lane: "central-right",
      xRange: [40, 80],
      yRange: [40, 50],
      turnoverCount: 44,
      turnoversPer90: 8.8,
      concededShotsWithin15s: 4,
      concededXgWithin15s: 0.54,
      pitchDangerIndex: 88.0,
      dispossessedCount: 19,
      miscontrolCount: 10,
      misplacedPassCount: 15,
      keyTurnoverPlayers: [
        { name: "D. Rice", position: "Pivot", count: 17, concededXg: 0.36 }
      ],
      recentTurnoverVectors: []
    },
    11: {
      id: 11,
      name: "Middle Right Half-Space",
      third: "middle",
      lane: "right-halfspace",
      xRange: [40, 80],
      yRange: [50, 62],
      turnoverCount: 38,
      turnoversPer90: 7.6,
      concededShotsWithin15s: 2,
      concededXgWithin15s: 0.22,
      pitchDangerIndex: 61.2,
      dispossessedCount: 13,
      miscontrolCount: 8,
      misplacedPassCount: 17,
      keyTurnoverPlayers: [
        { name: "B. Saka", position: "Winger", count: 14, concededXg: 0.12 }
      ],
      recentTurnoverVectors: []
    },
    12: {
      id: 12,
      name: "Middle Right Wing",
      third: "middle",
      lane: "right-wing",
      xRange: [40, 80],
      yRange: [62, 80],
      turnoverCount: 31,
      turnoversPer90: 6.2,
      concededShotsWithin15s: 0,
      concededXgWithin15s: 0.0,
      pitchDangerIndex: 38.0,
      dispossessedCount: 12,
      miscontrolCount: 7,
      misplacedPassCount: 12,
      keyTurnoverPlayers: [
        { name: "B. Saka", position: "Winger", count: 15, concededXg: 0.0 }
      ],
      recentTurnoverVectors: []
    },
    13: {
      id: 13,
      name: "Attacking Left Wing",
      third: "attacking",
      lane: "left-wing",
      xRange: [80, 120],
      yRange: [0, 18],
      turnoverCount: 29,
      turnoversPer90: 5.8,
      concededShotsWithin15s: 0,
      concededXgWithin15s: 0.0,
      pitchDangerIndex: 22.0,
      dispossessedCount: 16,
      miscontrolCount: 6,
      misplacedPassCount: 7,
      keyTurnoverPlayers: [{ name: "P. Foden", position: "Attacker", count: 14, concededXg: 0.0 }],
      recentTurnoverVectors: []
    },
    14: {
      id: 14,
      name: "Attacking Left Half-Space",
      third: "attacking",
      lane: "left-halfspace",
      xRange: [80, 120],
      yRange: [18, 30],
      turnoverCount: 34,
      turnoversPer90: 6.8,
      concededShotsWithin15s: 1,
      concededXgWithin15s: 0.08,
      pitchDangerIndex: 32.0,
      dispossessedCount: 18,
      miscontrolCount: 9,
      misplacedPassCount: 7,
      keyTurnoverPlayers: [{ name: "J. Bellingham", position: "Attacking Mid", count: 16, concededXg: 0.08 }],
      recentTurnoverVectors: []
    },
    15: {
      id: 15,
      name: "Attacking Central Left",
      third: "attacking",
      lane: "central-left",
      xRange: [80, 120],
      yRange: [30, 40],
      turnoverCount: 24,
      turnoversPer90: 4.8,
      concededShotsWithin15s: 0,
      concededXgWithin15s: 0.0,
      pitchDangerIndex: 20.0,
      dispossessedCount: 13,
      miscontrolCount: 5,
      misplacedPassCount: 6,
      keyTurnoverPlayers: [{ name: "H. Kane", position: "Striker", count: 11, concededXg: 0.0 }],
      recentTurnoverVectors: []
    },
    16: {
      id: 16,
      name: "Attacking Central Right",
      third: "attacking",
      lane: "central-right",
      xRange: [80, 120],
      yRange: [40, 50],
      turnoverCount: 26,
      turnoversPer90: 5.2,
      concededShotsWithin15s: 0,
      concededXgWithin15s: 0.0,
      pitchDangerIndex: 21.5,
      dispossessedCount: 14,
      miscontrolCount: 6,
      misplacedPassCount: 6,
      keyTurnoverPlayers: [{ name: "H. Kane", position: "Striker", count: 12, concededXg: 0.0 }],
      recentTurnoverVectors: []
    },
    17: {
      id: 17,
      name: "Attacking Right Half-Space",
      third: "attacking",
      lane: "right-halfspace",
      xRange: [80, 120],
      yRange: [50, 62],
      turnoverCount: 32,
      turnoversPer90: 6.4,
      concededShotsWithin15s: 1,
      concededXgWithin15s: 0.07,
      pitchDangerIndex: 30.5,
      dispossessedCount: 17,
      miscontrolCount: 7,
      misplacedPassCount: 8,
      keyTurnoverPlayers: [{ name: "B. Saka", position: "Winger", count: 15, concededXg: 0.07 }],
      recentTurnoverVectors: []
    },
    18: {
      id: 18,
      name: "Attacking Right Wing",
      third: "attacking",
      lane: "right-wing",
      xRange: [80, 120],
      yRange: [62, 80],
      turnoverCount: 29,
      turnoversPer90: 5.8,
      concededShotsWithin15s: 0,
      concededXgWithin15s: 0.0,
      pitchDangerIndex: 19.5,
      dispossessedCount: 15,
      miscontrolCount: 8,
      misplacedPassCount: 6,
      keyTurnoverPlayers: [{ name: "B. Saka", position: "Winger", count: 16, concededXg: 0.0 }],
      recentTurnoverVectors: []
    }
  },
  players: [
    {
      id: 'rodri',
      name: 'Rodri (Cascante)',
      position: 'Defensive Midfielder',
      pressuresFaced: 42,
      pressEscapeRate: 88.1,
      turnoversUnderPressure: 3,
      progressiveYardsUnderPressure: 284.5,
      sampleSize: 42,
      classification: 'Press-Resistant Engine'
    },
    {
      id: 'rice',
      name: 'Declan Rice',
      position: 'Defensive Midfielder',
      pressuresFaced: 38,
      pressEscapeRate: 78.9,
      turnoversUnderPressure: 6,
      progressiveYardsUnderPressure: 192.0,
      sampleSize: 38,
      classification: 'Composed Distributor'
    },
    {
      id: 'stones',
      name: 'John Stones',
      position: 'Center Back',
      pressuresFaced: 28,
      pressEscapeRate: 71.4,
      turnoversUnderPressure: 8,
      progressiveYardsUnderPressure: 110.0,
      sampleSize: 28,
      classification: 'Press Vulnerability'
    },
    {
      id: 'saka',
      name: 'Bukayo Saka',
      position: 'Right Wing',
      pressuresFaced: 45,
      pressEscapeRate: 80.0,
      turnoversUnderPressure: 7,
      progressiveYardsUnderPressure: 312.0,
      sampleSize: 45,
      classification: 'Composed Distributor'
    },
    {
      id: 'bellingham',
      name: 'Jude Bellingham',
      position: 'Attacking Midfielder',
      pressuresFaced: 52,
      pressEscapeRate: 82.7,
      turnoversUnderPressure: 6,
      progressiveYardsUnderPressure: 275.0,
      sampleSize: 52,
      classification: 'Press-Resistant Engine'
    },
    {
      id: 'kane',
      name: 'Harry Kane',
      position: 'Striker',
      pressuresFaced: 34,
      pressEscapeRate: 67.6,
      turnoversUnderPressure: 11,
      progressiveYardsUnderPressure: 85.0,
      sampleSize: 34,
      classification: 'Press Vulnerability'
    }
  ],
  tacticalTriggers: [
    {
      id: 'mock-trig-1',
      title: 'High-Risk Press Trap: Defensive Central Right',
      triggerZone: 'Defensive Central Right',
      zoneId: 4,
      targetPlayer: 'John Stones',
      instruction: 'Trigger coordinated 2-man trap when pass enters Zone 4 under backline circulation. Press escape rate collapses to 71.4%.',
      evidenceStat: 'PDI: 94.0/100, 18 turnovers conceded, resulting in 3 shots conceded in under 15 seconds.',
      priority: 'CRITICAL'
    },
    {
      id: 'mock-trig-2',
      title: 'Isolate Ball-Retention in Middle Pivot',
      triggerZone: 'Middle Central Right',
      zoneId: 10,
      targetPlayer: 'Declan Rice',
      instruction: 'Funnel possession into Zone 10 and shade passing lanes to lateral wings. Forces 44 turnovers across 5 matches.',
      evidenceStat: '4 conceded shots within 15s post-turnover. Second highest transition hazard sector.',
      priority: 'HIGH'
    },
    {
      id: 'mock-trig-3',
      title: 'Exploit 8.2-Second Transition Window',
      triggerZone: 'Transition Channel',
      zoneId: 9,
      targetPlayer: 'Defensive Transition Rest Structure',
      instruction: 'Strike directly into open half-spaces within 8.2s before the central midfield pivot drops into a low block.',
      evidenceStat: 'Average opponent transition shot conceded at 8.2 seconds post-turnover.',
      priority: 'MODERATE'
    }
  ]
};
