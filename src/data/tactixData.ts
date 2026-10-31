import { TeamTacticalProfile } from '../types/tactics';
import rawData from './tactixData.json';
import { MOCK_TEAM } from './mockData';

export const REAL_TEAMS: Record<string, TeamTacticalProfile> = rawData as unknown as Record<string, TeamTacticalProfile>;

export const ALL_TEAMS: Record<string, TeamTacticalProfile> = {
  ...REAL_TEAMS,
  'Mock Demo FC': MOCK_TEAM
};

export const AVAILABLE_TEAM_NAMES = Object.keys(ALL_TEAMS);

export function getTeam(name: string): TeamTacticalProfile {
  return ALL_TEAMS[name] || ALL_TEAMS['Spain'] || MOCK_TEAM;
}
