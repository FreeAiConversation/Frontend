'use client';

import { PDFSplitTool } from '@/components/tools/pdf/PDFSplitTool';
import { SimilarTools } from '@/components/tools/SimilarTools';
import { CTASection } from '@/components/home/CTASection';

export default function PDFSplitPage() {
  return (
    <main className="min-h-screen">
      <PDFSplitTool />
      <SimilarTools currentToolId="pdf-split" />
      <CTASection />
    </main>
  );
}
