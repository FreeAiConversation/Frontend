export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  href: string;
  searchTerms: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  href: string;
  toolCount: number;
  featured: string;
}

export const categories: Category[] = [
  {
    id: 'pdf',
    name: 'PDF Tools',
    description: 'Merge, split, compress, and convert PDFs.',
    icon: '📄',
    href: '/tools/pdf-tools',
    toolCount: 3,
    featured: 'Merge PDF',
  },
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Convert, resize, and optimize images with AI.',
    icon: '🖼️',
    href: '/tools/image-converter',
    toolCount: 4,
    featured: 'Optimizer',
  },
  {
    id: 'code',
    name: 'Code Tools',
    description: 'Format, beautify, and validate your code.',
    icon: '⌨️',
    href: '/tools/code-formatter',
    toolCount: 2,
    featured: 'Formatter',
  },
  {
    id: 'write',
    name: 'AI Write',
    description: 'Generate text, paragraphs, and essays with AI.',
    icon: '✍️',
    href: '/tools/paragraph-generator',
    toolCount: 3,
    featured: 'Writer',
  },
  {
    id: 'utility',
    name: 'Utilities',
    description: 'Passwords, color pickers, and everyday tools.',
    icon: '⚙️',
    href: '/tools/password-generator',
    toolCount: 3,
    featured: 'Passwords',
  },
];

export const tools: Tool[] = [
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences & reading time',
    icon: '📝',
    href: '/tools/word-counter',
    searchTerms: 'word counter count characters sentences',
  },
  {
    id: 'pdf-tools',
    name: 'PDF Tools',
    description: 'Merge, split & compress PDFs',
    icon: '📄',
    href: '/tools/pdf-tools',
    searchTerms: 'pdf merge split compress convert',
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    description: 'Convert between PNG, JPG, WEBP & BMP',
    icon: '🖼️',
    href: '/tools/image-converter',
    searchTerms: 'image converter png jpg webp bmp convert',
  },
  {
    id: 'image-optimizer',
    name: 'Image Optimizer',
    description: 'Compress images with quality control',
    icon: '⚡',
    href: '/tools/image-optimizer',
    searchTerms: 'image optimizer compress reduce size quality',
  },
  {
    id: 'watermark',
    name: 'Watermark Generator',
    description: 'Add text watermarks with full control',
    icon: '💧',
    href: '/tools/watermark',
    searchTerms: 'watermark add text image protect',
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure passwords with strength meter',
    icon: '🔐',
    href: '/tools/password-generator',
    searchTerms: 'password generator secure random',
  },
  {
    id: 'redesign-tool',
    name: 'Redesign Tool',
    description: 'AI-powered UI/UX redesign suggestions',
    icon: '🎨',
    href: '/tools/redesign-tool',
    searchTerms: 'redesign ui ux design ai analyze screenshot',
  },
  {
    id: 'code-formatter',
    name: 'Code Formatter',
    description: 'Format JS, JSON, HTML, CSS & SQL code',
    icon: '⌨️',
    href: '/tools/code-formatter',
    searchTerms: 'code formatter beautify json javascript html css sql',
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors, get HEX/RGB values',
    icon: '🎯',
    href: '/tools/color-picker',
    searchTerms: 'color picker hex rgb hsl extract image',
  },
  {
    id: 'paragraph-generator',
    name: 'Paragraph Generator',
    description: 'AI-generated paragraphs from any topic',
    icon: '✍️',
    href: '/tools/paragraph-generator',
    searchTerms: 'paragraph generator ai write content text',
  },
];

export const stats = [
  { value: '10+', label: 'Premium Tools' },
  { value: '0$', label: 'Always Free' },
  { value: '∞', label: 'Unlimited Uses' },
  { value: '🔒', label: 'Privacy First' },
];

export const features = [
  {
    icon: '🔒',
    title: 'Privacy First',
    description: 'Files processed in your browser. Nothing uploaded to our servers.',
  },
  {
    icon: '⚡',
    title: 'Instant Results',
    description: 'No waiting. Client-side processing for maximum speed.',
  },
  {
    icon: '♾️',
    title: 'Unlimited',
    description: 'No daily limits. No sign-up walls. Free forever.',
  },
  {
    icon: '🤖',
    title: 'AI Powered',
    description: 'State-of-the-art AI for smart generation and optimization.',
  },
];
