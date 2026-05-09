'use client';

import { PDFSplitTool } from '@/components/tools/pdf/PDFSplitTool';
import { CTASection } from '@/components/home/CTASection';

export default function PDFSplitPage() {
  return (
    <main className="min-h-screen">
      <PDFSplitTool />
      <CTASection />
    </main>
  );
}
