import { Metadata } from 'next';
import { Suspense } from 'react';
import { generateMetadata as genMeta, generateToolSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';
import { ImageToolsTabs } from '@/components/tools/image/ImageToolsTabs';
import { ImageConverterHowItWorks } from '@/components/tools/image/ImageConverterHowItWorks';
import { ImageConverterFeatures } from '@/components/tools/image/ImageConverterFeatures';
import { ImageConverterWhoIsThisFor } from '@/components/tools/image/ImageConverterWhoIsThisFor';
import { ImageConverterFAQ } from '@/components/tools/image/ImageConverterFAQ';
import { CTASection } from '@/components/home/CTASection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeaiconversion.com';

export const metadata: Metadata = genMeta({
  title: 'Free Image Converter, Optimizer & Resizer — PNG, JPG, WEBP Online',
  description: 'Convert, optimize, and resize images between PNG, JPG, WEBP and BMP formats instantly. Free online image tools with quality control, compression, and resizing. No upload, no signup — processed in your browser.',
  keywords: [
    'image converter',
    'image optimizer',
    'image resizer',
    'convert png to jpg',
    'convert jpg to webp',
    'compress image online',
    'resize image online',
    'free image converter',
    'online image optimizer',
    'reduce image size',
    'webp converter',
    'image compression tool',
    'resize image dimensions',
    'bulk image optimizer',
    'no upload image tools',
  ],
  canonical: `${SITE_URL}/tools/image-converter`,
});

export default function ImageConverterPage() {
  const toolSchema = generateToolSchema({
    name: 'Free Image Tools — Convert, Optimize & Resize',
    description: 'Convert, optimize, and resize images between PNG, JPG, WEBP and BMP formats instantly. Free, no upload, processed entirely in your browser.',
    url: `${SITE_URL}/tools/image-converter`,
    category: 'MultimediaApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Image Tools', url: `${SITE_URL}/tools/image-converter` },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is this image converter really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our image tools are 100% free with no hidden costs, no watermarks, no file limits, and no subscription required.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are my images uploaded to a server?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. All image processing happens directly in your browser using client-side JavaScript and the HTML5 Canvas API. Your files never leave your device.',
        },
      },
      {
        '@type': 'Question',
        name: 'What image formats are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support conversion between PNG, JPG (JPEG), WEBP, and BMP formats. You can also upload GIF files for conversion to other formats.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the image optimizer work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The optimizer uses browser-image-compression to reduce file size while maintaining visual quality. You can set a target file size, max dimensions, and output format.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I resize images while maintaining aspect ratio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! The resize tool has an aspect ratio lock enabled by default. You can also resize by percentage or choose from common presets like 1920×1080.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does converting reduce image quality?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For JPG and WEBP formats, you can control the quality with a slider (10-100%). PNG and BMP are lossless formats that preserve full quality.',
        },
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Convert, Optimize, and Resize Images Online for Free',
    description: 'Use our free image tools to convert formats, compress file size, or resize dimensions in simple steps.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Upload Your Image',
        text: 'Drag and drop your image or click to browse. Supports PNG, JPG, WEBP, BMP, and GIF formats up to 20MB.',
      },
      {
        '@type': 'HowToStep',
        name: 'Choose Your Tool',
        text: 'Select Convert to change format, Optimize to reduce file size, or Resize to change dimensions.',
      },
      {
        '@type': 'HowToStep',
        name: 'Adjust Settings',
        text: 'Configure output format, quality, target size, or dimensions based on your chosen tool.',
      },
      {
        '@type': 'HowToStep',
        name: 'Preview & Download',
        text: 'Preview the result with size comparison, then download when ready. No auto-downloads.',
      },
    ],
  };

  return (
    <>
      <StructuredData data={[toolSchema, breadcrumbSchema, faqSchema, howToSchema]} />
      <main className="min-h-screen">
        <Suspense fallback={null}>
          <ImageToolsTabs />
        </Suspense>
        <ImageConverterHowItWorks />
        <ImageConverterFeatures />
        <ImageConverterWhoIsThisFor />
        <ImageConverterFAQ />
        <CTASection />
      </main>
    </>
  );
}
