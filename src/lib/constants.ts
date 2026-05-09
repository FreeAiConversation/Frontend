export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  href: string;
  searchTerms: string;
  upcoming?: boolean;
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
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors, get HEX/RGB values',
    icon: '🎯',
    href: '/tools/color-picker',
    searchTerms: 'color picker hex rgb hsl extract image',
  },
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
    id: 'code-formatter',
    name: 'Code Formatter',
    description: 'Format JS, JSON, HTML, CSS & SQL code',
    icon: '⌨️',
    href: '/tools/code-formatter',
    searchTerms: 'code formatter beautify json javascript html css sql',
  },
  {
    id: 'rewrite-ai',
    name: 'Rewrite AI Paragraph',
    description: 'AI-powered paragraph rewriting and enhancement',
    icon: '✨',
    href: '/tools/rewrite-ai',
    searchTerms: 'rewrite ai paragraph enhance improve text',
    upcoming: true,
  },
  {
    id: 'paragraph-generator',
    name: 'Paragraph Generator',
    description: 'AI-generated paragraphs from any topic',
    icon: '✍️',
    href: '/tools/paragraph-generator',
    searchTerms: 'paragraph generator ai write content text',
    upcoming: true,
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

export interface Update {
  id: string;
  date: string;
  type: 'new' | 'improved' | 'fixed';
  title: string;
  description: string;
}

export const updates: Update[] = [
  {
    id: 'update-1',
    date: 'May 9, 2026',
    type: 'new',
    title: 'Image Optimizer Launched',
    description: 'Compress images with advanced quality control. Reduce file sizes by up to 80% while maintaining visual quality.',
  },
  {
    id: 'update-2',
    date: 'May 5, 2026',
    type: 'improved',
    title: 'PDF Tools Enhanced',
    description: 'Faster PDF processing with improved merge and split capabilities. Now supports larger files up to 50MB.',
  },
  {
    id: 'update-3',
    date: 'May 1, 2026',
    type: 'new',
    title: 'AI Redesign Tool',
    description: 'Upload screenshots and get AI-powered UI/UX improvement suggestions. Perfect for designers and developers.',
  },
  {
    id: 'update-4',
    date: 'Apr 28, 2026',
    type: 'improved',
    title: 'Code Formatter Update',
    description: 'Added support for SQL formatting and improved JavaScript/JSON beautification with better error handling.',
  },
  {
    id: 'update-5',
    date: 'Apr 25, 2026',
    type: 'new',
    title: 'Watermark Generator',
    description: 'Add custom text watermarks to images with full control over position, opacity, and styling.',
  },
  {
    id: 'update-6',
    date: 'Apr 20, 2026',
    type: 'fixed',
    title: 'Performance Improvements',
    description: 'Optimized all tools for faster loading and processing. Reduced initial page load time by 40%.',
  },
];

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Are these tools really free?',
    answer: 'Yes! All our tools are 100% free with no hidden costs, no subscription fees, and no premium tiers. We believe everyone should have access to quality tools without paying.',
  },
  {
    id: 'faq-2',
    question: 'Do I need to create an account?',
    answer: 'No account required! You can use all our tools instantly without signing up, providing an email, or creating a password. Just visit and start using.',
  },
  {
    id: 'faq-3',
    question: 'Is my data safe and private?',
    answer: 'Absolutely. All file processing happens directly in your browser using client-side JavaScript. Your files never leave your device and are never uploaded to our servers. We take privacy seriously.',
  },
  {
    id: 'faq-4',
    question: 'Are there any usage limits?',
    answer: 'No limits! Use our tools as many times as you want, whenever you want. No daily caps, no monthly quotas, no restrictions. Unlimited usage forever.',
  },
  {
    id: 'faq-5',
    question: 'What file formats are supported?',
    answer: 'We support all common formats: PDF, PNG, JPG, WEBP, BMP for images, and JavaScript, JSON, HTML, CSS, SQL for code formatting. More formats are being added regularly.',
  },
  {
    id: 'faq-6',
    question: 'Do the tools work offline?',
    answer: 'Most tools work offline after the initial page load since processing happens in your browser. However, AI-powered features like the Paragraph Generator and Redesign Tool require an internet connection.',
  },
  {
    id: 'faq-7',
    question: 'Can I use these tools for commercial projects?',
    answer: 'Yes! You can use our tools for personal or commercial projects without any restrictions. No attribution required, though we always appreciate it.',
  },
  {
    id: 'faq-8',
    question: 'How do you make money if everything is free?',
    answer: 'We display minimal, non-intrusive ads to cover hosting costs. We may also offer optional premium features in the future, but all core tools will always remain free.',
  },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah Chen',
    role: 'Graphic Designer',
    text: 'The image optimizer is a lifesaver! I can compress dozens of images in seconds without losing quality. No more waiting for slow online converters.',
  },
  {
    id: 'testimonial-2',
    name: 'Marcus Johnson',
    role: 'Web Developer',
    text: 'Finally, a code formatter that just works. No signup, no limits, and it handles all my languages. This is now my go-to tool for quick formatting.',
  },
  {
    id: 'testimonial-3',
    name: 'Emily Rodriguez',
    role: 'Content Writer',
    text: 'The paragraph generator helps me overcome writer\'s block instantly. It\'s like having a writing assistant that\'s always available and completely free.',
  },
  {
    id: 'testimonial-4',
    name: 'David Kim',
    role: 'Student',
    text: 'As a student on a budget, these free tools are amazing. The word counter and PDF tools help me with assignments every day. Thank you!',
  },
  {
    id: 'testimonial-5',
    name: 'Lisa Thompson',
    role: 'Small Business Owner',
    text: 'I use the watermark tool to protect my product photos. It\'s professional, easy to use, and saves me from expensive software subscriptions.',
  },
  {
    id: 'testimonial-6',
    name: 'Alex Martinez',
    role: 'Freelance Designer',
    text: 'The privacy-first approach is what sold me. Knowing my client files never leave my browser gives me peace of mind. Plus, it\'s lightning fast!',
  },
];
