'use client';

import { Container } from '@/components/ui/Container';
import { Check, X, Zap } from 'lucide-react';

const features = [
  { name: 'Signup Required', key: 'signup' },
  { name: 'File Size Limit', key: 'fileSize' },
  { name: 'Daily Usage Limit', key: 'dailyLimit' },
  { name: 'Watermarks on Output', key: 'watermarks' },
  { name: 'Processing Speed', key: 'speed' },
  { name: 'Privacy (Client-Side)', key: 'privacy' },
  { name: 'Monthly Cost', key: 'cost' },
];

const competitors = [
  {
    name: 'Free AI Conversion',
    isUs: true,
    signup: false,
    fileSize: 'Unlimited',
    dailyLimit: 'Unlimited',
    watermarks: false,
    speed: 'Instant',
    privacy: true,
    cost: '$0',
  },
  {
    name: 'iLovePDF',
    isUs: false,
    signup: true,
    fileSize: '15 MB',
    dailyLimit: '2 tasks/hour',
    watermarks: false,
    speed: 'Fast',
    privacy: false,
    cost: '$5-15/mo',
  },
  {
    name: 'Smallpdf',
    isUs: false,
    signup: true,
    fileSize: '5 MB',
    dailyLimit: '2 files/day',
    watermarks: true,
    speed: 'Fast',
    privacy: false,
    cost: '$15/mo',
  },
  {
    name: 'TinyWow',
    isUs: false,
    signup: false,
    fileSize: '100 MB',
    dailyLimit: 'Unlimited',
    watermarks: false,
    speed: 'Fast',
    privacy: false,
    cost: 'Ads + CAPTCHA',
  },
];

export function Comparison() {
  const renderValue = (competitor: typeof competitors[0], feature: typeof features[0]) => {
    const value = competitor[feature.key as keyof typeof competitor];
    
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-white mx-auto" />
      ) : (
        <X className="w-5 h-5 text-text-dim mx-auto" />
      );
    }
    
    return (
      <span className={competitor.isUs ? 'text-white font-semibold' : 'text-text-muted'}>
        {value}
      </span>
    );
  };

  return (
    <section className="py-12 md:py-16 bg-bg relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-border mb-6">
            <Zap className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold tracking-wide uppercase text-text-secondary">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-tight mb-4">
            Better Than The Rest
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto">
            See how we stack up against other popular tools
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <div className="bg-bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-semibold text-text-secondary uppercase tracking-wide">
                      Feature
                    </th>
                    {competitors.map((competitor) => (
                      <th
                        key={competitor.name}
                        className={`p-4 text-center text-sm font-bold uppercase tracking-wide ${
                          competitor.isUs
                            ? 'bg-white/5 text-white'
                            : 'text-text-secondary'
                        }`}
                      >
                        {competitor.name}
                        {competitor.isUs && (
                          <div className="mt-1 text-[10px] font-bold text-white/60 normal-case tracking-normal">
                            (You&apos;re here)
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr
                      key={feature.key}
                      className={`border-b border-border last:border-b-0 ${
                        index % 2 === 0 ? 'bg-bg-card' : 'bg-black/20'
                      }`}
                    >
                      <td className="p-4 text-sm font-medium text-text-secondary">
                        {feature.name}
                      </td>
                      {competitors.map((competitor) => (
                        <td
                          key={competitor.name}
                          className={`p-4 text-center text-sm ${
                            competitor.isUs ? 'bg-white/5' : ''
                          }`}
                        >
                          {renderValue(competitor, feature)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-6">
            {competitors.map((competitor) => (
              <div
                key={competitor.name}
                className={`bg-bg-card border rounded-lg overflow-hidden ${
                  competitor.isUs
                    ? 'border-white/20 ring-2 ring-white/10'
                    : 'border-border'
                }`}
              >
                {/* Header */}
                <div
                  className={`p-4 border-b border-border ${
                    competitor.isUs ? 'bg-white/5' : ''
                  }`}
                >
                  <h3 className="font-bold text-lg text-white">
                    {competitor.name}
                  </h3>
                  {competitor.isUs && (
                    <p className="text-xs text-text-secondary mt-1">
                      You&apos;re here
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="p-4 space-y-3">
                  {features.map((feature) => (
                    <div
                      key={feature.key}
                      className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
                    >
                      <span className="text-sm text-text-secondary">
                        {feature.name}
                      </span>
                      <div className="text-sm">
                        {renderValue(competitor, feature)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="mt-8 text-center">
            <p className="text-text-dim text-xs">
              * Competitor data based on free tier limitations as of May 2026. Pricing may vary.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
