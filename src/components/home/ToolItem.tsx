import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Tool } from '@/lib/constants';
import { 
  FileText, 
  File, 
  Image, 
  Eye, 
  Box, 
  Lock, 
  Pencil, 
  Code, 
  Palette, 
  AlignLeft,
} from 'lucide-react';

// Map tool IDs to their Lucide icons
const toolIcons: Record<string, React.ReactNode> = {
  'word-counter': <FileText className="w-[18px] h-[18px]" />,
  'pdf-tools': <File className="w-[18px] h-[18px]" />,
  'image-converter': <Image className="w-[18px] h-[18px]" />,
  'image-optimizer': <Eye className="w-[18px] h-[18px]" />,
  'watermark': <Box className="w-[18px] h-[18px]" />,
  'password-generator': <Lock className="w-[18px] h-[18px]" />,
  'redesign-tool': <Pencil className="w-[18px] h-[18px]" />,
  'code-formatter': <Code className="w-[18px] h-[18px]" />,
  'color-picker': <Palette className="w-[18px] h-[18px]" />,
  'paragraph-generator': <AlignLeft className="w-[18px] h-[18px]" />,
};

interface ToolItemProps {
  tool: Tool;
  index: number;
}

export function ToolItem({ tool, index }: ToolItemProps) {
  const animationDelay = `${0.02 * (index + 1)}s`;

  return (
    <Link
      href={tool.href}
      className="flex items-center gap-3.5 p-3.5 border border-border rounded-md transition-all duration-200 cursor-pointer hover:border-border-hover hover:bg-bg-elevated animate-fade-in-up group"
      style={{ animationDelay }}
      data-search={tool.searchTerms}
    >
      <div className="w-[38px] h-[38px] rounded-sm border border-border flex items-center justify-center text-white flex-shrink-0 bg-white/[0.02]">
        {toolIcons[tool.id] || tool.icon}
      </div>
      <div className="flex-1">
        <div className="text-[14px] font-semibold tracking-tight">
          {tool.name}
        </div>
        <div className="text-[12px] text-text-muted">
          {tool.description}
        </div>
      </div>
      <ArrowRight className="w-3.5 h-3.5 text-text-dim opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" />
    </Link>
  );
}
