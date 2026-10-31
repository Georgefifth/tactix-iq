import React, { useState } from 'react';
import { TacticalZone, ThirdType } from '../types/tactics';
import { Crosshair } from 'lucide-react';

interface PitchCanvasProps {
  zones: Record<number, TacticalZone>;
  selectedZoneId: number | null;
  onSelectZone: (zoneId: number) => void;
  teamName: string;
}

export const PitchCanvas: React.FC<PitchCanvasProps> = ({
  zones,
  selectedZoneId,
  onSelectZone,
  teamName
}) => {
  const [activeThirdFilter, setActiveThirdFilter] = useState<ThirdType | 'all'>('all');
  const [showVectors, setShowVectors] = useState<boolean>(true);
  const [hoveredZoneId, setHoveredZoneId] = useState<number | null>(null);

  // StatsBomb Pitch Dimensions: 120m length x 80m width
  // SVG ViewBox: 0 0 1200 800 (10x scaling)
  const pitchWidth = 1200;
  const pitchHeight = 800;

  const getZoneDangerColor = (pdi: number, isSelected: boolean, isHovered: boolean) => {
    if (isSelected) {
      return pdi > 70 ? 'rgba(239, 68, 68, 0.65)' : (pdi > 45 ? 'rgba(245, 158, 11, 0.65)' : 'rgba(16, 185, 129, 0.65)');
    }
    if (isHovered) {
      return pdi > 70 ? 'rgba(239, 68, 68, 0.45)' : (pdi > 45 ? 'rgba(245, 158, 11, 0.45)' : 'rgba(16, 185, 129, 0.40)');
    }
    if (pdi >= 75) return 'rgba(239, 68, 68, 0.32)'; // Crimson High Threat
    if (pdi >= 50) return 'rgba(245, 158, 11, 0.22)'; // Amber Moderate
    if (pdi >= 30) return 'rgba(16, 185, 129, 0.14)'; // Emerald Mild
    return 'rgba(15, 23, 42, 0.25)'; // Low
  };

  const selectedZone = selectedZoneId ? zones[selectedZoneId] : null;

  return (
    <div className="bg-surface border border-tactical rounded-xl p-4 flex flex-col gap-3 shadow-2xl relative">
      {/* Top Pitch Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-tactical/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-sm font-semibold tracking-wide uppercase text-slate-200">
            18-Zone Spatial Pitch Danger Grid
          </h2>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
            {teamName} Turnover Telemetry
          </span>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="flex items-center bg-void p-1 rounded-lg border border-tactical">
            {(['all', 'defensive', 'middle', 'attacking'] as const).map((third) => (
              <button
                key={third}
                onClick={() => setActiveThirdFilter(third)}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  activeThirdFilter === third
                    ? 'bg-panel text-emerald-400 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {third === 'all' ? 'All Thirds' : `${third.charAt(0).toUpperCase() + third.slice(1)}`}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowVectors(!showVectors)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs transition-colors ${
              showVectors
                ? 'bg-emerald-950/50 border-emerald-700/60 text-emerald-300'
                : 'bg-void border-tactical text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle turnover trajectory vectors"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Turnover Vectors</span>
          </button>
        </div>
      </div>

      {/* Pitch SVG Workspace */}
      <div className="w-full relative overflow-hidden rounded-lg bg-turf border border-lines/80">
        <svg
          viewBox={`0 0 ${pitchWidth} ${pitchHeight}`}
          className="w-full h-auto max-h-[560px] select-none block"
          style={{ background: '#091512' }}
        >
          <defs>
            {/* Turf pattern subtle grass bands */}
            <pattern id="turfPattern" width="100" height="800" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="50" height="800" fill="#081411" />
              <rect x="50" y="0" width="50" height="800" fill="#0A1814" />
            </pattern>
            {/* Arrow marker for turnover vectors */}
            <marker
              id="arrow-threat"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#EF4444" />
            </marker>
            <marker
              id="arrow-normal"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#94A3B8" />
            </marker>
          </defs>

          {/* Turf Background */}
          <rect x="0" y="0" width={pitchWidth} height={pitchHeight} fill="url(#turfPattern)" />

          {/* Standard Pitch Markings (White/Emerald chalk) */}
          <g stroke="#1F4D3E" strokeWidth="3" fill="none">
            {/* Outer Pitch Boundary */}
            <rect x="20" y="20" width="1160" height="760" rx="4" />
            {/* Halfway line */}
            <line x1="600" y1="20" x2="600" y2="780" strokeDasharray="6,4" />
            {/* Center Circle */}
            <circle cx="600" cy="400" r="91.5" />
            <circle cx="600" cy="400" r="3" fill="#1F4D3E" />

            {/* Left Penalty Area (Defending side: 0..16.5m -> 0..165) */}
            <rect x="20" y="158" width="165" height="484" />
            {/* Left Goal Area (0..5.5m -> 0..55) */}
            <rect x="20" y="278" width="55" height="244" />
            <circle cx="130" cy="400" r="3" fill="#1F4D3E" />
            <path d="M 185 330 A 91.5 91.5 0 0 1 185 470" />

            {/* Right Penalty Area (Opponent goal side: 1035..1200) */}
            <rect x="1015" y="158" width="165" height="484" />
            {/* Right Goal Area */}
            <rect x="1125" y="278" width="55" height="244" />
            <circle cx="1070" cy="400" r="3" fill="#1F4D3E" />
            <path d="M 1015 330 A 91.5 91.5 0 0 0 1015 470" />

            {/* Attack Direction Arrow & Label */}
            <g opacity="0.45" stroke="#34D399" strokeWidth="1.5">
              <line x1="520" y1="50" x2="680" y2="50" markerEnd="url(#arrow-normal)" />
              <text x="600" y="42" fill="#34D399" fontSize="13" textAnchor="middle" fontFamily="Inter" fontWeight="600">
                ATTACK DIRECTION &rarr;
              </text>
            </g>
          </g>

          {/* 18 Tactical Zones Overlay */}
          {Object.values(zones).map((zone) => {
            const isSelected = selectedZoneId === zone.id;
            const isHovered = hoveredZoneId === zone.id;
            const isFilteredOut = activeThirdFilter !== 'all' && zone.third !== activeThirdFilter;

            // Coordinates in SVG (10x scaling of 120x80)
            const x = zone.xRange[0] * 10;
            const y = zone.yRange[0] * 10;
            const width = (zone.xRange[1] - zone.xRange[0]) * 10;
            const height = (zone.yRange[1] - zone.yRange[0]) * 10;

            const fillColor = getZoneDangerColor(zone.pitchDangerIndex, isSelected, isHovered);

            return (
              <g
                key={zone.id}
                onClick={() => onSelectZone(zone.id)}
                onMouseEnter={() => setHoveredZoneId(zone.id)}
                onMouseLeave={() => setHoveredZoneId(null)}
                className="cursor-pointer transition-all duration-150"
                opacity={isFilteredOut ? 0.2 : 1}
              >
                {/* Zone Hazard Fill */}
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={fillColor}
                  stroke={isSelected ? '#34D399' : (isHovered ? '#F1F5F9' : '#1E3A31')}
                  strokeWidth={isSelected ? 3.5 : (isHovered ? 2 : 1)}
                  strokeDasharray={isSelected ? 'none' : '4,3'}
                />

                {/* Zone Center Tactical Badge */}
                <g transform={`translate(${x + width / 2}, ${y + height / 2})`}>
                  {/* Subtle Zone ID pill */}
                  <rect
                    x="-32"
                    y="-22"
                    width="64"
                    height="44"
                    rx="6"
                    fill={isSelected ? '#0F171B' : '#080C0E'}
                    fillOpacity="0.85"
                    stroke={zone.pitchDangerIndex >= 75 ? '#EF4444' : (zone.pitchDangerIndex >= 50 ? '#F59E0B' : '#10B981')}
                    strokeWidth={isSelected ? 2 : 1}
                  />

                  {/* Zone ID */}
                  <text
                    x="0"
                    y="-6"
                    fill="#94A3B8"
                    fontSize="10"
                    fontFamily="Inter"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    Z{zone.id}
                  </text>

                  {/* Pitch Danger Index Score */}
                  <text
                    x="0"
                    y="12"
                    fill={zone.pitchDangerIndex >= 75 ? '#F87171' : (zone.pitchDangerIndex >= 50 ? '#FBBF24' : '#34D399')}
                    fontSize="13"
                    fontFamily="JetBrains Mono"
                    fontWeight="800"
                    textAnchor="middle"
                  >
                    {zone.pitchDangerIndex.toFixed(0)}
                  </text>
                </g>

                {/* Turnover vectors within zone */}
                {showVectors && !isFilteredOut && zone.recentTurnoverVectors.map((vec, idx) => {
                  const sx = vec.startX * 10;
                  const sy = vec.startY * 10;
                  const ex = vec.endX * 10;
                  const ey = vec.endY * 10;
                  const isThreat = vec.isConcededShot;

                  return (
                    <g key={idx} opacity={isSelected || isHovered ? 0.95 : 0.6}>
                      <line
                        x1={sx}
                        y1={sy}
                        x2={ex}
                        y2={ey}
                        stroke={isThreat ? '#EF4444' : '#64748B'}
                        strokeWidth={isThreat ? 2.5 : 1.5}
                        strokeDasharray={vec.outcome === 'dispossessed' ? '2,2' : 'none'}
                        markerEnd={isThreat ? 'url(#arrow-threat)' : 'url(#arrow-normal)'}
                      />
                      <circle cx={sx} cy={sy} r="3.5" fill={isThreat ? '#EF4444' : '#94A3B8'} />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Floating Pitch HUD Legend */}
        <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur border border-tactical px-3 py-1.5 rounded-lg flex items-center gap-4 text-xs font-mono pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500/80 border border-emerald-400/50" />
            <span className="text-slate-300">PDI 0–49 (Safe)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-500/80 border border-amber-400/50" />
            <span className="text-slate-300">PDI 50–74 (Caution)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-crimson-500/80 border border-crimson-400/50" />
            <span className="text-slate-300">PDI 75–100 (Critical Hazard)</span>
          </div>
        </div>

        {/* Selected Zone Quick Tooltip banner */}
        {selectedZone && (
          <div className="absolute top-3 right-3 bg-panel/95 border border-emerald-500/50 px-3.5 py-2 rounded-lg shadow-xl hidden sm:flex items-center gap-3 pointer-events-none">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                Active Zone Inspection
              </span>
              <span className="text-xs font-semibold text-white">
                Zone {selectedZone.id}: {selectedZone.name}
              </span>
            </div>
            <div className="border-l border-tactical pl-3 flex items-center gap-2">
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-mono">DANGER INDEX</div>
                <div className="text-sm font-bold font-mono text-crimson-400">
                  {selectedZone.pitchDangerIndex.toFixed(1)}/100
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Instructional Hint */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <span className="flex items-center gap-1">
          <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
          Click any of the 18 tactical pitch zones to inspect specific turnovers, responsible players, and transition xG.
        </span>
        <span className="font-mono text-slate-400 hidden sm:inline">
          Coordinates: StatsBomb 120m x 80m Grid
        </span>
      </div>
    </div>
  );
};
