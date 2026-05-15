'use client';

import { Container } from '@/components/ui/Container';
import { Code, PenTool, Briefcase, GraduationCap } from 'lucide-react';

export function UtilitiesWhoIsThisFor() {
  const audiences = [
    {
      icon: Code,
      title: 'Developers',
      description: 'Format code quickly, generate secure passwords for testing, pick colors for UI work, and count characters for API limits.',
    },
    {
      icon: PenTool,
      title: 'Designers & Creatives',
      description: 'Extract colors from images, pick perfect palettes, and use the word counter to stay within design copy limits.',
    },
    {
      icon: Briefcase,
      title: 'Professionals',
      description: 'Generate strong passwords for accounts, count words for reports, and format code snippets for documentation.',
    },
    {
      icon: GraduationCap,
      title: 'Students & Writers',
      description: 'Track word counts for essays, estimate reading time for articles, and generate secure passwords for school accounts.',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white/[0.02]">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <span>Use Cases</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Who Is This For?
          </h2>
          <p className="text-text-muted text-[15px] max-w-2xl mx-auto">
            Everyday tools for everyone — from developers to students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={index}
                className="p-6 border border-white/10 rounded-lg bg-white/[0.02] hover:border-white/20 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{audience.title}</h3>
                    <p className="text-[14px] text-text-muted leading-relaxed">
                      {audience.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
