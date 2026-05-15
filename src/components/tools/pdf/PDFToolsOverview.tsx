'use client';

import { Container } from '@/components/ui/Container';
import { FileText, Scissors, Minimize2, ArrowRight, Lock, Zap, Infinity, DollarSign, FileType, BookOpen, LockOpen, Shield, Droplet } from 'lucide-react';
import Link from 'next/link';

export function PDFToolsOverview() {
  const pdfTools = [
    {
      id: 'merge',
      name: 'Merge PDFs',
      icon: FileText,
      description: 'Combine multiple PDF files into one document. Drag to reorder, then merge instantly.',
      href: '/tools/pdf-merge',
      features: ['Multiple files', 'Reorder pages', 'Instant merge'],
    },
    {
      id: 'split',
      name: 'Split PDF',
      icon: Scissors,
      description: 'Extract specific pages or split into multiple files. Choose all pages, range, or custom selection.',
      href: '/tools/pdf-split',
      features: ['Extract pages', 'Page ranges', 'Custom selection'],
    },
    {
      id: 'compress',
      name: 'Compress PDF',
      icon: Minimize2,
      description: 'Reduce PDF file size while maintaining quality. Advanced compression with custom options.',
      href: '#',
      features: ['Reduce size', 'Keep quality', 'Custom settings'],
      comingSoon: true,
    },
    {
      id: 'pdf-to-word',
      name: 'PDF to Word',
      icon: FileType,
      description: 'Convert PDF documents to editable Word files. Preserve formatting and layout.',
      href: '#',
      features: ['Editable DOCX', 'Keep formatting', 'Fast conversion'],
      comingSoon: true,
    },
    {
      id: 'word-to-pdf',
      name: 'Word to PDF',
      icon: FileText,
      description: 'Convert Word documents to PDF format. Maintain document structure and styling.',
      href: '#',
      features: ['DOCX to PDF', 'Keep layout', 'High quality'],
      comingSoon: true,
    },
    {
      id: 'epub-to-pdf',
      name: 'EPUB to PDF',
      icon: BookOpen,
      description: 'Convert EPUB ebooks to PDF format. Perfect for reading on any device.',
      href: '#',
      features: ['Ebook conversion', 'Preserve chapters', 'Universal format'],
      comingSoon: true,
    },
    {
      id: 'unlock-pdf',
      name: 'Unlock PDF',
      icon: LockOpen,
      description: 'Remove password protection from PDF files. Unlock restricted documents.',
      href: '#',
      features: ['Remove password', 'Unlock editing', 'Quick process'],
      comingSoon: true,
    },
    {
      id: 'protect-pdf',
      name: 'Protect PDF',
      icon: Shield,
      description: 'Add password protection to PDF files. Secure your sensitive documents.',
      href: '#',
      features: ['Add password', 'Restrict access', 'Secure files'],
      comingSoon: true,
    },
    {
      id: 'watermark',
      name: 'Watermark Generator',
      icon: Droplet,
      description: 'Add text or image watermarks to PDF files. Protect and brand your documents.',
      href: '#',
      features: ['Text watermark', 'Image watermark', 'Custom position'],
      comingSoon: true,
    },
  ];

  return (
    <section className="py-16 md:py-20 relative">
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <FileText className="w-3 h-3" />
            <span>PDF Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Professional PDF Tools
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Merge, split, and compress PDFs — all processed securely in your browser. No uploads, no limits.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pdfTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                href={tool.comingSoon ? '#' : tool.href}
                onClick={(e) => tool.comingSoon && e.preventDefault()}
                className={`group relative border border-white/10 rounded-lg p-8 bg-white/[0.02] transition-all ${
                  tool.comingSoon
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:border-white/30 hover:bg-white/[0.04]'
                }`}
              >
                {tool.comingSoon && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-white/10 border border-white/20 rounded text-[10px] font-bold tracking-wide">
                    COMING SOON
                  </div>
                )}

                {/* Icon */}
                <div className="w-14 h-14 mb-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  {tool.name}
                  {!tool.comingSoon && (
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  )}
                </h3>
                <p className="text-[14px] text-text-muted mb-4 leading-relaxed">
                  {tool.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {tool.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[11px] text-text-dim"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto">
          <div className="border border-white/10 rounded-lg p-8 md:p-10 bg-white/[0.02]">
            <h2 className="text-2xl font-bold mb-6 text-center">Why Use Our PDF Tools?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-[15px]">Privacy First</h3>
                  <p className="text-[13px] text-text-muted">
                    All processing happens in your browser. Files never leave your device.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-[15px]">Lightning Fast</h3>
                  <p className="text-[13px] text-text-muted">
                    No uploads or downloads. Instant processing with no waiting.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Infinity className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-[15px]">Unlimited Use</h3>
                  <p className="text-[13px] text-text-muted">
                    No daily limits, no file size restrictions. Use as much as you need.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-[15px]">100% Free</h3>
                  <p className="text-[13px] text-text-muted">
                    No hidden costs, no subscriptions. All features completely free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
