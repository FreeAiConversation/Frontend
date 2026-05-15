'use client';

import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { ArrowRight, ImageIcon, RefreshCw, Zap, Crop, Stamp } from 'lucide-react';

interface ImageTool {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: typeof RefreshCw;
  features: string[];
  upcoming?: boolean;
}

const imageTools: ImageTool[] = [
  {
    id: 'image-converter',
    name: 'Image Converter',
    description: 'Convert images between PNG, JPG, WEBP, and BMP formats with quality control. Handles transparent PNGs correctly when converting to JPG.',
    href: '/tools/image-converter',
    icon: RefreshCw,
    features: ['PNG/JPG/WEBP/BMP', 'Quality slider', 'Lossless & lossy'],
  },
  {
    id: 'image-optimizer',
    name: 'Image Optimizer',
    description: 'Compress and reduce image file size by up to 80% while maintaining visual quality. Set target size, max dimensions, and output format.',
    href: '/tools/image-optimizer',
    icon: Zap,
    features: ['Target file size', 'Web Worker powered', 'Progress tracking'],
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images by exact dimensions, percentage scaling, or common presets like 1920×1080. Aspect ratio lock keeps proportions perfect.',
    href: '/tools/image-resizer',
    icon: Crop,
    features: ['Aspect ratio lock', 'Percentage scaling', '6 common presets'],
  },
  {
    id: 'watermark',
    name: 'Watermark Generator',
    description: 'Add custom text watermarks to your images with full control over position, opacity, font size, and rotation.',
    href: '/tools/watermark',
    icon: Stamp,
    features: ['Custom text', 'Position control', 'Opacity & rotation'],
  },
];

export function ImageToolsOverview() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        {/* Back Link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-[13px] text-text-muted hover:text-white transition-colors mb-8"
        >
          <span>←</span>
          <span>Back to all tools</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <ImageIcon className="w-3 h-3" />
            <span>Image Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Image Tools
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Convert, optimize, resize, and watermark images — all free, all private, all in your browser.
          </p>
        </div>

        {/* Tools Grid with Gradient Border Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {imageTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                href={tool.upcoming ? '#' : tool.href}
                onClick={(e) => tool.upcoming && e.preventDefault()}
                className={`category-card-gradient relative rounded-lg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] min-h-[220px] hover:-translate-y-1 animate-fade-in-up group p-6 flex flex-col gap-4 ${
                  tool.upcoming ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                }`}
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                {tool.upcoming && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-white text-black text-[10px] font-bold tracking-wide rounded z-10">
                    COMING SOON
                  </div>
                )}

                {/* Top section - Icon */}
                <div className="flex items-start justify-between relative z-10">
                  <div className="w-12 h-12 rounded-md border border-border flex items-center justify-center text-white bg-white/[0.03]">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Body - Content */}
                <div className="mt-auto relative z-10">
                  <div className="text-lg font-bold tracking-tight mb-1.5 flex items-center gap-2">
                    {tool.name}
                    {!tool.upcoming && (
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    )}
                  </div>
                  <div className="text-[13px] text-text-muted leading-[1.5] mb-3">
                    {tool.description}
                  </div>
                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {tool.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-text-dim"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer - Status */}
                <div className="mt-2 pt-2.5 border-t border-border flex items-center justify-between text-[10px] relative z-10">
                  {tool.upcoming ? (
                    <>
                      <span className="text-text-dim">Status:</span>
                      <span className="text-text-secondary font-semibold px-2 py-0.5 border border-border rounded-full">
                        Coming Soon
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-text-dim">Ready to use</span>
                      <span className="text-white font-semibold">Try now →</span>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
