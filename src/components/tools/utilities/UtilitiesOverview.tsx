'use client';

import { Container } from '@/components/ui/Container';
import { ToolCard } from '@/components/ui/ToolCard';
import { Settings, Lock, Palette, FileText, Code, Target, Calendar } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const utilityTools = [
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
        <Breadcrumb items={[
          { label: 'Tools', href: '/tools' },
          { label: 'Utilities', href: '/tools/utilities' },
        ]} />

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

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {utilityTools.map((tool, index) => (
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
      </Container>
    </section>
  );
}
