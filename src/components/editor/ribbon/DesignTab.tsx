import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import {
  Palette,
  Type,
  Paintbrush,
  SwatchBook,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DesignTabProps {
  editor: Editor;
  onThemeChange?: (theme: string) => void;
  onPaperColorChange?: (color: string) => void;
  paperColor: string;
}

interface ThemePreset {
  name: string;
  id: string;
  fontFamily: string;
  headingFont: string;
  accentColor: string;
  bgPreview: string;
  textPreview: string;
}

const THEMES: ThemePreset[] = [
  { name: 'Default', id: 'default', fontFamily: 'Inter', headingFont: 'Inter', accentColor: '#3b82f6', bgPreview: 'bg-gray-800', textPreview: 'text-white' },
  { name: 'Editorial', id: 'editorial', fontFamily: 'Georgia, serif', headingFont: 'Playfair Display', accentColor: '#d4a574', bgPreview: 'bg-amber-900/30', textPreview: 'text-amber-100' },
  { name: 'Modern', id: 'modern', fontFamily: 'Outfit', headingFont: 'Outfit', accentColor: '#8b5cf6', bgPreview: 'bg-violet-900/30', textPreview: 'text-violet-100' },
  { name: 'Minimal', id: 'minimal', fontFamily: 'system-ui', headingFont: 'system-ui', accentColor: '#64748b', bgPreview: 'bg-slate-800', textPreview: 'text-slate-100' },
  { name: 'Bold', id: 'bold', fontFamily: 'Roboto', headingFont: 'Roboto', accentColor: '#ef4444', bgPreview: 'bg-red-900/30', textPreview: 'text-red-100' },
  { name: 'Elegant', id: 'elegant', fontFamily: 'Playfair Display', headingFont: 'Playfair Display', accentColor: '#a78bfa', bgPreview: 'bg-purple-900/30', textPreview: 'text-purple-100' },
  { name: 'Tech', id: 'tech', fontFamily: 'ui-monospace, monospace', headingFont: 'ui-monospace, monospace', accentColor: '#10b981', bgPreview: 'bg-emerald-900/30', textPreview: 'text-emerald-100' },
  { name: 'Classic', id: 'classic', fontFamily: 'Georgia, serif', headingFont: 'Georgia, serif', accentColor: '#78716c', bgPreview: 'bg-stone-800', textPreview: 'text-stone-100' },
];

const PAPER_COLORS = [
  { name: 'Pure Black', value: '#000000' },
  { name: 'Dark Gray', value: '#0a0a0a' },
  { name: 'Charcoal', value: '#111111' },
  { name: 'Slate', value: '#0f172a' },
  { name: 'Navy', value: '#0c1222' },
  { name: 'Deep Purple', value: '#0d0a1a' },
  { name: 'Warm Dark', value: '#1a1410' },
  { name: 'Sepia', value: '#1c1a14' },
];

const PARAGRAPH_SPACINGS = [
  { name: 'Compact', value: 'compact' },
  { name: 'Normal', value: 'normal' },
  { name: 'Relaxed', value: 'relaxed' },
  { name: 'Spacious', value: 'spacious' },
];

const DesignTab: React.FC<DesignTabProps> = ({ editor, onThemeChange, onPaperColorChange, paperColor }) => {
  const [activeTheme, setActiveTheme] = useState('default');
  const [activeSpacing, setActiveSpacing] = useState('normal');

  const applyTheme = (theme: ThemePreset) => {
    setActiveTheme(theme.id);
    editor.chain().focus().selectAll().setFontFamily(theme.fontFamily).run();
    onThemeChange?.(theme.id);
  };

  return (
    <div className="flex items-stretch gap-0 px-2 py-1.5 overflow-x-auto no-scrollbar">
      {/* ── Document Formatting / Themes ── */}
      <div className="ribbon-group flex-grow">
        <div className="ribbon-group-content">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                type="button"
                onClick={() => applyTheme(theme)}
                className={`shrink-0 flex flex-col items-center gap-1 p-1.5 rounded-lg border transition-all min-w-[64px] ${
                  activeTheme === theme.id
                    ? 'border-blue-500/50 bg-blue-500/10 ring-1 ring-blue-500/20'
                    : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10'
                }`}
              >
                <div className={`w-14 h-8 rounded ${theme.bgPreview} flex items-center justify-center border border-white/5`}>
                  <div className="text-center">
                    <div className={`text-[7px] font-bold ${theme.textPreview}`} style={{ fontFamily: theme.headingFont }}>Title</div>
                    <div className={`text-[5px] ${theme.textPreview} opacity-60`} style={{ fontFamily: theme.fontFamily }}>Body text</div>
                  </div>
                </div>
                <span className="text-[8px] text-gray-400 font-semibold">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
        <span className="ribbon-group-label">Document Formatting</span>
      </div>

      <div className="w-px bg-white/[0.06] mx-1 self-stretch" />

      {/* ── Page Background ── */}
      <div className="ribbon-group">
        <div className="ribbon-group-content gap-1">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">Paper</span>
            <div className="flex items-center gap-1">
              {PAPER_COLORS.map((pc) => (
                <button
                  key={pc.value}
                  type="button"
                  onClick={() => onPaperColorChange?.(pc.value)}
                  title={pc.name}
                  className={`w-5 h-5 rounded-sm border transition-all ${
                    paperColor === pc.value
                      ? 'border-blue-500 ring-1 ring-blue-500/40 scale-110'
                      : 'border-white/10 hover:border-white/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: pc.value }}
                />
              ))}
            </div>
          </div>
        </div>
        <span className="ribbon-group-label">Page Background</span>
      </div>

      <div className="w-px bg-white/[0.06] mx-1 self-stretch" />

      {/* ── Paragraph Spacing ── */}
      <div className="ribbon-group">
        <div className="ribbon-group-content gap-1">
          <div className="flex items-center gap-1">
            {PARAGRAPH_SPACINGS.map((sp) => (
              <button
                key={sp.value}
                type="button"
                onClick={() => setActiveSpacing(sp.value)}
                className={`px-2.5 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all border whitespace-nowrap ${
                  activeSpacing === sp.value
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    : 'bg-white/[0.03] text-gray-500 border-white/[0.06] hover:bg-white/[0.06] hover:text-gray-300'
                }`}
              >
                {sp.name}
              </button>
            ))}
          </div>
        </div>
        <span className="ribbon-group-label">Paragraph Spacing</span>
      </div>
    </div>
  );
};

export default DesignTab;
