import { Metadata } from 'next';
import { generateMetadata as genMeta, generateToolSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';
import { ImageOptimizerPage } from '@/components/tools/image/pages/ImageOptimizerPage';
import { ImageConverterFeatures } from '@/components/tools/image/ImageConverterFeatures';
import { ImageConverterWhoIsThisFor } from '@/components/tools/image/ImageConverterWhoIsThisFor';
import { ImageConverterFAQ } from '@/components/tools/image/ImageConverterFAQ';
import { CTASection } from '@/components/home/CTASection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeaiconversion.com';

export const metadata: Metadata = genMeta({
  title: 'Free Image Optimizer — Compress Images Online Without Losing Quality',
  description: 'Compress and optimize images online for free. Reduce file size by up to 80% while maintaining visual quality. Supports PNG, JPG, WEBP. No upload to servers — processed in your browser.',
  keywords: [
    'image optimizer',
    'compress image online',
    'reduce image size',
    'image compression tool',
    'optimize images for web',
    'free image compressor',
    'reduce file size',
    'compress png',
    'compress jpg',
    'webp compression',
    'image size reducer',
    'optimize photos',
    'bulk image compression',
    'lossless image compression',
    'lossy compression online',
  ],
  canonical: `${SITE_URL}/tools/image-optimizer`,
});

export default function Page() {
  const toolSchema = generateToolSchema({
    name: 'Free Image Optimizer',
    description: 'Compress and optimize images online. Reduce file size while maintaining quality. Supports PNG, JPG, WEBP. Processed in your browser.',
    url: `${SITE_URL}/tools/image-optimizer`,
    category: 'MultimediaApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Image Optimizer', url: `${SITE_URL}/tools/image-optimizer` },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much can I reduce my image file size?',
        acceptedAnswer: { '@type': 'Answer', text: 'Depending on the image and settings, you can reduce file size by 30-80%. WEBP format typically achieves the best compression ratios.' },
      },
      {
        '@type': 'Question',
        name: 'Does optimization reduce image quality?',
        acceptedAnswer: { '@type': 'Answer', text: 'Our optimizer uses smart compression that minimizes visible quality loss. You can control the quality slider to balance between file size and visual fidelity.' },
      },
      {
        '@type': 'Question',
        name: 'Are my images uploaded to a server?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. All compression happens in your browser using Web Workers. Your images never leave your device.' },
      },
      {
        '@type': 'Question',
        name: 'What is the best format for web images?',
        acceptedAnswer: { '@type': 'Answer', text: 'WEBP offers the best compression for web use — typically 25-35% smaller than JPEG at equivalent quality. It is supported by all modern browsers.' },
      },
      {
        '@type': 'Question',
        name: 'Can I set a target file size?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes! You can set a target size (0.5MB, 1MB, 2MB, or 5MB) and the optimizer will compress your image to fit within that limit.' },
      },
    ],
  };

  return (
    <>
      <StructuredData data={[toolSchema, breadcrumbSchema, faqSchema]} />
      <main className="min-h-screen">
        <ImageOptimizerPage />
        <ImageConverterFeatures />
        <ImageConverterWhoIsThisFor />
        <ImageConverterFAQ />
        <CTASection />
      </main>
    </>
  );
}
