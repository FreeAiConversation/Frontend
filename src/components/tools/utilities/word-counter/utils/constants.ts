export const PLATFORM_LIMITS = [
  { name: 'X (Twitter)', limit: 280 },
  { name: 'Meta description', limit: 155 },
  { name: 'SMS message', limit: 160 },
  { name: 'Email subject line', limit: 60, note: 'recommended' },
  { name: 'LinkedIn post', limit: 3000 },
  { name: 'Instagram caption', limit: 2200 },
  { name: 'YouTube title', limit: 100, note: '70 visible in search' },
  { name: 'Google Ads headline', limit: 30 },
] as const;
