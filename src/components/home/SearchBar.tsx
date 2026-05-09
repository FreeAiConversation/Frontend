'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="max-w-[520px] mx-auto mb-16 relative z-10 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
      <div className="flex items-center bg-bg-elevated border border-border rounded-full py-1.5 px-5 transition-all duration-200 focus-within:border-border-hover focus-within:shadow-glow">
        <Search className="w-4 h-4 text-text-dim mr-3 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search for a tool..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 text-[14px] py-2.5 bg-transparent text-white placeholder:text-text-dim outline-none"
          autoComplete="off"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2.5 bg-white text-black rounded-full text-[13px] font-semibold flex-shrink-0 transition-opacity duration-200 hover:opacity-85"
        >
          Search
        </button>
      </div>
    </div>
  );
}
