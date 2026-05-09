'use client';

import { useState, useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { Upload, FileText, X, Download, Check, Lock, ArrowDown } from 'lucide-react';
import Link from 'next/link';

interface PDFFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

interface MergedFile {
  name: string;
  size: number;
  blob: Blob;
}

export function PDFMergeTool() {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedFile, setMergedFile] = useState<MergedFile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addFiles(files);
  };

  // Add files to list
  const addFiles = (files: File[]) => {
    const pdfFilesOnly = files.filter((f) => f.type === 'application/pdf');
    const newFiles: PDFFile[] = pdfFilesOnly.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
    }));
    setPdfFiles((prev) => [...prev, ...newFiles]);
    setMergedFile(null);
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
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  // Remove file
  const removeFile = (id: string) => {
    setPdfFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Move file up
  const moveFileUp = (index: number) => {
    if (index === 0) return;
    const newFiles = [...pdfFiles];
    [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
    setPdfFiles(newFiles);
  };

  // Move file down
  const moveFileDown = (index: number) => {
    if (index === pdfFiles.length - 1) return;
    const newFiles = [...pdfFiles];
    [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    setPdfFiles(newFiles);
  };

  // Merge PDFs
  const mergePDFs = async () => {
    if (pdfFiles.length < 2) return;

    setIsProcessing(true);
    try {
      const PDFLib = await import('pdf-lib');
      const mergedPdf = await PDFLib.PDFDocument.create();

      for (const pdfFile of pdfFiles) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(mergedBytes)], { type: 'application/pdf' });

      setMergedFile({
        name: 'merged.pdf',
        size: blob.size,
        blob,
      });
    } catch (error) {
      console.error('Merge error:', error);
      alert('Failed to merge PDFs. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Download merged file
  const downloadFile = () => {
    if (!mergedFile) return;
    const url = URL.createObjectURL(mergedFile.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mergedFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset
  const reset = () => {
    setPdfFiles([]);
    setMergedFile(null);
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
            <FileText className="w-3 h-3" />
            <span>PDF Merge</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            Merge PDF Files
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Combine multiple PDF files into one document. Drag to reorder, then merge instantly.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          {!mergedFile ? (
            <>
              {/* Upload Zone */}
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
                <h3 className="text-xl font-bold mb-2">Select PDF Files</h3>
                <p className="text-text-muted mb-4">
                  Drop multiple PDF files here or click to browse
                </p>
                <div className="text-[13px] text-text-dim">
                  Files will be merged in the order you add them
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* File List */}
              {pdfFiles.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[14px] font-semibold">
                      Selected Files ({pdfFiles.length})
                    </h3>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[13px] text-text-muted hover:text-white transition-colors"
                    >
                      + Add More
                    </button>
                  </div>
                  <div className="space-y-2">
                    {pdfFiles.map((pdfFile, index) => (
                      <div
                        key={pdfFile.id}
                        className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3"
                      >
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => moveFileUp(index)}
                            disabled={index === 0}
                            className="p-1 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ArrowDown className="w-3 h-3 rotate-180" />
                          </button>
                          <button
                            onClick={() => moveFileDown(index)}
                            disabled={index === pdfFiles.length - 1}
                            className="p-1 hover:bg-white/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3 flex-1">
                          <FileText className="w-5 h-5 text-white/60 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-[14px] truncate">
                              {pdfFile.name}
                            </div>
                            <div className="text-[12px] text-text-dim">
                              {formatSize(pdfFile.size)}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(pdfFile.id)}
                          className="p-2 hover:bg-white/10 rounded transition-colors flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Merge Button */}
              {pdfFiles.length >= 2 && (
                <button
                  onClick={mergePDFs}
                  disabled={isProcessing}
                  className="w-full px-6 py-4 bg-white text-black font-bold rounded-md hover:bg-white/90 transition-colors text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Merging PDFs...' : `Merge ${pdfFiles.length} PDFs`}
                </button>
              )}

              {pdfFiles.length === 1 && (
                <div className="text-center py-4 text-text-dim text-[13px]">
                  Add at least one more PDF to merge
                </div>
              )}

              {/* Privacy Note */}
              <div className="mt-6 flex items-center justify-center gap-2 text-[12px] text-text-dim">
                <Lock className="w-3 h-3" />
                <span>All processing happens in your browser. Files never leave your device.</span>
              </div>
            </>
          ) : (
            <div className="border border-white/10 rounded-lg p-8 bg-white/[0.02]">
              {/* Success Message */}
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[15px] mb-1">PDFs Merged Successfully!</div>
                  <div className="text-[13px] text-text-muted">
                    {pdfFiles.length} files combined into one PDF
                  </div>
                </div>
              </div>

              {/* File Info */}
              <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-lg flex items-center gap-3">
                <FileText className="w-6 h-6 text-white/60" />
                <div className="flex-1">
                  <div className="font-semibold text-[15px]">{mergedFile.name}</div>
                  <div className="text-[13px] text-text-dim">{formatSize(mergedFile.size)}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={downloadFile}
                  className="flex-1 px-6 py-4 bg-white text-black font-bold rounded-md hover:bg-white/90 transition-colors text-[15px] flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Merged PDF
                </button>
                <button
                  onClick={reset}
                  className="px-6 py-4 bg-transparent border border-white/20 text-white font-bold rounded-md hover:border-white/40 transition-colors text-[15px]"
                >
                  Merge More
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
