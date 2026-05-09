'use client';

import { Container } from '@/components/ui/Container';
import { GraduationCap, Palette, Code, PenTool, Briefcase, Users } from 'lucide-react';

const useCases = [
  {
    icon: GraduationCap,
    title: 'Students',
    description: 'Write essays with AI, count words for assignments, compress PDFs for email submissions, and format code for projects.',
    color: 'from-blue-500/20 to-blue-600/20',
  },
  {
    icon: Palette,
    title: 'Designers',
    description: 'Optimize images for web, convert between formats, add watermarks to protect work, and compress files without quality loss.',
    color: 'from-purple-500/20 to-purple-600/20',
  },
  {
    icon: Code,
    title: 'Developers',
    description: 'Format and beautify code, generate secure passwords, pick colors from designs, and convert files for different platforms.',
    color: 'from-green-500/20 to-green-600/20',
  },
  {
    icon: PenTool,
    title: 'Content Creators',
    description: 'Generate paragraphs with AI, optimize images for social media, count words and characters, and create engaging content faster.',
    color: 'from-pink-500/20 to-pink-600/20',
  },
  {
    icon: Briefcase,
    title: 'Small Businesses',
    description: 'Merge and split PDFs, create professional documents, optimize images for websites, all without expensive software subscriptions.',
    color: 'from-orange-500/20 to-orange-600/20',
  },
  {
    icon: Users,
    title: 'Freelancers',
    description: 'Watermark client work, compress files for faster delivery, format code professionally, and manage documents efficiently.',
    color: 'from-cyan-500/20 to-cyan-600/20',
  },
];

export function UseCases() {
  return (
    <section className="py-12 md:py-16 bg-bg-elevated relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-border mb-6">
            <Users className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold tracking-wide uppercase text-text-secondary">
              Who Is This For
            </span>
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-tight mb-4">
            Built for Everyone
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto">
            Whether you're a student, professional, or creator — our tools help you work smarter
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div
                key={useCase.title}
                className="bg-bg-card border border-border rounded-lg p-6 hover:border-border-hover hover:bg-bg-hover transition-all duration-300 group relative overflow-hidden"
                style={{
                  animationDelay: `${0.1 * index}s`,
                }}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-border flex items-center justify-center mb-4 group-hover:bg-white/10 group-hover:border-border-hover group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">
                    {useCase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-muted text-sm leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-text-secondary text-sm">
            No matter your profession, our tools are designed to save you time and money
          </p>
        </div>
      </Container>
    </section>
  );
}
