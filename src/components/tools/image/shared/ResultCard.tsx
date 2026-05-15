/* eslint-disable @next/next/no-img-element */
'use client';

import { Check, Download, Image as ImageIcon } from 'lucide-react';

interface ResultCardProps {
  result: {
    name: string;
    url: string;
    size: number;
    format: string;
    originalSize: number;
    extraInfo?: string;
  };
  onDownload: () => void;
  onReset: () => void;
  formatSize: (bytes: number) => string;
}

export function ResultCard({ result, onDownload, onReset, formatSize }: ResultCardProps) {
  const sizeDiff = result.size < result.originalSize
    ? `-${Math.round((1 - result.size / result.originalSize) * 100)}%`
    : `+${Math.round((result.size / result.originalSize - 1) * 100)}%`;

  const isShrunk = result.size < result.originalSize;

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
      {/* Success Header */}
      <div className="p-5 border-b border-white/10 bg-green-500/5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-[15px] mb-0.5">Processing Complete!</div>
            <div className="text-[13px] text-text-muted">
              {formatSize(result.originalSize)} → {formatSize(result.size)}
              {result.extraInfo && ` • ${result.extraInfo}`}
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="relative aspect-video bg-[#111] flex items-center justify-center overflow-hidden">
        <img
          src={result.url}
          alt={`Processed image in ${result.format} format`}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* File Info & Actions */}
      <div className="p-5 border-t border-white/10 space-y-4">
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-md">
          <ImageIcon className="w-5 h-5 text-white/60" />
          <div className="flex-1">
            <div className="font-semibold text-[14px]">{result.name}</div>
            <div className="text-[12px] text-text-dim">
              {result.format} • {formatSize(result.size)}
            </div>
          </div>
          <div className={`text-[11px] font-bold px-2 py-1 rounded ${
            isShrunk ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
          }`}>
            {sizeDiff}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onDownload}
            className="flex-1 px-6 py-4 bg-white text-black font-bold rounded-md hover:bg-white/90 transition-colors text-[15px] flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
          <button
            onClick={onReset}
            className="px-6 py-4 bg-transparent border border-white/20 text-white font-bold rounded-md hover:border-white/40 transition-colors text-[15px]"
          >
            Process Another
          </button>
        </div>
      </div>
    </div>
  );
}
