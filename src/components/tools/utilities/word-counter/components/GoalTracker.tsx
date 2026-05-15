'use client';

import { memo } from 'react';
import { Plus, X } from 'lucide-react';

interface GoalTrackerProps {
  goalActive: boolean;
  goalType: 'words' | 'characters';
  goalTarget: number;
  currentCount: number;
  onActivate: () => void;
  onDeactivate: () => void;
  onTypeChange: (type: 'words' | 'characters') => void;
  onTargetChange: (target: number) => void;
}

export const GoalTracker = memo(function GoalTracker({
  goalActive, goalType, goalTarget, currentCount,
  onActivate, onDeactivate, onTypeChange, onTargetChange,
}: GoalTrackerProps) {
  const progress = goalTarget > 0 ? Math.min((currentCount / goalTarget) * 100, 100) : 0;
  const barColor = currentCount >= goalTarget
    ? 'bg-green-400/60'
    : progress >= 80
      ? 'bg-amber-400/60'
      : 'bg-white/20';

  if (!goalActive) {
    return (
      <div className="flex justify-end">
        <button
          onClick={onActivate}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-text-muted hover:text-white border border-white/10 rounded-md hover:border-white/30 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Set goal
        </button>
      </div>
    );
  }

  return (
    <div className="border border-white/10 rounded-lg bg-white/[0.02] px-4 py-3">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex rounded-md overflow-hidden border border-white/10">
          <button
            onClick={() => onTypeChange('words')}
            className={`px-3 py-1.5 text-[11px] font-bold transition-colors ${goalType === 'words' ? 'bg-white/10 text-white' : 'text-text-dim hover:text-white'}`}
          >
            Words
          </button>
          <button
            onClick={() => onTypeChange('characters')}
            className={`px-3 py-1.5 text-[11px] font-bold transition-colors ${goalType === 'characters' ? 'bg-white/10 text-white' : 'text-text-dim hover:text-white'}`}
          >
            Characters
          </button>
        </div>
        <input
          type="number"
          min="1"
          value={goalTarget}
          onChange={(e) => onTargetChange(Math.max(1, Number(e.target.value)))}
          className="w-20 px-2 py-1.5 text-[12px] bg-white/5 border border-white/10 rounded-md focus:outline-none focus:border-white/30"
        />
        <span className="text-[12px] text-text-muted">
          {currentCount.toLocaleString()} / {goalTarget.toLocaleString()} {goalType}
        </span>
        <button onClick={onDeactivate} className="ml-auto p-1 text-text-dim hover:text-white transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="mt-2.5 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-300 ${barColor}`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
});
