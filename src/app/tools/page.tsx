'use client';

import { AllToolsPage } from '@/components/tools/AllToolsPage';
import { UseCases } from '@/components/home/UseCases';
import { Features } from '@/components/home/Features';
import { FAQ } from '@/components/home/FAQ';
import { CTASection } from '@/components/home/CTASection';

export default function ToolsPage() {
  return (
    <main className="min-h-screen">
      <AllToolsPage />
      <UseCases />
      <Features />
      <FAQ />
      <CTASection />
    </main>
  );
}
