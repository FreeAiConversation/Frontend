import Link from 'next/link';
import { File, ImageIcon, Code, PenTool, Settings } from 'lucide-react';
import { Category } from '@/lib/constants';

// Map category IDs to Lucide icons
const categoryIcons: Record<string, React.ReactNode> = {
  'pdf': <File className="w-5 h-5" />,
  'image': <ImageIcon className="w-5 h-5" />,
  'code': <Code className="w-5 h-5" />,
  'write': <PenTool className="w-5 h-5" />,
  'utility': <Settings className="w-5 h-5" />,
};

interface CategoryCardProps {
  category: Category;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const animationDelay = `${0.05 * (index + 1)}s`;

  return (
    <Link
      href={category.href}
      className="category-card-gradient relative rounded-lg cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] min-h-[200px] hover:-translate-y-1 animate-fade-in-up group p-6 flex flex-col gap-4"
      style={{ animationDelay }}
    >
      {/* Top section */}
      <div className="flex items-start justify-between relative z-10">
        <div className="w-11 h-11 rounded-md border border-border flex items-center justify-center text-white bg-white/[0.03]">
          {categoryIcons[category.id] || category.icon}
        </div>
        <div className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-black tracking-wide">
          {category.toolCount} Tools
        </div>
      </div>

      {/* Body */}
      <div className="mt-auto relative z-10">
        <div className="text-base font-bold tracking-tight mb-1">
          {category.name}
        </div>
        <div className="text-[12px] text-text-muted leading-[1.4]">
          {category.description}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2 pt-2.5 border-t border-border flex items-center justify-between text-[10px] relative z-10">
        <span className="text-text-dim">Featured:</span>
        <span className="text-text-secondary font-semibold px-2 py-0.5 border border-border rounded-full">
          {category.featured}
        </span>
      </div>
    </Link>
  );
}
