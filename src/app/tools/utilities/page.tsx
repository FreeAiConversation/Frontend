import { Metadata } from 'next';
import { generateMetadata as genMeta, generateToolSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';
import { UtilitiesOverview } from '@/components/tools/utilities/_landing/UtilitiesOverview';

import { CTASection } from '@/components/home/CTASection';
import { UtilitiesHowItWorks } from '@/components/tools/utilities/_landing/UtilitiesHowItWorks';
import { UtilitiesFeatures } from '@/components/tools/utilities/_landing/UtilitiesFeatures';
import { UtilitiesWhoIsThisFor } from '@/components/tools/utilities/_landing/UtilitiesWhoIsThisFor';
import { UtilitiesFAQ } from '@/components/tools/utilities/_landing/UtilitiesFAQ';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeaiconversion.com';

export const metadata: Metadata = genMeta({
  title: 'Free Online Utilities — Password Generator, Color Picker, Word Counter & More',
  description: 'Free online utility tools: password generator, color picker, word counter, code formatter, picker wheel, and age calculator. No signup, no limits — all processed in your browser.',
  keywords: [
    'online utilities',
    'free tools',
    'password generator',
    'color picker',
    'word counter',
    'code formatter',
    'picker wheel',
    'age calculator',
    'random password',
    'hex color picker',
    'character counter',
    'json formatter',
    'decision maker',
    'free online tools',
    'no signup tools',
  ],
  canonical: `${SITE_URL}/tools/utilities`,
});

export default function UtilitiesPage() {
  const toolSchema = generateToolSchema({
    name: 'Free Online Utilities',
    description: 'A collection of free online utility tools including password generator, color picker, word counter, code formatter, and more. No signup required.',
    url: `${SITE_URL}/tools/utilities`,
    category: 'UtilitiesApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Utilities', url: `${SITE_URL}/tools/utilities` },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are these utility tools really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! All utility tools are 100% free with no hidden costs, no daily limits, and no subscription required. Use them as many times as you need.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to create an account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No account or signup required. Just visit the page and start using any tool immediately. No email, no password needed.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the password generator secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Passwords are generated entirely in your browser using cryptographically secure random number generation. No passwords are ever sent to or stored on any server.',
        },
      },
      {
        '@type': 'Question',
        name: 'What code languages does the formatter support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The code formatter supports JavaScript, JSON, HTML, CSS, and SQL. It beautifies and formats your code with proper indentation and syntax.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the word counter work with all languages?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the word counter works with all languages and character sets. It counts words, characters, sentences, paragraphs, and estimates reading time.',
        },
      },
    ],
  };

  return (
    <>
      <StructuredData data={[toolSchema, breadcrumbSchema, faqSchema]} />
      <main className="min-h-screen">
        <UtilitiesOverview />
        <UtilitiesHowItWorks />
        <UtilitiesFeatures />
        <UtilitiesWhoIsThisFor />
        <UtilitiesFAQ />
        <CTASection />
      </main>
    </>
  );
}
