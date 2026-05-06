import React, { useRef, useEffect } from 'react';
import { Editor } from '@tiptap/react';

interface Props { editor: Editor | null; }

export const MobileFormattingStrip: React.FC<Props> = ({ editor }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to active button on selection change
  useEffect(() => {
    if (!editor || !scrollRef.current) return;
    const handler = () => {
      const active = scrollRef.current?.querySelector('.nxm-fs-active');
      if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    };
    editor.on('selectionUpdate', handler);
    return () => { editor.off('selectionUpdate', handler); };
  }, [editor]);

  if (!editor) return null;

  const isA = (name: string, attrs?: Record<string, any>) => editor.isActive(name, attrs);

  const Btn: React.FC<{ active?: boolean; onClick: () => void; children: React.ReactNode; label?: string }> = 
    ({ active, onClick, children, label }) => (
      <button
        className={`nxm-fs-btn ${active ? 'nxm-fs-active' : ''}`}
        onClick={onClick}
        title={label}
        style={{ touchAction: 'manipulation' }}
      >
        {children}
      </button>
    );

  const Sep = () => <div className="nxm-fs-sep" />;

  return (
    <div className="nxm-formatting-strip" ref={scrollRef}>
      <div className="nxm-fs-scroll">
        {/* Character formatting */}
        <Btn active={isA('bold')} onClick={() => editor.chain().focus().toggleBold().run()} label="Bold"><b>B</b></Btn>
        <Btn active={isA('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} label="Italic"><i>I</i></Btn>
        <Btn active={isA('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} label="Underline"><u>U</u></Btn>
        <Btn active={isA('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} label="Strikethrough"><s>S</s></Btn>
        <Btn active={isA('superscript')} onClick={() => editor.chain().focus().toggleSuperscript().run()} label="Superscript">x²</Btn>
        <Btn active={isA('subscript')} onClick={() => editor.chain().focus().toggleSubscript().run()} label="Subscript">x₂</Btn>
        <Sep />

        {/* Alignment */}
        <Btn active={isA('paragraph', { textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} label="Align Left">⬅</Btn>
        <Btn active={isA('paragraph', { textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} label="Center">≡</Btn>
        <Btn active={isA('paragraph', { textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} label="Align Right">➡</Btn>
        <Btn active={isA('paragraph', { textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()} label="Justify">⬛</Btn>
        <Sep />

        {/* Lists */}
        <Btn active={isA('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} label="Bullet List">•</Btn>
        <Btn active={isA('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} label="Numbered List">1.</Btn>
        <Btn active={isA('taskList')} onClick={() => editor.chain().focus().toggleTaskList().run()} label="Checklist">☑</Btn>
        <Sep />

        {/* Headings & blocks */}
        <Btn active={isA('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} label="Heading 1">H1</Btn>
        <Btn active={isA('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} label="Heading 2">H2</Btn>
        <Btn active={isA('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} label="Heading 3">H3</Btn>
        <Btn active={isA('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} label="Blockquote">❝</Btn>
        <Btn active={isA('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()} label="Code Block">{'</>'}</Btn>
        <Sep />

        {/* Link & symbols */}
        <Btn onClick={() => { const url = prompt('Enter URL:'); if (url) editor.chain().focus().setLink({ href: url }).run(); }} label="Insert Link">🔗</Btn>
        <Btn onClick={() => editor.chain().focus().insertContent('—').run()} label="Em Dash">—</Btn>
        <Btn onClick={() => editor.chain().focus().insertContent('…').run()} label="Ellipsis">…</Btn>
      </div>
    </div>
  );
};
