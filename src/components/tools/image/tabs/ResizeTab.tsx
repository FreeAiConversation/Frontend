'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Crop, Lock, Link2, Unlink2 } from 'lucide-react';
import { ResultCard } from '../shared/ResultCard';

type ResizeMode = 'dimensions' | 'percentage' | 'preset';
type OutputFormat = 'image/png' | 'image/jpeg' | 'image/webp';

interface ResizedImage {
  name: string;
  size: number;
  blob: Blob;
  url: string;
  format: string;
  width: number;
  height: number;
}

interface ResizeTabProps {
  selectedFile: File | null;
  previewUrl: string | null;
  formatSize: (bytes: number) => string;
  onFullReset: () => void;
}

const presets = [
  { label: '640×480', width: 640, height: 480 },
  { label: '800×600', width: 800, height: 600 },
  { label: '1280×720', width: 1280, height: 720 },
  { label: '1920×1080', width: 1920, height: 1080 },
  { label: '1080×1080', width: 1080, height: 1080 },
  { label: '2560×1440', width: 2560, height: 1440 },
];

export function ResizeTab({ selectedFile, previewUrl, formatSize, onFullReset }: ResizeTabProps) {
  const [resizeMode, setResizeMode] = useState<ResizeMode>('dimensions');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [percentage, setPercentage] = useState(100);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/png');
  const [quality, setQuality] = useState(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resizedImage, setResizedImage] = useState<ResizedImage | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const aspectRatio = useRef(1);

  // Load original dimensions when file changes
  useEffect(() => {
    if (!previewUrl) return;
    const img = new Image();
    img.onload = () => {
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      aspectRatio.current = img.naturalWidth / img.naturalHeight;
    };
    img.src = previewUrl;
  }, [previewUrl]);

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (lockAspect && aspectRatio.current) {
      setHeight(Math.round(newWidth / aspectRatio.current));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (lockAspect && aspectRatio.current) {
      setWidth(Math.round(newHeight * aspectRatio.current));
    }
  };

  const handlePercentageChange = (pct: number) => {
    setPercentage(pct);
    setWidth(Math.round(originalWidth * pct / 100));
    setHeight(Math.round(originalHeight * pct / 100));
  };

  const handlePresetSelect = (presetWidth: number, presetHeight: number) => {
    setWidth(presetWidth);
    setHeight(presetHeight);
  };

  const formats: { value: OutputFormat; label: string; supportsQuality: boolean }[] = [
    { value: 'image/png', label: 'PNG', supportsQuality: false },
    { value: 'image/jpeg', label: 'JPG', supportsQuality: true },
    { value: 'image/webp', label: 'WEBP', supportsQuality: true },
  ];

  const currentFormat = formats.find((f) => f.value === outputFormat);

  const resizeImage = useCallback(async () => {
    if (!selectedFile || !previewUrl || width <= 0 || height <= 0) return;
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

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { setIsProcessing(false); return; }

      if (outputFormat === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
      }

      ctx.drawImage(img, 0, 0, width, height);
      const qualityValue = currentFormat?.supportsQuality ? quality / 100 : undefined;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => b ? resolve(b) : reject(new Error('Resize failed.')),
          outputFormat,
          qualityValue
        );
      });

      setResizedImage((prev) => {
        if (prev?.url) URL.revokeObjectURL(prev.url);
        return null;
      });

      const ext = outputFormat === 'image/jpeg' ? 'jpg' : outputFormat.split('/')[1];
      const baseName = selectedFile.name.replace(/\.[^.]+$/, '');
      const url = URL.createObjectURL(blob);

      setResizedImage({
        name: `${baseName}-${width}x${height}.${ext}`,
        size: blob.size,
        blob,
        url,
        format: ext.toUpperCase(),
        width,
        height,
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to resize image.');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile, previewUrl, width, height, outputFormat, quality, currentFormat]);

  const downloadImage = () => {
    if (!resizedImage) return;
    const a = document.createElement('a');
    a.href = resizedImage.url;
    a.download = resizedImage.name;
    a.click();
  };

  const resetResult = () => {
    if (resizedImage?.url) URL.revokeObjectURL(resizedImage.url);
    setResizedImage(null);
  };

  if (resizedImage && selectedFile) {
    return (
      <>
        <ResultCard
          result={{
            name: resizedImage.name,
            url: resizedImage.url,
            size: resizedImage.size,
            format: resizedImage.format,
            originalSize: selectedFile.size,
            extraInfo: `${originalWidth}×${originalHeight} → ${resizedImage.width}×${resizedImage.height}`,
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
        <h3 className="text-[14px] font-bold">Resize Settings</h3>

        {/* Resize Mode Toggle */}
        <div>
          <label className="block text-[12px] font-semibold text-text-muted uppercase tracking-wider mb-2">
            Resize Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {([
              { id: 'dimensions', label: 'Dimensions' },
              { id: 'percentage', label: 'Percentage' },
              { id: 'preset', label: 'Presets' },
            ] as const).map((mode) => (
              <button
                key={mode.id}
                onClick={() => setResizeMode(mode.id)}
                className={`px-4 py-3 rounded-md text-[13px] font-bold transition-all ${
                  resizeMode === mode.id
                    ? 'bg-white text-black'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dimensions Mode */}
        {resizeMode === 'dimensions' && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-[11px] text-text-dim mb-1">Width (px)</label>
                <input
                  type="number" min="1" max="10000" value={width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-md text-[14px] focus:outline-none focus:border-white/30"
                />
              </div>
              <button
                onClick={() => setLockAspect(!lockAspect)}
                className={`mt-5 p-2 rounded-md border transition-colors ${
                  lockAspect ? 'border-white/30 bg-white/10' : 'border-white/10 bg-transparent'
                }`}
                title={lockAspect ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
              >
                {lockAspect ? <Link2 className="w-4 h-4" /> : <Unlink2 className="w-4 h-4 text-text-dim" />}
              </button>
              <div className="flex-1">
                <label className="block text-[11px] text-text-dim mb-1">Height (px)</label>
                <input
                  type="number" min="1" max="10000" value={height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-md text-[14px] focus:outline-none focus:border-white/30"
                />
              </div>
            </div>
            {originalWidth > 0 && (
              <div className="text-[11px] text-text-dim">
                Original: {originalWidth} × {originalHeight}px
              </div>
            )}
          </div>
        )}

        {/* Percentage Mode */}
        {resizeMode === 'percentage' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[12px] font-semibold text-text-muted uppercase tracking-wider">Scale</label>
              <span className="text-[13px] font-bold text-white">{percentage}%</span>
            </div>
            <input
              type="range" min="1" max="200" value={percentage}
              onChange={(e) => handlePercentageChange(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between mt-1.5 text-[10px] text-text-dim">
              <span>1%</span>
              <span>200%</span>
            </div>
            {width > 0 && height > 0 && (
              <div className="mt-2 text-[11px] text-text-dim">
                Output: {width} × {height}px
              </div>
            )}
          </div>
        )}

        {/* Preset Mode */}
        {resizeMode === 'preset' && (
          <div className="grid grid-cols-3 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePresetSelect(preset.width, preset.height)}
                className={`px-3 py-3 rounded-md text-[12px] font-bold transition-all ${
                  width === preset.width && height === preset.height
                    ? 'bg-white text-black'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        )}

        {/* Output Format */}
        <div>
          <label className="block text-[12px] font-semibold text-text-muted uppercase tracking-wider mb-2">
            Output Format
          </label>
          <div className="grid grid-cols-3 gap-2">
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

        {/* Resize Button */}
        <button
          onClick={resizeImage}
          disabled={isProcessing || !selectedFile || width <= 0 || height <= 0}
          className="w-full px-6 py-4 bg-white text-black font-bold rounded-md hover:bg-white/90 transition-colors text-[15px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <><Crop className="w-4 h-4 animate-pulse" />Resizing...</>
          ) : (
            <><Crop className="w-4 h-4" />Resize to {width}×{height}</>
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
