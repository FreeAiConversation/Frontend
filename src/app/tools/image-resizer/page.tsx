import { Metadata } from 'next';
import { generateMetadata as genMeta, generateToolSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';
import { ImageResizerPage } from '@/components/tools/image/pages/ImageResizerPage';
import { ImageConverterFeatures } from '@/components/tools/image/ImageConverterFeatures';
import { ImageConverterWhoIsThisFor } from '@/components/tools/image/ImageConverterWhoIsThisFor';
import { ImageConverterFAQ } from '@/components/tools/image/ImageConverterFAQ';
import { CTASection } from '@/components/home/CTASection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeaiconversion.com';

export const metadata: Metadata = genMeta({
  title: 'Free Image Resizer — Resize Images Online, Change Dimensions',
  description: 'Resize images online for free. Change dimensions by pixels, percentage, or use presets like 1920x1080. Aspect ratio lock, multiple output formats. No upload — processed in your browser.',
  keywords: [
    'image resizer',
    'resize image online',
    'change image dimensions',
    'resize image pixels',
    'image size changer',
    'free image resizer',
    'resize photo online',
    'scale image',
    'resize image 1920x1080',
    'resize for social media',
    'aspect ratio resize',
    'bulk image resize',
    'resize without losing quality',
    'image dimension changer',
    'photo resizer free',
  ],
  canonical: `${SITE_URL}/tools/image-resizer`,
});

export default function Page() {
  const toolSchema = generateToolSchema({
    name: 'Free Image Resizer',
    description: 'Resize images online for free. Change dimensions by pixels, percentage, or presets. Aspect ratio lock included. Processed in your browser.',
    url: `${SITE_URL}/tools/image-resizer`,
    category: 'MultimediaApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Image Resizer', url: `${SITE_URL}/tools/image-resizer` },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I resize images without losing quality?',
        acceptedAnswer: { '@type': 'Answer', text: 'When downsizing, quality is preserved. When upsizing, some quality loss is inevitable. Use PNG output for lossless results, or adjust the quality slider for JPG/WEBP.' },
      },
      {
        '@type': 'Question',
        name: 'Does the resizer maintain aspect ratio?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes! Aspect ratio lock is enabled by default. When you change width, height adjusts automatically and vice versa. You can unlock it for custom proportions.' },
      },
      {
        '@type': 'Question',
        name: 'What resize presets are available?',
        acceptedAnswer: { '@type': 'Answer', text: 'Common presets include 640×480, 800×600, 1280×720, 1920×1080, 1080×1080 (social square), and 2560×1440. You can also resize by percentage (1-200%).' },
      },
      {
        '@type': 'Question',
        name: 'Are my images uploaded to a server?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. All resizing happens in your browser using the HTML5 Canvas API. Your images never leave your device.' },
      },
      {
        '@type': 'Question',
        name: 'What output formats are supported?',
        acceptedAnswer: { '@type': 'Answer', text: 'You can output resized images as PNG (lossless), JPG (with quality control), or WEBP (best compression). Choose based on your needs.' },
      },
    ],
  };

  return (
    <>
      <StructuredData data={[toolSchema, breadcrumbSchema, faqSchema]} />
      <main className="min-h-screen">
        <ImageResizerPage />
        <ImageConverterFeatures />
        <ImageConverterWhoIsThisFor />
        <ImageConverterFAQ />
        <CTASection />
      </main>
    </>
  );
}
