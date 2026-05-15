'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ChevronDown } from 'lucide-react';

export function PasswordGeneratorFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is this password generator secure?',
      answer: 'Yes. Passwords are generated using the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure random numbers. This is the same standard used by banks and security software. No passwords are ever sent to or stored on any server.',
    },
    {
      question: 'Are my generated passwords stored anywhere?',
      answer: 'No. All password generation happens entirely in your browser using client-side JavaScript. We have zero access to your passwords. Nothing is logged, transmitted, or stored. You can verify this by disconnecting from the internet — the tool still works.',
    },
    {
      question: 'How long should my password be?',
      answer: 'For most online accounts, 16+ characters with all character types enabled provides excellent security (80+ bits of entropy). For high-security needs like master passwords or encryption keys, use 20-32 characters. Never use passwords shorter than 12 characters for important accounts.',
    },
    {
      question: 'What does entropy mean in password strength?',
      answer: 'Entropy measures the randomness of a password in bits. Each bit doubles the number of possible combinations. A password with 80 bits of entropy has 2^80 possible combinations — that is over 1.2 septillion possibilities. Higher entropy = harder to crack.',
    },
    {
      question: 'How is crack time calculated?',
      answer: 'We estimate crack time assuming an attacker can try 10 billion passwords per second (representing a powerful GPU cluster). The formula is: total combinations ÷ 10,000,000,000 = seconds to crack. Real-world attacks may be slower or faster depending on the attacker\'s resources.',
    },
    {
      question: 'Should I include symbols in my password?',
      answer: 'Yes, when possible. Including symbols significantly increases the character pool (from 62 to 88+ characters), which exponentially increases the number of possible combinations. Some websites restrict certain symbols — in that case, compensate with a longer password.',
    },
    {
      question: 'Is it safe to use an online password generator?',
      answer: 'It is safe when the generator runs entirely in your browser (client-side), like ours does. The key is that no data is transmitted to any server. Avoid generators that require you to submit forms or make API calls — those could potentially log your passwords.',
    },
    {
      question: 'How often should I change my passwords?',
      answer: 'Modern security guidance (NIST) recommends changing passwords only when there is evidence of a breach, not on a fixed schedule. Focus on using unique, strong passwords for each account and enable two-factor authentication (2FA) wherever possible.',
    },
    {
      question: 'Can I use this for generating API keys or tokens?',
      answer: 'While this tool generates cryptographically random strings, API keys and tokens typically have specific format requirements. This tool is best for user account passwords. For API keys, use your platform\'s built-in key generation feature.',
    },
    {
      question: 'Why is my password showing as "Very Weak"?',
      answer: 'A password is rated "Very Weak" when it has fewer than 28 bits of entropy. This usually means it is too short (under 6 characters) or uses only one character type. Increase the length to 12+ and enable multiple character types to improve strength.',
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-text-muted text-[15px] max-w-2xl mx-auto">
            Everything you need to know about password security and our generator
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-white/10 rounded-lg bg-white/[0.02] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-semibold text-[15px] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-4 text-[14px] text-text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
