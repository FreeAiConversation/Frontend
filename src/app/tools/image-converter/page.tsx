import { Metadata } from 'next';
import { generateMetadata as genMeta, generateToolSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';
import { ImageConverterPage } from '@/components/tools/image/pages/ImageConverterPage';
import { ImageConverterHowItWorks } from '@/components/tools/image/ImageConverterHowItWorks';
import { ImageConverterFeatures } from '@/components/tools/image/ImageConverterFeatures';
import { ImageConverterWhoIsThisFor } from '@/components/tools/image/ImageConverterWhoIsThisFor';
import { ImageConverterFAQ } from '@/components/tools/image/ImageConverterFAQ';
import { SimilarTools } from '@/components/tools/SimilarTools';
import { CTASection } from '@/components/home/CTASection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeaiconversion.com';

export const metadata: Metadata = genMeta({
  title: 'Free Image Converter — Convert PNG, JPG, WEBP, BMP Online',
  description: 'Convert images between PNG, JPG, WEBP and BMP formats instantly. Free online image converter with quality control. No upload to servers, no signup — processed in your browser.',
  keywords: [
    'image converter',
    'convert png to jpg',
    'convert jpg to webp',
    'convert webp to png',
    'free image converter',
    'online image converter',
    'png to jpg converter',
    'jpg to png converter',
    'webp converter',
    'bmp converter',
    'image format converter',
    'convert image online free',
    'no upload image converter',
    'browser image converter',
  ],
  canonical: `${SITE_URL}/tools/image-converter`,
});

export default function Page() {
  const toolSchema = generateToolSchema({
    name: 'Free Image Converter',
    description: 'Convert images between PNG, JPG, WEBP and BMP formats instantly. Free, no upload, processed entirely in your browser.',
    url: `${SITE_URL}/tools/image-converter`,
    category: 'MultimediaApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Image Converter', url: `${SITE_URL}/tools/image-converter` },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is this image converter really free?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes! Our image converter is 100% free with no hidden costs, no watermarks, no file limits, and no subscription required.' },
      },
      {
        '@type': 'Question',
        name: 'Are my images uploaded to a server?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. All image processing happens directly in your browser using the HTML5 Canvas API. Your files never leave your device.' },
      },
      {
        '@type': 'Question',
        name: 'What image formats are supported?',
        acceptedAnswer: { '@type': 'Answer', text: 'We support conversion between PNG, JPG (JPEG), WEBP, and BMP formats. You can also upload GIF files for conversion.' },
      },
      {
        '@type': 'Question',
        name: 'Does converting reduce image quality?',
        acceptedAnswer: { '@type': 'Answer', text: 'For JPG and WEBP, you control quality with a slider (10-100%). PNG and BMP are lossless and preserve full quality.' },
      },
      {
        '@type': 'Question',
        name: 'Can I convert PNG to JPG?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes! Convert between any supported formats: PNG to JPG, JPG to WEBP, WEBP to PNG, BMP to JPG, and more.' },
      },
    ],
  };

  return (
    <>
      <StructuredData data={[toolSchema, breadcrumbSchema, faqSchema]} />
      <main className="min-h-screen">
        <ImageConverterPage />
        <SimilarTools currentToolId="image-converter" />
        <ImageConverterHowItWorks />
        <ImageConverterFeatures />
        <ImageConverterWhoIsThisFor />
        <ImageConverterFAQ />
        <CTASection />
      </main>
    </>
  );
}
