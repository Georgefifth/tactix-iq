import React, { useState, useEffect } from 'react';
import { ViewMode, TeamTacticalProfile } from './types/tactics';
import { getTeam } from './data/tactixData';
import { MOCK_TEAM } from './data/mockData';
import { Header } from './components/Header';
import { PitchCanvas } from './components/PitchCanvas';
import { ZoneInspector } from './components/ZoneInspector';
import { PressMatrix } from './components/PressMatrix';
import { MatchupSimulator } from './components/MatchupSimulator';
import { ScoutingCard } from './components/ScoutingCard';
import { ErrorState, LoadingState, EmptyState } from './components/States';
import { Database, Zap } from 'lucide-react';

export const App: React.FC = () => {
  const [currentTeamName, setCurrentTeamName] = useState<string>('Spain');
  const [activeView, setActiveView] = useState<ViewMode>('pitch-command');
  const [selectedZoneId, setSelectedZoneId] = useState<number | null>(4);
  const [isMock, setIsMock] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const team: TeamTacticalProfile = isMock ? MOCK_TEAM : getTeam(currentTeamName);

  // Set default selected zone to highest danger zone when team changes
  useEffect(() => {
    if (team && team.zones) {
      const highestDangerZone = Object.values(team.zones)
        .filter(z => z.third === 'defensive' || z.third === 'middle')
        .sort((a, b) => b.pitchDangerIndex - a.pitchDangerIndex)[0];
      if (highestDangerZone) {
        setSelectedZoneId(highestDangerZone.id);
      }
    }
  }, [currentTeamName, isMock]);

  const handleSelectTeam = (name: string) => {
    setIsLoading(true);
    setCurrentTeamName(name);
    setTimeout(() => {
      setIsLoading(false);
    }, 120);
  };

  const handleToggleMock = () => {
    setIsLoading(true);
    setIsMock(!isMock);
    setTimeout(() => {
      setIsLoading(false);
    }, 120);
  };

  const handleSimulateError = () => {
    setHasError(true);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsMock(false);
    setCurrentTeamName('Spain');
    setSelectedZoneId(4);
  };

  const selectedZone = (selectedZoneId && team.zones[selectedZoneId]) ? team.zones[selectedZoneId] : null;

  return (
    <div className="min-h-screen bg-void text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header
        currentTeam={isMock ? 'Mock Demo FC' : currentTeamName}
        onSelectTeam={handleSelectTeam}
        activeView={activeView}
        onChangeView={setActiveView}
        isMock={isMock}
        onToggleMock={handleToggleMock}
        onSimulateError={handleSimulateError}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        {hasError ? (
          <ErrorState
            message="Tactical event parsing exception triggered. Reverting to verified UEFA Euro 2024 telemetry database."
            onRetry={handleRetry}
          />
        ) : isLoading ? (
          <LoadingState />
        ) : !team ? (
          <EmptyState onSelectDefault={() => handleSelectTeam('Spain')} />
        ) : (
          <>
            {/* Contextual Metric Banner for Active Squad */}
            <div className="bg-surface/80 border border-tactical rounded-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-panel border border-tactical flex items-center justify-center font-bold text-emerald-400 font-mono">
                  {team.code}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{team.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-1.5 py-0.2 rounded">
                      {team.tournament}
                    </span>
                  </div>
                  <span className="text-slate-400 text-[11px]">
                    {team.matchesPlayed} Matches Sampled • {team.totalTurnovers} Total Turnovers Logged
                  </span>
                </div>
              </div>

              {/* Quick Summary Pill Stats */}
              <div className="flex items-center gap-4 font-mono">
                <div className="text-right">
                  <span className="text-slate-400 text-[10px] uppercase block">Turnovers / 90</span>
                  <span className="text-amber-400 font-bold text-sm">{team.turnoversPerMatch}</span>
                </div>
                <div className="text-right border-l border-tactical pl-4">
                  <span className="text-slate-400 text-[10px] uppercase block">Def. Third Turnovers</span>
                  <span className="text-crimson-400 font-bold text-sm">{team.defensiveThirdTurnovers}</span>
                </div>
                <div className="text-right border-l border-tactical pl-4">
                  <span className="text-slate-400 text-[10px] uppercase block">Press Escape %</span>
                  <span className="text-emerald-400 font-bold text-sm">{team.overallPressEscapeRate}%</span>
                </div>
              </div>
            </div>

            {/* View Switching */}
            {activeView === 'pitch-command' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* 18-Zone Spatial Pitch Canvas (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  <PitchCanvas
                    zones={team.zones}
                    selectedZoneId={selectedZoneId}
                    onSelectZone={setSelectedZoneId}
                    teamName={team.name}
                  />

                  {/* Tactical Insight Banner */}
                  <div className="bg-panel/70 border border-tactical rounded-xl p-4 flex items-start gap-3">
                    <Zap className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                        Spatial Tactical Takeaway: {team.name}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        Turnover density concentrates heavily in{' '}
                        <strong className="text-amber-300">
                          {team.defensiveThirdTurnovers > 120 ? 'defensive third circulation' : 'midfield transition channels'}
                        </strong>
                        . Immediate counter-attacks conceded within 15 seconds account for{' '}
                        <span className="font-mono text-crimson-400 font-bold">
                          {team.concededXgPostTurnover.toFixed(2)} conceded xG
                        </span>
                        . Check the Zone Inspector for specific player blame and press directives.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Zone Deep Dive Inspector (5 cols) */}
                <div className="lg:col-span-5">
                  <ZoneInspector zone={selectedZone} teamName={team.name} />
                </div>
              </div>
            )}

            {activeView === 'press-matrix' && (
              <PressMatrix players={team.players} teamName={team.name} />
            )}

            {activeView === 'matchup' && (
              <MatchupSimulator
                initialTeamA={team.name}
                initialTeamB={currentTeamName === 'England' ? 'Spain' : 'England'}
              />
            )}

            {activeView === 'scouting-card' && (
              <ScoutingCard team={team} />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-tactical mt-auto py-5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300 font-sans">TactixIQ</span>
            <span className="text-slate-400">•</span>
            <span>AQX Sports Analytics Data Bowl 4.0 Entry</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              Powered by StatsBomb Open Data (Euro 2024)
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">
              MIT License
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
