import { Metadata } from 'next';
import { generateMetadata as genMeta, generateToolSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';
import { WordCounterTool } from '@/components/tools/utilities/word-counter/WordCounterTool';
import { WordCounterHowItWorks } from '@/components/tools/utilities/word-counter/WordCounterHowItWorks';
import { WordCounterFAQ } from '@/components/tools/utilities/word-counter/WordCounterFAQ';
import { SimilarTools } from '@/components/tools/SimilarTools';
import { CTASection } from '@/components/home/CTASection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeaiconversion.com';

export const metadata: Metadata = genMeta({
  title: 'Free Word Counter — Count Words, Characters, Sentences & Reading Time',
  description: 'Count words, characters, sentences, and paragraphs instantly. Upload PDF, DOCX, or TXT files or paste text. Get reading time, speaking time, and word frequency analysis. Free, no signup.',
  keywords: [
    'word counter',
    'character counter',
    'word count tool',
    'count words online',
    'free word counter',
    'sentence counter',
    'paragraph counter',
    'reading time calculator',
    'speaking time calculator',
    'word frequency analysis',
    'pdf word counter',
    'docx word counter',
    'text analyzer',
    'character count online',
    'word counter no signup',
  ],
  canonical: `${SITE_URL}/tools/word-counter`,
});

export default function Page() {
  const toolSchema = generateToolSchema({
    name: 'Free Word Counter',
    description: 'Count words, characters, sentences, and paragraphs. Upload files or paste text. Get reading time and word frequency analysis. 100% client-side.',
    url: `${SITE_URL}/tools/word-counter`,
    category: 'UtilitiesApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Utilities', url: `${SITE_URL}/tools/utilities` },
    { name: 'Word Counter', url: `${SITE_URL}/tools/word-counter` },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How accurate is the word counter?',
        acceptedAnswer: { '@type': 'Answer', text: 'Our word counter provides highly accurate counts by splitting text on whitespace boundaries. It handles all languages and character sets correctly.' },
      },
      {
        '@type': 'Question',
        name: 'What file formats are supported?',
        acceptedAnswer: { '@type': 'Answer', text: 'You can upload PDF, DOCX (Word), TXT, and RTF files. Text is extracted client-side — files never leave your device.' },
      },
      {
        '@type': 'Question',
        name: 'How is reading time calculated?',
        acceptedAnswer: { '@type': 'Answer', text: 'Reading time is calculated at 225 words per minute (average adult silent reading speed). Speaking time uses 140 words per minute (average presentation pace).' },
      },
      {
        '@type': 'Question',
        name: 'Is my text stored or sent to a server?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. All processing happens entirely in your browser. Your text and files never leave your device. We have zero access to your content.' },
      },
      {
        '@type': 'Question',
        name: 'What does the word frequency analysis show?',
        acceptedAnswer: { '@type': 'Answer', text: 'It shows the top 10 most frequently used keywords in your text, excluding common stop words (the, and, is, etc.). This helps identify key themes and overused words.' },
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Count Words in Text or Documents',
    description: 'Get instant word count, character count, and reading time for any text or document.',
    step: [
      { '@type': 'HowToStep', name: 'Enter or Upload Text', text: 'Type, paste text into the editor, or upload a PDF/DOCX/TXT file.' },
      { '@type': 'HowToStep', name: 'View Real-Time Stats', text: 'See words, characters, sentences, paragraphs, reading time, and speaking time update instantly.' },
      { '@type': 'HowToStep', name: 'Analyze Word Frequency', text: 'Review the top 10 keywords and their frequency to understand your content focus.' },
    ],
  };

  return (
    <>
      <StructuredData data={[toolSchema, breadcrumbSchema, faqSchema, howToSchema]} />
      <main className="min-h-screen">
        <WordCounterTool />
        <WordCounterHowItWorks />
        <SimilarTools currentToolId="word-counter" />
        <WordCounterFAQ />
        <CTASection />
      </main>
    </>
  );
}
