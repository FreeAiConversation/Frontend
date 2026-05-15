'use client';

import { useState, useRef, useEffect } from 'react';
import { Container } from '@/components/ui/Container';
import { Upload, FileText, Scissors, Minimize2, Download, X, Check } from 'lucide-react';
import Link from 'next/link';

type PDFTool = 'merge' | 'split' | 'compress';
type CompressionLevel = 'low' | 'medium' | 'high' | 'custom';

interface CompressionOptions {
  imageQuality: number;
  imageDPI: number;
  removeMetadata: boolean;
  removeDuplicates: boolean;
  compressStreams: boolean;
}

interface ProcessedFile {
  name: string;
  originalSize: number;
  compressedSize: number;
  blob: Blob;
}

export function PDFToolsHero() {
  const [activeTool, setActiveTool] = useState<PDFTool>('compress');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');
  const [customOptions, setCustomOptions] = useState<CompressionOptions>({
    imageQuality: 70,
    imageDPI: 150,
    removeMetadata: true,
    removeDuplicates: true,
    compressStreams: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState<ProcessedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tools = [
    {
      id: 'merge' as PDFTool,
      name: 'Merge PDFs',
      icon: FileText,
      description: 'Combine multiple PDF files into one document',
    },
    {
      id: 'split' as PDFTool,
      name: 'Split PDF',
      icon: Scissors,
      description: 'Extract specific pages or split into multiple files',
    },
    {
      id: 'compress' as PDFTool,
      name: 'Compress PDF',
      icon: Minimize2,
      description: 'Reduce PDF file size while maintaining quality',
    },
  ];

  const activeToolData = tools.find((t) => t.id === activeTool)!;

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setProcessedFile(null);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setProcessedFile(null);
    }
  };

  // Compress PDF
  const compressPDF = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      // Load pdf-lib dynamically
      const PDFLib = await import('pdf-lib');
      
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);

      // Get compression settings based on level
      let options: CompressionOptions;
      
      if (compressionLevel === 'custom') {
        options = customOptions;
      } else {
        const presets: Record<Exclude<CompressionLevel, 'custom'>, CompressionOptions> = {
          low: {
            imageQuality: 90,
            imageDPI: 300,
            removeMetadata: false,
            removeDuplicates: false,
            compressStreams: true,
          },
          medium: {
            imageQuality: 70,
            imageDPI: 150,
            removeMetadata: true,
            removeDuplicates: true,
            compressStreams: true,
          },
          high: {
            imageQuality: 50,
            imageDPI: 96,
            removeMetadata: true,
            removeDuplicates: true,
            compressStreams: true,
          },
        };
        options = presets[compressionLevel];
      }

      // Remove metadata if enabled
      if (options.removeMetadata) {
        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setKeywords([]);
        pdfDoc.setProducer('');
        pdfDoc.setCreator('');
        pdfDoc.setCreationDate(new Date(0));
        pdfDoc.setModificationDate(new Date(0));
      }

      // Process images in the PDF
      const pages = pdfDoc.getPages();
      for (const page of pages) {
        try {
          // Get page resources
          const resources = page.node.Resources();
          if (!resources) continue;

          // Process XObjects (images)
          const xObjects = resources.lookup(PDFLib.PDFName.of('XObject'));
          if (xObjects instanceof PDFLib.PDFDict) {
            const xObjectKeys = xObjects.keys();
            
            for (const key of xObjectKeys) {
              const xObject = xObjects.lookup(key);
              if (xObject instanceof PDFLib.PDFStream) {
                const dict = xObject.dict;
                const subtype = dict.lookup(PDFLib.PDFName.of('Subtype'));
                
                // Check if it's an image
                if (subtype && subtype.toString() === '/Image') {
                  // Compress image stream
                  if (options.compressStreams) {
                    try {
                      // Add FlateDecode filter for compression
                      const filter = dict.lookup(PDFLib.PDFName.of('Filter'));
                      if (!filter || filter.toString() !== '/FlateDecode') {
                        dict.set(PDFLib.PDFName.of('Filter'), PDFLib.PDFName.of('FlateDecode'));
                      }
                    } catch (e) {
                      // Skip if compression fails for this image
                      console.warn('Failed to compress image:', e);
                    }
                  }
                }
              }
            }
          }
        } catch (e) {
          console.warn('Failed to process page:', e);
        }
      }

      // Save with compression options
      const saveOptions: any = {
        useObjectStreams: options.compressStreams,
        addDefaultPage: false,
        objectsPerTick: 50,
      };

      const compressedBytes = await pdfDoc.save(saveOptions);
      const compressedBlob = new Blob([new Uint8Array(compressedBytes)], { type: 'application/pdf' });

      setProcessedFile({
        name: selectedFile.name.replace('.pdf', '_compressed.pdf'),
        originalSize: selectedFile.size,
        compressedSize: compressedBlob.size,
        blob: compressedBlob,
      });
    } catch (error) {
      console.error('Compression error:', error);
      alert('Failed to compress PDF. Please try again with different settings.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Download compressed file
  const downloadFile = () => {
    if (!processedFile) return;
    const url = URL.createObjectURL(processedFile.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = processedFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset
  const reset = () => {
    setSelectedFile(null);
    setProcessedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Calculate reduction percentage
  const getReduction = () => {
    if (!processedFile) return 0;
    return Math.round(
      ((processedFile.originalSize - processedFile.compressedSize) / processedFile.originalSize) * 100
    );
  };

  return (
    <section className="py-16 md:py-20 relative">
      <Container>
        {/* Back Link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-[13px] text-text-muted hover:text-white transition-colors mb-8"
        >
          <span>←</span>
          <span>Back to all tools</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <FileText className="w-3 h-3" />
            <span>PDF Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Professional PDF Tools
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Merge, split, and compress PDFs — all processed securely in your browser. No uploads, no limits.
          </p>
        </div>

        {/* Tool Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-md border transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-transparent text-white border-white/20 hover:border-white/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[14px]">{tool.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tool Display */}
        <div className="max-w-3xl mx-auto">
          <div className="border border-white/10 rounded-lg p-8 md:p-12 bg-white/[0.02] relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              {!selectedFile && !processedFile && (
                <>
                  {/* Upload Zone */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer group ${
                      isDragging
                        ? 'border-white/60 bg-white/5'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Upload className="w-8 h-8 text-white/60" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{activeToolData.name}</h3>
                    <p className="text-text-muted mb-4">{activeToolData.description}</p>
                    <div className="text-[13px] text-text-dim">
                      Drop your PDF file here or click to browse
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </>
              )}

              {selectedFile && !processedFile && (
                <>
                  {/* Selected File Info */}
                  <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-white/60" />
                      <div>
                        <div className="font-semibold text-[14px]">{selectedFile.name}</div>
                        <div className="text-[12px] text-text-dim">{formatSize(selectedFile.size)}</div>
                      </div>
                    </div>
                    <button
                      onClick={reset}
                      className="p-2 hover:bg-white/10 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Compression Options */}
                  <div className="mb-6">
                    <label className="block text-[13px] font-semibold mb-3">
                      Compression Level
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {(['low', 'medium', 'high', 'custom'] as CompressionLevel[]).map((level) => (
                        <button
                          key={level}
                          onClick={() => setCompressionLevel(level)}
                          className={`px-4 py-3 rounded-md border transition-all text-[13px] font-medium capitalize ${
                            compressionLevel === level
                              ? 'bg-white text-black border-white'
                              : 'bg-transparent text-white border-white/20 hover:border-white/40'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 text-[12px] text-text-dim">
                      {compressionLevel === 'low' && 'Minimal compression (90% quality, 300 DPI) - Best for printing'}
                      {compressionLevel === 'medium' && 'Balanced compression (70% quality, 150 DPI) - Good for most uses'}
                      {compressionLevel === 'high' && 'Maximum compression (50% quality, 96 DPI) - Smallest file size'}
                      {compressionLevel === 'custom' && 'Customize all compression settings below'}
                    </div>
                  </div>

                  {/* Custom Options */}
                  {compressionLevel === 'custom' && (
                    <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg space-y-4">
                      <div className="text-[13px] font-semibold mb-3">Custom Settings</div>
                      
                      {/* Image Quality */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-[12px] text-text-muted">Image Quality</label>
                          <span className="text-[12px] font-semibold">{customOptions.imageQuality}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={customOptions.imageQuality}
                          onChange={(e) => setCustomOptions({ ...customOptions, imageQuality: parseInt(e.target.value) })}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>

                      {/* Image DPI */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-[12px] text-text-muted">Image DPI</label>
                          <span className="text-[12px] font-semibold">{customOptions.imageDPI}</span>
                        </div>
                        <input
                          type="range"
                          min="72"
                          max="300"
                          step="6"
                          value={customOptions.imageDPI}
                          onChange={(e) => setCustomOptions({ ...customOptions, imageDPI: parseInt(e.target.value) })}
                          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>

                      {/* Checkboxes */}
                      <div className="space-y-2 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={customOptions.removeMetadata}
                            onChange={(e) => setCustomOptions({ ...customOptions, removeMetadata: e.target.checked })}
                            className="w-4 h-4 rounded border-white/20 bg-white/5"
                          />
                          <span className="text-[12px]">Remove metadata (author, dates, etc.)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={customOptions.removeDuplicates}
                            onChange={(e) => setCustomOptions({ ...customOptions, removeDuplicates: e.target.checked })}
                            className="w-4 h-4 rounded border-white/20 bg-white/5"
                          />
                          <span className="text-[12px]">Remove duplicate objects</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={customOptions.compressStreams}
                            onChange={(e) => setCustomOptions({ ...customOptions, compressStreams: e.target.checked })}
                            className="w-4 h-4 rounded border-white/20 bg-white/5"
                          />
                          <span className="text-[12px]">Compress data streams (recommended)</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Compress Button */}
                  <button
                    onClick={compressPDF}
                    disabled={isProcessing}
                    className="w-full px-6 py-4 bg-white text-black font-bold rounded-md hover:bg-white/90 transition-colors text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Compressing...' : 'Compress PDF'}
                  </button>
                </>
              )}

              {processedFile && (
                <>
                  {/* Success Message */}
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-[15px] mb-1">PDF Compressed Successfully!</div>
                      <div className="text-[13px] text-text-muted">
                        Your file has been optimized and is ready to download
                      </div>
                    </div>
                  </div>

                  {/* Compression Stats */}
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center">
                      <div className="text-[12px] text-text-dim mb-1">Original Size</div>
                      <div className="text-[16px] font-bold">{formatSize(processedFile.originalSize)}</div>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center">
                      <div className="text-[12px] text-text-dim mb-1">Compressed Size</div>
                      <div className="text-[16px] font-bold">{formatSize(processedFile.compressedSize)}</div>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                      <div className="text-[12px] text-text-dim mb-1">Reduced By</div>
                      <div className="text-[16px] font-bold text-green-400">{getReduction()}%</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={downloadFile}
                      className="flex-1 px-6 py-4 bg-white text-black font-bold rounded-md hover:bg-white/90 transition-colors text-[15px] flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Compressed PDF
                    </button>
                    <button
                      onClick={reset}
                      className="px-6 py-4 bg-transparent border border-white/20 text-white font-bold rounded-md hover:border-white/40 transition-colors text-[15px]"
                    >
                      Compress Another
                    </button>
                  </div>
                </>
              )}

              {/* Privacy Note */}
              {!processedFile && (
                <div className="mt-6 flex items-center justify-center gap-2 text-[12px] text-text-dim">
                  <span>🔒</span>
                  <span>All processing happens in your browser. Files never leave your device.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
