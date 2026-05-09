'use client';

import { PDFMergeTool } from '@/components/tools/pdf/PDFMergeTool';
import { CTASection } from '@/components/home/CTASection';

export default function PDFMergePage() {
  return (
    <main className="min-h-screen">
      <PDFMergeTool />
      <CTASection />
    </main>
  );
}
