import React, { useState, useEffect, useRef } from 'react';
import { useEditorStore } from '@/stores/editorStore';

export const TitleBar: React.FC = () => {
  const {
    filename, setFilename, autoSaveStatus, lastSavedAt,
    isPreviewMode, isMinimized, toggleMinimize, isFullscreen
  } = useEditorStore();
  const [editing, setEditing] = useState(false);
  const [editVal, setEditVal] = useState(filename);
  const [secondsAgo, setSecondsAgo] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const iv = setInterval(() => {
      if (lastSavedAt) setSecondsAgo(Math.floor((Date.now() - lastSavedAt.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(iv);
  }, [lastSavedAt]);

  useEffect(() => { if (editing && inputRef.current) inputRef.current.focus(); }, [editing]);

  const confirmRename = () => { setFilename(editVal || filename); setEditing(false); };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  };

  const handleClose = () => { if (confirm('Close editor? Unsaved changes may be lost.')) window.history.back(); };

  const dotColor = autoSaveStatus === 'saved' ? '#4ade80' : autoSaveStatus === 'saving' ? '#f59e0b' : '#ef4444';
  const statusText = autoSaveStatus === 'saved' ? `AUTO-SAVED · ${secondsAgo}s ago` : autoSaveStatus === 'saving' ? 'SAVING...' : 'UNSAVED';

  return (
    <div className="nx-titlebar">
      <div className="nx-titlebar-left">
        <span className="nx-star">★</span>
        <span className="nx-brand">GAMR NEXUS EDITOR</span>
        <span className="nx-version-badge">v4.0 NEXUS</span>
      </div>
      <div className="nx-titlebar-center">
        {editing ? (
          <input ref={inputRef} className="nx-filename-input" value={editVal}
            onChange={e => setEditVal(e.target.value)}
            onBlur={confirmRename} onKeyDown={e => e.key === 'Enter' && confirmRename()} />
        ) : (
          <span className="nx-filename" onClick={() => { setEditVal(filename); setEditing(true); }}>{filename}</span>
        )}
      </div>
      <div className="nx-titlebar-right">
        <div className="nx-autosave">
          <span className="nx-save-dot" style={{ background: dotColor, boxShadow: `0 0 6px ${dotColor}` }} />
          <span className="nx-save-text">{statusText}</span>
        </div>
        <span className="nx-mode-label">{isPreviewMode ? 'PREVIEW MODE' : 'EDIT MODE'}</span>
        <div className="nx-traffic">
          <button className="nx-dot nx-dot-red" title="Close" onClick={handleClose} />
          <button className="nx-dot nx-dot-yellow" title="Minimize" onClick={toggleMinimize} />
          <button className="nx-dot nx-dot-green" title="Fullscreen" onClick={handleFullscreen} />
        </div>
      </div>
    </div>
  );
};
