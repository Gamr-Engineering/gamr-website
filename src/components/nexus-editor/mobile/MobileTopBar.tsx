import React, { useState, useEffect } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { BottomSheet } from './BottomSheet';
import { toast } from 'sonner';

export const MobileTopBar: React.FC<{
  onOpenMore: () => void;
}> = ({ onOpenMore }) => {
  const {
    filename, setFilename, autoSaveStatus, lastSavedAt,
    isPreviewMode, setIsPreviewMode
  } = useEditorStore();

  const [secondsAgo, setSecondsAgo] = useState(0);
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameVal, setRenameVal] = useState(filename);

  useEffect(() => {
    const iv = setInterval(() => {
      if (lastSavedAt) setSecondsAgo(Math.floor((Date.now() - lastSavedAt.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(iv);
  }, [lastSavedAt]);

  const dotColor = autoSaveStatus === 'saved' ? '#4ade80' : autoSaveStatus === 'saving' ? '#f59e0b' : '#ef4444';

  const handleBack = () => {
    if (confirm('Discard changes?')) window.history.back();
  };

  const confirmRename = () => {
    setFilename(renameVal || filename);
    setRenameOpen(false);
  };

  return (
    <>
      <div className="nxm-topbar">
        <div className="nxm-topbar-left">
          <button className="nxm-topbar-btn" onClick={handleBack} aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <div className="nxm-topbar-sep" />
          <span className="nxm-topbar-star">✦</span>
          <span className="nxm-topbar-brand">GAMR</span>
          <span
            className="nxm-topbar-savedot"
            style={{ background: dotColor, boxShadow: `0 0 6px ${dotColor}` }}
            title={autoSaveStatus === 'saved' ? `Saved ${secondsAgo}s ago` : autoSaveStatus === 'saving' ? 'Saving...' : 'Unsaved'}
          />
        </div>

        <button className="nxm-topbar-filename" onClick={() => { setRenameVal(filename); setRenameOpen(true); }}>
          {filename}
        </button>

        <div className="nxm-topbar-right">
          <button
            className={`nxm-topbar-btn ${isPreviewMode ? 'nxm-topbar-btn-active' : ''}`}
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            aria-label="Preview"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button className="nxm-topbar-btn" onClick={onOpenMore} aria-label="More options">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
          </button>
        </div>
      </div>

      {/* Rename bottom sheet */}
      <BottomSheet isOpen={renameOpen} onClose={() => setRenameOpen(false)} height="auto" title="Rename Document">
        <div className="nxm-rename-sheet">
          <input
            className="nxm-rename-input"
            value={renameVal}
            onChange={e => setRenameVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && confirmRename()}
            autoFocus
          />
          <button className="nxm-rename-confirm" onClick={confirmRename}>Rename</button>
        </div>
      </BottomSheet>
    </>
  );
};
