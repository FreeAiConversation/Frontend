'use client';

import { Container } from '@/components/ui/Container';
import { Briefcase, GraduationCap, Users, Home } from 'lucide-react';

export function PDFWhoIsThisFor() {
  const audiences = [
    {
      icon: Briefcase,
      title: 'Business Professionals',
      description: 'Merge contracts, compress reports, and organize documents for presentations and client meetings.',
    },
    {
      icon: GraduationCap,
      title: 'Students & Educators',
      description: 'Combine lecture notes, split textbooks, and compress assignments for easy sharing and submission.',
    },
    {
      icon: Users,
      title: 'Freelancers & Agencies',
      description: 'Prepare client deliverables, merge invoices, and create professional document packages.',
    },
    {
      icon: Home,
      title: 'Personal Use',
      description: 'Organize receipts, merge family documents, and manage personal files without expensive software.',
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <span>Audience</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Who Is This For?
          </h2>
          <p className="text-text-muted text-[15px] max-w-2xl mx-auto">
            Perfect for anyone who works with PDF documents
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
