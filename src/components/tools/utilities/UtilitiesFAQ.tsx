'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ChevronDown } from 'lucide-react';

export function UtilitiesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Are these utility tools really free?',
      answer: 'Yes! All utility tools are 100% free with no hidden costs, no daily limits, and no subscription required. Use them as many times as you need, forever.',
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No account or signup required. Just visit the page and start using any tool immediately. No email, no password, no personal information needed.',
    },
    {
      question: 'Is the password generator secure?',
      answer: 'Yes. Passwords are generated entirely in your browser using the Web Crypto API (cryptographically secure random number generation). No passwords are ever sent to or stored on any server.',
    },
    {
      question: 'What code languages does the formatter support?',
      answer: 'The code formatter supports JavaScript, JSON, HTML, CSS, and SQL. It beautifies and formats your code with proper indentation, syntax highlighting, and validation.',
    },
    {
      question: 'Does the word counter work with all languages?',
      answer: 'Yes, the word counter works with all languages and character sets including English, Chinese, Japanese, Arabic, and more. It counts words, characters (with and without spaces), sentences, paragraphs, and estimates reading time.',
    },
    {
      question: 'Can I use the color picker on any image?',
      answer: 'Yes! Upload any image and click anywhere on it to extract the exact color. You get HEX, RGB, and HSL values that you can copy with one click.',
    },
    {
      question: 'Is my data private?',
      answer: 'Absolutely. All tools run entirely in your browser. Text you type, passwords you generate, and colors you pick are never sent to any server. We have zero access to your data.',
    },
    {
      question: 'Do the tools work offline?',
      answer: 'Most tools work offline after the initial page load since all processing happens in your browser. No internet connection is needed for password generation, word counting, or code formatting.',
    },
    {
      question: 'What is the Picker Wheel?',
      answer: 'The Picker Wheel is a fun random decision maker. Add your options (names, choices, tasks), spin the wheel, and let it randomly pick one for you. Great for games, team decisions, or breaking ties.',
    },
    {
      question: 'Can I use these tools on mobile?',
      answer: 'Yes! All utility tools are fully responsive and work on any device — desktop, tablet, or mobile. The interface adapts to your screen size for the best experience.',
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
            Everything you need to know about our utility tools
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
                    isOpen ? 'max-h-96' : 'max-h-0'
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
