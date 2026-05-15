'use client';

import { Container } from '@/components/ui/Container';
import { 
  Lock, 
  Zap, 
  Infinity, 
  Monitor, 
  Sliders, 
  Eye,
} from 'lucide-react';

export function ImageConverterFeatures() {
  const features = [
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Your images never leave your device. All conversion happens locally in your browser using the Canvas API.',
    },
    {
      icon: Zap,
      title: 'Instant Conversion',
      description: 'No waiting for server processing. Images are converted in milliseconds using client-side technology.',
    },
    {
      icon: Infinity,
      title: 'Unlimited & Free',
      description: 'No daily limits, no file count restrictions, no watermarks. Convert as many images as you need, forever free.',
    },
    {
      icon: Sliders,
      title: 'Quality Control',
      description: 'Fine-tune output quality for JPG and WEBP formats. Balance between file size and visual quality.',
    },
    {
      icon: Eye,
      title: 'Live Preview',
      description: 'Preview your converted image before downloading. See file size comparison to make informed decisions.',
    },
    {
      icon: Monitor,
      title: 'Works Everywhere',
      description: 'Compatible with all modern browsers on desktop, tablet, and mobile. No software installation required.',
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
            Why Use Our Image Converter?
          </h2>
          <p className="text-text-muted text-[15px] max-w-2xl mx-auto">
            A fast, secure, and feature-rich image converter that respects your privacy
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
