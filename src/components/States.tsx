import React from 'react';
import { AlertCircle, RefreshCw, HelpCircle, ShieldQuestion, ArrowRight } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Failed to load match telemetry dataset.",
  onRetry
}) => (
  <div className="bg-surface border border-crimson-800/80 rounded-xl p-8 flex flex-col items-center justify-center text-center my-6 max-w-lg mx-auto shadow-2xl">
    <div className="w-12 h-12 rounded-full bg-crimson-950/80 border border-crimson-600 flex items-center justify-center mb-3">
      <AlertCircle className="w-6 h-6 text-crimson-400" />
    </div>
    <h3 className="text-base font-bold text-white">Tactical Pipeline Alert</h3>
    <p className="text-xs text-slate-300 mt-1 max-w-xs leading-relaxed">
      {message} Check network connection or reset to verified Euro 2024 local telemetry.
    </p>
    <button
      onClick={onRetry}
      className="mt-4 flex items-center gap-2 px-4 py-2 bg-crimson-600 hover:bg-crimson-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-lg"
    >
      <RefreshCw className="w-3.5 h-3.5" />
      <span>Reload Default Match Data</span>
    </button>
  </div>
);

export const LoadingState: React.FC = () => (
  <div className="bg-surface border border-tactical rounded-xl p-12 flex flex-col items-center justify-center text-center my-6 max-w-lg mx-auto shadow-2xl">
    <div className="w-14 h-14 rounded-full border-4 border-tactical border-t-emerald-500 animate-spin mb-4" />
    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
      Synthesizing Spatial Event Telemetry
    </h3>
    <p className="text-xs text-slate-400 font-mono mt-1">
      Parsing 3,600+ StatsBomb coordinates, pressure tags & turnover vectors...
    </p>
  </div>
);

interface EmptyStateProps {
  onSelectDefault: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectDefault }) => (
  <div className="bg-surface border border-tactical rounded-xl p-8 flex flex-col items-center justify-center text-center my-6 max-w-lg mx-auto shadow-2xl">
    <div className="w-12 h-12 rounded-full bg-panel border border-tactical flex items-center justify-center mb-3 text-emerald-400">
      <HelpCircle className="w-6 h-6" />
    </div>
    <h3 className="text-base font-bold text-white">No Team Selected</h3>
    <p className="text-xs text-slate-300 mt-1 max-w-sm leading-relaxed">
      Choose a national squad from the top navigation bar or launch the Euro 2024 Champions default analysis.
    </p>
    <button
      onClick={onSelectDefault}
      className="mt-4 flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors shadow-lg"
    >
      <span>Load Spain (Euro 2024 Champions)</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </button>
  </div>
);

export const InvalidInputState: React.FC<{ message: string; onReset: () => void }> = ({ message, onReset }) => (
  <div className="bg-panel border border-amber-800/80 rounded-xl p-6 flex flex-col items-center justify-center text-center max-w-md mx-auto my-4">
    <ShieldQuestion className="w-8 h-8 text-amber-400 mb-2" />
    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Zero Telemetry Events</h4>
    <p className="text-xs text-slate-300 mt-1">{message}</p>
    <button
      onClick={onReset}
      className="mt-3 px-3 py-1.5 bg-void border border-tactical hover:border-slate-400 rounded text-xs text-slate-200"
    >
      Clear Filter Restrictions
    </button>
  </div>
);
