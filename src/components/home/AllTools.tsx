'use client';

import { Container } from '@/components/ui/Container';
import { ToolItem } from './ToolItem';
import { tools } from '@/lib/constants';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AllToolsProps {
  searchQuery: string;
}

export function AllTools({ searchQuery }: AllToolsProps) {
  const [filteredTools, setFilteredTools] = useState(tools);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTools(tools);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = tools.filter((tool) => {
      const name = tool.name.toLowerCase();
      const desc = tool.description.toLowerCase();
      const terms = tool.searchTerms.toLowerCase();
      return name.includes(query) || desc.includes(query) || terms.includes(query);
    });

    setFilteredTools(filtered);
  }, [searchQuery]);

  // Show only first 10 tools on home page
  const displayedTools = filteredTools.slice(0, 10);

  return (
    <section className="py-16" id="all-tools">
      <Container>
        <h2 className="text-2xl font-extrabold tracking-tight text-center mb-1.5">
          All Tools
        </h2>
        <p className="text-center text-text-muted text-[14px] mb-9">
          Browse our complete collection of premium tools
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {displayedTools.map((tool, index) => (
            <ToolItem key={tool.id} tool={tool} index={index} />
          ))}
        </div>

        {/* See All Tools Button */}
        {!searchQuery && filteredTools.length > 10 && (
          <div className="mt-8 text-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-md hover:bg-white/90 transition-colors text-[14px]"
            >
              See All Tools
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}

        {filteredTools.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            No tools found matching &quot;{searchQuery}&quot;
          </div>
        )}
      </Container>
    </section>
  );
}
