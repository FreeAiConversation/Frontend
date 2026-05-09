'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '@/lib/constants';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-16 bg-bg-elevated relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-border mb-6">
            <HelpCircle className="w-4 h-4 text-white" />
            <span className="text-xs font-semibold tracking-wide uppercase text-text-secondary">
              FAQ
            </span>
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto">
            Everything you need to know about our free AI tools
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-border-hover"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left group"
              >
                <span className="text-base md:text-lg font-semibold group-hover:text-white transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 pt-0">
                  <p className="text-text-muted text-sm md:text-base leading-relaxed border-t border-border pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
