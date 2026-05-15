'use client';

import { Container } from '@/components/ui/Container';
import { Upload, Settings, Sliders, Download, Target, Zap, Maximize2, Eye, LucideIcon } from 'lucide-react';

type IconName = 'upload' | 'settings' | 'sliders' | 'download' | 'target' | 'zap' | 'maximize' | 'eye';

const iconComponents: Record<IconName, LucideIcon> = {
  upload: Upload,
  settings: Settings,
  sliders: Sliders,
  download: Download,
  target: Target,
  zap: Zap,
  maximize: Maximize2,
  eye: Eye,
};

interface Step {
  icon: IconName;
  title: string;
  description: string;
}

interface ImageConverterHowItWorksProps {
  title?: string;
  subtitle?: string;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  {
    icon: 'upload',
    title: 'Upload Your Image',
    description: 'Drag and drop your image or click to browse. Supports PNG, JPG, WEBP, BMP, and GIF formats up to 20MB.',
  },
  {
    icon: 'settings',
    title: 'Choose Output Format',
    description: 'Select your desired format — PNG for transparency, JPG for photos, WEBP for web optimization, or BMP for lossless.',
  },
  {
    icon: 'sliders',
    title: 'Adjust Quality',
    description: 'Fine-tune the quality slider for JPG and WEBP. Balance between file size and visual fidelity.',
  },
  {
    icon: 'download',
    title: 'Preview & Download',
    description: 'See the converted image with a size comparison badge. Download only when you are satisfied.',
  },
];

export function ImageConverterHowItWorks({
  title = 'How to Convert Images',
  subtitle = 'Change image format in four simple steps — no software installation needed',
  steps = defaultSteps,
}: ImageConverterHowItWorksProps) {
  return (
    <section className="py-12 md:py-16 bg-white/[0.02]">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <span>How To Use</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-text-muted text-[15px] max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => {
            const Icon = iconComponents[step.icon];
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
