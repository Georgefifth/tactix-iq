import React from 'react';
import { TacticalZone } from '../types/tactics';
import { AlertTriangle, Flame, User, Target } from 'lucide-react';

interface ZoneInspectorProps {
  zone: TacticalZone | null;
  teamName: string;
}

export const ZoneInspector: React.FC<ZoneInspectorProps> = ({ zone, teamName }) => {
  if (!zone) {
    return (
      <div className="bg-surface border border-tactical rounded-xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[360px] text-slate-400">
        <Target className="w-12 h-12 text-slate-400 mb-3 animate-pulse" />
        <h3 className="text-base font-semibold text-slate-200">No Zone Selected</h3>
        <p className="text-xs max-w-xs mt-1 text-slate-400">
          Click on any of the 18 zones on the tactical pitch to reveal turnover telemetry, conceded threat, and player vulnerability metrics.
        </p>
      </div>
    );
  }

  const pdi = zone.pitchDangerIndex;
  const isHighDanger = pdi >= 75;
  const isMediumDanger = pdi >= 50 && pdi < 75;

  const totalTypes = zone.dispossessedCount + zone.miscontrolCount + zone.misplacedPassCount;
  const passPercent = totalTypes > 0 ? Math.round((zone.misplacedPassCount / totalTypes) * 100) : 0;
  const dispossessPercent = totalTypes > 0 ? Math.round((zone.dispossessedCount / totalTypes) * 100) : 0;
  const miscontrolPercent = totalTypes > 0 ? Math.round((zone.miscontrolCount / totalTypes) * 100) : 0;

  return (
    <div className="bg-surface border border-tactical rounded-xl p-5 flex flex-col gap-4 shadow-xl">
      {/* Header Badge */}
      <div className="flex items-start justify-between border-b border-tactical/70 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-700/60 px-2 py-0.5 rounded">
              ZONE {zone.id}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              {zone.third} Third • {zone.lane.replace('-', ' ')}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">{zone.name}</h3>
          <span className="text-[11px] font-mono text-slate-400">
            Coordinates: x[{zone.xRange[0]}m–{zone.xRange[1]}m], y[{zone.yRange[0]}m–{zone.yRange[1]}m]
          </span>
        </div>

        {/* PDI Gauge Badge */}
        <div className={`px-3 py-2 rounded-lg border text-right ${
          isHighDanger
            ? 'bg-crimson-950/50 border-crimson-700/60 text-crimson-400'
            : isMediumDanger
            ? 'bg-amber-950/50 border-amber-700/60 text-amber-400'
            : 'bg-emerald-950/50 border-emerald-700/60 text-emerald-400'
        }`}>
          <div className="text-[10px] font-mono tracking-wider font-semibold">PITCH DANGER INDEX</div>
          <div className="text-xl font-mono font-extrabold flex items-center justify-end gap-1">
            {isHighDanger && <Flame className="w-4 h-4 text-crimson-500 animate-bounce" />}
            {pdi.toFixed(1)}
            <span className="text-xs text-slate-400 font-normal">/100</span>
          </div>
          <div className="text-[10px] font-medium tracking-wide uppercase">
            {isHighDanger ? 'CRITICAL PRESS TRIGGER' : isMediumDanger ? 'MODERATE TRANSITION HAZARD' : 'SECURE RECIRCULATION'}
          </div>
        </div>
      </div>

      {/* KPI Tiles Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-panel p-3 rounded-lg border border-tactical/60">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Total Turnovers</div>
          <div className="text-lg font-mono font-bold text-white mt-0.5">{zone.turnoverCount}</div>
          <div className="text-[10px] text-slate-400">{zone.turnoversPer90} per match</div>
        </div>

        <div className="bg-panel p-3 rounded-lg border border-tactical/60">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Shots Conceded &lt;15s</div>
          <div className="text-lg font-mono font-bold text-crimson-400 mt-0.5">{zone.concededShotsWithin15s}</div>
          <div className="text-[10px] text-slate-400">Immediate transitions</div>
        </div>

        <div className="bg-panel p-3 rounded-lg border border-tactical/60">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Conceded xG &lt;15s</div>
          <div className="text-lg font-mono font-bold text-amber-400 mt-0.5">{zone.concededXgWithin15s.toFixed(2)}</div>
          <div className="text-[10px] text-slate-400">Goal probability</div>
        </div>

        <div className="bg-panel p-3 rounded-lg border border-tactical/60">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Primary Flaw</div>
          <div className="text-xs font-semibold text-slate-200 mt-1 truncate">
            {zone.misplacedPassCount >= zone.dispossessedCount ? 'Inaccurate Pass' : 'Under Pressure Dispossession'}
          </div>
          <div className="text-[10px] text-slate-400">{passPercent}% passing error</div>
        </div>
      </div>

      {/* Breakdown Bar */}
      <div className="bg-panel/70 p-3 rounded-lg border border-tactical/60 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300">Turnover Cause Distribution</span>
          <span className="text-[11px] font-mono text-slate-400">{totalTypes} events logged</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-void flex overflow-hidden border border-tactical">
          <div style={{ width: `${passPercent}%` }} className="bg-amber-500 h-full" title={`Misplaced Passes: ${passPercent}%`} />
          <div style={{ width: `${dispossessPercent}%` }} className="bg-crimson-500 h-full" title={`Dispossessions: ${dispossessPercent}%`} />
          <div style={{ width: `${miscontrolPercent}%` }} className="bg-slate-500 h-full" title={`Miscontrols: ${miscontrolPercent}%`} />
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
            Pass Error ({passPercent}%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-crimson-500 inline-block" />
            Dispossessed ({dispossessPercent}%)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-500 inline-block" />
            Miscontrol ({miscontrolPercent}%)
          </span>
        </div>
      </div>

      {/* Key Responsible Players Table */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-emerald-400" />
            Key Turnover Culprits in Zone {zone.id}
          </h4>
          <span className="text-[10px] font-mono text-slate-400">Sorted by Conceded xG</span>
        </div>

        {zone.keyTurnoverPlayers.length === 0 ? (
          <div className="text-xs text-slate-400 py-3 text-center bg-panel rounded border border-tactical/40">
            No isolated player turnovers in this specific sector.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-tactical/60">
            <table className="w-full text-left text-xs">
              <thead className="bg-panel text-slate-400 font-mono text-[10px] border-b border-tactical uppercase">
                <tr>
                  <th className="py-2 px-3">Player</th>
                  <th className="py-2 px-3">Position</th>
                  <th className="py-2 px-3 text-right">Lost Balls</th>
                  <th className="py-2 px-3 text-right">Conceded xG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tactical/40 font-mono">
                {zone.keyTurnoverPlayers.map((player, idx) => (
                  <tr key={idx} className="hover:bg-panel/40 transition-colors">
                    <td className="py-2 px-3 font-sans font-medium text-slate-200">
                      {player.name}
                    </td>
                    <td className="py-2 px-3 text-slate-400 text-[11px] font-sans">
                      {player.position}
                    </td>
                    <td className="py-2 px-3 text-right font-bold text-white">
                      {player.count}
                    </td>
                    <td className={`py-2 px-3 text-right font-bold ${player.concededXg > 0.2 ? 'text-crimson-400' : 'text-slate-400'}`}>
                      {player.concededXg.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Prescriptive Tactical Countermeasure Card */}
      <div className={`p-3.5 rounded-lg border flex items-start gap-3 ${
        isHighDanger
          ? 'bg-crimson-950/30 border-crimson-800/60'
          : 'bg-emerald-950/20 border-emerald-800/40'
      }`}>
        <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isHighDanger ? 'text-crimson-400' : 'text-emerald-400'}`} />
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Opposition Press Directive (Zone {zone.id})
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isHighDanger
              ? `Prime trapping sector for ${teamName}. When ${teamName} circulates possession into ${zone.name}, trigger an immediate 2-player diagonal squeeze on ${zone.keyTurnoverPlayers[0]?.name || 'the receiver'}. This zone has yielded ${zone.concededShotsWithin15s} counter-shots and ${zone.concededXgWithin15s} xG against them.`
              : `Safe build-up corridor for ${teamName}. Low turnover frequency (${zone.turnoversPer90}/match). Do not overcommit pressing numbers here; maintain rest-defense block.`}
          </p>
        </div>
      </div>
    </div>
  );
};
