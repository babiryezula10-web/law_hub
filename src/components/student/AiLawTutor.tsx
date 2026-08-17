// ─────────────────────────────────────────────────────────────
// LawHub Uganda — Student Component: AiLawTutor
// Gemini-powered legal reasoning tutor with IRAC structuring,
// citation integrity checks, and educational disclaimers.
// ─────────────────────────────────────────────────────────────

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  User,
  Copy,
  Check,
  RotateCcw,
  Scale,
  GraduationCap,
} from 'lucide-react';
import { ChatMessage, UserRole } from '../../types';
import { WatermarkBackground } from '../common/WatermarkBackground';
import { EducationalDisclaimer } from '../common/EducationalDisclaimer';
import { askAiTutor } from '../../services/api';
import { sanitizeInput } from '../../utils/validators';

export interface AiLawTutorProps {
  userRole: UserRole;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export function AiLawTutor({
  userRole,
  initialPrompt,
  onClearInitialPrompt,
}: AiLawTutorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_001',
      sender: 'ai',
      text: `Greetings! I am the LawHub AI Legal Tutor, your specialized research and reasoning assistant for Ugandan law.\n\nI am configured with verified knowledge of the 1995 Constitution of Uganda, Acts of Parliament, landmark High Court, Court of Appeal, and Supreme Court judgments, and the LLB and Bar Course curricula.\n\nHow may I assist your legal study today?\n• Statutory interpretation (e.g. S.10 Contracts Act 2010, S.39 Land Act)\n• Landmark case law ratios (e.g. Grace Ibingira, Tinyefuza, Obbo & Mwenda)\n• Structured IRAC legal answers (Issue, Rule, Application, Conclusion)\n• Legal drafting principles and civil/criminal procedure`,
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('Constitutional Law');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendPrompt(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSendPrompt = async (textToSend: string) => {
    const cleanText = textToSend.trim();
    if (!cleanText || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: sanitizeInput(cleanText),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askAiTutor({
        prompt: cleanText,
        courseContext: selectedCourse,
        role: userRole,
      });

      if (response.data?.reply) {
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: response.data.reply,
          timestamp: 'Just now',
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        const errorMsg: ChatMessage = {
          id: `err_${Date.now()}`,
          sender: 'ai',
          text: `⚠️ ${
            response.error ||
            'Unable to generate response. Please ensure GEMINI_API_KEY is configured in your server environment.'
          }`,
          timestamp: 'Just now',
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        sender: 'ai',
        text: '⚠️ Network connectivity error. Please check your connection to the LawHub server.',
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'msg_init',
        sender: 'ai',
        text: `Chat session reset. Ready for your next Ugandan law query in ${selectedCourse}.`,
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="relative h-[calc(100vh-6.5rem)] flex flex-col max-w-5xl mx-auto text-slate-100 pb-2">
      <WatermarkBackground
        type="ai_balance"
        opacity={0.15}
        blendMode="normal"
        withVignette={false}
        withGradientOverlay={false}
      />

      {/* Header bar */}
      <div className="relative z-10 bg-[#121216]/80 border border-white/10 rounded-2xl p-4 mb-3 flex flex-wrap items-center justify-between gap-3 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#c89d42]/15 border border-[#c89d42]/30 flex items-center justify-center text-[#c89d42]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-base sm:text-lg text-slate-100 flex items-center gap-2">
              LawHub AI Legal Tutor
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/[0.05] text-[#c89d42] border border-[#c89d42]/30">
                IRAC Engine
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              Ugandan statutory interpretation, case law reasoning & examination coaching
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#c89d42] cursor-pointer"
          >
            <option value="Constitutional Law">Constitutional Law</option>
            <option value="Law of Contract">Law of Contract</option>
            <option value="Land Law">Land Law</option>
            <option value="Criminal Law">Criminal Law</option>
            <option value="Civil Procedure">Civil Procedure</option>
            <option value="Commercial Law">Commercial Law</option>
            <option value="Administrative Law">Administrative Law</option>
            <option value="Family Law">Family Law</option>
          </select>

          <button
            onClick={handleResetChat}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-slate-200 border border-white/10 transition cursor-pointer"
            title="Reset Chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Educational Notice Banner */}
      <div className="relative z-10 mb-3">
        <EducationalDisclaimer
          variant="compact"
          customText="AI Tutor generates educational explanations citing Ugandan statutory authorities and landmark precedents under Article 126. Always cross-reference with official law reports on ULII."
        />
      </div>

      {/* Chat Messages Area */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 bg-[#121216]/60 border border-white/10 rounded-3xl space-y-4 shadow-xl backdrop-blur-xl custom-scrollbar">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                isAi ? 'justify-start' : 'justify-end'
              }`}
            >
              {isAi && (
                <div className="w-8 h-8 rounded-xl bg-[#c89d42]/15 border border-[#c89d42]/30 flex items-center justify-center text-[#c89d42] shrink-0 mt-1">
                  <Scale className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 text-xs sm:text-sm leading-relaxed ${
                  isAi
                    ? 'bg-[#14141a]/90 border border-white/10 text-slate-200 shadow-md'
                    : 'bg-[#c89d42] text-[#050811] font-medium shadow-md'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                <div
                  className={`flex items-center justify-between pt-2 border-t text-[10px] ${
                    isAi
                      ? 'border-white/10 text-slate-400'
                      : 'border-[#050811]/15 text-[#050811]/70'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {isAi && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="flex items-center gap-1 hover:text-[#c89d42] transition cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy analysis</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {!isAi && (
                <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3 justify-start">
            <div className="w-8 h-8 rounded-xl bg-[#c89d42]/15 border border-[#c89d42]/30 flex items-center justify-center text-[#c89d42] shrink-0 animate-pulse">
              <Scale className="w-4 h-4" />
            </div>
            <div className="bg-[#14141a]/90 border border-white/10 rounded-2xl p-4 text-xs text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c89d42] animate-ping" />
              <span>Analyzing Ugandan legal authorities & precedents...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendPrompt(input);
        }}
        className="relative z-10 mt-3 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI Law Tutor (e.g. 'Explain Section 10 of Contracts Act 2010 using IRAC method')..."
          className="flex-1 bg-[#121216]/90 border border-white/10 rounded-2xl px-4 sm:px-5 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#c89d42] shadow-xl backdrop-blur-xl"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-3 sm:px-5 sm:py-3 rounded-2xl bg-[#c89d42] hover:bg-[#dfb858] disabled:opacity-40 disabled:cursor-not-allowed text-[#050811] font-heading font-extrabold text-xs transition shadow-xl flex items-center gap-2 cursor-pointer shrink-0 active:scale-[0.98]"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send prompt</span>
        </button>
      </form>
    </div>
  );
}
