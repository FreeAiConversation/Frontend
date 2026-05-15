'use client';

import { useState, useRef, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { ToolCard } from '@/components/ui/ToolCard';
import { tools } from '@/lib/constants';
import { Search, ChevronLeft, ChevronRight, Filter, LucideIcon, File, Image, Code, PenTool, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Lock, 
  Palette, 
  AlignLeft,
  RefreshCw,
  Zap,
  Stamp,
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

// Category tabs with keywords to match tools
const categoryTabs = [
  { id: 'all', label: 'All', icon: Filter },
  { id: 'pdf', label: 'PDF', icon: File, keywords: ['pdf', 'merge', 'split', 'compress', 'word-to-pdf', 'pdf-to-word', 'epub', 'unlock', 'protect', 'watermark-pdf'] },
  { id: 'image', label: 'Image', icon: Image, keywords: ['image', 'watermark'] },
  { id: 'code', label: 'Code', icon: Code, keywords: ['code', 'formatter'] },
  { id: 'writing', label: 'Writing', icon: PenTool, keywords: ['rewrite', 'paragraph', 'word-counter'] },
  { id: 'utility', label: 'Utilities', icon: Settings, keywords: ['password', 'color', 'picker-wheel', 'age-calculator'] },
];

function matchesCategory(toolId: string, searchTerms: string, categoryId: string): boolean {
  if (categoryId === 'all') return true;
  const category = categoryTabs.find((c) => c.id === categoryId);
  if (!category || !category.keywords) return false;
  return category.keywords.some((kw) => toolId.includes(kw) || searchTerms.includes(kw));
}

export function AllToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Check scroll position for arrows
  const checkScroll = () => {
    const el = tabsRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 0);
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollTabs = (direction: 'left' | 'right') => {
    const el = tabsRef.current;
    if (!el) return;
    const scrollAmount = 150;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
  };

  const filteredTools = tools.filter((tool) => {
    // Category filter
    if (!matchesCategory(tool.id, tool.searchTerms, activeCategory)) return false;

    // Search filter
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
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            All Tools
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Browse our complete collection of {tools.length} premium tools. All free, no limits.
          </p>
        </div>

        {/* Category Tabs + Search — Same Line */}
        <div className="mb-10">
          <div className="flex items-center gap-4">
            {/* Tabs with arrows */}
            <div className="relative flex-1 min-w-0">
              {/* Left Arrow */}
              <AnimatePresence>
                {showLeftArrow && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => scrollTabs('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/80 border border-white/10 rounded-full flex items-center justify-center hover:bg-black hover:border-white/30 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Right Arrow */}
              <AnimatePresence>
                {showRightArrow && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => scrollTabs('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-black/80 border border-white/10 rounded-full flex items-center justify-center hover:bg-black hover:border-white/30 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Scrollable Tabs */}
              <div
                ref={tabsRef}
                onScroll={checkScroll}
                className="flex gap-2 overflow-x-auto px-1 py-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {categoryTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategory(tab.id)}
                      className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                        isActive
                          ? 'text-black'
                          : 'text-text-muted hover:text-white border border-white/10 hover:border-white/20'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-white rounded-full"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Bar — Right Side */}
            <div className="relative w-56 flex-shrink-0 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-full text-[13px] focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>

          {/* Mobile Search — Below tabs on small screens */}
          <div className="relative mt-3 sm:hidden">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-[13px] focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {/* Results count */}
          {(activeCategory !== 'all' || searchQuery) && (
            <div className="mt-4 text-[13px] text-text-dim">
              Showing {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
              {activeCategory !== 'all' && ` in ${categoryTabs.find((t) => t.id === activeCategory)?.label}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </div>
          )}
        </div>

        {/* Tools Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
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
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted text-[15px]">
              No tools found{searchQuery && ` matching "${searchQuery}"`}
              {activeCategory !== 'all' && ` in ${categoryTabs.find((t) => t.id === activeCategory)?.label}`}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-4 text-[13px] text-white hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
