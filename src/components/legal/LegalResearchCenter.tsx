// ─────────────────────────────────────────────────────────────
// LawHub Uganda — Legal Component: LegalResearchCenter
// Comprehensive multi-volume digital law library covering statutes,
// regulations, SIs, landmark cases, dictionaries, and maxims.
// ─────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { WatermarkBackground } from '../common/WatermarkBackground';
import {
  Scale,
  BookOpen,
  FileText,
  Search,
  ChevronRight,
  Share2,
  X,
  Check,
  Copy,
  Building2,
  Calendar,
  Link2,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  constitutionChapters,
  statutesList,
  caseLawDatabase,
  regulationsList,
  statutoryInstrumentsList,
  legalDictionaryTerms,
  legalMaximsList,
  legalResourceGuides,
  blacksLawDictionary,
  redVolumesList,
} from '../../data/mockData';
import {
  ConstitutionArticle,
  Statute,
  LegalCase,
  Regulation,
  StatutoryInstrument,
  LegalDictionaryTerm,
  LegalMaxim,
  LegalResourceGuide,
  BlacksLawTerm,
  RedVolumeEntry,
} from '../../types';

export function LegalResearchCenter() {
  const [activeTab, setActiveTab] = useState<
    | 'constitution'
    | 'statutes'
    | 'regulations'
    | 'si'
    | 'cases'
    | 'graph'
    | 'dictionary'
    | 'blacks'
    | 'red_vol1'
    | 'red_vol2'
    | 'maxims'
    | 'resources'
  >('constitution');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedCourt, setSelectedCourt] = useState('All');
  const [selectedStatuteCategory, setSelectedStatuteCategory] = useState('All');

  // Reader Modal states
  const [selectedArticle, setSelectedArticle] = useState<ConstitutionArticle | null>(null);
  const [selectedStatute, setSelectedStatute] = useState<Statute | null>(null);
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null);
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const [selectedSI, setSelectedSI] = useState<StatutoryInstrument | null>(null);
  const [selectedDictTerm, setSelectedDictTerm] = useState<LegalDictionaryTerm | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<LegalResourceGuide | null>(null);
  const [selectedBlacksTerm, setSelectedBlacksTerm] = useState<BlacksLawTerm | null>(null);
  const [selectedRedEntry, setSelectedRedEntry] = useState<RedVolumeEntry | null>(null);

  const [copied, setCopied] = useState(false);

  // 1. Constitution Articles
  const allArticles: ConstitutionArticle[] = constitutionChapters.flatMap((ch) => ch.articles);
  const filteredArticles = allArticles.filter((art) => {
    const query = searchQuery.toLowerCase();
    return (
      art.number.toLowerCase().includes(query) ||
      art.title.toLowerCase().includes(query) ||
      art.content.toLowerCase().includes(query) ||
      art.keywords.some((kw) => kw.toLowerCase().includes(query))
    );
  });

  // 2. Statutes Filtering
  const filteredStatutes = statutesList.filter((st) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      st.shortTitle.toLowerCase().includes(query) ||
      st.category.toLowerCase().includes(query) ||
      st.summary.toLowerCase().includes(query) ||
      st.sections.some(
        (sec) =>
          sec.title.toLowerCase().includes(query) ||
          sec.sectionNumber.toLowerCase().includes(query),
      );
    const matchesCategory =
      selectedStatuteCategory === 'All' || st.category === selectedStatuteCategory;
    return matchesSearch && matchesCategory;
  });

  // 3. Regulations Filtering
  const filteredRegulations = regulationsList.filter((reg) => {
    const query = searchQuery.toLowerCase();
    return (
      reg.name.toLowerCase().includes(query) ||
      reg.siNumber.toLowerCase().includes(query) ||
      reg.parentActTitle.toLowerCase().includes(query) ||
      reg.summary.toLowerCase().includes(query) ||
      reg.subject.toLowerCase().includes(query)
    );
  });

  // 4. Statutory Instruments Filtering
  const filteredSIs = statutoryInstrumentsList.filter((si) => {
    const query = searchQuery.toLowerCase();
    return (
      si.title.toLowerCase().includes(query) ||
      si.siNumber.toLowerCase().includes(query) ||
      si.parentLegislation.toLowerCase().includes(query) ||
      si.contentSummary.toLowerCase().includes(query) ||
      si.subjectCategory.toLowerCase().includes(query)
    );
  });

  // 5. Case Law Filtering
  const filteredCases = caseLawDatabase.filter((cs) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      cs.caseName.toLowerCase().includes(query) ||
      cs.citation.toLowerCase().includes(query) ||
      cs.topic.toLowerCase().includes(query) ||
      cs.ratioDecidendi.toLowerCase().includes(query) ||
      cs.facts.toLowerCase().includes(query) ||
      cs.judges.some((j) => j.toLowerCase().includes(query));
    const matchesTopic = selectedTopic === 'All' || cs.topic === selectedTopic;
    const matchesCourt = selectedCourt === 'All' || cs.court.includes(selectedCourt);
    return matchesSearch && matchesTopic && matchesCourt;
  });

  // 6. Legal Dictionary Filtering
  const filteredDictTerms = legalDictionaryTerms.filter((term) => {
    const query = searchQuery.toLowerCase();
    return (
      term.term.toLowerCase().includes(query) ||
      term.definition.toLowerCase().includes(query) ||
      term.simpleExplanation.toLowerCase().includes(query) ||
      term.legalMeaning.toLowerCase().includes(query)
    );
  });

  // 6B. Black's Law Dictionary Filtering
  const filteredBlacksTerms = blacksLawDictionary.filter((bt) => {
    const query = searchQuery.toLowerCase();
    return (
      bt.term.toLowerCase().includes(query) ||
      bt.definition.toLowerCase().includes(query) ||
      bt.ugandanApplication.toLowerCase().includes(query) ||
      bt.category.toLowerCase().includes(query) ||
      (bt.etymology && bt.etymology.toLowerCase().includes(query))
    );
  });

  // 6C. Red Volume 1 Filtering (Civil Procedure & Practice)
  const filteredRedVol1 = redVolumesList.filter((rv) => {
    const query = searchQuery.toLowerCase();
    const isVol1 = rv.volumeNumber === 1;
    const matchesSearch =
      rv.title.toLowerCase().includes(query) ||
      rv.statutoryRef.toLowerCase().includes(query) ||
      rv.summary.toLowerCase().includes(query) ||
      rv.subject.toLowerCase().includes(query);
    return isVol1 && matchesSearch;
  });

  // 6D. Red Volume 2 Filtering (Criminal Procedure & Evidence)
  const filteredRedVol2 = redVolumesList.filter((rv) => {
    const query = searchQuery.toLowerCase();
    const isVol2 = rv.volumeNumber === 2;
    const matchesSearch =
      rv.title.toLowerCase().includes(query) ||
      rv.statutoryRef.toLowerCase().includes(query) ||
      rv.summary.toLowerCase().includes(query) ||
      rv.subject.toLowerCase().includes(query);
    return isVol2 && matchesSearch;
  });

  // 7. Legal Maxims Filtering
  const filteredMaxims = legalMaximsList.filter((mx) => {
    const query = searchQuery.toLowerCase();
    return (
      mx.latinPhrase.toLowerCase().includes(query) ||
      mx.englishTranslation.toLowerCase().includes(query) ||
      mx.explanation.toLowerCase().includes(query) ||
      mx.legalPrinciple.toLowerCase().includes(query)
    );
  });

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative space-y-8 pb-12 text-slate-100">
      <WatermarkBackground
        type="scales"
        opacity={0.18}
        blendMode="normal"
        withVignette={false}
        withGradientOverlay={false}
      />

      {/* Header */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-[#c89d42]">
                <Scale className="w-5 h-5" />
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-slate-100">
                Ugandan Comprehensive Legal Library & Research Engine
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Search the 1995 Constitution, Acts of Parliament, Regulations, Statutory Instruments, Precedents, Legal Dictionary & Maxims.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <span className="px-3 py-1.5 bg-white/[0.05] text-[#c89d42] text-xs font-bold rounded-full border border-[#c89d42]/30 flex items-center gap-1.5 backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" /> Verifiable Authorities
            </span>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex flex-wrap gap-1.5 bg-black/30 p-2 rounded-2xl border border-white/10 text-xs font-semibold overflow-x-auto backdrop-blur-md">
          <button
            onClick={() => setActiveTab('constitution')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'constitution'
                ? 'bg-[#c89d42] text-[#050811] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            🏛️ Constitution 1995
          </button>
          <button
            onClick={() => setActiveTab('statutes')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'statutes'
                ? 'bg-[#c89d42] text-[#050811] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📜 Statutes (Acts)
          </button>
          <button
            onClick={() => setActiveTab('regulations')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'regulations'
                ? 'bg-[#c89d42] text-[#050811] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📑 Regulations
          </button>
          <button
            onClick={() => setActiveTab('si')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'si'
                ? 'bg-[#c89d42] text-[#050811] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📄 Statutory Instruments
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'cases'
                ? 'bg-[#c89d42] text-[#050811] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            ⚖️ Case Law Database
          </button>
          <button
            onClick={() => setActiveTab('dictionary')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'dictionary'
                ? 'bg-[#c89d42] text-[#050811] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📖 Legal Dictionary
          </button>
          <button
            onClick={() => setActiveTab('blacks')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'blacks'
                ? 'bg-[#c89d42] text-[#050811] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📚 Black's Law
          </button>
          <button
            onClick={() => setActiveTab('red_vol1')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'red_vol1'
                ? 'bg-[#c89d42] text-[#050811] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📕 Red Vol 1 (Civil)
          </button>
          <button
            onClick={() => setActiveTab('red_vol2')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'red_vol2'
                ? 'bg-[#c89d42] text-[#050811] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📕 Red Vol 2 (Criminal)
          </button>
          <button
            onClick={() => setActiveTab('maxims')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'maxims'
                ? 'bg-[#c89d42] text-[#050811] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            📜 Legal Maxims
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer backdrop-blur-sm ${
              activeTab === 'resources'
                ? 'bg-[#c89d42] text-[#050811] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
            }`}
          >
            🎓 Resource Guides
          </button>
        </div>

        {/* Global Tab Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#c89d42] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab.toUpperCase()} by keyword, section, citation, ratio, or article number...`}
            className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs sm:text-sm rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#c89d42] shadow-inner backdrop-blur-md"
          />
        </div>
      </div>

      {/* TAB 1: CONSTITUTION */}
      {activeTab === 'constitution' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing <strong>{filteredArticles.length}</strong> Constitutional Articles
            </span>
            <span className="text-[#c89d42]">Republic of Uganda Constitution (1995 as amended)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art, idx) => (
              <div
                key={idx}
                className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 space-y-4 transition flex flex-col justify-between group shadow-lg backdrop-blur-md hover:bg-slate-900/50"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[#c89d42] uppercase tracking-wider bg-white/[0.05] px-2.5 py-1 rounded border border-[#c89d42]/30">
                      {art.number}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Chapter IV</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-100 group-hover:text-[#c89d42] transition">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {art.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Official Constitutional Law</span>
                  <button
                    onClick={() => setSelectedArticle(art)}
                    className="text-xs font-bold text-[#c89d42] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Read Article <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: STATUTES */}
      {activeTab === 'statutes' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Category Filter:</span>
              <select
                value={selectedStatuteCategory}
                onChange={(e) => setSelectedStatuteCategory(e.target.value)}
                className="bg-[#090f1e] border border-white/10 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Constitutional & Public Law">Constitutional & Public Law</option>
                <option value="Property & Land Law">Property & Land Law</option>
                <option value="Commercial & Contract Law">Commercial & Contract Law</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Civil Procedure & Practice">Civil Procedure & Practice</option>
              </select>
            </div>
            <span className="text-slate-400">
              Showing <strong>{filteredStatutes.length}</strong> Principal Acts
            </span>
          </div>

          <div className="space-y-4">
            {filteredStatutes.map((st) => (
              <div
                key={st.id}
                className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 space-y-4 transition shadow-lg backdrop-blur-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold text-[#c89d42] uppercase tracking-wider bg-white/[0.05] px-2.5 py-0.5 rounded border border-[#c89d42]/30 mr-2">
                      {st.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      Cap. {st.chapterNumber} • Assented: {st.commencementDate}
                    </span>
                    <h3 className="font-heading font-extrabold text-lg text-slate-100 mt-1">
                      {st.shortTitle}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedStatute(st)}
                    className="px-4 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-[#050811] font-bold text-xs transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    <span>View All Sections</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">{st.summary}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                  {st.sections.slice(0, 3).map((sec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 bg-black/30 rounded-2xl border border-white/10 space-y-1 text-xs backdrop-blur-sm"
                    >
                      <p className="font-bold text-[#c89d42]">Section {sec.sectionNumber}</p>
                      <p className="text-slate-200 font-semibold truncate">{sec.title}</p>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{sec.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REGULATIONS */}
      {activeTab === 'regulations' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRegulations.map((reg) => (
              <div
                key={reg.id}
                className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 space-y-4 transition flex flex-col justify-between shadow-lg backdrop-blur-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#c89d42] bg-black/40 px-2 py-0.5 rounded border border-white/10">
                      {reg.siNumber}
                    </span>
                    <span className="text-[10px] text-slate-400">Year {reg.year}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-100">{reg.name}</h3>
                  <p className="text-xs text-slate-400">
                    Parent Act: <strong className="text-slate-200">{reg.parentActTitle}</strong>
                  </p>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {reg.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{reg.subject}</span>
                  <button
                    onClick={() => setSelectedRegulation(reg)}
                    className="text-xs font-bold text-[#c89d42] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    View Provisions <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STATUTORY INSTRUMENTS */}
      {activeTab === 'si' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSIs.map((si) => (
              <div
                key={si.id}
                className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 space-y-4 transition flex flex-col justify-between shadow-lg backdrop-blur-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#c89d42] bg-black/40 px-2 py-0.5 rounded border border-white/10">
                      {si.siNumber}
                    </span>
                    <span className="text-[10px] text-slate-400">Gazetted {si.gazetteDate}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-100">{si.title}</h3>
                  <p className="text-xs text-slate-400">
                    Enacted Under:{' '}
                    <strong className="text-slate-200">{si.parentLegislation}</strong>
                  </p>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {si.contentSummary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">{si.subjectCategory}</span>
                  <button
                    onClick={() => setSelectedSI(si)}
                    className="text-xs font-bold text-[#c89d42] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Open Full Text <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CASE LAW */}
      {activeTab === 'cases' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400">Subject Topic:</span>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="bg-[#090f1e] border border-white/10 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none"
              >
                <option value="All">All Topics</option>
                <option value="Constitutional Law">Constitutional Law</option>
                <option value="Human Rights">Human Rights</option>
                <option value="Free Expression & Media Law">Free Expression & Media Law</option>
                <option value="Civil Procedure">Civil Procedure</option>
                <option value="Land Law">Land Law</option>
                <option value="Contracts">Contracts</option>
              </select>

              <span className="text-slate-400 ml-2">Court:</span>
              <select
                value={selectedCourt}
                onChange={(e) => setSelectedCourt(e.target.value)}
                className="bg-[#090f1e] border border-white/10 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none"
              >
                <option value="All">All Courts</option>
                <option value="Supreme Court">Supreme Court of Uganda</option>
                <option value="Court of Appeal">Court of Appeal / Constitutional Court</option>
                <option value="High Court">High Court of Uganda</option>
              </select>
            </div>

            <span className="text-slate-400">
              Showing <strong>{filteredCases.length}</strong> Landmark Decisions
            </span>
          </div>

          <div className="space-y-4">
            {filteredCases.map((cs) => (
              <div
                key={cs.id}
                className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 space-y-4 transition shadow-lg backdrop-blur-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold text-[#c89d42] bg-white/[0.05] px-2.5 py-0.5 rounded border border-[#c89d42]/30">
                        {cs.topic}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{cs.court}</span>
                      <span className="text-[10px] text-slate-400">• Year {cs.year}</span>
                    </div>
                    <h3 className="font-heading font-extrabold text-lg text-slate-100">
                      {cs.caseName}
                    </h3>
                    <p className="text-xs text-[#c89d42] font-mono mt-0.5">{cs.citation}</p>
                  </div>

                  <button
                    onClick={() => setSelectedCase(cs)}
                    className="px-4 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-[#050811] font-bold text-xs transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    <span>Full Judgment & Ratio</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 bg-black/30 rounded-2xl border border-white/10 space-y-1.5 text-xs backdrop-blur-sm">
                  <p className="font-bold text-[#c89d42]">Ratio Decidendi / Legal Holding:</p>
                  <p className="text-slate-200 leading-relaxed font-sans">{cs.ratioDecidendi}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1">
                  <span className="truncate">Coram: {cs.judges.join(', ')}</span>
                  <span>
                    Principles: {(cs.principlesApplied || cs.legalPrinciples || []).join(' • ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: LEGAL DICTIONARY */}
      {activeTab === 'dictionary' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDictTerms.map((term) => (
              <div
                key={term.id}
                className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 space-y-3 transition flex flex-col justify-between shadow-lg backdrop-blur-md"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-extrabold text-[#c89d42] uppercase tracking-wider bg-white/[0.05] px-2 py-0.5 rounded border border-[#c89d42]/30">
                    {term.category}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-slate-100">{term.term}</h3>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {term.definition}
                  </p>
                </div>

                <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-[11px] text-slate-400 space-y-1">
                  <p>
                    <strong className="text-slate-300">Plain English:</strong>{' '}
                    {term.simpleExplanation}
                  </p>
                  {term.statutoryRef && (
                    <p className="text-[#c89d42]">
                      <strong>Statute:</strong> {term.statutoryRef}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: BLACK'S LAW */}
      {activeTab === 'blacks' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBlacksTerms.map((bt) => (
              <div
                key={bt.id}
                className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 space-y-3 transition flex flex-col justify-between shadow-lg backdrop-blur-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[#c89d42] uppercase tracking-wider bg-white/[0.05] px-2 py-0.5 rounded border border-[#c89d42]/30">
                      {bt.category}
                    </span>
                    {bt.etymology && (
                      <span className="text-[10px] text-slate-400 italic">{bt.etymology}</span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-100">{bt.term}</h3>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">{bt.definition}</p>
                </div>

                <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-[11px] text-slate-300 space-y-1">
                  <p className="text-[#c89d42] font-semibold">Ugandan Context & Application:</p>
                  <p>{bt.ugandanApplication}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: RED VOLUME 1 (CIVIL) */}
      {activeTab === 'red_vol1' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRedVol1.map((rv) => (
              <div
                key={rv.id}
                className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 space-y-3 transition flex flex-col justify-between shadow-lg backdrop-blur-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#c89d42] bg-white/[0.05] px-2.5 py-0.5 rounded border border-[#c89d42]/30">
                      Volume 1 &bull; {rv.subject}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{rv.statutoryRef}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-100">{rv.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{rv.summary}</p>
                </div>

                <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-[11px] text-slate-400">
                  <p className="font-bold text-slate-300 mb-1">Key Procedural Rules:</p>
                  <p>{(rv.keyRules || rv.keyRulesOrForms || []).join(' • ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: RED VOLUME 2 (CRIMINAL) */}
      {activeTab === 'red_vol2' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRedVol2.map((rv) => (
              <div
                key={rv.id}
                className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 space-y-3 transition flex flex-col justify-between shadow-lg backdrop-blur-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#c89d42] bg-white/[0.05] px-2.5 py-0.5 rounded border border-[#c89d42]/30">
                      Volume 2 &bull; {rv.subject}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{rv.statutoryRef}</span>
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-100">{rv.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{rv.summary}</p>
                </div>

                <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-[11px] text-slate-400">
                  <p className="font-bold text-slate-300 mb-1">Key Procedural Rules:</p>
                  <p>{(rv.keyRules || rv.keyRulesOrForms || []).join(' • ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 10: LEGAL MAXIMS */}
      {activeTab === 'maxims' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMaxims.map((mx) => (
              <div
                key={mx.id}
                className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 space-y-3 transition flex flex-col justify-between shadow-lg backdrop-blur-md"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#c89d42] uppercase tracking-wider bg-white/[0.05] px-2 py-0.5 rounded border border-[#c89d42]/30">
                    Latin Maxim
                  </span>
                  <h3 className="font-serif italic font-bold text-lg text-slate-100">
                    "{mx.latinPhrase}"
                  </h3>
                  <p className="text-xs font-semibold text-[#c89d42]">{mx.englishTranslation}</p>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {mx.explanation}
                  </p>
                </div>

                <div className="p-3 bg-black/30 rounded-xl border border-white/10 text-[11px] text-slate-400">
                  <p className="font-bold text-slate-300">Underlying Principle:</p>
                  <p>{mx.legalPrinciple}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 11: RESOURCE GUIDES */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legalResourceGuides.map((rg) => (
              <div
                key={rg.id}
                className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-6 space-y-4 transition flex flex-col justify-between shadow-lg backdrop-blur-md"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#c89d42] uppercase tracking-wider bg-white/[0.05] px-2.5 py-0.5 rounded border border-[#c89d42]/30">
                    {rg.category}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-slate-100">{rg.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{rg.summary}</p>
                </div>

                <div className="p-3.5 bg-black/30 rounded-2xl border border-white/10 space-y-2 text-xs">
                  <p className="font-bold text-slate-200">Recommended Steps / Guides:</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {(rg.steps || []).map((step, sIdx) => (
                      <li key={sIdx}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CASE LAW PREVIEW MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#090f1e]/95 border border-white/10 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-white/10 pb-4">
              <span className="text-xs font-bold text-[#c89d42] bg-white/[0.05] px-3 py-1 rounded-full border border-[#c89d42]/30">
                {selectedCase.topic} • {selectedCase.court}
              </span>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-100">
                {selectedCase.caseName}
              </h2>
              <p className="text-xs font-mono text-[#c89d42]">{selectedCase.citation}</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-black/30 p-4 rounded-2xl border border-white/10 space-y-1.5">
                <h4 className="font-bold text-slate-200 text-sm">Facts of the Case:</h4>
                <p className="text-slate-300 leading-relaxed font-sans">{selectedCase.facts}</p>
              </div>

              <div className="bg-black/30 p-4 rounded-2xl border border-[#c89d42]/30 space-y-1.5">
                <h4 className="font-bold text-[#c89d42] text-sm">Ratio Decidendi:</h4>
                <p className="text-slate-200 leading-relaxed font-sans font-medium">
                  {selectedCase.ratioDecidendi}
                </p>
              </div>

              <div className="bg-black/30 p-4 rounded-2xl border border-white/10 space-y-1.5">
                <h4 className="font-bold text-slate-200 text-sm">Principles Applied:</h4>
                <p className="text-slate-300 font-sans">
                  {(selectedCase.principlesApplied || selectedCase.legalPrinciples || []).join(
                    ' • ',
                  )}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-5 py-2.5 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-[#050811] font-bold text-xs transition cursor-pointer active:scale-[0.98]"
              >
                Close preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
