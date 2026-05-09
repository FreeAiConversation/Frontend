import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[13px] font-semibold rounded-full transition-all duration-200 whitespace-nowrap',
          variant === 'primary' &&
            'bg-white text-black hover:opacity-90 hover:-translate-y-0.5',
          variant === 'secondary' &&
            'bg-bg-input text-white border border-border hover:border-white hover:bg-bg-elevated',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
