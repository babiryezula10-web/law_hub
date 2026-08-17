// ─────────────────────────────────────────────────────────────
// LawHub Uganda — Common UI Primitive: Loader
// Loading indicators, skeleton placeholders, and pulsing state.
// ─────────────────────────────────────────────────────────────

import React from 'react';
import { Loader2, Scale } from 'lucide-react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export function Spinner({ size = 'md', label, className = '' }: SpinnerProps) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 className={`${sizeMap[size]} text-[#c89d42] animate-spin`} />
      {label && <p className="text-xs text-slate-400 font-medium">{label}</p>}
    </div>
  );
}

export function LegalPulseLoader({ label = 'Retrieving verified Ugandan authorities…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-[#c89d42]/10 border border-[#c89d42]/30 flex items-center justify-center text-[#c89d42] animate-pulse">
          <Scale className="w-8 h-8" />
        </div>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c89d42] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c89d42]"></span>
        </span>
      </div>
      <p className="text-sm font-heading font-medium text-slate-300 text-center max-w-xs">
        {label}
      </p>
    </div>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 space-y-3 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="w-24 h-4 bg-white/10 rounded-md" />
            <div className="w-16 h-4 bg-white/5 rounded-full" />
          </div>
          <div className="w-full h-5 bg-white/10 rounded-md" />
          <div className="w-3/4 h-3 bg-white/5 rounded-md" />
          <div className="w-1/2 h-3 bg-white/5 rounded-md" />
        </div>
      ))}
    </div>
  );
}
