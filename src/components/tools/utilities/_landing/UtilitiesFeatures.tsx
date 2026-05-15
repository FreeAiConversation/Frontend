'use client';

import { Container } from '@/components/ui/Container';
import { Lock, Zap, Infinity, Globe, Shield, Sparkles } from 'lucide-react';

export function UtilitiesFeatures() {
  const features = [
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'All tools run locally in your browser. Passwords, text, and data never leave your device or get stored anywhere.',
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'No server round-trips. Every tool produces results instantly using client-side JavaScript.',
    },
    {
      icon: Infinity,
      title: 'Unlimited & Free',
      description: 'No daily limits, no usage caps, no premium tiers. Use every tool as many times as you want, forever.',
    },
    {
      icon: Globe,
      title: 'Works Everywhere',
      description: 'Compatible with all modern browsers on desktop, tablet, and mobile. No installation or plugins needed.',
    },
    {
      icon: Shield,
      title: 'Secure by Design',
      description: 'Password generation uses cryptographic randomness. No data is transmitted, logged, or tracked.',
    },
    {
      icon: Sparkles,
      title: 'Clean Interface',
      description: 'Minimal, distraction-free design. Every tool is focused on doing one thing well with no clutter.',
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <span>Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Why Use Our Utilities?
          </h2>
          <p className="text-text-muted text-[15px] max-w-2xl mx-auto">
            Built for speed, privacy, and simplicity — no compromises
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 border border-white/10 rounded-lg bg-white/[0.02] hover:border-white/20 transition-colors group"
              >
                <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[16px] font-bold mb-2">{feature.title}</h3>
                <p className="text-[13px] text-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
