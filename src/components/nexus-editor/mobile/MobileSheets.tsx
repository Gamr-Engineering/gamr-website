import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { useEditorStore } from '@/stores/editorStore';
import { toast } from 'sonner';

/* ═══════════════════════════════════════════
   OUTLINE SHEET
   ═══════════════════════════════════════════ */
export const OutlineSheetContent: React.FC<{ editor: Editor | null; onClose: () => void }> = ({ editor, onClose }) => {
  const { bookmarks, removeBookmark, addBookmark, wordGoal, setWordGoal, wordCount } = useEditorStore();
  const [outlineOpen, setOutlineOpen] = useState(true);
  const [bookmarksOpen, setBookmarksOpen] = useState(true);
  const [versionsOpen, setVersionsOpen] = useState(false);
  const [goalsOpen, setGoalsOpen] = useState(true);

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
  const circumference = 2 * Math.PI * 34;

  return (
    <div className="nxm-sheet-sections">
      <div className="nxm-section">
        <button className="nxm-section-header" onClick={() => setOutlineOpen(!outlineOpen)}>
          <span>{outlineOpen ? '▾' : '▸'} OUTLINE</span>
        </button>
        {outlineOpen && (
          <div className="nxm-section-body">
            {outlineItems.map((item, i) => (
              <button key={i} className={`nxm-outline-row ${item.active ? 'nxm-outline-active' : ''}`}
                style={{ paddingLeft: item.level === 1 ? 12 : 24 }}
                onClick={() => { toast.info(`Scrolling to: ${item.label}`); onClose(); }}>
                {item.level === 1 ? '§ ' : ''}{item.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="nxm-section">
        <button className="nxm-section-header" onClick={() => setBookmarksOpen(!bookmarksOpen)}>
          <span>{bookmarksOpen ? '▾' : '▸'} BOOKMARKS</span>
        </button>
        {bookmarksOpen && (
          <div className="nxm-section-body">
            {bookmarks.map(b => (
              <div key={b.id} className="nxm-bookmark-row">
                <span>🔖 {b.label}</span>
                <button className="nxm-bk-delete" onClick={() => removeBookmark(b.id)}>✕</button>
              </div>
            ))}
            <button className="nxm-add-bookmark" onClick={() => {
              const label = prompt('Bookmark name:');
              if (label && editor) {
                addBookmark({ id: Date.now().toString(), label, position: editor.state.selection.from });
                toast.success(`Bookmark "${label}" added`);
              }
            }}>+ Add Bookmark</button>
          </div>
        )}
      </div>
      <div className="nxm-section">
        <button className="nxm-section-header" onClick={() => setVersionsOpen(!versionsOpen)}>
          <span>{versionsOpen ? '▾' : '▸'} VERSIONS</span>
        </button>
        {versionsOpen && <div className="nxm-section-body"><p className="nxm-muted-text">No versions saved yet</p></div>}
      </div>
      <div className="nxm-section">
        <button className="nxm-section-header" onClick={() => setGoalsOpen(!goalsOpen)}>
          <span>{goalsOpen ? '▾' : '▸'} WORD GOAL</span>
        </button>
        {goalsOpen && (
          <div className="nxm-section-body" style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <svg width="88" height="88" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="#1e1e38" strokeWidth="5" />
              <circle cx="40" cy="40" r="34" fill="none" stroke={progressColor} strokeWidth="5"
                strokeDasharray={circumference} strokeDashoffset={circumference - (progress / 100) * circumference}
                strokeLinecap="round" transform="rotate(-90 40 40)" style={{ transition: 'stroke-dashoffset 0.5s' }} />
              <text x="40" y="37" textAnchor="middle" fill="#d0d0e8" fontSize="11" fontWeight="700">{wordCount}</text>
              <text x="40" y="49" textAnchor="middle" fill="#555570" fontSize="8">/ {wordGoal}</text>
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="nxm-muted-text">Goal:</span>
              <input type="number" className="nxm-goal-input" value={wordGoal} onChange={e => setWordGoal(Number(e.target.value) || 1000)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   INSERT SHEET — matches Screen 3 reference
   ═══════════════════════════════════════════ */
const InsertIcon: React.FC<{ d: string }> = ({ d }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b7cf7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

export const InsertSheetContent: React.FC<{ editor: Editor | null; onClose: () => void }> = ({ editor, onClose }) => {
  const items = [
    { icon: <InsertIcon d="M4 5h16M4 9h16M4 14h10M4 18h7" />, label: 'Image', action: () => { const input = document.createElement('input'); input.type='file'; input.accept='image/*'; input.onchange = () => { if (input.files?.[0]) { const r = new FileReader(); r.onload = () => { editor?.chain().focus().setImage({ src: r.result as string }).run(); onClose(); }; r.readAsDataURL(input.files[0]); }}; input.click(); }},
    { icon: <InsertIcon d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" />, label: 'Table', action: () => { editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); onClose(); }},
    { icon: <InsertIcon d="M15.6 11.6L22 7v10l-6.4-4.6M2 6h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />, label: 'Video', action: () => { const url = prompt('YouTube URL:'); if (url) { editor?.chain().focus().setYoutubeVideo({ src: url }).run(); onClose(); }}},
    { icon: <InsertIcon d="M16 18l6-6-6-6M8 6l-6 6 6 6" />, label: 'Code', action: () => { editor?.chain().focus().toggleCodeBlock().run(); onClose(); }},
    { icon: <InsertIcon d="M6 4v16M10 4H4.5C4.5 4 3 4 3 5.5S4.5 7 4.5 7H9M10 12H5.5C5.5 12 4 12 4 13.5S5.5 15 5.5 15H9" />, label: 'Quote', action: () => { editor?.chain().focus().toggleBlockquote().run(); onClose(); }},
    { icon: <InsertIcon d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />, label: 'Link', action: () => { const url = prompt('Enter URL:'); if (url) { editor?.chain().focus().setLink({ href: url }).run(); onClose(); }}},
    { icon: <InsertIcon d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />, label: 'List', action: () => { editor?.chain().focus().toggleBulletList().run(); onClose(); }},
    { icon: <InsertIcon d="M5 12h14" />, label: 'Divider', action: () => { editor?.chain().focus().setHorizontalRule().run(); onClose(); }},
    { icon: <InsertIcon d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />, label: 'Checklist', action: () => { editor?.chain().focus().toggleTaskList().run(); onClose(); }},
    { icon: <InsertIcon d="M5 3l14 9-14 9V3z" />, label: 'YouTube', action: () => { const url = prompt('YouTube URL:'); if (url) { editor?.chain().focus().setYoutubeVideo({ src: url }).run(); onClose(); }}},
    { icon: <InsertIcon d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4" />, label: 'Columns', action: () => { toast.info('Columns — Coming soon'); onClose(); }},
    { icon: <InsertIcon d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />, label: 'Equation', action: () => { toast.info('Equation — Coming soon'); onClose(); }},
  ];

  return (
    <div>
      <div className="nxm-insert-grid">
        {items.map((item, i) => (
          <button key={i} className="nxm-insert-card" onClick={item.action}>
            <span className="nxm-insert-icon">{item.icon}</span>
            <span className="nxm-insert-label">{item.label}</span>
          </button>
        ))}
      </div>
      <button className="nxm-more-options-row" onClick={() => toast.info('More insert options — Coming soon')}>
        ··· More options ›
      </button>
    </div>
  );
};

/* ═══════════════════════════════════════════
   AI COPILOT SHEET — matches Screen 2 reference
   ═══════════════════════════════════════════ */
export const AICopilotSheetContent: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  const { aiCopilotTone, setAiCopilotTone, readabilityScore, seoScore, grammarScore, gradeLevel } = useEditorStore();
  const [prompt, setPrompt] = useState('');

  const scoreColor = (s: number) => s >= 70 ? '#4ade80' : s >= 40 ? '#f59e0b' : '#ef4444';

  const aiAction = (action: string) => {
    toast.info(`AI ${action}: Processing...`);
    setTimeout(() => {
      if (action === 'write for me' || action === 'write') {
        editor?.chain().focus().insertContent('In the rapidly evolving landscape of gaming and esports, Africa stands at the forefront of a digital revolution that promises to reshape entertainment and community building across the continent.').run();
      }
      toast.success(`AI ${action} complete`);
    }, 1500);
  };

  const tones = ['Pro', 'Casual', 'Bold', 'Warm', 'Witty', 'Epic'];

  return (
    <div className="nxm-ai-content">
      <div className="nxm-ai-prompt-wrap">
        <input className="nxm-ai-prompt" value={prompt} onChange={e => setPrompt(e.target.value)}
          placeholder="Tell AI what to do..." onKeyDown={e => { if (e.key === 'Enter' && prompt) { aiAction(prompt); setPrompt(''); }}} />
        <button className="nxm-ai-send" onClick={() => { if (prompt) { aiAction(prompt); setPrompt(''); }}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>

      <div className="nxm-ai-section-label">GENERATE</div>
      <div className="nxm-ai-btn-grid">
        {['Write for Me', 'Continue', 'Outline', 'Summarize'].map(a => (
          <button key={a} className="nxm-ai-gen-btn" onClick={() => aiAction(a.toLowerCase())}>✦ {a}</button>
        ))}
      </div>

      <div className="nxm-ai-section-label">TRANSFORM</div>
      <div className="nxm-ai-btn-grid">
        {['Expand', 'Shorten', 'Rewrite', 'Simplify', 'Formalize', 'Humanize'].map(a => (
          <button key={a} className="nxm-ai-transform-btn" onClick={() => aiAction(a.toLowerCase())}>{a}</button>
        ))}
      </div>

      <div className="nxm-ai-section-label">TONE SHIFT</div>
      <div className="nxm-ai-tone-wrap">
        {tones.map(t => (
          <button key={t} className={`nxm-ai-tone-btn ${aiCopilotTone === t.toLowerCase() ? 'nxm-ai-tone-active' : ''}`}
            onClick={() => setAiCopilotTone(t.toLowerCase() as any)}>{t}</button>
        ))}
      </div>

      <div className="nxm-ai-section-label">ANALYZE</div>
      <div className="nxm-ai-btn-grid">
        {['Readability', 'SEO Score', 'Grammar', 'Plagiarism'].map(a => (
          <button key={a} className="nxm-ai-transform-btn" onClick={() => toast.info(`${a} analysis running...`)}>{a}</button>
        ))}
      </div>

      <div className="nxm-ai-section-label">LIVE SCORES</div>
      <div className="nxm-ai-scores">
        {[{ label: 'Readability', score: readabilityScore }, { label: 'SEO', score: seoScore }, { label: 'Grammar', score: grammarScore }].map(s => (
          <div key={s.label} className="nxm-score-row">
            <span className="nxm-score-label">{s.label}</span>
            <div className="nxm-score-bar"><div className="nxm-score-fill" style={{ width: `${s.score}%`, background: scoreColor(s.score) }} /></div>
            <span className="nxm-score-val" style={{ color: scoreColor(s.score) }}>{s.score}</span>
          </div>
        ))}
        <span className="nxm-muted-text" style={{ textAlign: 'center', display: 'block', marginTop: 4 }}>Grade Level: {gradeLevel}</span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MORE OPTIONS SHEET
   ═══════════════════════════════════════════ */
export const MoreOptionsSheetContent: React.FC<{ editor: Editor | null; onClose: () => void }> = ({ editor, onClose }) => {
  const items = [
    { icon: '🔍', label: 'Find & Replace', action: () => { useEditorStore.getState().setFindReplaceOpen(true); onClose(); }},
    { icon: '📊', label: 'Word Count', action: () => { const s = useEditorStore.getState(); toast.info(`Words: ${s.wordCount} | Chars: ${s.charCount} | Reading: ${s.readingTimeMinutes < 1 ? '<1' : s.readingTimeMinutes} min`); onClose(); }},
    { icon: '🗺', label: 'Doc Map', action: () => { toast.info('Document map — Coming soon'); onClose(); }},
    { icon: '👥', label: 'Collaborate', action: () => { toast.info('Collaboration — Coming soon'); onClose(); }},
    { icon: '📜', label: 'Version History', action: () => { toast.info('Version history — Coming soon'); onClose(); }},
    { icon: '⌨', label: 'Shortcuts', action: () => { toast.info('Ctrl+B Bold · Ctrl+I Italic · Ctrl+U Underline · Ctrl+Z Undo · Ctrl+S Save'); onClose(); }},
    { icon: '📤', label: 'Export PDF', action: () => { toast.info('Export PDF — Coming soon'); onClose(); }},
    { icon: '📝', label: 'Export Markdown', action: () => { toast.info('Export Markdown — Coming soon'); onClose(); }},
  ];

  return (
    <div className="nxm-more-list">
      {items.map((item, i) => (
        <button key={i} className="nxm-more-item" onClick={item.action}>
          <span className="nxm-more-icon">{item.icon}</span>
          <span className="nxm-more-label">{item.label}</span>
          <span className="nxm-more-chevron">›</span>
        </button>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════
   STYLE SHEET
   ═══════════════════════════════════════════ */
export const StyleSheetContent: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  const [bodySize, setBodySize] = useState(16);
  const [lineH, setLineH] = useState('1.75');

  return (
    <div className="nxm-style-content">
      <div className="nxm-ai-section-label">THEME PRESETS</div>
      <div className="nxm-theme-row">
        {['Default', 'Editorial', 'Modern', 'Bold'].map(t => (
          <button key={t} className="nxm-theme-card" onClick={() => toast.success(`Theme: ${t}`)}>
            <span className="nxm-theme-preview-h">Aa</span>
            <span className="nxm-theme-name">{t}</span>
          </button>
        ))}
      </div>

      <div className="nxm-ai-section-label">BODY FONT</div>
      <div className="nxm-font-list">
        {['Lora', 'Georgia', 'Merriweather', 'Source Serif Pro', 'Times New Roman'].map(f => (
          <button key={f} className="nxm-font-row" onClick={() => { editor?.chain().focus().setFontFamily(f).run(); toast.success(`Font: ${f}`); }}
            style={{ fontFamily: f }}>{f}</button>
        ))}
      </div>

      <div className="nxm-ai-section-label">BODY SIZE</div>
      <div className="nxm-segmented">
        {[14, 16, 18, 20].map(s => (
          <button key={s} className={`nxm-seg-btn ${bodySize === s ? 'nxm-seg-active' : ''}`}
            onClick={() => { setBodySize(s); editor?.chain().focus().setFontSize(s + 'px').run(); }}>{s}px</button>
        ))}
      </div>

      <div className="nxm-ai-section-label">LINE HEIGHT</div>
      <div className="nxm-segmented">
        {['1.5', '1.75', '2.0'].map(lh => (
          <button key={lh} className={`nxm-seg-btn ${lineH === lh ? 'nxm-seg-active' : ''}`}
            onClick={() => { setLineH(lh); editor?.chain().focus().setLineHeight(lh).run(); }}>{lh}</button>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   PUBLISH SHEET
   ═══════════════════════════════════════════ */
export const PublishSheetContent: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [keyword, setKeyword] = useState('');

  return (
    <div className="nxm-publish-content">
      <div className="nxm-ai-section-label">EXPORT</div>
      <div className="nxm-export-row">
        {['PDF', 'DOCX', 'HTML', 'Markdown', 'Text'].map(fmt => (
          <button key={fmt} className="nxm-export-chip" onClick={() => toast.info(`Export ${fmt} — Coming soon`)}>{fmt}</button>
        ))}
      </div>

      <div className="nxm-ai-section-label">SEO</div>
      <div className="nxm-seo-fields">
        <div className="nxm-field">
          <div className="nxm-field-top"><label>Meta Title</label><span className="nxm-char-count">{metaTitle.length}/60</span></div>
          <input className="nxm-seo-input" value={metaTitle} onChange={e => setMetaTitle(e.target.value.slice(0, 60))} placeholder="Article title for search engines" />
        </div>
        <div className="nxm-field">
          <div className="nxm-field-top"><label>Meta Description</label><span className="nxm-char-count">{metaDesc.length}/160</span></div>
          <textarea className="nxm-seo-textarea" value={metaDesc} onChange={e => setMetaDesc(e.target.value.slice(0, 160))} placeholder="Brief description" rows={3} />
        </div>
        <div className="nxm-field">
          <div className="nxm-field-top"><label>Focus Keyword</label></div>
          <input className="nxm-seo-input" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Primary keyword" />
        </div>
      </div>

      <div className="nxm-ai-section-label">ACTIONS</div>
      <button className="nxm-publish-btn" onClick={() => toast.success('🎉 Article published!')}>Publish Now</button>
      <button className="nxm-draft-btn" onClick={() => toast.success('Draft saved')}>Save Draft</button>
      <button className="nxm-draft-btn" onClick={() => toast.info('Schedule — Coming soon')}>Schedule</button>
    </div>
  );
};
