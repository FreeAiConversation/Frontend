'use client';

import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface ToolCardProps {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  features?: string[];
  upcoming?: boolean;
  index?: number;
}

export function ToolCard({ name, description, href, icon: Icon, features, upcoming, index = 0 }: ToolCardProps) {
  return (
    <Link
      href={upcoming ? '#' : href}
      onClick={(e) => upcoming && e.preventDefault()}
      className={`category-card-gradient relative rounded-lg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] min-h-[220px] hover:-translate-y-1 animate-fade-in-up group p-6 flex flex-col gap-4 ${
        upcoming ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
      }`}
      style={{ animationDelay: `${0.05 * index}s` }}
    >
      {upcoming && (
        <div className="absolute top-4 right-4 px-2 py-1 bg-white text-black text-[10px] font-bold tracking-wide rounded z-10">
          COMING SOON
        </div>
      )}

      {/* Top section - Icon */}
      <div className="flex items-start justify-between relative z-10">
        <div className="w-12 h-12 rounded-md border border-border flex items-center justify-center text-white bg-white/[0.03]">
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Body - Content */}
      <div className="mt-auto relative z-10">
        <div className="text-lg font-bold tracking-tight mb-1.5 flex items-center gap-2">
          {name}
          {!upcoming && (
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          )}
        </div>
        <div className="text-[13px] text-text-muted leading-[1.5] mb-3">
          {description}
        </div>
        {/* Feature Tags */}
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {features.map((feature) => (
              <span
                key={feature}
                className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-text-dim"
              >
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer - Status */}
      <div className="mt-2 pt-2.5 border-t border-border flex items-center justify-between text-[10px] relative z-10">
        {upcoming ? (
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
}
