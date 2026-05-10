'use client';

import Link from 'next/link';
import { Sparkles, ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface MenuItem {
  name: string;
  href: string;
  comingSoon?: boolean;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  // All Tools organized by category - Redistributed for better layout
  const allToolsMenu: Record<string, MenuItem[]> = {
    'PDF Tools': [
      { name: 'Merge PDFs', href: '/tools/pdf-merge' },
      { name: 'Split PDF', href: '/tools/pdf-split' },
      { name: 'Compress PDF', href: '#', comingSoon: true },
      { name: 'PDF to Word', href: '#', comingSoon: true },
      { name: 'Word to PDF', href: '#', comingSoon: true },
      { name: 'EPUB to PDF', href: '#', comingSoon: true },
    ],
    'Utilities': [
      { name: 'Word Counter', href: '/tools/word-counter' },
      { name: 'Color Picker', href: '/tools/color-picker' },
      { name: 'Password Generator', href: '/tools/password-generator' },
      { name: 'Picker Wheel', href: '#', comingSoon: true },
      { name: 'Age Calculator', href: '#', comingSoon: true },
    ],
    'Image Tools': [
      { name: 'Image Converter', href: '/tools/image-converter' },
      { name: 'Image Optimizer', href: '/tools/image-optimizer' },
      { name: 'Watermark Generator', href: '/tools/watermark' },
    ],
    'Code & Writing': [
      { name: 'Code Formatter', href: '/tools/code-formatter' },
      { name: 'Paragraph Generator', href: '/tools/paragraph-generator', comingSoon: true },
      { name: 'Rewrite AI', href: '/tools/rewrite-ai', comingSoon: true },
    ],
    'PDF Security': [
      { name: 'Unlock PDF', href: '#', comingSoon: true },
      { name: 'Protect PDF', href: '#', comingSoon: true },
      { name: 'Watermark PDF', href: '#', comingSoon: true },
    ],
  };

  const imageMenu: MenuItem[] = [
    { name: 'Image Converter', href: '/tools/image-converter' },
    { name: 'Image Optimizer', href: '/tools/image-optimizer' },
    { name: 'Watermark Generator', href: '/tools/watermark' },
  ];

  const converterMenu: MenuItem[] = [
    { name: 'Image Converter', href: '/tools/image-converter' },
    { name: 'PDF to Word', href: '#', comingSoon: true },
    { name: 'Word to PDF', href: '#', comingSoon: true },
    { name: 'EPUB to PDF', href: '#', comingSoon: true },
  ];

  const utilitiesMenu: MenuItem[] = [
    { name: 'Word Counter', href: '/tools/word-counter' },
    { name: 'Color Picker', href: '/tools/color-picker' },
    { name: 'Password Generator', href: '/tools/password-generator' },
    { name: 'Code Formatter', href: '/tools/code-formatter' },
    { name: 'Picker Wheel', href: '#', comingSoon: true },
    { name: 'Age Calculator', href: '#', comingSoon: true },
  ];

  const handleMouseEnter = (menu: string) => {
    setActiveMegaMenu(menu);
  };

  const handleMouseLeave = () => {
    setActiveMegaMenu(null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 bg-black/85 backdrop-blur-[24px] border-b border-border z-[1000]">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
        <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white flex-shrink-0" />
        <span className="text-base sm:text-lg md:text-xl font-bold truncate">
          Free AI Converter
        </span>
      </Link>

      {/* Desktop Navigation - Centered */}
      <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
        {/* All Tools Mega Menu */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter('all-tools')}
          onMouseLeave={handleMouseLeave}
        >
          <button className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium text-white rounded-md transition-all duration-200 hover:bg-white/[0.06]">
            All Tools
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {activeMegaMenu === 'all-tools' && (
            <div className="absolute top-full left-0 mt-1 w-[680px] bg-white border border-black/10 rounded-lg shadow-2xl p-5">
              <div className="grid grid-cols-3 gap-5">
                {Object.entries(allToolsMenu).map(([category, tools]) => (
                  <div key={category}>
                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-black/40 mb-2">
                      {category}
                    </h3>
                    <ul className="space-y-1.5">
                      {tools.map((tool) => (
                        <li key={tool.name}>
                          <Link
                            href={tool.href}
                            onClick={(e) => tool.comingSoon && e.preventDefault()}
                            className={`block text-[12px] transition-colors ${
                              tool.comingSoon
                                ? 'text-black/30 cursor-not-allowed'
                                : 'text-black/70 hover:text-black'
                            }`}
                          >
                            {tool.name}
                            {tool.comingSoon && (
                              <span className="ml-1.5 text-[8px] px-1 py-0.5 bg-black/10 rounded text-black/50">
                                SOON
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Image Menu */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter('image')}
          onMouseLeave={handleMouseLeave}
        >
          <button className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium text-white rounded-md transition-all duration-200 hover:bg-white/[0.06]">
            Image
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {activeMegaMenu === 'image' && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-black/10 rounded-lg shadow-2xl p-4">
              <ul className="space-y-2">
                {imageMenu.map((tool) => (
                  <li key={tool.name}>
                    <Link
                      href={tool.href}
                      className="block text-[13px] text-black/70 hover:text-black transition-colors py-1"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Converter Menu */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter('converter')}
          onMouseLeave={handleMouseLeave}
        >
          <button className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium text-white rounded-md transition-all duration-200 hover:bg-white/[0.06]">
            Converter
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {activeMegaMenu === 'converter' && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-black/10 rounded-lg shadow-2xl p-4">
              <ul className="space-y-2">
                {converterMenu.map((tool) => (
                  <li key={tool.name}>
                    <Link
                      href={tool.href}
                      onClick={(e) => tool.comingSoon && e.preventDefault()}
                      className={`block text-[13px] transition-colors py-1 ${
                        tool.comingSoon
                          ? 'text-black/30 cursor-not-allowed'
                          : 'text-black/70 hover:text-black'
                      }`}
                    >
                      {tool.name}
                      {tool.comingSoon && (
                        <span className="ml-2 text-[9px] px-1.5 py-0.5 bg-black/10 rounded text-black/50">
                          SOON
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Utilities Menu */}
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter('utilities')}
          onMouseLeave={handleMouseLeave}
        >
          <button className="flex items-center gap-1 px-4 py-2 text-[13px] font-medium text-white rounded-md transition-all duration-200 hover:bg-white/[0.06]">
            Utilities
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          {activeMegaMenu === 'utilities' && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-black/10 rounded-lg shadow-2xl p-4">
              <ul className="space-y-2">
                {utilitiesMenu.map((tool) => (
                  <li key={tool.name}>
                    <Link
                      href={tool.href}
                      className="block text-[13px] text-black/70 hover:text-black transition-colors py-1"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* What's New Button - Right Side */}
      <Link
        href="#updates"
        className="hidden lg:flex items-center gap-2 px-4 py-2 text-[13px] font-bold bg-white text-black rounded-md transition-all duration-200 hover:bg-white/90 hover:shadow-lg relative overflow-hidden group"
      >
        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        <span>What&apos;s New</span>
        {/* Sparkle effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full animate-ping" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-white rounded-full animate-ping animation-delay-150" />
        </div>
      </Link>

      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden flex items-center justify-center p-2 flex-shrink-0"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Menu"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="p-4 space-y-4">
            {/* All Tools */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-white/70 mb-2">
                All Tools
              </div>
              {Object.entries(allToolsMenu).map(([category, tools]) => (
                <div key={category} className="mb-4">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-white/50 mb-2 ml-2">
                    {category}
                  </div>
                  <ul className="space-y-1">
                    {tools.map((tool) => (
                      <li key={tool.name}>
                        <Link
                          href={tool.href}
                          onClick={(e) => {
                            if (tool.comingSoon) e.preventDefault();
                            else setIsMenuOpen(false);
                          }}
                          className={`block text-[13px] py-2 px-3 rounded transition-colors ${
                            tool.comingSoon
                              ? 'text-white/30 cursor-not-allowed'
                              : 'text-white/80 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {tool.name}
                          {tool.comingSoon && (
                            <span className="ml-2 text-[9px] px-1.5 py-0.5 bg-white/10 rounded text-white/60">
                              SOON
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Blogs */}
            <Link
              href="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="block text-[13px] font-medium text-white/80 py-2 px-3 rounded hover:text-white hover:bg-white/5 transition-colors"
            >
              Blogs
            </Link>

            {/* What's New */}
            <Link
              href="#updates"
              onClick={() => setIsMenuOpen(false)}
              className="block text-[13px] font-bold bg-white text-black py-2 px-3 rounded text-center hover:bg-white/90 transition-colors"
            >
              What&apos;s New ✨
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
