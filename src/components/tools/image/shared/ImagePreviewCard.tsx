/* eslint-disable @next/next/no-img-element */
'use client';

import { Image as ImageIcon, X, ZoomIn } from 'lucide-react';

interface ImagePreviewCardProps {
  file: File;
  previewUrl: string;
  formatSize: (bytes: number) => string;
  getFileExt: (file: File) => string;
  onReset: () => void;
  onZoom: () => void;
}

export function ImagePreviewCard({ file, previewUrl, formatSize, getFileExt, onReset, onZoom }: ImagePreviewCardProps) {
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
      {/* Preview Image */}
      <div className="relative aspect-video bg-[#111] flex items-center justify-center overflow-hidden">
        <img
          src={previewUrl}
          alt="Preview of uploaded image"
          className="max-w-full max-h-full object-contain"
        />
        <button
          onClick={onZoom}
          className="absolute top-3 right-3 p-2 bg-black/60 border border-white/20 rounded-md hover:bg-black/80 transition-colors"
          title="View full size"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>

      {/* File Info Bar */}
      <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ImageIcon className="w-4 h-4 text-white/60" />
          <div>
            <div className="text-[13px] font-semibold truncate max-w-[200px] sm:max-w-none">
              {file.name}
            </div>
            <div className="text-[11px] text-text-dim">
              {getFileExt(file)} • {formatSize(file.size)}
            </div>
          </div>
        </div>
        <button
          onClick={onReset}
          className="p-2 hover:bg-white/10 rounded-md transition-colors"
          title="Remove file"
        >
          <X className="w-4 h-4 text-text-muted" />
        </button>
      </div>
    </div>
  );
}
