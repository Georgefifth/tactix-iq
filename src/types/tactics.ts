export type ThirdType = 'defensive' | 'middle' | 'attacking';
export type LaneType = 'left-wing' | 'left-halfspace' | 'central-left' | 'central-right' | 'right-halfspace' | 'right-wing';

export interface TurnoverVector {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  player: string;
  minute: number;
  outcome: string;
  isConcededShot: boolean;
}

export interface KeyTurnoverPlayer {
  name: string;
  position: string;
  count: number;
  concededXg: number;
}

export interface TacticalZone {
  id: number;
  name: string;
  third: ThirdType;
  lane: LaneType;
  xRange: [number, number]; // [0..120]
  yRange: [number, number]; // [0..80]
  turnoverCount: number;
  turnoversPer90: number;
  concededShotsWithin15s: number;
  concededXgWithin15s: number;
  pitchDangerIndex: number; // 0..100
  dispossessedCount: number;
  miscontrolCount: number;
  misplacedPassCount: number;
  keyTurnoverPlayers: KeyTurnoverPlayer[];
  recentTurnoverVectors: TurnoverVector[];
}

export type PlayerClassification = 
  | 'Press-Resistant Engine'
  | 'Composed Distributor'
  | 'Contested Target'
  | 'Press Vulnerability';

export interface PlayerPressProfile {
  id: string | number;
  name: string;
  position: string;
  pressuresFaced: number;
  pressEscapeRate: number; // 0..100 (%)
  turnoversUnderPressure: number;
  progressiveYardsUnderPressure: number;
  sampleSize: number;
  classification: PlayerClassification;
}

export interface TacticalTrigger {
  id: string;
  title: string;
  triggerZone: string;
  zoneId: number;
  targetPlayer: string;
  instruction: string;
  evidenceStat: string;
  priority: 'CRITICAL' | 'HIGH' | 'MODERATE';
}

export interface TeamTacticalProfile {
  id: string;
  name: string;
  code: string;
  tournament: string;
  matchesPlayed: number;
  totalTurnovers: number;
  turnoversPerMatch: number;
  defensiveThirdTurnovers: number;
  middleThirdTurnovers: number;
  concededXgPostTurnover: number;
  overallPressEscapeRate: number;
  avgTimeToConcededShotSec: number;
  zones: Record<number, TacticalZone>;
  players: PlayerPressProfile[];
  tacticalTriggers: TacticalTrigger[];
}

export type ViewMode = 'pitch-command' | 'press-matrix' | 'matchup' | 'scouting-card';
