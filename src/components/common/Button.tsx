// ─────────────────────────────────────────────────────────────
// LawHub Uganda — Common UI Primitive: Button
// Enterprise-grade, accessible, and responsive button component
// supporting multiple variants, sizes, loading states, and icons.
// ─────────────────────────────────────────────────────────────

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'gold' | 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'gold',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-heading font-bold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#09090b] active:scale-[0.98]';

  const sizeStyles: Record<ButtonSize, string> = {
    xs: 'px-2.5 py-1 text-xs gap-1.5',
    sm: 'px-3.5 py-1.5 text-xs gap-2',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 rounded-2xl',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    gold: 'bg-[#c89d42] hover:bg-[#dfb858] text-[#09090b] shadow-md shadow-[#c89d42]/10 focus:ring-[#c89d42]',
    primary:
      'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/80 focus:ring-slate-600',
    secondary:
      'bg-white/[0.05] hover:bg-white/[0.08] text-slate-200 border border-white/10 focus:ring-white/20',
    outline:
      'bg-transparent hover:bg-[#c89d42]/10 text-[#c89d42] border border-[#c89d42]/40 hover:border-[#c89d42] focus:ring-[#c89d42]',
    danger:
      'bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 focus:ring-red-500',
    ghost:
      'bg-transparent hover:bg-white/[0.05] text-slate-300 hover:text-slate-100 focus:ring-slate-500',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
