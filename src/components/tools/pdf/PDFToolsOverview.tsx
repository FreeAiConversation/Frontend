'use client';

import { Container } from '@/components/ui/Container';
import { ToolCard } from '@/components/ui/ToolCard';
import { FileText, Scissors, Minimize2, Lock, Zap, Infinity, DollarSign, FileType, BookOpen, LockOpen, Shield, Droplet } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

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
      upcoming: true,
    },
    {
      id: 'pdf-to-word',
      name: 'PDF to Word',
      icon: FileType,
      description: 'Convert PDF documents to editable Word files. Preserve formatting and layout.',
      href: '#',
      features: ['Editable DOCX', 'Keep formatting', 'Fast conversion'],
      upcoming: true,
    },
    {
      id: 'word-to-pdf',
      name: 'Word to PDF',
      icon: FileText,
      description: 'Convert Word documents to PDF format. Maintain document structure and styling.',
      href: '#',
      features: ['DOCX to PDF', 'Keep layout', 'High quality'],
      upcoming: true,
    },
    {
      id: 'epub-to-pdf',
      name: 'EPUB to PDF',
      icon: BookOpen,
      description: 'Convert EPUB ebooks to PDF format. Perfect for reading on any device.',
      href: '#',
      features: ['Ebook conversion', 'Preserve chapters', 'Universal format'],
      upcoming: true,
    },
    {
      id: 'unlock-pdf',
      name: 'Unlock PDF',
      icon: LockOpen,
      description: 'Remove password protection from PDF files. Unlock restricted documents.',
      href: '#',
      features: ['Remove password', 'Unlock editing', 'Quick process'],
      upcoming: true,
    },
    {
      id: 'protect-pdf',
      name: 'Protect PDF',
      icon: Shield,
      description: 'Add password protection to PDF files. Secure your sensitive documents.',
      href: '#',
      features: ['Add password', 'Restrict access', 'Secure files'],
      upcoming: true,
    },
    {
      id: 'watermark',
      name: 'Watermark PDF',
      icon: Droplet,
      description: 'Add text or image watermarks to PDF files. Protect and brand your documents.',
      href: '#',
      features: ['Text watermark', 'Image watermark', 'Custom position'],
      upcoming: true,
    },
  ];

  return (
    <section className="py-16 md:py-20 relative">
      <Container>
        <Breadcrumb items={[
          { label: 'Tools', href: '/tools' },
          { label: 'PDF Tools', href: '/tools/pdf-tools' },
        ]} />

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pdfTools.map((tool, index) => (
            <ToolCard
              key={tool.id}
              name={tool.name}
              description={tool.description}
              href={tool.href}
              icon={tool.icon}
              features={tool.features}
              upcoming={tool.upcoming}
              index={index}
            />
          ))}
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
