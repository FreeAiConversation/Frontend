'use client';

import { Container } from '@/components/ui/Container';
import { Upload, Settings, Download } from 'lucide-react';

export function PDFHowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Your PDFs',
      description: 'Select one or multiple PDF files from your device. Drag & drop or click to browse.',
    },
    {
      icon: Settings,
      title: 'Choose Your Action',
      description: 'Select merge, split, or compress. Customize settings like page ranges or compression level.',
    },
    {
      icon: Download,
      title: 'Download Result',
      description: 'Your processed PDF is ready instantly. Download and use it right away.',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white/[0.02]">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <span>Process</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            How It Works
          </h2>
          <p className="text-text-muted text-[15px] max-w-2xl mx-auto">
            Three simple steps to process your PDFs professionally
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Arrow between cards (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0" />
                )}

                <div className="relative z-10 text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-[13px] font-bold mb-4">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-[14px] text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
