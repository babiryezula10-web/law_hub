// ─────────────────────────────────────────────────────────────
// LawHub Uganda — Common UI Primitive: EducationalDisclaimer
// Formal judicial educational disclaimer banner required on all
// AI-assisted legal research and drafting surfaces.
// ─────────────────────────────────────────────────────────────

import React from 'react';
import { Scale, Info, ShieldAlert } from 'lucide-react';

export interface EducationalDisclaimerProps {
  variant?: 'compact' | 'full' | 'prominent';
  customText?: string;
  className?: string;
}

export function EducationalDisclaimer({
  variant = 'compact',
  customText,
  className = '',
}: EducationalDisclaimerProps) {
  if (variant === 'compact') {
    return (
      <div
        className={`bg-white/[0.02] border border-[#c89d42]/20 rounded-xl p-3 flex items-start gap-2.5 text-xs text-slate-400 ${className}`}
      >
        <Info className="w-4 h-4 text-[#c89d42] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {customText ||
            'Academic Research Notice: Generated explanations cite Ugandan constitutional provisions and precedents for educational reference only. Formal legal counsel should be obtained from an Advocate of the High Court of Uganda.'}
        </p>
      </div>
    );
  }

  if (variant === 'prominent') {
    return (
      <div
        className={`bg-[#14141a]/90 border border-[#c89d42]/40 rounded-2xl p-4 sm:p-5 shadow-xl shadow-[#c89d42]/5 ${className}`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#c89d42]/15 border border-[#c89d42]/30 flex items-center justify-center text-[#c89d42]">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-heading font-bold text-[#dfb858]">
              Judicial & Educational Integrity Notice
            </h4>
            <p className="text-[11px] text-slate-400">
              Pursuant to Article 126 of the 1995 Constitution of Uganda
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {customText ||
            'LawHub Academic Assistant is an assistive educational platform. It does not issue binding legal determinations or replace independent legal analysis. Always cross-verify citations on the Uganda Legal Information Institute (ULII) and relevant Acts of Parliament.'}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-300 ${className}`}
    >
      <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
      <div>
        <h4 className="font-heading font-bold text-red-400 mb-1">
          Mandatory Legal Disclaimer
        </h4>
        <p className="leading-relaxed">
          {customText ||
            'This legal document is prepared for educational drafting and moot court reference only. It must be reviewed, verified, and endorsed by an Advocate of the High Court of Uganda prior to execution, notarisation, or filing in any Ugandan court.'}
        </p>
      </div>
    </div>
  );
}
