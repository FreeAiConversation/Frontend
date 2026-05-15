'use client';

import { Container } from '@/components/ui/Container';
import { MousePointer, Settings, Zap, Copy } from 'lucide-react';

export function UtilitiesHowItWorks() {
  const steps = [
    {
      icon: MousePointer,
      title: 'Choose a Tool',
      description: 'Pick from our collection of utility tools — password generator, color picker, word counter, code formatter, and more.',
    },
    {
      icon: Settings,
      title: 'Configure Settings',
      description: 'Customize the tool to your needs. Set password length, choose color format, select code language, or paste your text.',
    },
    {
      icon: Zap,
      title: 'Get Instant Results',
      description: 'All processing happens instantly in your browser. No waiting for servers, no loading screens.',
    },
    {
      icon: Copy,
      title: 'Copy or Download',
      description: 'Copy results to clipboard with one click or download as a file. Use them anywhere you need.',
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
            How It Works
          </h2>
          <p className="text-text-muted text-[15px] max-w-2xl mx-auto">
            Simple, fast, and private — every tool works the same way
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
