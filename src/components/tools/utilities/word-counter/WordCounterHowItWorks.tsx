'use client';

import { Container } from '@/components/ui/Container';
import { Upload, BarChart3, Clock, FileText } from 'lucide-react';

export function WordCounterHowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Enter or Upload Text',
      description: 'Type directly, paste text from clipboard, or upload a PDF, DOCX, or TXT file. All formats are supported.',
    },
    {
      icon: BarChart3,
      title: 'Get Instant Stats',
      description: 'See real-time word count, character count, sentences, paragraphs — all updating as you type.',
    },
    {
      icon: Clock,
      title: 'Reading & Speaking Time',
      description: 'Know exactly how long it takes to read (225 wpm) or speak (140 wpm) your content. Perfect for presentations.',
    },
    {
      icon: FileText,
      title: 'Frequency Analysis',
      description: 'Discover your top keywords with visual frequency bars. Identify overused words and content themes.',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white/[0.02]">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <span>How To Use</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            How to Count Words
          </h2>
          <p className="text-text-muted text-[15px] max-w-2xl mx-auto">
            Get comprehensive text analytics in seconds — no signup needed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-[12px] font-bold mb-4">
                  {index + 1}
                </div>
                <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[16px] font-bold mb-2">{step.title}</h3>
                <p className="text-[13px] text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
