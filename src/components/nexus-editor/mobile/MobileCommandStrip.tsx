import React from 'react';
import { Editor } from '@tiptap/react';

interface Props {
  editor: Editor | null;
  onOpenInsert: () => void;
  onOpenAI: () => void;
  onOpenOutline: () => void;
  onOpenStyle: () => void;
  onOpenPublish: () => void;
}

export const MobileCommandStrip: React.FC<Props> = ({
  editor, onOpenInsert, onOpenAI, onOpenOutline, onOpenStyle, onOpenPublish
}) => {
  return (
    <div className="nxm-command-strip">
      {/* Undo */}
      <button className="nxm-cmd-btn" onClick={() => editor?.chain().focus().undo().run()} style={{ touchAction: 'manipulation' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 10h13a4 4 0 0 1 0 8H7"/><path d="M3 10l4-4M3 10l4 4"/></svg>
        <span className="nxm-cmd-label">Undo</span>
      </button>

      {/* Redo */}
      <button className="nxm-cmd-btn" onClick={() => editor?.chain().focus().redo().run()} style={{ touchAction: 'manipulation' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10H8a4 4 0 0 0 0 8h10"/><path d="M21 10l-4-4M21 10l-4 4"/></svg>
        <span className="nxm-cmd-label">Redo</span>
      </button>

      {/* Insert */}
      <button className="nxm-cmd-btn" onClick={onOpenInsert} style={{ touchAction: 'manipulation' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
        <span className="nxm-cmd-label">Insert</span>
      </button>

      {/* AI — Hero button */}
      <button className="nxm-cmd-btn nxm-cmd-ai" onClick={onOpenAI} style={{ touchAction: 'manipulation' }}>
        <span className="nxm-cmd-ai-icon">✦</span>
        <span className="nxm-cmd-label nxm-cmd-ai-label">AI</span>
      </button>

      {/* Outline */}
      <button className="nxm-cmd-btn" onClick={onOpenOutline} style={{ touchAction: 'manipulation' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        <span className="nxm-cmd-label">Outline</span>
      </button>

      {/* Style */}
      <button className="nxm-cmd-btn" onClick={onOpenStyle} style={{ touchAction: 'manipulation' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="13.5" cy="17.5" r="2.5"/><circle cx="20" cy="10" r="2.5"/></svg>
        <span className="nxm-cmd-label">Style</span>
      </button>

      {/* Publish */}
      <button className="nxm-cmd-btn" onClick={onOpenPublish} style={{ touchAction: 'manipulation' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
        <span className="nxm-cmd-label">Publish</span>
      </button>
    </div>
  );
};
