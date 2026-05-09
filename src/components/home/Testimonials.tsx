'use client';

import { Container } from '@/components/ui/Container';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/constants';

export function Testimonials() {
  return (
    <section className="py-12 md:py-16 bg-bg-elevated relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-border mb-6">
            <Star className="w-4 h-4 text-white fill-white" />
            <span className="text-xs font-semibold tracking-wide uppercase text-text-secondary">
              Testimonials
            </span>
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-tight mb-4">
            Loved by Thousands
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto">
            See what our users are saying about their experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-bg-card border border-border rounded-lg p-6 hover:border-border-hover hover:bg-bg-hover transition-all duration-300 group relative"
              style={{
                animationDelay: `${0.1 * index}s`,
              }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-5">
                <Quote className="w-12 h-12 text-white" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-white fill-white"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-text-secondary text-sm leading-relaxed mb-6 relative z-10">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 relative z-10">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-white/10 border border-border flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>

                {/* Name & Role */}
                <div>
                  <div className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-text-dim">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-border">
            <Star className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-semibold text-white">
              4.9/5 average rating
            </span>
            <span className="text-sm text-text-muted">
              from 2,500+ users
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
