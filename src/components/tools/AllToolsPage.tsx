'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { tools } from '@/lib/constants';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
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
} from 'lucide-react';

// Map tool IDs to their Lucide icons
const toolIcons: Record<string, React.ReactNode> = {
  'word-counter': <FileText className="w-6 h-6" />,
  'pdf-tools': <File className="w-6 h-6" />,
  'image-converter': <RefreshCw className="w-6 h-6" />,
  'image-optimizer': <Zap className="w-6 h-6" />,
  'watermark': <Stamp className="w-6 h-6" />,
  'password-generator': <Lock className="w-6 h-6" />,
  'rewrite-ai': <PenTool className="w-6 h-6" />,
  'code-formatter': <Code className="w-6 h-6" />,
  'color-picker': <Palette className="w-6 h-6" />,
  'paragraph-generator': <AlignLeft className="w-6 h-6" />,
  'pdf-merge': <File className="w-6 h-6" />,
  'pdf-split': <Scissors className="w-6 h-6" />,
  'compress-pdf': <Minimize2 className="w-6 h-6" />,
  'pdf-to-word': <FileType className="w-6 h-6" />,
  'word-to-pdf': <FileText className="w-6 h-6" />,
  'epub-to-pdf': <BookOpen className="w-6 h-6" />,
  'unlock-pdf': <LockOpen className="w-6 h-6" />,
  'protect-pdf': <Shield className="w-6 h-6" />,
  'watermark-pdf': <Droplet className="w-6 h-6" />,
  'picker-wheel': <Target className="w-6 h-6" />,
  'age-calculator': <Calendar className="w-6 h-6" />,
};

export function AllToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = tools.filter((tool) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.searchTerms.toLowerCase().includes(query)
    );
  });

  return (
    <section className="py-16 md:py-20">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-text-muted hover:text-white transition-colors mb-6"
          >
            <span>←</span>
            <span>Back to home</span>
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            All Tools
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto mb-8">
            Browse our complete collection of {tools.length} premium tools. All free, no limits.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-[15px] focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        {/* Tools Grid with Gradient Border Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => {
            const isUpcoming = tool.upcoming;
            return (
              <Link
                key={tool.id}
                href={isUpcoming ? '#' : tool.href}
                onClick={(e) => isUpcoming && e.preventDefault()}
                className={`category-card-gradient relative rounded-lg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] min-h-[200px] hover:-translate-y-1 animate-fade-in-up group p-6 flex flex-col gap-4 ${
                  isUpcoming ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                }`}
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                {isUpcoming && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-white text-black text-[10px] font-bold tracking-wide rounded z-10">
                    UPCOMING
                  </div>
                )}
                
                {/* Top section - Icon */}
                <div className="flex items-start justify-between relative z-10">
                  <div className="w-11 h-11 rounded-md border border-border flex items-center justify-center text-white bg-white/[0.03]">
                    {toolIcons[tool.id] || tool.icon}
                  </div>
                </div>

                {/* Body - Content */}
                <div className="mt-auto relative z-10">
                  <div className="text-base font-bold tracking-tight mb-1 flex items-center gap-2">
                    {tool.name}
                    {!isUpcoming && (
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    )}
                  </div>
                  <div className="text-[12px] text-text-muted leading-[1.4]">
                    {tool.description}
                  </div>
                </div>

                {/* Footer - Status */}
                <div className="mt-2 pt-2.5 border-t border-border flex items-center justify-between text-[10px] relative z-10">
                  {isUpcoming ? (
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

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted text-[15px]">
              No tools found matching &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-[13px] text-white hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
