// ─────────────────────────────────────────────────────────────
// LawHub Uganda — Admin Component: AdminPlatformInfo
// Platform architecture, institutional credentials & developer specs.
// ─────────────────────────────────────────────────────────────

import React from 'react';
import developerPhoto from '../../assets/images/developer_profile_portrait_1786648391041.jpg';
import {
  ShieldCheck,
  GraduationCap,
  Scale,
  Sparkles,
  Target,
  Compass,
  Mail,
  Building2,
  Server,
  Code,
  Layers,
  Database,
  Lock,
} from 'lucide-react';

export function AdminPlatformInfo() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-slate-100">
      {/* Header Banner */}
      <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-3 shadow-xl relative overflow-hidden backdrop-blur-xl">
        <div className="flex items-center gap-2 text-[#c89d42]">
          <Lock className="w-4 h-4" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/[0.05] px-2.5 py-0.5 rounded-full border border-[#c89d42]/30 font-mono backdrop-blur-sm">
            Confidential Administrative Information
          </span>
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-100">
          Platform Architecture & Engineering Credentials
        </h2>
        <p className="text-xs text-slate-400 max-w-2xl">
          Platform stewardship, developer credentials, institutional affiliation, and system architecture specifications. Restricted exclusively to authenticated administrators.
        </p>
      </div>

      {/* Developer & Founder Profile Card */}
      <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-white/10 text-center sm:text-left">
          {/* Portrait with Gold Border */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-tr from-[#c89d42] via-[#dfb858] to-[#997328] shadow-xl shrink-0">
            <img
              src={developerPhoto}
              alt="Babirye Zula - LawHub Creator"
              className="w-full h-full object-cover object-top rounded-[inherit]"
            />
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/[0.05] border border-[#c89d42]/30 text-[#c89d42] text-[11px] font-bold backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Founder & Lead Developer</span>
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-slate-100">Babirye Zula</h3>
            <p className="text-xs font-semibold text-slate-300">
              Law Student &bull; LegalTech Innovator &bull; Creator of LawHub
            </p>
            <p className="text-xs text-[#c89d42] font-medium">Gulu University Faculty of Law</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#c89d42]" />
                <span>babiryezula10@gmail.com</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#c89d42]" />
                <span>Gulu University, Uganda</span>
              </span>
            </div>
          </div>
        </div>

        {/* Vision & Motivation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-black/30 rounded-2xl border border-white/10 space-y-2 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[#c89d42] font-bold">
              <Target className="w-4 h-4" />
              <span>Platform Vision</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Empowering law students across Uganda with AI-assisted research, authentic legal databases, structured examination preparation, and standardized faculty curriculum sharing.
            </p>
          </div>

          <div className="p-4 bg-black/30 rounded-2xl border border-white/10 space-y-2 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[#c89d42] font-bold">
              <Compass className="w-4 h-4" />
              <span>Institutional Commitment</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Maintained with strict compliance with the Uganda 1995 Constitution (Article 126), Data Protection and Privacy Act 2019, and judicial precedent from ULII and Court registries.
            </p>
          </div>
        </div>
      </div>

      {/* System Specifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-5 space-y-2 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[#c89d42]">
            <Server className="w-4 h-4" />
            <span className="font-bold">Backend Topology</span>
          </div>
          <p className="text-slate-400">
            Node.js / Express with TypeScript, JSON disk persistence, session RBAC, and Vite SSR middleware.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-5 space-y-2 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[#c89d42]">
            <Sparkles className="w-4 h-4" />
            <span className="font-bold">AI Legal Reasoning</span>
          </div>
          <p className="text-slate-400">
            Gemini 2.5 Flash API with specialized Ugandan legal prompting and IRAC structured outputs.
          </p>
        </div>

        <div className="bg-slate-950/40 border border-white/10 rounded-2xl p-5 space-y-2 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[#c89d42]">
            <Database className="w-4 h-4" />
            <span className="font-bold">Data Security</span>
          </div>
          <p className="text-slate-400">
            Encrypted session cookies, input validation, role checks, and DPPA 2019 compliance.
          </p>
        </div>
      </div>
    </div>
  );
}
