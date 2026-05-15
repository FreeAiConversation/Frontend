'use client';

import { useRef } from 'react';
import { Upload } from 'lucide-react';

interface UploadZoneProps {
  onFile: (file: File) => void;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export function UploadZone({ onFile, isDragging, onDragOver, onDragLeave, onDrop }: UploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  return (
    <>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer group ${
          isDragging
            ? 'border-white/60 bg-white/5'
            : 'border-white/20 hover:border-white/40 bg-white/[0.02]'
        }`}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
          <Upload className="w-8 h-8 text-white/60" />
        </div>
        <h3 className="text-xl font-bold mb-2">Select an Image</h3>
        <p className="text-text-muted mb-4">
          Drop an image here or click to browse
        </p>
        <div className="text-[13px] text-text-dim">
          Supports PNG, JPG, WEBP, BMP, GIF — Max 20MB
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </>
  );
}
