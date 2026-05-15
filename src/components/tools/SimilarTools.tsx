'use client';

import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { ArrowRight, RefreshCw, Zap, Stamp, File, Scissors, FileText, Lock, Palette, Code, Target, Calendar, Scaling, Minimize2, Shield } from 'lucide-react';

interface SimilarTool {
  id: string;
  name: string;
  description: string;
  href: string;
  upcoming?: boolean;
}

interface SimilarToolsProps {
  currentToolId: string;
}

// Curated related tools for each tool — only the 3 most relevant
const relatedToolsMap: Record<string, SimilarTool[]> = {
  // Image tools
  'image-converter': [
    { id: 'image-optimizer', name: 'Image Optimizer', description: 'Compress images while keeping quality', href: '/tools/image-optimizer' },
    { id: 'image-resizer', name: 'Image Resizer', description: 'Change image dimensions & scale', href: '/tools/image-resizer' },
    { id: 'watermark', name: 'Watermark Generator', description: 'Add text watermarks to images', href: '/tools/watermark' },
  ],
  'image-optimizer': [
    { id: 'image-converter', name: 'Image Converter', description: 'Convert between PNG, JPG, WEBP & BMP', href: '/tools/image-converter' },
    { id: 'image-resizer', name: 'Image Resizer', description: 'Resize to reduce dimensions & file size', href: '/tools/image-resizer' },
    { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce PDF file size too', href: '#', upcoming: true },
  ],
  'image-resizer': [
    { id: 'image-optimizer', name: 'Image Optimizer', description: 'Compress without changing dimensions', href: '/tools/image-optimizer' },
    { id: 'image-converter', name: 'Image Converter', description: 'Change format after resizing', href: '/tools/image-converter' },
    { id: 'watermark', name: 'Watermark Generator', description: 'Add watermarks to resized images', href: '/tools/watermark' },
  ],
  // PDF tools
  'pdf-merge': [
    { id: 'pdf-split', name: 'Split PDF', description: 'Extract specific pages from PDFs', href: '/tools/pdf-split' },
    { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce merged PDF file size', href: '#', upcoming: true },
    { id: 'protect-pdf', name: 'Protect PDF', description: 'Add password after merging', href: '#', upcoming: true },
  ],
  'pdf-split': [
    { id: 'pdf-merge', name: 'Merge PDFs', description: 'Combine split pages back together', href: '/tools/pdf-merge' },
    { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce split PDF file sizes', href: '#', upcoming: true },
    { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert extracted pages to DOCX', href: '#', upcoming: true },
  ],
};

const iconMap: Record<string, React.ReactNode> = {
  'image-converter': <RefreshCw className="w-5 h-5" />,
  'image-optimizer': <Zap className="w-5 h-5" />,
  'image-resizer': <Scaling className="w-5 h-5" />,
  'watermark': <Stamp className="w-5 h-5" />,
  'pdf-merge': <File className="w-5 h-5" />,
  'pdf-split': <Scissors className="w-5 h-5" />,
  'compress-pdf': <Minimize2 className="w-5 h-5" />,
  'pdf-to-word': <FileText className="w-5 h-5" />,
  'word-to-pdf': <File className="w-5 h-5" />,
  'unlock-pdf': <Lock className="w-5 h-5" />,
  'protect-pdf': <Shield className="w-5 h-5" />,
  'watermark-pdf': <Stamp className="w-5 h-5" />,
  'password-generator': <Lock className="w-5 h-5" />,
  'color-picker': <Palette className="w-5 h-5" />,
  'word-counter': <FileText className="w-5 h-5" />,
  'code-formatter': <Code className="w-5 h-5" />,
  'picker-wheel': <Target className="w-5 h-5" />,
  'age-calculator': <Calendar className="w-5 h-5" />,
};

export function SimilarTools({ currentToolId }: SimilarToolsProps) {
  const tools = relatedToolsMap[currentToolId];

  if (!tools || tools.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
            Similar Tools
          </h2>
          <p className="text-text-muted text-[14px]">
            You might also find these useful
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.upcoming ? '#' : tool.href}
              onClick={(e) => tool.upcoming && e.preventDefault()}
              className={`flex flex-col items-center text-center gap-3 p-5 border border-white/10 rounded-lg transition-all group ${
                tool.upcoming
                  ? 'opacity-50 cursor-not-allowed bg-white/[0.01]'
                  : 'hover:border-white/25 hover:bg-white/[0.03] cursor-pointer'
              }`}
            >
              <div className="w-11 h-11 rounded-md border border-white/10 bg-white/[0.03] flex items-center justify-center group-hover:bg-white/[0.06] transition-colors">
                {iconMap[tool.id]}
              </div>
              <div>
                <div className="text-[14px] font-semibold flex items-center justify-center gap-2">
                  {tool.name}
                  {tool.upcoming && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-white/10 rounded font-bold text-text-dim">SOON</span>
                  )}
                </div>
                <div className="text-[12px] text-text-muted mt-1">
                  {tool.description}
                </div>
              </div>
              {!tool.upcoming && (
                <ArrowRight className="w-4 h-4 text-text-dim opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
