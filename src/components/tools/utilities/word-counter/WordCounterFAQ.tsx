'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ChevronDown } from 'lucide-react';

export function WordCounterFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How accurate is the word counter?',
      answer: 'Our word counter provides highly accurate counts by splitting text on whitespace boundaries. It correctly handles multiple spaces, tabs, and line breaks. The tool works with all languages and character sets including English, Chinese, Japanese, Arabic, and more.',
    },
    {
      question: 'What file formats can I upload?',
      answer: 'You can upload PDF, DOCX (Microsoft Word), TXT (plain text), and RTF (Rich Text Format) files. Text is extracted entirely in your browser using pdf.js for PDFs and mammoth.js for DOCX files. No files are ever uploaded to a server.',
    },
    {
      question: 'How is reading time calculated?',
      answer: 'Reading time is calculated at 225 words per minute, which is the average silent reading speed for adults. Speaking time uses 140 words per minute, which is the average pace for presentations, lectures, and public speaking. These are widely accepted standards.',
    },
    {
      question: 'Is my text stored or sent to a server?',
      answer: 'No. All processing happens entirely in your browser using client-side JavaScript. Your text and uploaded files never leave your device. We have zero access to your content — you can verify this by disconnecting from the internet and the tool still works.',
    },
    {
      question: 'What does the word frequency analysis show?',
      answer: 'The frequency analysis shows the top 10 most frequently used keywords in your text, automatically excluding common stop words (the, and, is, was, etc.) and words shorter than 3 characters. This helps you identify key themes, overused words, and content focus areas.',
    },
    {
      question: 'Can I count words in a scanned PDF?',
      answer: 'Scanned PDFs contain images of text rather than actual text data. Our tool works best with text-based PDFs (created from Word, Google Docs, etc.). For scanned documents, you would need OCR processing first to convert images to text.',
    },
    {
      question: 'Does it count hyphenated words as one or two?',
      answer: 'Hyphenated words (like "well-known" or "state-of-the-art") are counted as single words, which aligns with most academic and publishing standards. This matches how Microsoft Word and Google Docs count words.',
    },
    {
      question: 'How are sentences counted?',
      answer: 'Sentences are counted by detecting sentence-ending punctuation marks (periods, exclamation marks, question marks). Abbreviations like "Dr." or "U.S." may occasionally affect the count, but the tool handles most common cases correctly.',
    },
    {
      question: 'Can I use this for academic papers?',
      answer: 'Yes! The word counter is perfect for checking essay word limits, thesis requirements, and journal submission guidelines. The reading time estimate also helps you plan presentations and oral defenses.',
    },
    {
      question: 'Is there a text length limit?',
      answer: 'There is no hard limit. The tool can handle very large texts (100,000+ words) since all processing happens in your browser. Performance depends on your device, but modern computers handle large documents without issues.',
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
            Everything you need to know about our word counter tool
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
