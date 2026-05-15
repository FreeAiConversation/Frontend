'use client';

import { memo } from 'react';
import { Type, Clock, Mic, Hash, AlignLeft, BookOpen, Gauge } from 'lucide-react';
import { TextStats } from '../hooks/useTextAnalysis';

interface StatsBarProps {
  stats: TextStats;
}

export const StatsBar = memo(function StatsBar({ stats }: StatsBarProps) {
  const statCards = [
    { label: 'Words', value: stats.words.toLocaleString(), icon: Type },
    { label: 'Characters', value: stats.characters.toLocaleString(), icon: Hash },
    { label: 'No Spaces', value: stats.charactersNoSpaces.toLocaleString(), icon: Hash },
    { label: 'Sentences', value: stats.sentences.toLocaleString(), icon: AlignLeft },
    { label: 'Paragraphs', value: stats.paragraphs.toLocaleString(), icon: BookOpen },
    { label: 'Reading', value: stats.readingTime, icon: Clock },
    { label: 'Speaking', value: stats.speakingTime, icon: Mic },
  ];

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="border border-white/10 rounded-lg p-4 bg-white/[0.02] text-center transition-all hover:border-white/20"
            >
              <Icon className="w-4 h-4 mx-auto mb-1.5 text-text-dim" />
              <div className="text-lg font-black leading-tight">{stat.value}</div>
              <div className="text-[10px] text-text-dim uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          );
        })}
        {/* Readability — special card */}
        <div className="border border-white/10 rounded-lg p-4 bg-white/[0.02] text-center transition-all hover:border-white/20">
          <Gauge className="w-4 h-4 mx-auto mb-1.5 text-text-dim" />
          <div className="text-lg font-black leading-tight">{stats.fleschScore > 0 ? stats.fleschScore : '—'}</div>
          <div className="text-[9px] text-text-dim mt-0.5">{stats.readability}</div>
          <div className="text-[10px] text-text-dim uppercase tracking-wider mt-1">Readability</div>
        </div>
      </div>

      {/* Flesch Score Legend */}
      <div className="flex items-center justify-end gap-4 text-[10px] text-text-dim/60 -mt-3 flex-wrap">
        <span>Flesch Reading Ease:</span>
        <span><span className="text-green-400/70">90–100</span> Very Easy</span>
        <span><span className="text-green-400/40">70–89</span> Easy</span>
        <span><span className="text-text-dim">60–69</span> Standard</span>
        <span><span className="text-amber-400/60">30–59</span> Difficult</span>
        <span><span className="text-red-400/60">0–29</span> Very Hard</span>
      </div>
    </>
  );
});
