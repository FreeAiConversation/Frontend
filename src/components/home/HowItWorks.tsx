'use client';

import { Container } from '@/components/ui/Container';
import { Upload, Zap, Download, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Choose Your Tool',
    description: 'Select from our collection of free AI-powered tools. No signup or login required.',
  },
  {
    number: '02',
    icon: Zap,
    title: 'Process Instantly',
    description: 'Upload your file or input your data. Everything processes in your browser for maximum privacy.',
  },
  {
    number: '03',
    icon: Download,
    title: 'Get Results',
    description: 'Download your processed file or copy your results. Use unlimited times, completely free.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-12 md:py-16 bg-bg relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-border mb-6">
            <Zap className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold tracking-wide uppercase text-text-secondary">
              Simple Process
            </span>
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto">
            Three simple steps to convert, optimize, and generate anything you need
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  {/* Connecting Arrow (Desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-full ml-3 z-20">
                      <ArrowRight className="w-6 h-6 text-text-dim" />
                    </div>
                  )}

                  {/* Step Card */}
                  <div className="relative bg-bg-card border border-border rounded-lg p-8 hover:border-border-hover hover:bg-bg-hover transition-all duration-300 group h-full">
                    {/* Step Number */}
                    <div className="absolute top-6 right-6 text-6xl font-black text-white/5 leading-none">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="relative z-10 w-14 h-14 rounded-lg bg-white/5 border border-border flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:border-border-hover transition-all duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-text-secondary text-sm">
              No credit card required • No account needed • Start in seconds
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
