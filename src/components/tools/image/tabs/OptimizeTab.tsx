'use client';

import { useState, useCallback } from 'react';
import { Zap, Lock } from 'lucide-react';
import { ResultCard } from '../shared/ResultCard';

type OutputFormatOption = 'same' | 'image/webp' | 'image/jpeg';

interface OptimizedImage {
  name: string;
  size: number;
  blob: Blob;
  url: string;
  format: string;
}

interface OptimizeTabProps {
  selectedFile: File | null;
  formatSize: (bytes: number) => string;
  onFullReset: () => void;
}

export function OptimizeTab({ selectedFile, formatSize, onFullReset }: OptimizeTabProps) {
  const [targetSize, setTargetSize] = useState<number>(1);
  const [maxDimension, setMaxDimension] = useState<number>(1920);
  const [outputFormat, setOutputFormat] = useState<OutputFormatOption>('same');
  const [quality, setQuality] = useState(80);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [optimizedImage, setOptimizedImage] = useState<OptimizedImage | null>(null);

  const targetSizes = [
    { value: 0.5, label: '0.5 MB' },
    { value: 1, label: '1 MB' },
    { value: 2, label: '2 MB' },
    { value: 5, label: '5 MB' },
  ];

  const formatOptions: { value: OutputFormatOption; label: string; badge?: string }[] = [
    { value: 'same', label: 'Same as input' },
    { value: 'image/webp', label: 'WEBP', badge: 'Recommended' },
    { value: 'image/jpeg', label: 'JPEG' },
  ];

  const showQuality = outputFormat === 'image/webp' || outputFormat === 'image/jpeg';

  const optimizeImage = useCallback(async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setProgress(0);

    try {
      const imageCompression = (await import('browser-image-compression')).default;

      const options: Parameters<typeof imageCompression>[1] = {
        maxSizeMB: targetSize,
        maxWidthOrHeight: maxDimension,
        useWebWorker: true,
        onProgress: (p: number) => setProgress(p),
        ...(outputFormat !== 'same' && { fileType: outputFormat }),
        ...(showQuality && { initialQuality: quality / 100 }),
      };

      const compressedFile = await imageCompression(selectedFile, options);
      const blob = new Blob([compressedFile], { type: compressedFile.type });

      setOptimizedImage((prev) => {
        if (prev?.url) URL.revokeObjectURL(prev.url);
        return null;
      });

      const ext = compressedFile.type.split('/')[1] === 'jpeg' ? 'jpg' : compressedFile.type.split('/')[1];
      const baseName = selectedFile.name.replace(/\.[^.]+$/, '');
      const url = URL.createObjectURL(blob);

      setOptimizedImage({
        name: `${baseName}-optimized.${ext}`,
        size: blob.size,
        blob,
        url,
        format: ext.toUpperCase(),
      });
    } catch (error) {
      console.error('Optimization error:', error);
      alert(error instanceof Error ? error.message : 'Failed to optimize image.');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [selectedFile, targetSize, maxDimension, outputFormat, quality, showQuality]);

  const downloadImage = () => {
    if (!optimizedImage) return;
    const a = document.createElement('a');
    a.href = optimizedImage.url;
    a.download = optimizedImage.name;
    a.click();
  };

  const resetResult = () => {
    if (optimizedImage?.url) URL.revokeObjectURL(optimizedImage.url);
    setOptimizedImage(null);
  };

  if (optimizedImage && selectedFile) {
    return (
      <ResultCard
        result={{
          name: optimizedImage.name,
          url: optimizedImage.url,
          size: optimizedImage.size,
          format: optimizedImage.format,
          originalSize: selectedFile.size,
          extraInfo: `Saved ${formatSize(selectedFile.size - optimizedImage.size)}`,
        }}
        onDownload={downloadImage}
        onReset={() => { resetResult(); onFullReset(); }}
        formatSize={formatSize}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="border border-white/10 rounded-lg p-5 bg-white/[0.02] space-y-5">
        <h3 className="text-[14px] font-bold">Optimization Settings</h3>

        {/* Target Size */}
        <div>
          <label className="block text-[12px] font-semibold text-text-muted uppercase tracking-wider mb-2">
            Target File Size
          </label>
          <div className="grid grid-cols-4 gap-2">
            {targetSizes.map((size) => (
              <button
                key={size.value}
                onClick={() => setTargetSize(size.value)}
                className={`px-4 py-3 rounded-md text-[13px] font-bold transition-all ${
                  targetSize === size.value
                    ? 'bg-white text-black'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Max Dimension */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[12px] font-semibold text-text-muted uppercase tracking-wider">
              Max Dimension (px)
            </label>
            <span className="text-[13px] font-bold text-white">{maxDimension}px</span>
          </div>
          <input
            type="range" min="480" max="4096" step="10" value={maxDimension}
            onChange={(e) => setMaxDimension(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between mt-1.5 text-[10px] text-text-dim">
            <span>480px</span>
            <span>4096px</span>
          </div>
        </div>

        {/* Output Format */}
        <div>
          <label className="block text-[12px] font-semibold text-text-muted uppercase tracking-wider mb-2">
            Output Format
          </label>
          <div className="grid grid-cols-3 gap-2">
            {formatOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setOutputFormat(opt.value)}
                className={`px-4 py-3 rounded-md text-[13px] font-bold transition-all relative ${
                  outputFormat === opt.value
                    ? 'bg-white text-black'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                }`}
              >
                {opt.label}
                {opt.badge && (
                  <span className={`absolute -top-1.5 -right-1.5 text-[8px] px-1.5 py-0.5 rounded font-bold ${
                    outputFormat === opt.value ? 'bg-black text-white' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {opt.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quality Slider */}
        {showQuality && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[12px] font-semibold text-text-muted uppercase tracking-wider">Quality</label>
              <span className="text-[13px] font-bold text-white">{quality}%</span>
            </div>
            <input
              type="range" min="10" max="100" value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between mt-1.5 text-[10px] text-text-dim">
              <span>Smaller file</span>
              <span>Higher quality</span>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {isProcessing && progress > 0 && (
          <div className="space-y-2">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-[11px] text-text-dim text-center">{Math.round(progress)}% complete</div>
          </div>
        )}

        {/* Optimize Button */}
        <button
          onClick={optimizeImage}
          disabled={isProcessing || !selectedFile}
          className="w-full px-6 py-4 bg-white text-black font-bold rounded-md hover:bg-white/90 transition-colors text-[15px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <><Zap className="w-4 h-4 animate-pulse" />Optimizing...</>
          ) : (
            <><Zap className="w-4 h-4" />Optimize Image</>
          )}
        </button>
      </div>

      {/* Privacy Note */}
      <div className="flex items-center justify-center gap-2 text-[12px] text-text-dim">
        <Lock className="w-3 h-3" />
        <span>All processing happens in your browser. Files never leave your device.</span>
      </div>
    </div>
  );
}
