'use client';

import { PDFToolsOverview } from '@/components/tools/pdf/PDFToolsOverview';
import { CTASection } from '@/components/home/CTASection';
import { PDFHowItWorks } from '@/components/tools/pdf/PDFHowItWorks';
import { PDFWhoIsThisFor } from '@/components/tools/pdf/PDFWhoIsThisFor';
import { PDFFAQ } from '@/components/tools/pdf/PDFFAQ';

export default function PDFToolsPage() {
  return (
    <main className="min-h-screen">
      <PDFToolsOverview />
      <PDFHowItWorks />
      <PDFWhoIsThisFor />
      <PDFFAQ />
      <CTASection />
    </main>
  );
}
