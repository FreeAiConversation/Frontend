'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ToolCard } from '@/components/ui/ToolCard';
import { tools } from '@/lib/constants';
import { Search, LucideIcon } from 'lucide-react';
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
const toolIconMap: Record<string, LucideIcon> = {
  'word-counter': FileText,
  'image-converter': RefreshCw,
  'image-optimizer': Zap,
  'image-resizer': Scaling,
  'watermark': Stamp,
  'password-generator': Lock,
  'rewrite-ai': PenTool,
  'code-formatter': Code,
  'color-picker': Palette,
  'paragraph-generator': AlignLeft,
  'pdf-merge': File,
  'pdf-split': Scissors,
  'compress-pdf': Minimize2,
  'pdf-to-word': FileType,
  'word-to-pdf': FileText,
  'epub-to-pdf': BookOpen,
  'unlock-pdf': LockOpen,
  'protect-pdf': Shield,
  'watermark-pdf': Droplet,
  'picker-wheel': Target,
  'age-calculator': Calendar,
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

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, index) => (
            <ToolCard
              key={tool.id}
              name={tool.name}
              description={tool.description}
              href={tool.href}
              icon={toolIconMap[tool.id] || File}
              upcoming={tool.upcoming}
              index={index}
            />
          ))}
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
