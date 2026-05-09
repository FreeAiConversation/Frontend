'use client';

import { Container } from '@/components/ui/Container';
import { Calendar, Sparkles } from 'lucide-react';
import { updates } from '@/lib/constants';

export function Updates() {
  return (
    <section className="py-12 md:py-16 bg-bg relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-border mb-6">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold tracking-wide uppercase text-text-secondary">
              Latest Updates
            </span>
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-tight mb-4">
            What's New
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto">
            Stay updated with our latest features, improvements, and new tools
          </p>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {updates.map((update, index) => (
            <div
              key={update.id}
              className="bg-bg-card border border-border rounded-lg p-6 hover:border-border-hover hover:bg-bg-hover transition-all duration-300 group"
              style={{
                animationDelay: `${0.1 * index}s`,
              }}
            >
              {/* Date & Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-text-dim text-xs">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{update.date}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${
                  update.type === 'new' 
                    ? 'bg-white/90 text-black' 
                    : update.type === 'improved'
                    ? 'bg-white/10 text-white border border-border'
                    : 'bg-white/5 text-text-muted border border-border'
                }`}>
                  {update.type.toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">
                {update.title}
              </h3>

              {/* Description */}
              <p className="text-text-muted text-sm leading-relaxed">
                {update.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
