import '@/components/nexus-editor/nexus-editor.css';
import '@/components/nexus-editor/nexus-editor-body.css';
import '@/components/nexus-editor/mobile/nexus-mobile.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FontFamily } from '@tiptap/extension-font-family';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Youtube from '@tiptap/extension-youtube';
import CharacterCount from '@tiptap/extension-character-count';
import Typography from '@tiptap/extension-typography';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { FontSize } from '@/components/editor/extensions/FontSize';
import { LineHeight } from '@/components/editor/extensions/LineHeight';
import { Indent } from '@/components/editor/extensions/Indent';
import { useEditorStore } from '@/stores/editorStore';
import { toast } from 'sonner';

import { TitleBar } from '@/components/nexus-editor/TitleBar';
import { QuickAccessBar } from '@/components/nexus-editor/QuickAccessBar';
import { TabBar } from '@/components/nexus-editor/TabBar';
import { WriteRibbon } from '@/components/nexus-editor/WriteRibbon';
import { InsertRibbon, MediaRibbon, StyleRibbon, LayoutRibbon } from '@/components/nexus-editor/OtherRibbons';
import { AIRibbon, DataRibbon, ReviewRibbon, FlowRibbon, PublishRibbon } from '@/components/nexus-editor/AIDataReviewFlowPublishRibbons';
import { LeftSidebar } from '@/components/nexus-editor/LeftSidebar';
import { RightSidebar } from '@/components/nexus-editor/RightSidebar';
import { StatusBar } from '@/components/nexus-editor/StatusBar';
import { MobileLayout } from '@/components/nexus-editor/mobile/MobileLayout';

interface GamrNexusEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  embedded?: boolean;
}

