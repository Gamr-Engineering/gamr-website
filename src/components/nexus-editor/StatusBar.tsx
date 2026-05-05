import React from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { toast } from 'sonner';

export const StatusBar: React.FC = () => {
  const {
    wordCount, charCount, readingTimeMinutes, sentenceCount, paragraphCount,
    cursorLine, cursorCol, currentLanguage, setCurrentLanguage,
    spellcheckEnabled, toggleSpellcheck, zoom, setZoom
  } = useEditorStore();

  const cycleZoom = () => {
    const zooms = [75, 100, 125, 150];
    const idx = zooms.indexOf(zoom);
    setZoom(zooms[(idx + 1) % zooms.length]);
  };

  return (
    <div className="nx-statusbar">
      <div className="nx-status-left">
        <span className="nx-stat">📄 Words: {wordCount}</span>
        <span className="nx-stat">Chars: {charCount}</span>
        <span className="nx-stat">🕐 Read: {readingTimeMinutes < 1 ? '<1' : readingTimeMinutes} min</span>
        <span className="nx-stat">Sentences: {sentenceCount}</span>
        <span className="nx-stat">Paragraphs: {paragraphCount}</span>
      </div>
      <div className="nx-status-right">
        <span className="nx-stat">Ln {cursorLine}, Col {cursorCol}</span>
        <button className="nx-stat nx-stat-btn" onClick={() => {
          const langs = ['English (US)','English (UK)','French','Spanish','German'];
          const idx = langs.indexOf(currentLanguage);
          const next = langs[(idx + 1) % langs.length];
          setCurrentLanguage(next);
          toast.success(`Language: ${next}`);
        }}>{currentLanguage} ▾</button>
        <span className="nx-stat">UTF-8</span>
        <span className="nx-stat">LF</span>
        <button className={`nx-stat nx-stat-btn ${spellcheckEnabled ? 'nx-spell-on' : 'nx-spell-off'}`}
          onClick={toggleSpellcheck}>
          ⚡ Spellcheck {spellcheckEnabled ? 'ON' : 'OFF'}
        </button>
        <button className="nx-stat nx-stat-btn nx-zoom-stat" onClick={cycleZoom}>
          🔍 {zoom}%
        </button>
      </div>
    </div>
  );
};
