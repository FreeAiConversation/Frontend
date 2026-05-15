'use client';

import { useState, useCallback, useRef } from 'react';
import { RefreshCw, AlertTriangle, Lock } from 'lucide-react';
import { ResultCard } from '../shared/ResultCard';

type OutputFormat = 'image/png' | 'image/jpeg' | 'image/webp' | 'image/bmp';

interface ConvertedImage {
  name: string;
  size: number;
  blob: Blob;
  url: string;
  format: string;
}

interface ConvertTabProps {
  selectedFile: File | null;
  previewUrl: string | null;
  formatSize: (bytes: number) => string;
  onFullReset: () => void;
}

export function ConvertTab({ selectedFile, previewUrl, formatSize, onFullReset }: ConvertTabProps) {
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/png');
  const [quality, setQuality] = useState(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [convertedImage, setConvertedImage] = useState<ConvertedImage | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const formats: { value: OutputFormat; label: string; supportsQuality: boolean }[] = [
    { value: 'image/png', label: 'PNG', supportsQuality: false },
    { value: 'image/jpeg', label: 'JPG', supportsQuality: true },
    { value: 'image/webp', label: 'WEBP', supportsQuality: true },
    { value: 'image/bmp', label: 'BMP', supportsQuality: false },
  ];

  const currentFormat = formats.find((f) => f.value === outputFormat);

  const convertImage = useCallback(async () => {
    if (!selectedFile || !previewUrl) return;
    setIsProcessing(true);

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = previewUrl;
      });

      const canvas = canvasRef.current;
      if (!canvas) { setIsProcessing(false); return; }

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) { setIsProcessing(false); return; }

      if (outputFormat === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      const qualityValue = currentFormat?.supportsQuality ? quality / 100 : undefined;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => b ? resolve(b) : reject(new Error('Conversion failed. Format may not be supported by your browser.')),
          outputFormat,
          qualityValue
        );
      });

      const ext = outputFormat === 'image/jpeg' ? 'jpg' : outputFormat.split('/')[1];
      const baseName = selectedFile.name.replace(/\.[^.]+$/, '');

      setConvertedImage((prev) => {
        if (prev?.url) URL.revokeObjectURL(prev.url);
        return null;
      });

      const url = URL.createObjectURL(blob);
      setConvertedImage({ name: `${baseName}.${ext}`, size: blob.size, blob, url, format: ext.toUpperCase() });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to convert image.');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile, previewUrl, outputFormat, quality, currentFormat]);

  const downloadImage = () => {
    if (!convertedImage) return;
    const a = document.createElement('a');
    a.href = convertedImage.url;
    a.download = convertedImage.name;
    a.click();
  };

  const resetResult = () => {
    if (convertedImage?.url) URL.revokeObjectURL(convertedImage.url);
    setConvertedImage(null);
  };

  if (convertedImage && selectedFile) {
    return (
      <>
        <ResultCard
          result={{
            name: convertedImage.name,
            url: convertedImage.url,
            size: convertedImage.size,
            format: convertedImage.format,
            originalSize: selectedFile.size,
            extraInfo: `${selectedFile.type.split('/')[1]?.toUpperCase()} → ${convertedImage.format}`,
          }}
          onDownload={downloadImage}
          onReset={() => { resetResult(); onFullReset(); }}
          formatSize={formatSize}
        />
        <canvas ref={canvasRef} className="hidden" />
      </>
    );
  }

  return (
    <div className="space-y-5">
      <div className="border border-white/10 rounded-lg p-5 bg-white/[0.02] space-y-5">
        <h3 className="text-[14px] font-bold">Conversion Settings</h3>

        {/* Format Selection */}
        <div>
          <label className="block text-[12px] font-semibold text-text-muted uppercase tracking-wider mb-2">
            Output Format
          </label>
          <div className="grid grid-cols-4 gap-2">
            {formats.map((format) => (
              <button
                key={format.value}
                onClick={() => setOutputFormat(format.value)}
                className={`px-4 py-3 rounded-md text-[13px] font-bold transition-all ${
                  outputFormat === format.value
                    ? 'bg-white text-black'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                }`}
              >
                {format.label}
              </button>
            ))}
          </div>
          {outputFormat === 'image/bmp' && (
            <div className="mt-2 flex items-center gap-2 text-[11px] text-yellow-400/80">
              <AlertTriangle className="w-3 h-3 flex-shrink-0" />
              <span>BMP export may not work in Firefox or Safari. Consider PNG for lossless output.</span>
            </div>
          )}
        </div>

        {/* Quality Slider */}
        {currentFormat?.supportsQuality && (
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

        {/* JPEG transparency notice */}
        {outputFormat === 'image/jpeg' && selectedFile && (selectedFile.type === 'image/png' || selectedFile.type === 'image/webp' || selectedFile.type === 'image/gif') && (
          <div className="flex items-start gap-2 text-[11px] text-text-muted bg-white/5 p-3 rounded-md">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-yellow-400/80" />
            <span>Transparent areas will be filled with white. JPG does not support transparency.</span>
          </div>
        )}

        {/* Convert Button */}
        <button
          onClick={convertImage}
          disabled={isProcessing || !selectedFile}
          className="w-full px-6 py-4 bg-white text-black font-bold rounded-md hover:bg-white/90 transition-colors text-[15px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <><RefreshCw className="w-4 h-4 animate-spin" />Converting...</>
          ) : (
            <><RefreshCw className="w-4 h-4" />Convert to {currentFormat?.label}</>
          )}
        </button>
      </div>

      {/* Privacy Note */}
      <div className="flex items-center justify-center gap-2 text-[12px] text-text-dim">
        <Lock className="w-3 h-3" />
        <span>All processing happens in your browser. Files never leave your device.</span>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
