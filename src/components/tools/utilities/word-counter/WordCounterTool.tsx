'use client';

import { useState, useDeferredValue, useCallback } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FileText, Eraser } from 'lucide-react';

import { useTextAnalysis } from './hooks/useTextAnalysis';
import { useKeywordDensity } from './hooks/useKeywordDensity';
import { StatsBar } from './components/StatsBar';
import { GoalTracker } from './components/GoalTracker';
import { KeywordDensity } from './components/KeywordDensity';
import { WeakWords } from './components/WeakWords';
import { SentenceAnalyzer } from './components/SentenceAnalyzer';
import { PlatformLimitChecker } from './components/PlatformLimitChecker';

export function WordCounterTool() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);

  // Goal state
  const [goalActive, setGoalActive] = useState(false);
  const [goalType, setGoalType] = useState<'words' | 'characters'>('words');
  const [goalTarget, setGoalTarget] = useState<number>(500);

  // Keyword state
  const [keyword, setKeyword] = useState('');

  // Central analysis — tokenizes once, derives all metrics
  const { stats, weakWords, totalWeakWordCount, longSentences } = useTextAnalysis(text, deferredText);

  // Keyword density — memoized regex
  const { count: keywordCount, density: keywordDensity } = useKeywordDensity(keyword, text, stats.words);

  // Goal computed
  const goalCurrent = goalType === 'words' ? stats.words : stats.characters;

  // Stable callbacks for GoalTracker
  const handleGoalActivate = useCallback(() => setGoalActive(true), []);
  const handleGoalDeactivate = useCallback(() => setGoalActive(false), []);
  const handleGoalTypeChange = useCallback((type: 'words' | 'characters') => setGoalType(type), []);
  const handleGoalTargetChange = useCallback((target: number) => setGoalTarget(target), []);
  const handleKeywordChange = useCallback((value: string) => setKeyword(value), []);

  return (
    <section className="py-16 md:py-20 relative">
      <Container>
        <Breadcrumb items={[
          { label: 'Tools', href: '/tools' },
          { label: 'Utilities', href: '/tools/utilities' },
          { label: 'Word Counter', href: '/tools/word-counter' },
        ]} />

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <FileText className="w-3 h-3" />
            <span>Word Counter</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Word Counter
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Count words, characters, sentences, and paragraphs instantly. Paste or type your text and get real-time analytics with reading time estimates.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Stats Bar + Legend */}
          <StatsBar stats={stats} />

          {/* Goal Tracker */}
          <GoalTracker
            goalActive={goalActive}
            goalType={goalType}
            goalTarget={goalTarget}
            currentCount={goalCurrent}
            onActivate={handleGoalActivate}
            onDeactivate={handleGoalDeactivate}
            onTypeChange={handleGoalTypeChange}
            onTargetChange={handleGoalTargetChange}
          />

          {/* Text Area */}
          <div className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3">
              <div className="text-[12px] text-text-dim">
                Paste or type your text below
              </div>
              <div className="flex items-center gap-2">
                {text && (
                  <button
                    onClick={() => setText('')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-text-muted hover:text-white transition-colors"
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    Clear
                  </button>
                )}
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="w-full min-h-[300px] p-5 bg-transparent text-[15px] leading-relaxed resize-y focus:outline-none placeholder:text-text-dim/50"
              spellCheck={false}
            />
          </div>

          {/* Keyword Density */}
          <KeywordDensity
            keyword={keyword}
            onKeywordChange={handleKeywordChange}
            count={keywordCount}
            density={keywordDensity}
            hasText={text.length > 0}
          />

          {/* Weak & Filler Words */}
          <WeakWords weakWords={weakWords} totalCount={totalWeakWordCount} />

          {/* Sentence Length Analyzer */}
          <SentenceAnalyzer longSentences={longSentences} />

          {/* Platform Limit Checker */}
          <PlatformLimitChecker characterCount={stats.characters} />
        </div>
      </Container>
    </section>
  );
}
