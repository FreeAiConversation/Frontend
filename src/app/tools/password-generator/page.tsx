import { Metadata } from 'next';
import { generateMetadata as genMeta, generateToolSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';
import { PasswordGeneratorTool } from '@/components/tools/utilities/password-generator/PasswordGeneratorTool';
import { SimilarTools } from '@/components/tools/SimilarTools';
import { CTASection } from '@/components/home/CTASection';
import { PasswordGeneratorHowItWorks } from '@/components/tools/utilities/password-generator/PasswordGeneratorHowItWorks';
import { PasswordGeneratorFAQ } from '@/components/tools/utilities/password-generator/PasswordGeneratorFAQ';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeaiconversion.com';

export const metadata: Metadata = genMeta({
  title: 'Free Password Generator — Create Strong, Secure Passwords Online',
  description: 'Generate cryptographically secure passwords instantly. Customize length (4-64 chars), character types, and see real-time strength analysis with entropy bits and crack time estimates. 100% client-side, no data stored.',
  keywords: [
    'password generator',
    'strong password generator',
    'secure password generator',
    'random password generator',
    'free password generator',
    'online password generator',
    'password strength checker',
    'generate secure password',
    'password creator',
    'random password maker',
    'complex password generator',
    'password entropy calculator',
    'uncrackable password',
    'password generator no signup',
    'client side password generator',
  ],
  canonical: `${SITE_URL}/tools/password-generator`,
});

export default function Page() {
  const toolSchema = generateToolSchema({
    name: 'Free Password Generator',
    description: 'Generate cryptographically secure passwords with customizable length, character types, and real-time strength analysis. 100% client-side processing.',
    url: `${SITE_URL}/tools/password-generator`,
    category: 'SecurityApplication',
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Tools', url: `${SITE_URL}/tools` },
    { name: 'Utilities', url: `${SITE_URL}/tools/utilities` },
    { name: 'Password Generator', url: `${SITE_URL}/tools/password-generator` },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is this password generator secure?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. Passwords are generated using the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure random numbers. No passwords are ever sent to or stored on any server.' },
      },
      {
        '@type': 'Question',
        name: 'Are my generated passwords stored anywhere?',
        acceptedAnswer: { '@type': 'Answer', text: 'No. All password generation happens entirely in your browser. We have zero access to your passwords. Nothing is logged, transmitted, or stored.' },
      },
      {
        '@type': 'Question',
        name: 'How long should my password be?',
        acceptedAnswer: { '@type': 'Answer', text: 'For most accounts, 16+ characters with mixed types (uppercase, lowercase, numbers, symbols) provides excellent security. For high-security needs, use 20-32 characters.' },
      },
      {
        '@type': 'Question',
        name: 'What does entropy mean in password strength?',
        acceptedAnswer: { '@type': 'Answer', text: 'Entropy measures password randomness in bits. Higher entropy means more possible combinations. 80+ bits is considered very strong and would take billions of years to crack with current technology.' },
      },
      {
        '@type': 'Question',
        name: 'How is crack time calculated?',
        acceptedAnswer: { '@type': 'Answer', text: 'Crack time is estimated assuming an attacker can try 10 billion passwords per second (a powerful GPU cluster). The actual time depends on the total number of possible combinations for your password settings.' },
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Generate a Secure Password',
    description: 'Create a strong, unique password in seconds using our free generator.',
    step: [
      { '@type': 'HowToStep', name: 'Set Password Length', text: 'Use the slider to choose your desired password length (4-64 characters). 16+ is recommended.' },
      { '@type': 'HowToStep', name: 'Choose Character Types', text: 'Select which character types to include: uppercase, lowercase, numbers, and symbols.' },
      { '@type': 'HowToStep', name: 'Generate & Review', text: 'Click Generate to create a password. Review the strength meter, entropy, and estimated crack time.' },
      { '@type': 'HowToStep', name: 'Copy to Clipboard', text: 'Click the copy button to copy your password. Use it immediately in your account.' },
    ],
  };

  return (
    <>
      <StructuredData data={[toolSchema, breadcrumbSchema, faqSchema, howToSchema]} />
      <main className="min-h-screen">
        <PasswordGeneratorTool />
        <PasswordGeneratorHowItWorks />
        <SimilarTools currentToolId="password-generator" />
        <PasswordGeneratorFAQ />
        <CTASection />
      </main>
    </>
  );
}
