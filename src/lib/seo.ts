import { Metadata } from 'next';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  nofollow?: boolean;
}

const SITE_NAME = 'Free AI Conversion';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeaiconversion.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export function generateMetadata({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  nofollow = false,
}: SEOProps): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} — ${SITE_NAME}`;
  const canonicalUrl = canonical || SITE_URL;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: ogType,
      locale: 'en_US',
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@freeaiconversion',
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  };

  return metadata;
}

// Generate structured data for the website
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Free AI-powered tools for PDF, images, code, writing & more. No login required. Unlimited usage.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Generate structured data for organization
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Free AI-powered tools for file conversion, image optimization, and content generation.',
    sameAs: [
      // Add your social media URLs here
      // 'https://twitter.com/freeaiconversion',
      // 'https://facebook.com/freeaiconversion',
    ],
  };
}

// Generate structured data for a tool/software application
export function generateToolSchema(tool: {
  name: string;
  description: string;
  url: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: tool.category,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
