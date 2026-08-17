// ─────────────────────────────────────────────────────────────
// LawHub Uganda — Common UI Primitive: Card
// Standardized glass-morphic containers with gold accents,
// header, content, and footer subcomponents.
// ─────────────────────────────────────────────────────────────

import React, { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'standard' | 'gold' | 'glass' | 'subtle';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
  padded?: boolean;
  children: ReactNode;
}

export function Card({
  variant = 'standard',
  hoverable = false,
  padded = true,
  className = '',
  children,
  ...props
}: CardProps) {
  const variantStyles: Record<CardVariant, string> = {
    standard:
      'bg-[#121216]/60 backdrop-blur-md border border-white/[0.08] shadow-xl',
    gold:
      'bg-[#14141a]/70 backdrop-blur-md border border-[#c89d42]/35 shadow-xl shadow-[#c89d42]/5',
    glass:
      'bg-[#0e0e12]/60 backdrop-blur-xl border border-white/[0.08] shadow-2xl',
    subtle:
      'bg-white/[0.02] border border-white/[0.05]',
  };

  const hoverStyle = hoverable
    ? 'hover:border-[#c89d42]/40 hover:bg-[#1a1a20]/75 hover:shadow-2xl hover:shadow-black/60 transition-all duration-200'
    : '';

  return (
    <div
      className={`rounded-2xl ${variantStyles[variant]} ${hoverStyle} ${
        padded ? 'p-4 sm:p-6' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
}

export function CardHeader({
  title,
  subtitle,
  action,
  icon,
  className = '',
  children,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={`flex items-start justify-between gap-4 pb-4 border-b border-white/[0.06] ${className}`}
      {...props}
    >
      {children || (
        <>
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#c89d42] shrink-0">
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-base sm:text-lg font-heading font-bold text-slate-100">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </>
      )}
    </div>
  );
}

export function CardContent({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`pt-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className = '',
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
