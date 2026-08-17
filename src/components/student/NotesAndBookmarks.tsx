// ─────────────────────────────────────────────────────────────
// LawHub Uganda — Student Component: NotesAndBookmarks
// Student personal legal notebook and case repository bookmarks.
// ─────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { WatermarkBackground } from '../common/WatermarkBackground';
import {
  Bookmark,
  Plus,
  Search,
  Trash2,
  FileText,
  Download,
  Sparkles,
  Check,
  X,
} from 'lucide-react';
import { SavedNote } from '../../types';

export interface NotesAndBookmarksProps {
  notes: SavedNote[];
  onAddNote: (note: SavedNote) => void;
  onDeleteNote: (id: string) => void;
}

export function NotesAndBookmarks({
  notes,
  onAddNote,
  onDeleteNote,
}: NotesAndBookmarksProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Land Law');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('S.39, Spousal Consent');

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const note: SavedNote = {
      id: `note_${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      content: newContent.trim(),
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    onAddNote(note);
    setNewTitle('');
    setNewContent('');
    setShowAddModal(false);
  };

  return (
    <div className="relative space-y-6 sm:space-y-8 pb-12 text-slate-100">
      <WatermarkBackground
        type="books"
        opacity={0.16}
        blendMode="normal"
        withVignette={false}
        withGradientOverlay={false}
      />

      {/* Header Bar */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-[#c89d42]">
                <Bookmark className="w-5 h-5" />
              </span>
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-100">
                Personal Legal Notebook & Bookmarks
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Store custom case briefs, ratio summaries, statutory memos, and examination checklists.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-[#050811] font-bold text-xs transition flex items-center gap-1.5 self-start sm:self-auto shadow-md cursor-pointer active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Create legal note</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 text-[#c89d42] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved notes, legal keywords, or subject categories..."
            className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#c89d42] backdrop-blur-md"
          />
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-slate-950/40 border border-white/10 hover:border-[#c89d42]/40 rounded-3xl p-5 sm:p-6 space-y-4 transition shadow-lg flex flex-col justify-between backdrop-blur-md hover:bg-slate-900/50"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/[0.05] text-[#c89d42] border border-[#c89d42]/30 uppercase">
                  {note.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{note.createdAt}</span>
              </div>

              <h3 className="font-heading font-bold text-sm sm:text-base text-slate-100">
                {note.title}
              </h3>
              <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                {note.content}
              </p>

              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {note.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-black/40 text-slate-300 px-2 py-0.5 rounded-md border border-white/10 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <a
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                  `${note.title}\nCategory: ${note.category}\nDate: ${note.createdAt}\n\n${note.content}`,
                )}`}
                download={`${note.title.replace(/\s+/g, '_')}.txt`}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 transition"
              >
                <Download className="w-3.5 h-3.5 text-[#c89d42]" /> Download note
              </a>

              <button
                onClick={() => onDeleteNote(note.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 transition cursor-pointer"
                title="Delete Note"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- CREATE NOTE MODAL ---------------- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#090f1e]/95 border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl relative backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-heading font-extrabold text-xl text-slate-100">
              Create New Legal Note
            </h2>

            <form onSubmit={handleCreateNote} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Note Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Ratio of Obbo & Mwenda v AG (2004)"
                  className="w-full bg-[#090f1e] border border-white/10 text-slate-100 rounded-xl p-2.5 focus:outline-none focus:border-[#c89d42]"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Subject Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-[#090f1e] border border-white/10 text-slate-200 rounded-xl p-2.5 focus:outline-none"
                >
                  <option value="Constitutional Law">Constitutional Law</option>
                  <option value="Law of Contract">Law of Contract</option>
                  <option value="Land Law">Land Law</option>
                  <option value="Criminal Law">Criminal Law</option>
                  <option value="Civil Procedure">Civil Procedure (LDC)</option>
                  <option value="Commercial Law">Commercial Law</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Legal Analysis & Memo *</label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Enter legal points, statutory sections, and judicial holdings..."
                  className="w-full bg-[#090f1e] border border-white/10 text-slate-100 rounded-xl p-2.5 focus:outline-none focus:border-[#c89d42] leading-relaxed"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Article 29, Supreme Court, Freedom of Speech"
                  className="w-full bg-[#090f1e] border border-white/10 text-slate-100 rounded-xl p-2.5 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-slate-300 font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-[#050811] font-bold transition cursor-pointer active:scale-[0.98]"
                >
                  Save note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
