'use client';

import { useState, useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { Upload, FileText, X, Download, Check, Scissors, Lock } from 'lucide-react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface SplitOption {
  type: 'all' | 'range' | 'custom';
  label: string;
  description: string;
}

interface SplitResult {
  files: { name: string; blob: Blob; size: number }[];
  totalSize: number;
}

export function PDFSplitTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [splitOption, setSplitOption] = useState<'all' | 'range' | 'custom'>('all');
  const [rangeStart, setRangeStart] = useState<number>(1);
  const [rangeEnd, setRangeEnd] = useState<number>(1);
  const [customPages, setCustomPages] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitResult, setSplitResult] = useState<SplitResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const splitOptions: SplitOption[] = [
    {
      type: 'all',
      label: 'Split All Pages',
      description: 'Extract each page as a separate PDF',
    },
    {
      type: 'range',
      label: 'Page Range',
      description: 'Extract a specific range of pages',
    },
    {
      type: 'custom',
      label: 'Custom Pages',
      description: 'Extract specific pages (e.g., 1,3,5-7)',
    },
  ];

  // Handle file selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setSplitResult(null);
      await getPageCount(file);
    }
  };

  // Get page count
  const getPageCount = async (file: File) => {
    try {
      const PDFLib = await import('pdf-lib');
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
      const count = pdf.getPageCount();
      setPageCount(count);
      setRangeEnd(count);
    } catch (error) {
      console.error('Error reading PDF:', error);
      alert('Failed to read PDF file.');
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

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setSplitResult(null);
      await getPageCount(file);
    }
  };

  // Parse custom pages input
  const parseCustomPages = (input: string): number[] => {
    const pages: number[] = [];
    const parts = input.split(',');

    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map((n) => parseInt(n.trim()));
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= pageCount && !pages.includes(i)) {
              pages.push(i);
            }
          }
        }
      } else {
        const page = parseInt(trimmed);
        if (!isNaN(page) && page >= 1 && page <= pageCount && !pages.includes(page)) {
          pages.push(page);
        }
      }
    }

    return pages.sort((a, b) => a - b);
  };

  // Split PDF
  const splitPDF = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    try {
      const PDFLib = await import('pdf-lib');
      const arrayBuffer = await selectedFile.arrayBuffer();
      const sourcePdf = await PDFLib.PDFDocument.load(arrayBuffer);

      let pagesToExtract: number[] = [];

      if (splitOption === 'all') {
        pagesToExtract = Array.from({ length: pageCount }, (_, i) => i + 1);
      } else if (splitOption === 'range') {
        for (let i = rangeStart; i <= rangeEnd; i++) {
          pagesToExtract.push(i);
        }
      } else if (splitOption === 'custom') {
        pagesToExtract = parseCustomPages(customPages);
        if (pagesToExtract.length === 0) {
          alert('Please enter valid page numbers.');
          setIsProcessing(false);
          return;
        }
      }

      const files: { name: string; blob: Blob; size: number }[] = [];
      let totalSize = 0;

      for (const pageNum of pagesToExtract) {
        const newPdf = await PDFLib.PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(sourcePdf, [pageNum - 1]);
        newPdf.addPage(copiedPage);

        const pdfBytes = await newPdf.save();
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
        
        files.push({
          name: `${selectedFile.name.replace('.pdf', '')}_page_${pageNum}.pdf`,
          blob,
          size: blob.size,
        });
        totalSize += blob.size;
      }

      setSplitResult({ files, totalSize });
    } catch (error) {
      console.error('Split error:', error);
      alert('Failed to split PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Download single file
  const downloadFile = (file: { name: string; blob: Blob }) => {
    const url = URL.createObjectURL(file.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download all files
  const downloadAll = () => {
    if (!splitResult) return;
    splitResult.files.forEach((file) => {
      setTimeout(() => downloadFile(file), 100);
    });
  };

  // Reset
  const reset = () => {
    setSelectedFile(null);
    setPageCount(0);
    setSplitResult(null);
    setCustomPages('');
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

  return (
    <section className="py-16 md:py-20 relative">
      <Container>
        {/* Back Link */}
        <Breadcrumb items={[
          { label: 'Tools', href: '/tools' },
          { label: 'PDF Tools', href: '/tools/pdf-tools' },
          { label: 'Split PDF', href: '/tools/pdf-split' },
        ]} />

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4">
            <Scissors className="w-3 h-3" />
            <span>PDF Split</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Split PDF Files
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Extract pages from your PDF. Split all pages or select specific ones.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          {!splitResult ? (
            <>
              {/* Upload Zone */}
              {!selectedFile && (
                <>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer group mb-6 ${
                      isDragging
                        ? 'border-white/60 bg-white/5'
                        : 'border-white/20 hover:border-white/40 bg-white/[0.02]'
                    }`}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Upload className="w-8 h-8 text-white/60" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Select PDF File</h3>
                    <p className="text-text-muted mb-4">
                      Drop your PDF file here or click to browse
                    </p>
                    <div className="text-[13px] text-text-dim">
                      Choose which pages to extract after upload
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

              {/* Selected File & Options */}
              {selectedFile && (
                <>
                  {/* File Info */}
                  <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-white/60" />
                      <div>
                        <div className="font-semibold text-[14px]">{selectedFile.name}</div>
                        <div className="text-[12px] text-text-dim">
                          {pageCount} pages • {formatSize(selectedFile.size)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={reset}
                      className="p-2 hover:bg-white/10 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Split Options */}
                  <div className="mb-6">
                    <label className="block text-[13px] font-semibold mb-3">
                      Split Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {splitOptions.map((option) => (
                        <button
                          key={option.type}
                          onClick={() => setSplitOption(option.type)}
                          className={`p-4 rounded-md border transition-all text-left ${
                            splitOption === option.type
                              ? 'bg-white text-black border-white'
                              : 'bg-transparent text-white border-white/20 hover:border-white/40'
                          }`}
                        >
                          <div className="font-semibold text-[13px] mb-1">{option.label}</div>
                          <div className={`text-[11px] ${splitOption === option.type ? 'text-black/60' : 'text-text-dim'}`}>
                            {option.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Range Input */}
                  {splitOption === 'range' && (
                    <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[12px] text-text-muted mb-2">
                            Start Page
                          </label>
                          <input
                            type="number"
                            min="1"
                            max={pageCount}
                            value={rangeStart}
                            onChange={(e) => setRangeStart(parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-[14px] focus:outline-none focus:border-white/30"
                          />
                        </div>
                        <div>
                          <label className="block text-[12px] text-text-muted mb-2">
                            End Page
                          </label>
                          <input
                            type="number"
                            min="1"
                            max={pageCount}
                            value={rangeEnd}
                            onChange={(e) => setRangeEnd(parseInt(e.target.value) || pageCount)}
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-[14px] focus:outline-none focus:border-white/30"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Custom Pages Input */}
                  {splitOption === 'custom' && (
                    <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg">
                      <label className="block text-[12px] text-text-muted mb-2">
                        Page Numbers
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 1,3,5-7,10"
                        value={customPages}
                        onChange={(e) => setCustomPages(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-[14px] focus:outline-none focus:border-white/30"
                      />
                      <div className="mt-2 text-[11px] text-text-dim">
                        Enter page numbers separated by commas. Use hyphens for ranges.
                      </div>
                    </div>
                  )}

                  {/* Split Button */}
                  <button
                    onClick={splitPDF}
                    disabled={isProcessing}
                    className="w-full px-6 py-4 bg-white text-black font-bold rounded-md hover:bg-white/90 transition-colors text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Splitting PDF...' : 'Split PDF'}
                  </button>

                  {/* Privacy Note */}
                  <div className="mt-6 flex items-center justify-center gap-2 text-[12px] text-text-dim">
                    <Lock className="w-3 h-3" />
                    <span>All processing happens in your browser. Files never leave your device.</span>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="border border-white/10 rounded-lg p-8 bg-white/[0.02]">
              {/* Success Message */}
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[15px] mb-1">PDF Split Successfully!</div>
                  <div className="text-[13px] text-text-muted">
                    {splitResult.files.length} page{splitResult.files.length > 1 ? 's' : ''} extracted
                  </div>
                </div>
              </div>

              {/* Download All Button */}
              <button
                onClick={downloadAll}
                className="w-full mb-4 px-6 py-4 bg-white text-black font-bold rounded-md hover:bg-white/90 transition-colors text-[15px] flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download All ({splitResult.files.length} files)
              </button>

              {/* Individual Files */}
              <div className="mb-6 space-y-2 max-h-[400px] overflow-y-auto">
                {splitResult.files.map((file, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText className="w-4 h-4 text-white/60 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[13px] truncate">{file.name}</div>
                        <div className="text-[11px] text-text-dim">{formatSize(file.size)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(file)}
                      className="p-2 hover:bg-white/10 rounded transition-colors flex-shrink-0"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Reset Button */}
              <button
                onClick={reset}
                className="w-full px-6 py-4 bg-transparent border border-white/20 text-white font-bold rounded-md hover:border-white/40 transition-colors text-[15px]"
              >
                Split Another PDF
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
