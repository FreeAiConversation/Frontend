import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Free AI Conversion — Premium Tools',
    short_name: 'Free AI Conversion',
    description: 'Free AI-powered tools for PDF, images, code, writing & more. No login required. Unlimited usage.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
    ],
  };
}
