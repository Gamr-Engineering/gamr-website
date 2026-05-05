import React, { useState } from 'react';
import { useEditorStore } from '@/stores/editorStore';

export const LeftSidebar: React.FC = () => {
  const { leftSidebarVisible, bookmarks, removeBookmark, wordGoal, setWordGoal, wordCount } = useEditorStore();
  const [outlineOpen, setOutlineOpen] = useState(true);
  const [bookmarksOpen, setBookmarksOpen] = useState(true);
  const [versionsOpen, setVersionsOpen] = useState(false);
  const [goalsOpen, setGoalsOpen] = useState(true);

  if (!leftSidebarVisible) return null;

  const outlineItems = [
    { level: 1, label: 'Introduction', active: true },
    { level: 2, label: '1.1 Background', active: false },
    { level: 2, label: '1.2 Objectives', active: false },
    { level: 1, label: 'Methodology', active: false },
    { level: 2, label: '2.1 Approach', active: false },
    { level: 2, label: '2.2 Tools Used', active: false },
    { level: 1, label: 'Results', active: false },
    { level: 1, label: 'Conclusion', active: false },
  ];

  const progress = Math.min(100, (wordCount / wordGoal) * 100);
  const progressColor = progress < 40 ? '#ef4444' : progress < 75 ? '#f59e0b' : '#4ade80';

  return (
    <div className="nx-sidebar nx-sidebar-left">
      {/* OUTLINE */}
      <div className="nx-sb-section">
        <button className="nx-sb-header" onClick={() => setOutlineOpen(!outlineOpen)}>
          <span>{outlineOpen ? '▾' : '▸'} OUTLINE</span>
        </button>
        {outlineOpen && (
          <div className="nx-sb-content">
            {outlineItems.map((item, i) => (
              <div key={i}
                className={`nx-outline-item ${item.active ? 'nx-outline-active' : ''}`}
                style={{ paddingLeft: item.level === 1 ? 8 : item.level === 2 ? 20 : 32 }}
              >
                {item.level === 1 ? '§ ' : ''}{item.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOOKMARKS */}
      <div className="nx-sb-section">
        <button className="nx-sb-header" onClick={() => setBookmarksOpen(!bookmarksOpen)}>
          <span>{bookmarksOpen ? '▾' : '▸'} BOOKMARKS</span>
        </button>
        {bookmarksOpen && (
          <div className="nx-sb-content">
            {bookmarks.map(b => (
              <div key={b.id} className="nx-bookmark-item" onContextMenu={e => { e.preventDefault(); if (confirm(`Delete "${b.label}"?`)) removeBookmark(b.id); }}>
                <span className="nx-bk-icon">🔖</span> {b.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* VERSIONS */}
      <div className="nx-sb-section">
        <button className="nx-sb-header" onClick={() => setVersionsOpen(!versionsOpen)}>
          <span>{versionsOpen ? '▾' : '▸'} VERSIONS</span>
        </button>
        {versionsOpen && (
          <div className="nx-sb-content">
            <div className="nx-version-empty">No versions saved yet</div>
          </div>
        )}
      </div>

      {/* WORD GOALS */}
      <div className="nx-sb-section">
        <button className="nx-sb-header" onClick={() => setGoalsOpen(!goalsOpen)}>
          <span>{goalsOpen ? '▾' : '▸'} WORD GOALS</span>
        </button>
        {goalsOpen && (
          <div className="nx-sb-content">
            <input type="number" className="nx-goal-input" value={wordGoal}
              onChange={e => setWordGoal(Number(e.target.value) || 1000)} />
            <div className="nx-progress-bar">
              <div className="nx-progress-fill" style={{ width: `${progress}%`, background: progressColor }} />
            </div>
            <div className="nx-progress-text">{wordCount} / {wordGoal}</div>
          </div>
        )}
      </div>
    </div>
  );
};
