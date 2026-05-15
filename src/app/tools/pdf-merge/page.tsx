'use client';

import { PDFMergeTool } from '@/components/tools/pdf/PDFMergeTool';
import { SimilarTools } from '@/components/tools/SimilarTools';
import { CTASection } from '@/components/home/CTASection';

export default function PDFMergePage() {
  return (
    <main className="min-h-screen">
      <PDFMergeTool />
      <SimilarTools currentToolId="pdf-merge" />
      <CTASection />
    </main>
  );
}
