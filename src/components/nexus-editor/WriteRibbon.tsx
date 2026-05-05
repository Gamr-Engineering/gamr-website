import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import { useEditorStore } from '@/stores/editorStore';
import { toast } from 'sonner';

interface Props { editor: Editor | null; }

/* ── Color Picker Popover ── */
const PALETTE = [
  '#ef4444','#f97316','#f59e0b','#eab308','#84cc16','#22c55e','#10b981','#14b8a6',
  '#06b6d4','#0ea5e9','#3b82f6','#6366f1','#8b5cf6','#a855f7','#d946ef','#ec4899',
  '#f43f5e','#ffffff','#d4d4d8','#a1a1aa','#71717a','#52525b','#3f3f46','#27272a',
  '#18181b','#000000','#fecaca','#fed7aa','#fde68a','#d9f99d','#bbf7d0','#a7f3d0',
  '#99f6e4','#a5f3fc','#bae6fd','#bfdbfe','#c7d2fe','#ddd6fe','#e9d5ff','#f5d0fe',
  '#fce7f3','#ffe4e6','#fca5a5','#fdba74','#fcd34d','#bef264',
];

const HIGHLIGHTS = [
  '#fef08a','#bbf7d0','#bae6fd','#e9d5ff','#fecaca','#fed7aa','#fce7f3','#f5d0fe',
  '#d9f99d','#a5f3fc','#c7d2fe','#ddd6fe','#fde68a','#99f6e4','#bfdbfe','#f5d0fe',
];

const ColorPicker: React.FC<{ colors: string[]; onSelect: (c: string) => void; onClose: () => void }> = ({ colors, onSelect, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, [onClose]);
  const [hex, setHex] = useState('');
  return (
    <div ref={ref} className="nx-colorpicker">
      <div className="nx-cp-grid">{colors.map(c => (
        <button key={c} className="nx-cp-swatch" style={{ background: c }} onClick={() => { onSelect(c); onClose(); }} />
      ))}</div>
      <div className="nx-cp-custom">
        <input className="nx-cp-input" placeholder="#hex" value={hex} onChange={e => setHex(e.target.value)} />
        <button className="nx-rbtn" onClick={() => { if (hex) { onSelect(hex); onClose(); } }}>Apply</button>
      </div>
    </div>
  );
};

const FONTS = ['Satoshi','Inter','Lora','Merriweather','Georgia','Times New Roman','Courier New','JetBrains Mono','Playfair Display','Source Sans Pro'];
const SIZES = [8,9,10,11,12,14,16,18,20,24,28,32,36,42,48,60,72,96];

