import React, { useState } from 'react';
import { TeamTacticalProfile } from '../types/tactics';
import { ALL_TEAMS } from '../data/tactixData';
import { Swords, ShieldAlert, Zap, Target } from 'lucide-react';

interface MatchupSimulatorProps {
  initialTeamA: string;
  initialTeamB: string;
}

export const MatchupSimulator: React.FC<MatchupSimulatorProps> = ({
  initialTeamA,
  initialTeamB
}) => {
  const [teamAName, setTeamAName] = useState<string>(initialTeamA || 'Spain');
  const [teamBName, setTeamBName] = useState<string>(initialTeamB || 'England');

  const teamA: TeamTacticalProfile = ALL_TEAMS[teamAName] || ALL_TEAMS['Spain'];
  const teamB: TeamTacticalProfile = ALL_TEAMS[teamBName] || ALL_TEAMS['England'];

  // Calculate tactical mismatch
  // Find Team B's most dangerous defensive/middle turnover zone
  const teamBHighRiskZones = Object.values(teamB.zones)
    .filter(z => z.third === 'defensive' || z.third === 'middle')
    .sort((a, b) => b.pitchDangerIndex - a.pitchDangerIndex);

  const topVulnerability = teamBHighRiskZones[0];

  // Team B vulnerable players
  const teamBVulnerablePlayers = teamB.players
    .filter(p => p.classification === 'Press Vulnerability' || p.pressEscapeRate < 72)
    .slice(0, 3);

  // Mismatch Exploitation Index
  const pressAdvantageScore = Math.min(
    95,
    Math.round((teamA.overallPressEscapeRate * 0.4) + (topVulnerability.pitchDangerIndex * 0.5) + 5)
  );

  return (
    <div className="bg-surface border border-tactical rounded-xl p-5 flex flex-col gap-5 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-tactical/70 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-amber-400" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              Tactical Matchup & Press Clash Simulator
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate opposition tactical collisions by overlaying pressing dynamics and turnover vulnerability zones.
          </p>
        </div>

        {/* Team Matchup Selectors */}
        <div className="flex items-center gap-2 bg-void p-1.5 rounded-lg border border-tactical">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">PRESSING SQUAD:</span>
            <select
              value={teamAName}
              onChange={(e) => setTeamAName(e.target.value)}
              className="bg-panel border border-tactical rounded px-2.5 py-1 text-xs text-white font-semibold focus:outline-none focus:border-emerald-500"
            >
              {Object.keys(ALL_TEAMS).map((name) => (
                <option key={name} value={name} disabled={name === teamBName}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <span className="text-xs font-bold text-amber-400 px-1 font-mono">VS</span>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-crimson-400 font-bold uppercase">POSSESSION SQUAD:</span>
            <select
              value={teamBName}
              onChange={(e) => setTeamBName(e.target.value)}
              className="bg-panel border border-tactical rounded px-2.5 py-1 text-xs text-white font-semibold focus:outline-none focus:border-crimson-500"
            >
              {Object.keys(ALL_TEAMS).map((name) => (
                <option key={name} value={name} disabled={name === teamAName}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Clash Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Team A Card */}
        <div className="bg-panel border border-emerald-800/50 rounded-xl p-4 flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                ATTACKING PRESS PROFILE
              </span>
              <span className="text-xs font-mono text-slate-400">{teamA.tournament}</span>
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">{teamA.name}</h3>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-tactical/60">
              <span className="text-slate-400">Press Escape Rate:</span>
              <span className="text-emerald-400 font-bold">{teamA.overallPressEscapeRate}%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-tactical/60">
              <span className="text-slate-400">Total Turnovers / Match:</span>
              <span className="text-white font-bold">{teamA.turnoversPerMatch}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Counter-Attack Window:</span>
              <span className="text-amber-400 font-bold">{teamA.avgTimeToConcededShotSec}s</span>
            </div>
          </div>

          <div className="text-[11px] text-emerald-300 bg-emerald-950/40 p-2.5 rounded border border-emerald-800/40">
            <strong>Key Tactical Strength:</strong> High composure in central build-up; rapid horizontal ball switches under pressure.
          </div>
        </div>

        {/* Center Clash Metric Meter */}
        <div className="bg-void border border-tactical rounded-xl p-4 flex flex-col items-center justify-center text-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
            SIMULATED PRESS EXPLOITATION SCORE
          </span>
          <div className="relative flex items-center justify-center">
            <div className="w-28 h-28 rounded-full border-4 border-tactical flex flex-col items-center justify-center bg-panel">
              <span className="text-3xl font-extrabold font-mono text-amber-400">
                {pressAdvantageScore}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">/ 100</span>
            </div>
          </div>

          <div className="text-xs font-semibold text-slate-200">
            {pressAdvantageScore >= 75
              ? `High Press Advantage for ${teamA.name}`
              : `Balanced Tactical Contest`}
          </div>

          <p className="text-[11px] text-slate-400 max-w-xs leading-normal">
            Simulated rate of forced turnovers leading to high-danger transitions when {teamA.name} presses {teamB.name}'s backline.
          </p>
        </div>

        {/* Team B Card */}
        <div className="bg-panel border border-crimson-800/50 rounded-xl p-4 flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-crimson-400 font-bold uppercase tracking-wider">
                VULNERABILITY PROFILE
              </span>
              <span className="text-xs font-mono text-slate-400">{teamB.tournament}</span>
            </div>
            <h3 className="text-xl font-extrabold text-white mt-1">{teamB.name}</h3>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1 border-b border-tactical/60">
              <span className="text-slate-400">Defensive 3rd Turnovers:</span>
              <span className="text-crimson-400 font-bold">{teamB.defensiveThirdTurnovers}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-tactical/60">
              <span className="text-slate-400">Conceded xG Post-Turnover:</span>
              <span className="text-crimson-400 font-bold">{teamB.concededXgPostTurnover.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Primary Flashpoint:</span>
              <span className="text-white font-bold truncate max-w-[140px]">{topVulnerability.name}</span>
            </div>
          </div>

          <div className="text-[11px] text-crimson-300 bg-crimson-950/40 p-2.5 rounded border border-crimson-800/40">
            <strong>Key Tactical Risk:</strong> Prone to losing possession in {topVulnerability.name} (PDI: {topVulnerability.pitchDangerIndex}/100).
          </div>
        </div>
      </div>

      {/* Actionable Matchup Battle Plan */}
      <div className="bg-panel/90 border border-tactical rounded-xl p-5 flex flex-col gap-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          Tactical Battle Plan: How {teamA.name} Can Exploit {teamB.name}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Recommendation 1 */}
          <div className="bg-void p-3.5 rounded-lg border border-tactical flex items-start gap-3">
            <Target className="w-5 h-5 text-crimson-400 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="font-bold text-white uppercase text-[11px]">
                1. Designate {topVulnerability.name} as the Primary Trap Sector
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Allow {teamB.name} to advance the ball into Zone {topVulnerability.id} ({topVulnerability.name}). As soon as their backline passes lateral or backward into this zone, unleash a 3-man counter-press trap. {teamB.name} has recorded {topVulnerability.turnoverCount} turnovers here with {topVulnerability.concededShotsWithin15s} conceded shots.
              </p>
            </div>
          </div>

          {/* Recommendation 2 */}
          <div className="bg-void p-3.5 rounded-lg border border-tactical flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="font-bold text-white uppercase text-[11px]">
                2. Isolate Vulnerable Receivers: {teamBVulnerablePlayers.map(p => p.name).join(', ') || 'Opponent Pivot'}
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Screen passing lanes into {teamB.name}'s press-resistant players. Force their center-backs to make contested vertical passes directly to {teamBVulnerablePlayers[0]?.name || 'the pivot'}, whose press escape rate is below 72%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
