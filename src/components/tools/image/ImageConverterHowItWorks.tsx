'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Upload, Settings, Eye, Download, Zap, Crop, RefreshCw, ChevronDown, Sliders, Target, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FeatureId = 'convert' | 'optimize' | 'resize';

interface Feature {
  id: FeatureId;
  label: string;
  icon: typeof RefreshCw;
  steps: { icon: typeof Upload; title: string; description: string }[];
}

const features: Feature[] = [
  {
    id: 'convert',
    label: 'Convert',
    icon: RefreshCw,
    steps: [
      {
        icon: Upload,
        title: 'Upload Your Image',
        description: 'Drag and drop your image or click to browse. Supports PNG, JPG, WEBP, BMP, and GIF formats up to 20MB.',
      },
      {
        icon: Settings,
        title: 'Choose Output Format',
        description: 'Select your desired format — PNG for transparency, JPG for photos, WEBP for web optimization, or BMP for lossless.',
      },
      {
        icon: Sliders,
        title: 'Adjust Quality',
        description: 'Fine-tune the quality slider for JPG and WEBP. Balance between file size and visual fidelity.',
      },
      {
        icon: Download,
        title: 'Preview & Download',
        description: 'See the converted image with a size comparison badge. Download only when you are satisfied.',
      },
    ],
  },
  {
    id: 'optimize',
    label: 'Optimize',
    icon: Zap,
    steps: [
      {
        icon: Upload,
        title: 'Upload Your Image',
        description: 'Select any image file up to 20MB. The optimizer works with all common formats.',
      },
      {
        icon: Target,
        title: 'Set Target Size',
        description: 'Choose a target file size (0.5–5MB), max dimension, and output format. WEBP is recommended for best compression.',
      },
      {
        icon: Zap,
        title: 'Compress with Web Worker',
        description: 'Processing runs in a background thread so your browser stays responsive. Watch the progress bar in real-time.',
      },
      {
        icon: Download,
        title: 'Download Optimized File',
        description: 'See exactly how much space you saved. Download the optimized image with one click.',
      },
    ],
  },
  {
    id: 'resize',
    label: 'Resize',
    icon: Crop,
    steps: [
      {
        icon: Upload,
        title: 'Upload Your Image',
        description: 'Drop any image file. Original dimensions are detected automatically.',
      },
      {
        icon: Maximize2,
        title: 'Choose Resize Mode',
        description: 'Pick from exact dimensions with aspect ratio lock, percentage scaling (1–200%), or common presets like 1920×1080.',
      },
      {
        icon: Eye,
        title: 'Select Format & Quality',
        description: 'Choose PNG, JPG, or WEBP output. Adjust quality for lossy formats to control the final file size.',
      },
      {
        icon: Download,
        title: 'Preview & Download',
        description: 'See the new dimensions and file size comparison. Download the resized image when ready.',
      },
    ],
  },
];

export function ImageConverterHowItWorks() {
  const [activeFeature, setActiveFeature] = useState<FeatureId>('convert');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentFeature = features.find((f) => f.id === activeFeature)!;
  const CurrentIcon = currentFeature.icon;

  return (
    <section className="py-12 md:py-16 bg-white/[0.02]">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <span>How To Use</span>
          </div>

          {/* Title with Dropdown */}
          <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              How to
            </h2>

            {/* Animated Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-black text-2xl md:text-3xl rounded-lg hover:bg-white/90 transition-all"
              >
                <CurrentIcon className="w-6 h-6 md:w-7 md:h-7" />
                <span>{currentFeature.label}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-black/10 rounded-lg shadow-2xl overflow-hidden z-50"
                  >
                    {features.map((feature) => {
                      const Icon = feature.icon;
                      const isActive = feature.id === activeFeature;
                      return (
                        <button
                          key={feature.id}
                          onClick={() => {
                            setActiveFeature(feature.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                            isActive
                              ? 'bg-black text-white'
                              : 'text-black/70 hover:bg-black/5'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-bold text-[15px]">{feature.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Images
            </h2>
          </div>

          <p className="text-text-muted text-[15px] max-w-2xl mx-auto">
            {activeFeature === 'convert' && 'Change image format in four simple steps — no software installation needed'}
            {activeFeature === 'optimize' && 'Reduce file size while maintaining visual quality — powered by Web Workers'}
            {activeFeature === 'resize' && 'Change image dimensions with precision — aspect ratio lock, presets, and more'}
          </p>
        </div>

        {/* Animated Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {currentFeature.steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={`${activeFeature}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative text-center"
                >
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-[12px] font-bold mb-4">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-[16px] font-bold mb-2">{step.title}</h3>
                  <p className="text-[13px] text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
