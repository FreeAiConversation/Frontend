import Link from 'next/link';
import { ArrowRight, RefreshCw, Zap } from 'lucide-react';
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
  'image-converter': <RefreshCw className="w-[18px] h-[18px]" />,
  'image-optimizer': <Zap className="w-[18px] h-[18px]" />,
  'watermark': <Box className="w-[18px] h-[18px]" />,
  'password-generator': <Lock className="w-[18px] h-[18px]" />,
  'rewrite-ai': <Pencil className="w-[18px] h-[18px]" />,
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
  const isUpcoming = tool.upcoming;

  const handleClick = (e: React.MouseEvent) => {
    if (isUpcoming) {
      e.preventDefault();
    }
  };

  return (
    <Link
      href={isUpcoming ? '#' : tool.href}
      onClick={handleClick}
      className={`relative flex items-center gap-3.5 p-3.5 border border-border rounded-md transition-all duration-200 animate-fade-in-up group ${
        isUpcoming
          ? 'opacity-60 cursor-not-allowed'
          : 'cursor-pointer hover:border-border-hover hover:bg-bg-elevated'
      }`}
      style={{ animationDelay }}
      data-search={tool.searchTerms}
    >
      {isUpcoming && (
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-white text-black text-[10px] font-bold tracking-wide rounded">
          UPCOMING
        </div>
      )}
      <div className={`w-[38px] h-[38px] rounded-sm border border-border flex items-center justify-center text-white flex-shrink-0 bg-white/[0.02] ${
        isUpcoming ? '' : ''
      }`}>
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
      {!isUpcoming && (
        <ArrowRight className="w-3.5 h-3.5 text-text-dim opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}
