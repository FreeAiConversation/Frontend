'use client';

import { useState } from 'react';
import { Hero } from '@/components/home/Hero';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { StatsBar } from '@/components/home/StatsBar';
import { HowItWorks } from '@/components/home/HowItWorks';
import { UseCases } from '@/components/home/UseCases';
import { AllTools } from '@/components/home/AllTools';
import { Features } from '@/components/home/Features';
import { Comparison } from '@/components/home/Comparison';
import { Testimonials } from '@/components/home/Testimonials';
import { Updates } from '@/components/home/Updates';
import { FAQ } from '@/components/home/FAQ';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      // Scroll to all tools section
      const allToolsSection = document.getElementById('all-tools');
      if (allToolsSection) {
        allToolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      <main>
        <Hero onSearch={handleSearch} />
        <CategoryGrid />
        <StatsBar />
        <AllTools searchQuery={searchQuery} />
        <HowItWorks />
        <UseCases />
        <Features />
        <Comparison />
        <Testimonials />
        <Updates />
        <FAQ />
        <CTASection />
      </main>
    </>
  );
}
