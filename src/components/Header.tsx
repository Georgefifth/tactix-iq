import React from 'react';
import { ViewMode } from '../types/tactics';
import { AVAILABLE_TEAM_NAMES } from '../data/tactixData';
import { Shield, Crosshair, BarChart3, Swords, FileText, Database, RotateCcw } from 'lucide-react';

interface HeaderProps {
  currentTeam: string;
  onSelectTeam: (team: string) => void;
  activeView: ViewMode;
  onChangeView: (view: ViewMode) => void;
  isMock: boolean;
  onToggleMock: () => void;
  onSimulateError: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTeam,
  onSelectTeam,
  activeView,
  onChangeView,
  isMock,
  onToggleMock,
  onSimulateError
}) => {
  const navItems: { mode: ViewMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'pitch-command', label: 'Pitch Command', icon: <Crosshair className="w-4 h-4" /> },
    { mode: 'press-matrix', label: 'Press Resistance', icon: <BarChart3 className="w-4 h-4" /> },
    { mode: 'matchup', label: 'Matchup Clash', icon: <Swords className="w-4 h-4" /> },
    { mode: 'scouting-card', label: 'Opposition Brief', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-surface/95 backdrop-blur-md border-b border-tactical sticky top-0 z-50">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-600/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/50">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5 font-sans">
                Tactix<span className="text-emerald-400">IQ</span>
              </h1>
              <span className="bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded font-semibold">
                v1.0 • OPEN SOURCE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Football Tactical Turnover & High-Press Resistance Intelligence
            </p>
          </div>
        </div>

        {/* Data Source & Squad Selector */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Data Source Tag */}
          <div className="hidden sm:flex items-center gap-1.5 bg-void px-2.5 py-1 rounded-lg border border-tactical text-xs font-mono text-slate-300">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>StatsBomb Open Data: Euro 2024</span>
          </div>

          {/* Squad Select Box */}
          <div className="flex items-center gap-1.5 bg-void px-2 py-1 rounded-lg border border-tactical">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase hidden sm:inline">
              TEAM:
            </span>
            <select
              value={currentTeam}
              onChange={(e) => onSelectTeam(e.target.value)}
              className="bg-panel border border-tactical text-white text-xs font-semibold rounded px-2.5 py-1 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {AVAILABLE_TEAM_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Mock vs Real Toggle for UX & QA */}
          <button
            onClick={onToggleMock}
            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors border ${
              isMock
                ? 'bg-amber-950/70 border-amber-600 text-amber-300'
                : 'bg-void border-tactical text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle between Real StatsBomb events and Mock demo data"
          >
            {isMock ? 'Mock Dataset' : 'Live Data (StatsBomb)'}
          </button>

          {/* Simulate error state */}
          <button
            onClick={onSimulateError}
            className="hidden lg:flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono border border-tactical bg-void text-slate-400 hover:text-crimson-400 hover:border-crimson-800 transition-colors"
            title="Simulate pipeline error to test error recovery UX"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Test Error</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto px-4 border-t border-tactical/50 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-1 py-1.5">
          {navItems.map((item) => {
            const isActive = activeView === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => onChangeView(item.mode)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-panel text-emerald-400 border border-emerald-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-panel/40'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active Squad: {currentTeam}</span>
        </div>
      </div>
    </header>
  );
};
