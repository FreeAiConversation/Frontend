'use client';

import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { ArrowRight, Settings, Lock, Palette, FileText, Code, Target, Calendar } from 'lucide-react';

interface UtilityTool {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: typeof Lock;
  features: string[];
  upcoming?: boolean;
}

const utilityTools: UtilityTool[] = [
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate cryptographically secure passwords with customizable length, character types, and a visual strength meter.',
    href: '/tools/password-generator',
    icon: Lock,
    features: ['Custom length', 'Strength meter', 'Copy to clipboard'],
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors from any image or use the color wheel. Get HEX, RGB, and HSL values instantly.',
    href: '/tools/color-picker',
    icon: Palette,
    features: ['HEX/RGB/HSL', 'Image color extraction', 'Color wheel'],
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs. Estimate reading time for any text content.',
    href: '/tools/word-counter',
    icon: FileText,
    features: ['Word & character count', 'Reading time', 'Paragraph count'],
  },
  {
    id: 'code-formatter',
    name: 'Code Formatter',
    description: 'Beautify and format JavaScript, JSON, HTML, CSS, and SQL code with proper indentation.',
    href: '/tools/code-formatter',
    icon: Code,
    features: ['JS/JSON/HTML/CSS/SQL', 'Auto-indent', 'Syntax validation'],
  },
  {
    id: 'picker-wheel',
    name: 'Picker Wheel',
    description: 'A fun random picker and decision maker. Add options and spin the wheel to choose.',
    href: '#',
    icon: Target,
    features: ['Custom options', 'Animated spin', 'Fair randomization'],
    upcoming: true,
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age from any birthdate. Shows years, months, days, and upcoming birthday countdown.',
    href: '#',
    icon: Calendar,
    features: ['Exact age', 'Birthday countdown', 'Multiple formats'],
    upcoming: true,
  },
];

export function UtilitiesOverview() {
  return (
    <section className="py-16 md:py-20">
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <Settings className="w-3 h-3" />
            <span>Utilities</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Utility Tools
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Everyday tools for passwords, colors, text, code, and more. All free, all private, all in your browser.
          </p>
        </div>

        {/* Tools Grid with Gradient Border Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {utilityTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                href={tool.upcoming ? '#' : tool.href}
                onClick={(e) => tool.upcoming && e.preventDefault()}
                className={`category-card-gradient relative rounded-lg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] min-h-[200px] hover:-translate-y-1 animate-fade-in-up group p-6 flex flex-col gap-4 ${
                  tool.upcoming ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                }`}
                style={{ animationDelay: `${0.05 * index}s` }}
              >
                {tool.upcoming && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-white text-black text-[10px] font-bold tracking-wide rounded z-10">
                    COMING SOON
                  </div>
                )}

                {/* Top section - Icon */}
                <div className="flex items-start justify-between relative z-10">
                  <div className="w-11 h-11 rounded-md border border-border flex items-center justify-center text-white bg-white/[0.03]">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Body - Content */}
                <div className="mt-auto relative z-10">
                  <div className="text-base font-bold tracking-tight mb-1 flex items-center gap-2">
                    {tool.name}
                    {!tool.upcoming && (
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    )}
                  </div>
                  <div className="text-[12px] text-text-muted leading-[1.4] mb-3">
                    {tool.description}
                  </div>
                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {tool.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-text-dim"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer - Status */}
                <div className="mt-2 pt-2.5 border-t border-border flex items-center justify-between text-[10px] relative z-10">
                  {tool.upcoming ? (
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
      </Container>
    </section>
  );
}
