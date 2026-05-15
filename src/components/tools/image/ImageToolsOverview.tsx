'use client';

import { Container } from '@/components/ui/Container';
import { ToolCard } from '@/components/ui/ToolCard';
import { ImageIcon, RefreshCw, Zap, Crop, Stamp } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const imageTools = [
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
        <Breadcrumb items={[
          { label: 'Tools', href: '/tools' },
          { label: 'Image Tools', href: '/tools/image-tools' },
        ]} />

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

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {imageTools.map((tool, index) => (
            <ToolCard
              key={tool.id}
              name={tool.name}
              description={tool.description}
              href={tool.href}
              icon={tool.icon}
              features={tool.features}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
