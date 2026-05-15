'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { ChevronDown } from 'lucide-react';

export function ImageConverterFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is this image converter really free?',
      answer: 'Yes! Our image converter is 100% free with no hidden costs, no watermarks, no file limits, and no subscription required. Use it as many times as you need.',
    },
    {
      question: 'Are my images uploaded to a server?',
      answer: 'No. All image processing happens directly in your browser using client-side JavaScript and the HTML5 Canvas API. Your files never leave your device and are never stored on any server.',
    },
    {
      question: 'What image formats are supported?',
      answer: 'We support conversion between PNG, JPG (JPEG), WEBP, and BMP formats. You can also upload GIF files for conversion to other formats. Each format has its own advantages — PNG for transparency, JPG for photos, WEBP for web optimization, and BMP for uncompressed quality.',
    },
    {
      question: 'What is the maximum file size?',
      answer: 'The maximum file size is 20MB. Since processing happens in your browser, performance depends on your device capabilities. Most modern devices handle images up to 20MB without any issues.',
    },
    {
      question: 'Does converting reduce image quality?',
      answer: 'It depends on the format. PNG and BMP are lossless formats that preserve full quality. For JPG and WEBP, you can control the quality with a slider (10-100%). Higher quality means larger file size, lower quality means smaller file size.',
    },
    {
      question: 'Can I convert PNG to JPG?',
      answer: 'Yes! You can convert between any supported formats including PNG to JPG, JPG to WEBP, WEBP to PNG, BMP to JPG, and any other combination. Simply upload your image and select the desired output format.',
    },
    {
      question: 'Why should I convert to WEBP format?',
      answer: 'WEBP is a modern image format developed by Google that provides superior compression. WEBP images are typically 25-35% smaller than equivalent JPG files while maintaining the same visual quality. This makes them ideal for websites where page load speed matters.',
    },
    {
      question: 'Does the converter preserve image dimensions?',
      answer: 'Yes, the converter preserves the original image dimensions (width and height) during conversion. Only the format and compression change — the resolution stays the same.',
    },
    {
      question: 'Can I use this on my phone or tablet?',
      answer: 'Absolutely! Our image converter works on all modern browsers including Chrome, Safari, Firefox, and Edge on both mobile and desktop devices. The interface is fully responsive and touch-friendly.',
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No account or signup required. Just visit the page and start converting images immediately. No email, no password, no personal information needed.',
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
            Everything you need to know about our free image converter
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
