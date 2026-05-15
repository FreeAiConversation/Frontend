/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { RefreshCw, X, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useImageFile } from '../hooks/useImageFile';
import { UploadZone } from '../shared/UploadZone';
import { ImagePreviewCard } from '../shared/ImagePreviewCard';
import { ConvertTab } from '../tabs/ConvertTab';

export function ImageConverterPage() {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const { selectedFile, previewUrl, isDragging, handleFile, handleDragOver, handleDragLeave, handleDrop, reset, formatSize, getFileExt } = useImageFile();

  return (
    <section className="py-16 md:py-20 relative">
      <Container>
        <Link href="/tools/image-tools" className="inline-flex items-center gap-2 text-[13px] text-text-muted hover:text-white transition-colors mb-8">
          <span>←</span><span>Back to Image Tools</span>
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <RefreshCw className="w-3 h-3" />
            <span>Image Converter</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Convert Images
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Convert between PNG, JPG, WEBP & BMP formats instantly. All processing happens in your browser.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {!selectedFile && (
            <UploadZone onFile={handleFile} isDragging={isDragging} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} />
          )}

          {selectedFile && previewUrl && (
            <div className="space-y-6">
              <ImagePreviewCard file={selectedFile} previewUrl={previewUrl} formatSize={formatSize} getFileExt={getFileExt} onReset={reset} onZoom={() => setShowPreviewModal(true)} />
              <ConvertTab selectedFile={selectedFile} previewUrl={previewUrl} formatSize={formatSize} onFullReset={reset} />
            </div>
          )}
        </div>

        {showPreviewModal && previewUrl && (
          <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowPreviewModal(false)}>
            <button onClick={() => setShowPreviewModal(false)} className="absolute top-4 right-4 p-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors">
              <X className="w-6 h-6" />
            </button>
            <img src={previewUrl} alt="Full size preview" className="max-w-full max-h-full object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          </div>
        )}
      </Container>
    </section>
  );
}
