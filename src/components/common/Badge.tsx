// ─────────────────────────────────────────────────────────────
// LawHub Uganda — Common UI Primitive: Badge
// Standardized status indicators, role badges, and tag chips.
// ─────────────────────────────────────────────────────────────

import React, { HTMLAttributes, ReactNode } from 'react';
import { getStatusColor } from '../../utils/formatters';
import { UserRole } from '../../types';
import { ShieldCheck, GraduationCap, Scale } from 'lucide-react';

export type BadgeVariant = 'status' | 'role' | 'gold' | 'default' | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  status?: string;
  role?: UserRole | string;
  size?: 'sm' | 'md';
  icon?: ReactNode;
  children?: ReactNode;
}

export function Badge({
  variant = 'default',
  status,
  role,
  size = 'md',
  icon,
  className = '',
  children,
  ...props
}: BadgeProps) {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  if (variant === 'status' && status) {
    const colors = getStatusColor(status);
    return (
      <span
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          borderColor: colors.border,
        }}
        className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-wider border shrink-0 ${sizeClass} ${className}`}
        {...props}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {children || status.replace(/_/g, ' ')}
      </span>
    );
  }

  if (variant === 'role' && role) {
    const roleIcon =
      role === 'Administrator' ? (
        <ShieldCheck className="w-3 h-3 text-[#c89d42]" />
      ) : role === 'Lecturer' ? (
        <Scale className="w-3 h-3 text-emerald-400" />
      ) : (
        <GraduationCap className="w-3 h-3 text-sky-400" />
      );

    const roleStyles: Record<string, string> = {
      Administrator: 'bg-[#c89d42]/15 text-[#dfb858] border-[#c89d42]/30',
      Lecturer: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      Student: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    };

    const style = roleStyles[role] || 'bg-white/10 text-slate-300 border-white/20';

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full font-heading font-bold border shrink-0 ${sizeClass} ${style} ${className}`}
        {...props}
      >
        {icon || roleIcon}
        <span>{children || role}</span>
      </span>
    );
  }

  if (variant === 'gold') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-[#c89d42]/15 text-[#dfb858] border border-[#c89d42]/30 font-bold shrink-0 ${sizeClass} ${className}`}
        {...props}
      >
        {icon}
        {children}
      </span>
    );
  }

  if (variant === 'outline') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-transparent text-slate-300 border border-white/15 font-medium shrink-0 ${sizeClass} ${className}`}
        {...props}
      >
        {icon}
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-white/[0.05] text-slate-200 border border-white/10 font-medium shrink-0 ${sizeClass} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}
