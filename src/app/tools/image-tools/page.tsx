import { Metadata } from 'next';
import { generateMetadata as genMeta, generateToolSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';
import { ImageToolsOverview } from '@/components/tools/image/ImageToolsOverview';
import { ImageToolsHowItWorks } from '@/components/tools/image/ImageToolsHowItWorks';
import { ImageConverterFeatures } from '@/components/tools/image/ImageConverterFeatures';
import { ImageConverterWhoIsThisFor } from '@/components/tools/image/ImageConverterWhoIsThisFor';
import { ImageConverterFAQ } from '@/components/tools/image/ImageConverterFAQ';
import { CTASection } from '@/components/home/CTASection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeaiconversion.com';

export const metadata: Metadata = genMeta({
  title: 'Free Image Tools — Convert, Optimize, Resize & Watermark Images Online',
  description: 'Free online image tools: convert formats, compress file size, resize dimensions, and add watermarks. All processing happens in your browser. No upload, no signup, unlimited usage.',
  keywords: [
    'image tools',
    'free image tools online',
    'image converter',
    'image optimizer',
    'image resizer',
    'watermark generator',
    'compress image',
    'resize image',
    'convert png to jpg',
    'reduce image size',
    'online image editor',
    'free photo tools',
    'image processing',
    'browser image tools',
    'no upload image tools',
  ],
  canonical: `${SITE_URL}/tools/image-tools`,
});

export default function Page() {
  const toolSchema = generateToolSchema({
    name: 'Free Image Tools',
    description: 'A collection of free online image tools: convert formats, optimize file size, resize dimensions, and add watermarks. All processed in your browser.',
    url: `${SITE_URL}/tools/image-tools`,
    category: 'MultimediaApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Image Tools', url: `${SITE_URL}/tools/image-tools` },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Are these image tools really free?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes! All image tools are 100% free with no hidden costs, no watermarks on output, no file limits, and no subscription required.' },
      },
      {
        '@type': 'Question',
        name: 'Are my images uploaded to a server?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. All image processing happens directly in your browser. Your files never leave your device and are never stored on any server.' },
      },
      {
        '@type': 'Question',
        name: 'What image formats are supported?',
        acceptedAnswer: { '@type': 'Answer', text: 'We support PNG, JPG (JPEG), WEBP, BMP, and GIF. You can convert between formats, optimize any of them, and resize to any dimensions.' },
      },
      {
        '@type': 'Question',
        name: 'What is the maximum file size?',
        acceptedAnswer: { '@type': 'Answer', text: 'The maximum file size is 20MB per image. Since processing happens in your browser, performance depends on your device capabilities.' },
      },
      {
        '@type': 'Question',
        name: 'Can I use these tools on mobile?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes! All image tools are fully responsive and work on any modern browser — desktop, tablet, or mobile.' },
      },
    ],
  };

  return (
    <>
      <StructuredData data={[toolSchema, breadcrumbSchema, faqSchema]} />
      <main className="min-h-screen">
        <ImageToolsOverview />
        <ImageToolsHowItWorks />
        <ImageConverterFeatures />
        <ImageConverterWhoIsThisFor />
        <ImageConverterFAQ />
        <CTASection />
      </main>
    </>
  );
}
