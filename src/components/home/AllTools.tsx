'use client';

import { Container } from '@/components/ui/Container';
import { ToolItem } from './ToolItem';
import { tools } from '@/lib/constants';
import { useState, useEffect } from 'react';

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
          {filteredTools.map((tool, index) => (
            <ToolItem key={tool.id} tool={tool} index={index} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            No tools found matching &quot;{searchQuery}&quot;
          </div>
        )}
      </Container>
    </section>
  );
}