const GamrNexusEditor: React.FC<GamrNexusEditorProps> = ({
  content: externalContent,
  onChange: externalOnChange,
  placeholder = 'Write your story here...\n(Word-like Rich Text · NEXUS MODE)',
  embedded = false,
}) => {
  const {
    activeTab, ribbonCollapsed, zoom, isFocusMode, isMinimized, isPreviewMode,
    updateDocStats, setAutoSaveStatus, setLastSavedAt, addVersionSnapshot,
    setCursorPosition, setCurrentFont, setCurrentSize
  } = useEditorStore();

  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);
  const lastContent = useRef<string>('');

  // ═══ MOBILE DETECTION ═══
  const isMobile = useMediaQuery('(max-width: 768px)');

  const editor = useEditor({
    extensions: [
      StarterKit,
      FontFamily,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({ allowBase64: true, HTMLAttributes: { class: 'nx-img' } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'nx-link' } }),
      Placeholder.configure({ placeholder }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Youtube.configure({ width: 640, height: 360 }),
      CharacterCount,
      Typography,
      Table.configure({ resizable: true }),
      TableRow, TableHeader, TableCell,
      Subscript, Superscript,
      FontSize, LineHeight, Indent,
    ],
    content: externalContent || '',
    autofocus: false,
    editorProps: {
      attributes: {
        class: 'nx-editor-content',
        spellcheck: 'true',
        tabindex: '-1',
      },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const chars = text.length;
      const lines = text.split('\n').length;
      const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
      const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length || (text.trim() ? 1 : 0);
      const readingTime = Math.max(1, Math.ceil(words / 200));
      updateDocStats({ words, chars, lines, sentences, paragraphs, readingTime });
      if (externalOnChange) externalOnChange(editor.getHTML());
      try { localStorage.setItem('nx-editor-content', editor.getHTML()); } catch {}
    },
    onSelectionUpdate: ({ editor }) => {
      const { from } = editor.state.selection;
      let line = 1, col = 1;
      const text = editor.state.doc.textBetween(0, from, '\n');
      const textLines = text.split('\n');
      line = textLines.length;
      col = (textLines[textLines.length - 1]?.length || 0) + 1;
      setCursorPosition(line, col);
      const attrs = editor.getAttributes('textStyle');
      if (attrs.fontFamily) setCurrentFont(attrs.fontFamily);
      if (attrs.fontSize) setCurrentSize(parseInt(attrs.fontSize));
    },
  });

  // Load from localStorage on mount and ensure no scroll-hijack
  useEffect(() => {
    if (editor) {
      const saved = localStorage.getItem('nx-editor-content');
      if (saved && saved !== '<p></p>') {
        editor.commands.setContent(saved, { emitUpdate: false });
      }
      if (embedded) {
        editor.commands.blur();
      }
    }
  }, [editor]);

  // AutoSave every 30 seconds
  useEffect(() => {
    autoSaveTimer.current = setInterval(() => {
      if (editor) {
        const html = editor.getHTML();
        if (html !== lastContent.current) {
          lastContent.current = html;
          setAutoSaveStatus('saving');
          setTimeout(() => {
            setAutoSaveStatus('saved');
            setLastSavedAt(new Date());
            addVersionSnapshot({
              timestamp: new Date(),
              snapshot: html,
              wordCount: editor.storage.characterCount?.words() || 0
            });
          }, 500);
        }
      }
    }, 30000);
    return () => { if (autoSaveTimer.current) clearInterval(autoSaveTimer.current); };
  }, [editor]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's': e.preventDefault(); setAutoSaveStatus('saving'); setTimeout(() => { setAutoSaveStatus('saved'); setLastSavedAt(new Date()); toast.success('Saved'); }, 500); break;
          case 'f': if (!e.shiftKey) { e.preventDefault(); useEditorStore.getState().setFindReplaceOpen(true); } else { e.preventDefault(); useEditorStore.getState().toggleFocusMode(); } break;
          case '/': e.preventDefault(); useEditorStore.getState().setIsPreviewMode(!useEditorStore.getState().isPreviewMode); break;
        }
        if (e.key >= '1' && e.key <= '6' && !e.shiftKey) {
          e.preventDefault();
          editor?.chain().focus().toggleHeading({ level: parseInt(e.key) as 1|2|3|4|5|6 }).run();
        }
        if (e.key === '0') { e.preventDefault(); editor?.chain().focus().setParagraph().run(); }
      }
      if (e.key === 'Escape') {
        useEditorStore.getState().setFindReplaceOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [editor]);

  const renderRibbon = () => {
    if (ribbonCollapsed) return null;
    switch (activeTab) {
      case 'write': return <WriteRibbon editor={editor} />;
      case 'insert': return <InsertRibbon editor={editor} />;
      case 'media': return <MediaRibbon editor={editor} />;
      case 'style': return <StyleRibbon editor={editor} />;
      case 'layout': return <LayoutRibbon editor={editor} />;
      case 'ai': return <AIRibbon editor={editor} />;
      case 'data': return <DataRibbon editor={editor} />;
      case 'review': return <ReviewRibbon editor={editor} />;
      case 'flow': return <FlowRibbon editor={editor} />;
      case 'publish': return <PublishRibbon editor={editor} />;
      default: return <WriteRibbon editor={editor} />;
    }
  };

  if (!editor) return null;

  // ═══ MOBILE LAYOUT ═══
  if (isMobile) {
    return <MobileLayout editor={editor} embedded={embedded} />;
  }

  // ═══ DESKTOP LAYOUT (unchanged) ═══
  return (
    <div className={`nx-editor-shell ${isFocusMode ? 'nx-focus-mode' : ''} ${isMinimized ? 'nx-minimized' : ''} ${embedded ? 'nx-embedded' : ''}`}>
      {!embedded && <TitleBar />}
      {!isMinimized && (
        <>
          <QuickAccessBar editor={editor} />
          <TabBar />
          <div className={`nx-ribbon-wrap ${ribbonCollapsed ? 'nx-ribbon-collapsed' : ''}`}>
            {renderRibbon()}
          </div>
          <div className="nx-main-body">
            <LeftSidebar />
            <div className="nx-canvas-wrap">
              {/* Ruler */}
              <div className="nx-ruler">
                {Array.from({ length: 9 }, (_, i) => (
                  <React.Fragment key={i}>
                    <span className="nx-ruler-mark">{i}"</span>
                    <span className="nx-ruler-tick" />
                    <span className="nx-ruler-tick nx-tick-half" />
                  </React.Fragment>
                ))}
              </div>
              {/* Editor */}
              <div className="nx-canvas" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                <EditorContent editor={editor} />
              </div>
              {/* Floating AI Bar */}
              <div className="nx-floating-ai">
                <span className="nx-fai-icon">+</span>
                <button className="nx-fai-btn nx-fai-write" onClick={() => { toast.info('AI Write: Generating content...'); setTimeout(() => { editor.chain().focus().insertContent('In the rapidly evolving landscape of gaming and esports, Africa stands at the forefront of a digital revolution...').run(); toast.success('AI content generated'); }, 1500); }}>Write for me</button>
                <button className="nx-fai-btn nx-fai-fix" onClick={() => toast.info('AI Fix & Improve: Analyzing document...')}>Fix & Improve</button>
                <button className="nx-fai-btn nx-fai-ask" onClick={() => toast.info('AI Chat: Opening assistant...')}>Ask AI</button>
              </div>
              {/* Minimap */}
              <div className="nx-minimap-bar">
                <span className="nx-minimap-label">MINIMAP</span>
                <div className="nx-minimap-track"><div className="nx-minimap-thumb" /></div>
                <span className="nx-minimap-arrow">↓</span>
              </div>
            </div>
            <RightSidebar />
          </div>
          <StatusBar />
        </>
      )}
    </div>
  );
};

export default GamrNexusEditor;
