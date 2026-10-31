import React, { useState } from 'react';
import { PlayerPressProfile, PlayerClassification } from '../types/tactics';
import { Search } from 'lucide-react';

interface PressMatrixProps {
  players: PlayerPressProfile[];
  teamName: string;
}

export const PressMatrix: React.FC<PressMatrixProps> = ({ players, teamName }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerPressProfile | null>(players[0] || null);
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<'escapeRate' | 'pressures' | 'progressive'>('pressures');

  const filteredPlayers = players.filter(p => {
    const matchesPos = positionFilter === 'all' || p.position.toLowerCase().includes(positionFilter.toLowerCase());
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPos && matchesSearch;
  });

  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (sortField === 'escapeRate') return b.pressEscapeRate - a.pressEscapeRate;
    if (sortField === 'progressive') return b.progressiveYardsUnderPressure - a.progressiveYardsUnderPressure;
    return b.pressuresFaced - a.pressuresFaced;
  });

  // Plot bounds
  const minX = 0;
  const maxX = Math.max(60, ...players.map(p => p.pressuresFaced + 10));
  const minY = 40;
  const maxY = 100;

  // Thresholds
  const pressureVolumeThreshold = 25;
  const escapeRateThreshold = 76;

  const getClassificationBadge = (cls: PlayerClassification) => {
    switch (cls) {
      case 'Press-Resistant Engine':
        return <span className="bg-emerald-950/70 border border-emerald-600/60 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">PRESS-RESISTANT ENGINE</span>;
      case 'Composed Distributor':
        return <span className="bg-cyan-950/70 border border-cyan-600/60 text-cyan-300 px-2 py-0.5 rounded text-[10px] font-bold">COMPOSED DISTRIBUTOR</span>;
      case 'Press Vulnerability':
        return <span className="bg-crimson-950/70 border border-crimson-600/60 text-crimson-300 px-2 py-0.5 rounded text-[10px] font-bold">PRESS VULNERABILITY</span>;
      case 'Contested Target':
        return <span className="bg-amber-950/70 border border-amber-600/60 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">CONTESTED TARGET</span>;
    }
  };

  const getDotColor = (p: PlayerPressProfile, isSelected: boolean) => {
    if (isSelected) return '#FFFFFF';
    if (p.classification === 'Press-Resistant Engine') return '#10B981';
    if (p.classification === 'Composed Distributor') return '#06B6D4';
    if (p.classification === 'Press Vulnerability') return '#EF4444';
    return '#F59E0B';
  };

  return (
    <div className="bg-surface border border-tactical rounded-xl p-5 flex flex-col gap-5 shadow-2xl">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-tactical/70 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              Press-Resistance & Composure Matrix
            </h2>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
              {teamName} Squad Analysis
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Quadrant plot measuring player ball retention rate under direct opposition counter-press vs total pressure volume faced.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center gap-2">
          {/* Position Selector */}
          <div className="flex items-center bg-void p-1 rounded-lg border border-tactical text-xs">
            {['all', 'Defender', 'Midfield', 'Forward'].map((pos) => (
              <button
                key={pos}
                onClick={() => setPositionFilter(pos)}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  positionFilter === pos
                    ? 'bg-panel text-cyan-400 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {pos === 'all' ? 'All Roles' : pos}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search player..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-void border border-tactical rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 w-36 sm:w-44 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Scatter Plot on Left, Selected Player Deep Dive on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Scatter Plot SVG (Takes 2 cols) */}
        <div className="lg:col-span-2 bg-void/90 border border-tactical rounded-xl p-4 flex flex-col gap-2 relative">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-tactical/40 font-mono">
            <span>Y-AXIS: PRESS ESCAPE RATE (%)</span>
            <span>X-AXIS: PRESSURES FACED (VOLUME)</span>
          </div>

          {/* SVG Canvas */}
          <div className="w-full relative h-[360px]">
            <svg viewBox="0 0 600 360" className="w-full h-full select-none">
              {/* Background Grid Lines */}
              {[50, 60, 70, 80, 90, 100].map((rate) => {
                const y = 340 - ((rate - minY) / (maxY - minY)) * 320;
                return (
                  <g key={rate}>
                    <line x1="45" y1={y} x2="580" y2={y} stroke="#1E293B" strokeWidth="1" strokeDasharray="3,3" />
                    <text x="35" y={y + 4} fill="#64748B" fontSize="10" fontFamily="JetBrains Mono" textAnchor="end">
                      {rate}%
                    </text>
                  </g>
                );
              })}

              {/* Benchmark Dividing Lines */}
              {(() => {
                const threshX = 45 + ((pressureVolumeThreshold - minX) / (maxX - minX)) * (580 - 45);
                const threshY = 340 - ((escapeRateThreshold - minY) / (maxY - minY)) * 320;
                return (
                  <g>
                    {/* Vertical Volume Threshold */}
                    <line x1={threshX} y1="20" x2={threshX} y2="340" stroke="#059669" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />
                    {/* Horizontal Escape Threshold */}
                    <line x1="45" y1={threshY} x2="580" y2={threshY} stroke="#059669" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.6" />

                    {/* Quadrant Labels */}
                    <text x="560" y="35" fill="#34D399" fontSize="11" fontFamily="Inter" fontWeight="700" textAnchor="end" opacity="0.7">
                      PRESS-RESISTANT ENGINES
                    </text>
                    <text x="560" y="325" fill="#F87171" fontSize="11" fontFamily="Inter" fontWeight="700" textAnchor="end" opacity="0.7">
                      PRESS VULNERABILITIES & TARGETS
                    </text>
                    <text x="55" y="35" fill="#38BDF8" fontSize="11" fontFamily="Inter" fontWeight="700" textAnchor="start" opacity="0.7">
                      COMPOSED DISTRIBUTORS
                    </text>
                    <text x="55" y="325" fill="#FBBF24" fontSize="11" fontFamily="Inter" fontWeight="700" textAnchor="start" opacity="0.7">
                      CONTESTED BALL-RECEIVERS
                    </text>
                  </g>
                );
              })()}

              {/* Player Nodes */}
              {filteredPlayers.map((player) => {
                const cx = 45 + ((player.pressuresFaced - minX) / (maxX - minX)) * (580 - 45);
                const cy = 340 - ((player.pressEscapeRate - minY) / (maxY - minY)) * 320;
                const isSelected = selectedPlayer?.id === player.id;
                const dotColor = getDotColor(player, isSelected);

                return (
                  <g
                    key={player.id}
                    className="cursor-pointer transition-transform duration-100"
                    onClick={() => setSelectedPlayer(player)}
                  >
                    {/* Highlight ring if selected */}
                    {isSelected && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="12"
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="2.5"
                        strokeDasharray="3,2"
                        className="animate-spin"
                        style={{ transformOrigin: `${cx}px ${cy}px` }}
                      />
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 8 : 6}
                      fill={dotColor}
                      stroke="#080C0E"
                      strokeWidth="2"
                    />
                    {/* Player name label */}
                    <text
                      x={cx}
                      y={cy - 10}
                      fill={isSelected ? '#FFFFFF' : '#94A3B8'}
                      fontSize={isSelected ? '11' : '9'}
                      fontFamily="Inter"
                      fontWeight={isSelected ? '700' : '500'}
                      textAnchor="middle"
                    >
                      {player.name.split(' ').slice(-1)[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Plot Legend */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono border-t border-tactical/40 pt-2 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              Press-Resistant (&ge;82%, 25+ pressures)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
              Composed (&ge;76%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-crimson-500 inline-block" />
              Vulnerability (&lt;72%, 15+ pressures)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              Contested Target
            </span>
          </div>
        </div>

        {/* Selected Player Profile Card (1 col) */}
        <div className="bg-panel border border-tactical rounded-xl p-4 flex flex-col justify-between gap-4">
          {selectedPlayer ? (
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center justify-between">
                  {getClassificationBadge(selectedPlayer.classification)}
                  <span className="text-[10px] font-mono text-slate-400">
                    Sample: {selectedPlayer.sampleSize} Pressures
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">{selectedPlayer.name}</h3>
                <span className="text-xs text-slate-400 font-medium">{selectedPlayer.position}</span>
              </div>

              {/* Gauge */}
              <div className="bg-void p-3 rounded-lg border border-tactical flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Press Escape Rate</div>
                  <div className="text-2xl font-mono font-extrabold text-emerald-400 mt-0.5">
                    {selectedPlayer.pressEscapeRate}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Pressures Faced</div>
                  <div className="text-xl font-mono font-bold text-white mt-0.5">
                    {selectedPlayer.pressuresFaced}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-surface p-2.5 rounded border border-tactical/60">
                  <span className="text-slate-400 text-[10px] uppercase block">Lost Under Press</span>
                  <span className="text-base font-bold text-crimson-400 mt-0.5 block">
                    {selectedPlayer.turnoversUnderPressure}
                  </span>
                </div>
                <div className="bg-surface p-2.5 rounded border border-tactical/60">
                  <span className="text-slate-400 text-[10px] uppercase block">Progressive Yds</span>
                  <span className="text-base font-bold text-cyan-400 mt-0.5 block">
                    +{selectedPlayer.progressiveYardsUnderPressure}m
                  </span>
                </div>
              </div>

              {/* Prescriptive Scouting Recommendation */}
              <div className="bg-surface/80 p-3 rounded-lg border border-tactical/80 text-xs">
                <span className="font-bold uppercase tracking-wider text-slate-300 block mb-1">
                  Tactical Directive
                </span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {selectedPlayer.classification === 'Press Vulnerability'
                    ? `Priority press target. Direct immediate counter-press when ball is passed into ${selectedPlayer.name}. Has lost ${selectedPlayer.turnoversUnderPressure} balls under pressure.`
                    : selectedPlayer.classification === 'Press-Resistant Engine'
                    ? `Do not dive in on ${selectedPlayer.name}. Exceptionally composed under pressure (${selectedPlayer.pressEscapeRate}% escape). Block forward passing lanes instead of direct tackling.`
                    : `Solid distributor. Shade onto weaker foot and pressure on backward passes.`}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-400 text-xs">
              Click a player node on the scatter plot to inspect individual press resistance.
            </div>
          )}

          <div className="text-[10px] text-slate-400 text-center font-mono border-t border-tactical/60 pt-2">
            Click any point on the quadrant to load detailed telemetry.
          </div>
        </div>
      </div>

      {/* Sorted Player Roster Table */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Squad Press Composure Roster ({sortedPlayers.length} Players)
          </h3>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Sort by:</span>
            <button
              onClick={() => setSortField('pressures')}
              className={`px-2 py-0.5 rounded ${sortField === 'pressures' ? 'bg-panel text-white border border-tactical' : 'hover:text-slate-200'}`}
            >
              Volume
            </button>
            <button
              onClick={() => setSortField('escapeRate')}
              className={`px-2 py-0.5 rounded ${sortField === 'escapeRate' ? 'bg-panel text-white border border-tactical' : 'hover:text-slate-200'}`}
            >
              Escape %
            </button>
            <button
              onClick={() => setSortField('progressive')}
              className={`px-2 py-0.5 rounded ${sortField === 'progressive' ? 'bg-panel text-white border border-tactical' : 'hover:text-slate-200'}`}
            >
              Progressive Yds
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-tactical">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-panel text-slate-400 text-[10px] uppercase border-b border-tactical">
              <tr>
                <th className="py-2.5 px-3">Player</th>
                <th className="py-2.5 px-3">Position</th>
                <th className="py-2.5 px-3">Classification</th>
                <th className="py-2.5 px-3 text-right">Pressures Faced</th>
                <th className="py-2.5 px-3 text-right">Escape Rate</th>
                <th className="py-2.5 px-3 text-right">Turnovers Under Press</th>
                <th className="py-2.5 px-3 text-right">Prog. Gain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tactical/50">
              {sortedPlayers.map((player) => {
                const isSelected = selectedPlayer?.id === player.id;
                return (
                  <tr
                    key={player.id}
                    onClick={() => setSelectedPlayer(player)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-cyan-950/40 text-white' : 'hover:bg-panel/50 text-slate-300'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-sans font-medium text-white flex items-center gap-1.5">
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                      {player.name}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 font-sans text-[11px]">
                      {player.position}
                    </td>
                    <td className="py-2.5 px-3">
                      {getClassificationBadge(player.classification)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-white">
                      {player.pressuresFaced}
                    </td>
                    <td className={`py-2.5 px-3 text-right font-bold ${
                      player.pressEscapeRate >= 80 ? 'text-emerald-400' : (player.pressEscapeRate < 72 ? 'text-crimson-400' : 'text-slate-200')
                    }`}>
                      {player.pressEscapeRate}%
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-400">
                      {player.turnoversUnderPressure}
                    </td>
                    <td className="py-2.5 px-3 text-right text-cyan-400 font-bold">
                      +{player.progressiveYardsUnderPressure}m
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