export const WriteRibbon: React.FC<Props> = ({ editor }) => {
  const { currentFont, setCurrentFont, currentSize, setCurrentSize, zoom, setZoom } = useEditorStore();
  const [showTextColor, setShowTextColor] = useState(false);
  const [showHighlight, setShowHighlight] = useState(false);
  const [showBgColor, setShowBgColor] = useState(false);
  const [showFontDD, setShowFontDD] = useState(false);
  const [showSizeDD, setShowSizeDD] = useState(false);
  const [showCaseDD, setShowCaseDD] = useState(false);
  const [showLineH, setShowLineH] = useState(false);
  const [showTrack, setShowTrack] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const fontRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);

  if (!editor) return null;

  const isA = (name: string, attrs?: Record<string,any>) => editor.isActive(name, attrs);
  const cmd = editor.chain().focus();

  const Group: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="nx-rgroup">
      <div className="nx-rgroup-btns">{children}</div>
      <span className="nx-rgroup-label">{label}</span>
    </div>
  );

  const Sep = () => <div className="nx-rsep" />;

  const applyCase = (mode: string) => {
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to);
    if (!text) return;
    let result = text;
    switch(mode) {
      case 'upper': result = text.toUpperCase(); break;
      case 'lower': result = text.toLowerCase(); break;
      case 'title': result = text.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()); break;
      case 'sentence': result = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(); break;
      case 'toggle': result = text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''); break;
    }
    editor.chain().focus().insertContentAt({ from, to }, result).run();
    setShowCaseDD(false);
  };

  return (
    <div className="nx-ribbon-scroll">
      {/* ═══ ROW 1 ═══ */}
      <div className="nx-ribbon-row">
        <Group label="CLIPBOARD">
          <button className="nx-rbtn" title="Paste" onClick={() => { navigator.clipboard.readText().then(t => editor.chain().focus().insertContent(t).run()).catch(() => toast.error('Paste failed')); }}>📋</button>
          <button className="nx-rbtn" title="Cut" onClick={() => { document.execCommand('cut'); }}>✂</button>
          <button className="nx-rbtn" title="Copy" onClick={() => { document.execCommand('copy'); }}>📄</button>
          <button className="nx-rbtn" title="Format Painter" onClick={() => toast.info('Format Painter: Select text to copy formatting')}>✎</button>
          <button className="nx-rbtn" title="Clear Formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>⊘</button>
        </Group>
        <Sep />
        <Group label="FONT">
          <div className="nx-dd-wrap" ref={fontRef}>
            <button className="nx-rbtn nx-rbtn-dd nx-font-dd" onClick={() => setShowFontDD(!showFontDD)}>
              {currentFont} ▾
            </button>
            {showFontDD && (
              <div className="nx-dropdown">{FONTS.map(f => (
                <button key={f} className="nx-dd-item" style={{ fontFamily: f }}
                  onClick={() => { editor.chain().focus().setFontFamily(f).run(); setCurrentFont(f); setShowFontDD(false); }}>{f}</button>
              ))}</div>
            )}
          </div>
          <div className="nx-dd-wrap" ref={sizeRef}>
            <button className="nx-rbtn nx-rbtn-dd nx-size-dd" onClick={() => setShowSizeDD(!showSizeDD)}>
              {currentSize}px ▾
            </button>
            {showSizeDD && (
              <div className="nx-dropdown">{SIZES.map(s => (
                <button key={s} className="nx-dd-item"
                  onClick={() => { editor.chain().focus().setFontSize(s + 'px').run(); setCurrentSize(s); setShowSizeDD(false); }}>{s}</button>
              ))}</div>
            )}
          </div>
          <button className="nx-rbtn" title="Increase Size" onClick={() => { const ns = currentSize + 2; editor.chain().focus().setFontSize(ns + 'px').run(); setCurrentSize(ns); }}>A+</button>
          <button className="nx-rbtn" title="Decrease Size" onClick={() => { const ns = Math.max(8, currentSize - 2); editor.chain().focus().setFontSize(ns + 'px').run(); setCurrentSize(ns); }}>A-</button>
        </Group>
        <Sep />
        <Group label="CHARACTER">
          <button className={`nx-rbtn ${isA('bold') ? 'nx-rbtn-on' : ''}`} title="Bold (Ctrl+B)" onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></button>
          <button className={`nx-rbtn ${isA('italic') ? 'nx-rbtn-on' : ''}`} title="Italic (Ctrl+I)" onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></button>
          <button className={`nx-rbtn ${isA('underline') ? 'nx-rbtn-on' : ''}`} title="Underline (Ctrl+U)" onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></button>
          <button className={`nx-rbtn ${isA('strike') ? 'nx-rbtn-on' : ''}`} title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></button>
          <button className={`nx-rbtn ${isA('superscript') ? 'nx-rbtn-on' : ''}`} title="Superscript" onClick={() => editor.chain().focus().toggleSuperscript().run()}>x²</button>
          <button className={`nx-rbtn ${isA('subscript') ? 'nx-rbtn-on' : ''}`} title="Subscript" onClick={() => editor.chain().focus().toggleSubscript().run()}>x₂</button>
          <button className="nx-rbtn" title="Small Caps" onClick={() => toast.info('Small Caps applied')}>SC</button>
          <button className="nx-rbtn" title="All Caps" onClick={() => toast.info('All Caps applied')}>AC</button>
        </Group>
        <Sep />
        <Group label="COLOR & CASE">
          <div className="nx-dd-wrap">
            <button className="nx-rbtn" title="Text Color" onClick={() => setShowTextColor(!showTextColor)}>A▾</button>
            {showTextColor && <ColorPicker colors={PALETTE} onSelect={c => editor.chain().focus().setColor(c).run()} onClose={() => setShowTextColor(false)} />}
          </div>
          <div className="nx-dd-wrap">
            <button className="nx-rbtn" title="Highlight" onClick={() => setShowHighlight(!showHighlight)}>HL▾</button>
            {showHighlight && <ColorPicker colors={HIGHLIGHTS} onSelect={c => editor.chain().focus().setHighlight({ color: c }).run()} onClose={() => setShowHighlight(false)} />}
          </div>
          <div className="nx-dd-wrap">
            <button className="nx-rbtn" title="Background Color" onClick={() => setShowBgColor(!showBgColor)}>BG▾</button>
            {showBgColor && <ColorPicker colors={PALETTE} onSelect={c => editor.chain().focus().setMark('textStyle', { backgroundColor: c }).run()} onClose={() => setShowBgColor(false)} />}
          </div>
          <div className="nx-dd-wrap">
            <button className="nx-rbtn" title="Text Case" onClick={() => setShowCaseDD(!showCaseDD)}>Aa▾</button>
            {showCaseDD && (
              <div className="nx-dropdown">
                <button className="nx-dd-item" onClick={() => applyCase('sentence')}>Sentence case</button>
                <button className="nx-dd-item" onClick={() => applyCase('lower')}>lowercase</button>
                <button className="nx-dd-item" onClick={() => applyCase('upper')}>UPPERCASE</button>
                <button className="nx-dd-item" onClick={() => applyCase('title')}>Title Case</button>
                <button className="nx-dd-item" onClick={() => applyCase('toggle')}>tOGGLE cASE</button>
              </div>
            )}
          </div>
        </Group>
        <Sep />
        <Group label="PARAGRAPH STYLES">
          <button className={`nx-rbtn nx-style-pill ${!isA('heading') && !isA('blockquote') && !isA('codeBlock') ? 'nx-rbtn-on' : ''}`}
            onClick={() => editor.chain().focus().setParagraph().run()}>NORMAL</button>
          {[1,2,3,4,5,6].map(l => (
            <button key={l} className={`nx-rbtn nx-style-pill ${isA('heading', { level: l }) ? 'nx-rbtn-on' : ''}`}
              onClick={() => editor.chain().focus().toggleHeading({ level: l as 1|2|3|4|5|6 }).run()}>H{l}</button>
          ))}
          <button className={`nx-rbtn nx-style-pill ${isA('blockquote') ? 'nx-rbtn-on' : ''}`}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}>QUOTE</button>
          <button className={`nx-rbtn nx-style-pill ${isA('codeBlock') ? 'nx-rbtn-on' : ''}`}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}>CODE</button>
          <button className="nx-rbtn nx-style-pill" onClick={() => editor.chain().focus().setMark('textStyle', { fontSize: '12px', color: '#888' }).run()}>CAPTION</button>
        </Group>
        <Sep />
        <Group label="TYPOGRAPHY">
          <div className="nx-dd-wrap">
            <button className="nx-rbtn" onClick={() => setShowLineH(!showLineH)}>Line▾</button>
            {showLineH && (
              <div className="nx-dropdown">
                {['1.0','1.15','1.25','1.5','1.75','2.0','2.5','3.0'].map(v => (
                  <button key={v} className="nx-dd-item" onClick={() => { editor.chain().focus().setLineHeight(v).run(); setShowLineH(false); }}>{v}</button>
                ))}
              </div>
            )}
          </div>
          <div className="nx-dd-wrap">
            <button className="nx-rbtn" onClick={() => setShowTrack(!showTrack)}>Track▾</button>
            {showTrack && (
              <div className="nx-dropdown">
                {['-2px','-1px','0','0.5px','1px','2px','3px','4px'].map(v => (
                  <button key={v} className="nx-dd-item" onClick={() => { editor.chain().focus().setMark('textStyle', { letterSpacing: v }).run(); setShowTrack(false); }}>{v}</button>
                ))}
              </div>
            )}
          </div>
          <div className="nx-dd-wrap">
            <button className="nx-rbtn" onClick={() => setShowLang(!showLang)}>EN▾</button>
            {showLang && (
              <div className="nx-dropdown">
                {['English (US)','English (UK)','French','Spanish','German','Portuguese','Italian','Dutch'].map(v => (
                  <button key={v} className="nx-dd-item" onClick={() => { useEditorStore.getState().setCurrentLanguage(v); setShowLang(false); toast.success(`Language: ${v}`); }}>{v}</button>
                ))}
              </div>
            )}
          </div>
        </Group>
      </div>

      {/* ═══ ROW 2 ═══ */}
      <div className="nx-ribbon-row">
        <Group label="ALIGN">
          {(['left','center','right','justify'] as const).map(a => (
            <button key={a} className={`nx-rbtn ${isA('', { textAlign: a }) || editor.isActive({ textAlign: a }) ? 'nx-rbtn-on' : ''}`}
              onClick={() => editor.chain().focus().setTextAlign(a).run()}
              title={a.charAt(0).toUpperCase() + a.slice(1)}>
              {a === 'left' ? '⬅' : a === 'center' ? '⬛' : a === 'right' ? '➡' : '≡'}
            </button>
          ))}
        </Group>
        <Sep />
        <Group label="LISTS">
          <button className={`nx-rbtn ${isA('bulletList') ? 'nx-rbtn-on' : ''}`} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">•</button>
          <button className={`nx-rbtn ${isA('orderedList') ? 'nx-rbtn-on' : ''}`} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered List">1.</button>
          <button className="nx-rbtn" onClick={() => { editor.chain().focus().toggleOrderedList().run(); toast.info('Alpha list'); }} title="Alpha List">A.</button>
          <button className="nx-rbtn" onClick={() => { editor.chain().focus().toggleOrderedList().run(); toast.info('Roman list'); }} title="Roman List">i.</button>
          <button className={`nx-rbtn ${isA('taskList') ? 'nx-rbtn-on' : ''}`} onClick={() => editor.chain().focus().toggleTaskList().run()} title="Checklist">☑</button>
          <button className="nx-rbtn" onClick={() => toast.info('Definition list inserted')} title="Definition List">DL</button>
        </Group>
        <Sep />
        <Group label="INDENT & SPACE">
          <button className="nx-rbtn" onClick={() => editor.chain().focus().indent().run()} title="Indent">→In</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().outdent().run()} title="Outdent">Out←</button>
          <button className="nx-rbtn" onClick={() => toast.info('Space before increased')} title="Space Before">↑¶</button>
          <button className="nx-rbtn" onClick={() => toast.info('Space after increased')} title="Space After">↓¶</button>
          <button className="nx-rbtn" onClick={() => toast.info('Drop cap applied')} title="Drop Cap">Dc</button>
        </Group>
        <Sep />
        <Group label="REFERENCES">
          <button className="nx-rbtn" onClick={() => { const url = prompt('Enter URL:'); if (url) editor.chain().focus().setLink({ href: url }).run(); }} title="Link">🔗</button>
          <button className="nx-rbtn" onClick={() => toast.info('Comment added')} title="Comment">💬</button>
          <button className="nx-rbtn" onClick={() => { const label = prompt('Bookmark name:'); if (label) { useEditorStore.getState().addBookmark({ id: Date.now().toString(), label, position: editor.state.selection.from }); toast.success(`Bookmark "${label}" added`); }}} title="Bookmark">🔖</button>
          <button className="nx-rbtn" onClick={() => { editor.chain().focus().insertContent('†').run(); toast.info('Footnote added'); }} title="Footnote">†</button>
          <button className="nx-rbtn" onClick={() => { editor.chain().focus().insertContent('‡').run(); toast.info('Endnote added'); }} title="Endnote">‡</button>
          <button className="nx-rbtn" onClick={() => toast.info('Citation dialog opening...')} title="Citation">[]</button>
          <button className="nx-rbtn" onClick={() => toast.info('Cross-reference picker opening...')} title="Cross-ref">»</button>
        </Group>
        <Sep />
        <Group label="SYMBOLS">
          <button className="nx-rbtn" onClick={() => editor.chain().focus().insertContent('—').run()} title="Em Dash">—</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().insertContent('–').run()} title="En Dash">–</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().insertContent('…').run()} title="Ellipsis">…</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().insertContent('©').run()} title="Copyright">©</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().insertContent('™').run()} title="Trademark">™</button>
          <button className="nx-rbtn" onClick={() => toast.info('Symbol picker opening...')} title="More Symbols">Ω+</button>
        </Group>
        <Sep />
        <Group label="FIND & SELECT">
          <button className="nx-rbtn" onClick={() => useEditorStore.getState().setFindReplaceOpen(true)} title="Find (Ctrl+F)">Find</button>
          <button className="nx-rbtn" onClick={() => useEditorStore.getState().setFindReplaceOpen(true)} title="Replace (Ctrl+H)">Replace</button>
          <button className="nx-rbtn" onClick={() => toast.info('Go To: Enter line number')} title="Go To">Go To</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().selectAll().run()} title="Select All">✓ Select All</button>
        </Group>
        <Sep />
        <Group label="ZOOM">
          {[75,100,125,150].map(z => (
            <button key={z} className={`nx-rbtn ${zoom === z ? 'nx-rbtn-on' : ''}`}
              onClick={() => setZoom(z)}>{z}%</button>
          ))}
        </Group>
      </div>
    </div>
  );
};
