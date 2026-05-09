'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ChevronDown } from 'lucide-react';

export function PDFFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is it really free to use?',
      answer: 'Yes! All PDF tools are completely free with no hidden costs, no file limits, and no subscription required. Use them as many times as you need.',
    },
    {
      question: 'Are my files safe and private?',
      answer: 'Absolutely. All PDF processing happens directly in your browser using client-side JavaScript. Your files never leave your device and are never uploaded to our servers.',
    },
    {
      question: 'What is the maximum file size?',
      answer: 'Since processing happens in your browser, the limit depends on your device\'s memory. Most modern devices can handle PDFs up to 50-100MB without issues.',
    },
    {
      question: 'Can I merge more than 2 PDFs?',
      answer: 'Yes! You can merge as many PDF files as you want. Simply select all the files you need, and they\'ll be combined in the order you choose.',
    },
    {
      question: 'Does compression reduce quality?',
      answer: 'Our compression algorithm is designed to reduce file size while maintaining visual quality. You can adjust the compression level to balance size and quality.',
    },
    {
      question: 'Do I need to install any software?',
      answer: 'No installation needed! Everything works directly in your web browser. Just visit the page and start processing your PDFs immediately.',
    },
    {
      question: 'Can I use this on mobile devices?',
      answer: 'Yes! Our PDF tools work on all modern browsers including mobile devices. However, for large files, we recommend using a desktop or laptop for better performance.',
    },
    {
      question: 'What PDF versions are supported?',
      answer: 'We support all standard PDF versions (1.0 through 2.0). If you encounter any compatibility issues, please let us know.',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white/[0.02]">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <span>FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-text-muted text-[15px] max-w-2xl mx-auto">
            Everything you need to know about our PDF tools
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
