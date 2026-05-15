'use client';

import Link from 'next/link';
import { tools } from '@/lib/constants';
import { 
  FileText, 
  File, 
  Lock, 
  Code, 
  Palette, 
  AlignLeft,
  RefreshCw,
  Zap,
  Stamp,
  PenTool,
  Scissors,
  Minimize2,
  FileType,
  BookOpen,
  LockOpen,
  Shield,
  Droplet,
  Target,
  Calendar,
  Scaling,
} from 'lucide-react';

// Map tool IDs to their Lucide icons
const toolIcons: Record<string, React.ReactNode> = {
  'word-counter': <FileText className="w-4 h-4" />,
  'pdf-tools': <File className="w-4 h-4" />,
  'image-converter': <RefreshCw className="w-4 h-4" />,
  'image-optimizer': <Zap className="w-4 h-4" />,
  'image-resizer': <Scaling className="w-4 h-4" />,
  'watermark': <Stamp className="w-4 h-4" />,
  'password-generator': <Lock className="w-4 h-4" />,
  'rewrite-ai': <PenTool className="w-4 h-4" />,
  'code-formatter': <Code className="w-4 h-4" />,
  'color-picker': <Palette className="w-4 h-4" />,
  'paragraph-generator': <AlignLeft className="w-4 h-4" />,
  'pdf-merge': <File className="w-4 h-4" />,
  'pdf-split': <Scissors className="w-4 h-4" />,
  'compress-pdf': <Minimize2 className="w-4 h-4" />,
  'pdf-to-word': <FileType className="w-4 h-4" />,
  'word-to-pdf': <FileText className="w-4 h-4" />,
  'epub-to-pdf': <BookOpen className="w-4 h-4" />,
  'unlock-pdf': <LockOpen className="w-4 h-4" />,
  'protect-pdf': <Shield className="w-4 h-4" />,
  'watermark-pdf': <Droplet className="w-4 h-4" />,
  'picker-wheel': <Target className="w-4 h-4" />,
  'age-calculator': <Calendar className="w-4 h-4" />,
};

export function CTASection() {
  return (
    <section className="flex flex-col items-center justify-center relative px-4 md:px-10 py-12 md:py-16">
      {/* Corner Decoration Brackets */}
      <div className="corner-bracket top-left" />
      <div className="corner-bracket top-right" />
      <div className="corner-bracket bottom-left" />
      <div className="corner-bracket bottom-right" />

      {/* Main Heading - Layered Design */}
      <div className="text-center relative z-10 select-none mb-8 w-full">
        <div className="relative inline-block">
          {/* GENERATE - Top Line (White) */}
          <h2 className="hero-title text-[12vw] md:text-[120px] lg:text-[140px] text-white">
            GENERATE
          </h2>
          
          {/* PAY NOTHING - Middle (Absolute positioned, black bg with white text) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <h3 className="hero-title text-[8vw] md:text-[70px] lg:text-[85px] bg-white text-black px-3 md:px-4 whitespace-nowrap border-2 border-white">
              PAY NOTHING
            </h3>
          </div>
          
          {/* ANYTHING - Bottom Line (Grey Outline) */}
          <h2 className="hero-title text-[12vw] md:text-[120px] lg:text-[140px] text-outline-grey">
            ANYTHING
          </h2>
        </div>
      </div>

      {/* Tools Grid - Compact */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3 w-full max-w-5xl">
        {tools.slice(0, 9).map((tool, index) => {
          const isUpcoming = tool.upcoming;
          
          return (
            <Link
              key={tool.id}
              href={isUpcoming ? '#' : tool.href}
              onClick={(e) => isUpcoming && e.preventDefault()}
              className={`border border-white/10 bg-black/40 p-3 md:p-4 rounded-sm relative group transition-all duration-300 ${
                isUpcoming
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer hover:border-white/30'
              }`}
            >
              {isUpcoming && (
                <span className="absolute top-1.5 right-2 text-[7px] bg-white text-black px-1.5 py-0.5 font-bold rounded">
                  SOON
                </span>
              )}
              <span className="absolute top-1.5 left-2 text-[7px] text-gray-600 font-bold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="mt-3 mb-2 text-white">
                {toolIcons[tool.id]}
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-wider mb-0.5 leading-tight">
                {tool.name}
              </h3>
              <p className="text-[8px] text-gray-500 uppercase leading-tight">
                {tool.description.split(' ').slice(0, 3).join(' ')}
              </p>
            </Link>
          );
        })}
        
        {/* All Tools Card - 10th Position */}
        <Link
          href="/tools"
          className="border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-3 md:p-4 rounded-sm relative group transition-all duration-300 cursor-pointer hover:border-white/40 hover:from-white/15 hover:to-white/10"
        >
          <span className="absolute top-1.5 left-2 text-[7px] text-gray-600 font-bold">
            10
          </span>
          <div className="mt-3 mb-2 text-white flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          <h3 className="text-[10px] font-black uppercase tracking-wider mb-0.5 leading-tight text-center">
            All Tools
          </h3>
        
        </Link>
      </div>
    </section>
  );
}
