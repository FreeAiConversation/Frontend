/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { RefreshCw, Zap, Crop, X, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useImageFile } from './hooks/useImageFile';
import { UploadZone } from './shared/UploadZone';
import { ImagePreviewCard } from './shared/ImagePreviewCard';
import { ConvertTab } from './tabs/ConvertTab';
import { OptimizeTab } from './tabs/OptimizeTab';
import { ResizeTab } from './tabs/ResizeTab';

type TabId = 'convert' | 'optimize' | 'resize';

const tabs: { id: TabId; label: string; icon: typeof RefreshCw; description: string }[] = [
  { id: 'convert', label: 'Convert', icon: RefreshCw, description: 'Change image format (PNG, JPG, WEBP, BMP)' },
  { id: 'optimize', label: 'Optimize', icon: Zap, description: 'Reduce file size while keeping quality' },
  { id: 'resize', label: 'Resize', icon: Crop, description: 'Change image dimensions' },
];

export function ImageToolsTabs() {
  const searchParams = useSearchParams();
  const toolParam = searchParams.get('tool');
  
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    if (toolParam === 'optimize') return 'optimize';
    if (toolParam === 'resize') return 'resize';
    return 'convert';
  });
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const imageFile = useImageFile();

  // Sync tab with URL query param changes
  useEffect(() => {
    if (toolParam === 'optimize') setActiveTab('optimize');
    else if (toolParam === 'resize') setActiveTab('resize');
    else setActiveTab('convert');
  }, [toolParam]);

  const { selectedFile, previewUrl, isDragging, handleFile, handleDragOver, handleDragLeave, handleDrop, reset, formatSize, getFileExt } = imageFile;

  return (
    <section className="py-16 md:py-20 relative">
      <Container>
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-text-muted hover:text-white transition-colors mb-8"
        >
          <span>←</span>
          <span>Back to all tools</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <ImageIcon className="w-3 h-3" />
            <span>Image Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Image Tools
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Convert, optimize, and resize images instantly. All processing happens in your browser — files never leave your device.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Tab Navigation — Always visible, above everything */}
          <div className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
            <div className="grid grid-cols-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center gap-1.5 px-4 py-4 text-[13px] font-bold transition-all relative ${
                      isActive
                        ? 'text-white bg-white/5'
                        : 'text-text-muted hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                    <span className="text-[10px] font-normal text-text-dim hidden sm:block">
                      {tab.description}
                    </span>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upload Zone — shown when no file is selected */}
          {!selectedFile && (
            <UploadZone
              onFile={handleFile}
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
          )}

          {/* File selected — show preview + active tab controls */}
          {selectedFile && previewUrl && (
            <div className="space-y-6">
              {/* Image Preview */}
              <ImagePreviewCard
                file={selectedFile}
                previewUrl={previewUrl}
                formatSize={formatSize}
                getFileExt={getFileExt}
                onReset={reset}
                onZoom={() => setShowPreviewModal(true)}
              />

              {/* Active Tab Content */}
              {activeTab === 'convert' && (
                <ConvertTab
                  selectedFile={selectedFile}
                  previewUrl={previewUrl}
                  formatSize={formatSize}
                  onFullReset={reset}
                />
              )}
              {activeTab === 'optimize' && (
                <OptimizeTab
                  selectedFile={selectedFile}
                  formatSize={formatSize}
                  onFullReset={reset}
                />
              )}
              {activeTab === 'resize' && (
                <ResizeTab
                  selectedFile={selectedFile}
                  previewUrl={previewUrl}
                  formatSize={formatSize}
                  onFullReset={reset}
                />
              )}
            </div>
          )}
        </div>

        {/* Full Size Preview Modal */}
        {showPreviewModal && previewUrl && (
          <div
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowPreviewModal(false)}
          >
            <button
              onClick={() => setShowPreviewModal(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={previewUrl}
              alt="Full size preview"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
