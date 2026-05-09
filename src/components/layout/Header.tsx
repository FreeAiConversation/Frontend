'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'PDF', href: '#categories' },
    { label: 'Image', href: '#categories' },
    { label: 'Write', href: '#categories' },
    { label: 'Code', href: '#categories' },
    { label: 'Utility', href: '#categories' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 bg-black/85 backdrop-blur-[24px] border-b border-border z-[1000]">
      <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
        <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white flex-shrink-0" />
        <span className="text-base sm:text-lg md:text-xl truncate">
          Free AI Converter
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1 flex-shrink-0">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="px-4 py-1.5 text-[13px] font-medium text-text-muted rounded-full transition-all duration-200 hover:text-white hover:bg-white/[0.06] tracking-tight"
          >
            {item.label}
          </Link>
        ))}
        <Link href="#all-tools">
          <Button variant="primary" className="ml-2 text-[12px] px-5 py-2 tracking-wide">
            All Tools
          </Button>
        </Link>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden flex flex-col gap-[5px] p-1 flex-shrink-0"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Menu"
      >
        <span className="block w-[18px] h-[1.5px] bg-text-secondary" />
        <span className="block w-[18px] h-[1.5px] bg-text-secondary" />
        <span className="block w-[18px] h-[1.5px] bg-text-secondary" />
      </button>
    </header>
  );
}
