'use client';

import { Container } from '@/components/ui/Container';
import { Sliders, ToggleLeft, RefreshCw, Copy } from 'lucide-react';

export function PasswordGeneratorHowItWorks() {
  const steps = [
    {
      icon: Sliders,
      title: 'Set Password Length',
      description: 'Use the slider to choose your desired length from 4 to 64 characters. We recommend 16+ for strong security.',
    },
    {
      icon: ToggleLeft,
      title: 'Choose Character Types',
      description: 'Toggle uppercase, lowercase, numbers, and symbols. More character types means more possible combinations.',
    },
    {
      icon: RefreshCw,
      title: 'Generate & Review',
      description: 'Click Generate to create a password. Review the strength meter, entropy bits, and estimated crack time.',
    },
    {
      icon: Copy,
      title: 'Copy & Use',
      description: 'Copy your password to clipboard with one click. Use it immediately — nothing is stored or logged.',
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
            How to Generate Secure Passwords
          </h2>
          <p className="text-text-muted text-[15px] max-w-2xl mx-auto">
            Create uncrackable passwords in seconds — no software needed
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
