import React, { useCallback, useState, useRef } from 'react';
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
import { Node, mergeAttributes } from '@tiptap/core';
import { AnimatePresence, motion } from 'framer-motion';

// Custom extensions
import { FontSize } from './editor/extensions/FontSize';
import { LineHeight } from './editor/extensions/LineHeight';
import { Indent } from './editor/extensions/Indent';

// Ribbon tabs
import HomeTab from './editor/ribbon/HomeTab';
import InsertTab from './editor/ribbon/InsertTab';
import DesignTab from './editor/ribbon/DesignTab';
import LayoutTab from './editor/ribbon/LayoutTab';

// UI
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Heading1,
  Quote,
  Plus,
  Maximize2,
  Minimize2,
  Save,
  FileText,
  ChevronUp,
} from 'lucide-react';

// ── Custom Video Extension ──
const VideoExtension = Node.create({
  name: 'video',
  group: 'block',
  selectable: true,
  draggable: true,
  atom: true,
  addAttributes() {
    return {
      src: { default: null },
      controls: { default: true },
      class: { default: 'w-full rounded-xl aspect-video bg-black shadow-2xl border border-white/10 my-8' },
    };
  },
  parseHTML() { return [{ tag: 'video' }]; },
  renderHTML({ HTMLAttributes }) { return ['video', mergeAttributes(HTMLAttributes)]; },
});

// ── Custom Audio Extension ──
const AudioExtension = Node.create({
  name: 'audio',
  group: 'block',
  selectable: true,
  draggable: true,
  atom: true,
  addAttributes() {
    return {
      src: { default: null },
      controls: { default: true },
      class: { default: 'w-full mt-4 mb-8' },
    };
  },
  parseHTML() { return [{ tag: 'audio' }]; },
  renderHTML({ HTMLAttributes }) { return ['audio', mergeAttributes(HTMLAttributes)]; },
});

// ── Margin presets ──
const MARGIN_MAP: Record<string, string> = {
  normal: '65ch',
  narrow: '80ch',
  wide: '90ch',
  full: '100%',
};

// ── Ribbon Tab definitions ──
const RIBBON_TABS = [
  { value: 'home', label: 'Home' },
  { value: 'insert', label: 'Insert' },
  { value: 'design', label: 'Design' },
  { value: 'layout', label: 'Layout' },
];

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = 'Start writing your article...',
}) => {
  // ── State ──
  const [ribbonCollapsed, setRibbonCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [focusMode, setFocusMode] = useState(false);
  const [paperColor, setPaperColor] = useState('#000000');
  const [editorMargin, setEditorMargin] = useState('normal');
  const [bubbleMenu, setBubbleMenu] = useState({ top: 0, left: 0, show: false });
  const [floatingPlus, setFloatingPlus] = useState({ top: 0, left: 0, show: false });

  // ── Editor ──
  const editor = useEditor({
    extensions: [
      StarterKit,
      FontFamily,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: { class: 'rounded-xl max-w-full h-auto my-8 mx-auto block shadow-2xl' },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-blue-500 underline decoration-blue-500/30 hover:decoration-blue-500 transition-all' },
      }),
      Placeholder.configure({ placeholder }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Youtube.configure({
        width: 800,
        height: 450,
        HTMLAttributes: { class: 'rounded-xl aspect-video w-full my-8 shadow-2xl border border-white/10' },
      }),
      CharacterCount,
      Typography,
      VideoExtension,
      AudioExtension,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Subscript,
      Superscript,
      FontSize,
      LineHeight,
      Indent,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      const isTextSelection = from !== to;

      if (isTextSelection) {
        const coords = editor.view.coordsAtPos(from);
        setBubbleMenu({ top: coords.top - 50, left: coords.left, show: true });
      } else {
        setBubbleMenu((prev) => ({ ...prev, show: false }));
      }

      const isAtStartOfEmptyParagraph = editor.state.selection.$from.parent.content.size === 0;
      if (isAtStartOfEmptyParagraph && !isTextSelection) {
        const coords = editor.view.coordsAtPos(editor.state.selection.from);
        setFloatingPlus({ top: coords.top, left: coords.left - 50, show: true });
      } else {
        setFloatingPlus((prev) => ({ ...prev, show: false }));
      }
    },
    onBlur: () => {
      setBubbleMenu((prev) => ({ ...prev, show: false }));
      setFloatingPlus((prev) => ({ ...prev, show: false }));
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[600px] p-8 md:p-12 text-white leading-relaxed lg:text-lg',
      },
    },
  });

  if (!editor) return null;

  const wordCount = editor.storage.characterCount.words();
  const charCount = editor.storage.characterCount.characters();

  return (
    <div className={`w-full rounded-3xl overflow-hidden bg-black/40 backdrop-blur-2xl shadow-2xl relative group transition-all duration-500 ${focusMode ? 'fixed inset-4 z-50 rounded-2xl' : 'border border-white/10'}`}>

      {/* ════════════════════════════════════════════════════
          BUBBLE MENU (text-selection context menu)
         ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {bubbleMenu.show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed z-[100] flex bg-gray-900/95 backdrop-blur-xl border border-white/10 p-1 rounded-xl shadow-2xl gap-0.5"
            style={{ top: bubbleMenu.top, left: bubbleMenu.left }}
          >
            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={`w-8 h-8 p-0 rounded-md ${editor.isActive('bold') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><Bold className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={`w-8 h-8 p-0 rounded-md ${editor.isActive('italic') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><Italic className="w-4 h-4" /></Button>
            <Separator orientation="vertical" className="h-6 bg-white/10 mx-0.5" />
            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`w-8 h-8 p-0 rounded-md ${editor.isActive('heading', { level: 1 }) ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><Heading1 className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`w-8 h-8 p-0 rounded-md ${editor.isActive('blockquote') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><Quote className="w-4 h-4" /></Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════
          FLOATING PLUS (empty-line quick insert)
         ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {floatingPlus.show && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="fixed z-[99] flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 transition-colors cursor-pointer border border-blue-500/30 shadow-lg"
            style={{ top: floatingPlus.top, left: floatingPlus.left }}
            onClick={() => setActiveTab('insert')}
          >
            <Plus className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════
          TITLE BAR (Quick Access Toolbar)
         ════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-gray-950/80 border-b border-white/[0.04]">
        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="w-7 h-7 p-0 text-gray-500 hover:text-gray-300" title="Undo">
            <Undo className="w-3.5 h-3.5" />
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="w-7 h-7 p-0 text-gray-500 hover:text-gray-300" title="Redo">
            <Redo className="w-3.5 h-3.5" />
          </Button>
          <Separator orientation="vertical" className="h-4 bg-white/[0.06] mx-1" />
          <div className="flex items-center gap-1.5 px-2">
            <FileText className="w-3 h-3 text-blue-500" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gamr Editor</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => setFocusMode(!focusMode)} className="w-7 h-7 p-0 text-gray-500 hover:text-gray-300" title={focusMode ? 'Exit Focus Mode' : 'Focus Mode'}>
            {focusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          RIBBON (Tabbed Toolbar)
         ════════════════════════════════════════════════════ */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tab Navigation */}
        <div className="flex items-center bg-gray-900/60 border-b border-white/[0.06]">
          <TabsList className="bg-transparent h-auto p-0 rounded-none gap-0">
            {RIBBON_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                onDoubleClick={() => setRibbonCollapsed(!ribbonCollapsed)}
                className="rounded-none border-b-2 border-transparent px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 transition-all data-[state=active]:border-blue-500 data-[state=active]:text-blue-400 data-[state=active]:bg-white/[0.03] data-[state=active]:shadow-none hover:text-gray-300 hover:bg-white/[0.02]"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Collapse toggle */}
          <button
            type="button"
            onClick={() => setRibbonCollapsed(!ribbonCollapsed)}
            className="ml-auto mr-2 p-1 rounded-md text-gray-600 hover:text-gray-400 hover:bg-white/[0.04] transition-colors"
            title={ribbonCollapsed ? 'Expand Ribbon' : 'Collapse Ribbon'}
          >
            <ChevronUp className={`w-3.5 h-3.5 transition-transform duration-200 ${ribbonCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Tab Panels */}
        <AnimatePresence>
          {!ribbonCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden bg-gray-900/40 border-b border-white/[0.06] backdrop-blur-xl"
            >
              <TabsContent value="home" className="m-0 p-0">
                <HomeTab editor={editor} />
              </TabsContent>
              <TabsContent value="insert" className="m-0 p-0">
                <InsertTab editor={editor} />
              </TabsContent>
              <TabsContent value="design" className="m-0 p-0">
                <DesignTab
                  editor={editor}
                  paperColor={paperColor}
                  onPaperColorChange={setPaperColor}
                />
              </TabsContent>
              <TabsContent value="layout" className="m-0 p-0">
                <LayoutTab
                  editor={editor}
                  currentMargin={editorMargin}
                  onMarginChange={setEditorMargin}
                />
              </TabsContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Tabs>

      {/* ════════════════════════════════════════════════════
          EDITOR CANVAS
         ════════════════════════════════════════════════════ */}
      <div
        className="relative overflow-y-auto transition-colors duration-300"
        style={{
          backgroundColor: paperColor,
          maxHeight: focusMode ? 'calc(100vh - 140px)' : undefined,
        }}
      >
        <div
          className="mx-auto transition-all duration-300"
          style={{ maxWidth: MARGIN_MAP[editorMargin] || '65ch' }}
        >
          <EditorContent editor={editor} />
        </div>

        {/* Word / Character Counter */}
        <div className="sticky bottom-0 flex items-center justify-between px-6 py-2 bg-gray-950/80 border-t border-white/[0.04] backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">{wordCount} Words</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">{charCount} Characters</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
              {editor.isActive('heading', { level: 1 }) ? 'Heading 1' :
               editor.isActive('heading', { level: 2 }) ? 'Heading 2' :
               editor.isActive('heading', { level: 3 }) ? 'Heading 3' :
               editor.isActive('blockquote') ? 'Quote' :
               editor.isActive('codeBlock') ? 'Code Block' :
               'Body'}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Auto-saving" />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          STYLES
         ════════════════════════════════════════════════════ */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Placeholder ── */
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #4b5563;
          pointer-events: none;
          height: 0;
          font-style: italic;
        }
        .tiptap { outline: none !important; color: #e2e8f0; font-size: 1.125rem; line-height: 1.75; }

        /* ── Headings ── */
        .tiptap h1 { font-size: 2.25rem; font-weight: 800; color: white; margin-top: 2rem; margin-bottom: 1rem; line-height: 1.2; text-transform: uppercase; letter-spacing: -0.02em; }
        .tiptap h2 { font-size: 1.75rem; font-weight: 700; color: white; margin-top: 1.75rem; margin-bottom: 0.75rem; line-height: 1.3; }
        .tiptap h3 { font-size: 1.35rem; font-weight: 700; color: #f1f5f9; margin-top: 1.5rem; margin-bottom: 0.5rem; line-height: 1.4; }

        /* ── Paragraph ── */
        .tiptap p { margin-bottom: 1rem; min-height: 1.5rem; }

        /* ── Lists ── */
        .tiptap ul, .tiptap ol { padding: 0 1.2rem; margin: 1.5rem 0; }
        .tiptap ul { list-style-type: disc; }
        .tiptap ol { list-style-type: decimal; }

        /* ── Blockquote ── */
        .tiptap blockquote {
          border-left: 4px solid #3b82f6;
          padding: 0.5rem 1.5rem;
          margin: 2rem 0;
          background: rgba(59, 130, 246, 0.05);
          border-radius: 0 0.75rem 0.75rem 0;
          font-style: italic;
          color: #94a3b8;
        }

        /* ── Selection highlights ── */
        .tiptap img.ProseMirror-selectednode { outline: 4px solid #3b82f6; outline-offset: 4px; }
        .tiptap video.ProseMirror-selectednode { outline: 4px solid #a855f7; outline-offset: 4px; }
        .tiptap audio.ProseMirror-selectednode { outline: 4px solid #10b981; outline-offset: 4px; }

        /* ── Tables ── */
        .tiptap table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 2rem 0;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
        }
        .tiptap table td, .tiptap table th {
          min-width: 1em;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.75rem 1rem;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .tiptap table th {
          font-weight: bold;
          text-align: left;
          background-color: rgba(255, 255, 255, 0.05);
        }
        .tiptap table .selectedCell:after {
          z-index: 2;
          position: absolute;
          content: "";
          left: 0; right: 0; top: 0; bottom: 0;
          background: rgba(59, 130, 246, 0.1);
          pointer-events: none;
        }
        .tiptap table .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0;
          bottom: -2px;
          width: 4px;
          background-color: #3b82f6;
          pointer-events: none;
        }
        .tiptap table p { margin: 0; }

        /* ── Sub/Superscript ── */
        .tiptap sub { vertical-align: sub; font-size: smaller; }
        .tiptap sup { vertical-align: super; font-size: smaller; }

        /* ── Code Block ── */
        .tiptap pre {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.75rem;
          padding: 1rem 1.5rem;
          font-family: ui-monospace, monospace;
          font-size: 0.875rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .tiptap code {
          background: rgba(255,255,255,0.06);
          border-radius: 0.25rem;
          padding: 0.15rem 0.4rem;
          font-family: ui-monospace, monospace;
          font-size: 0.875em;
        }
        .tiptap pre code { background: none; padding: 0; border-radius: 0; }

        /* ── Scrollbar ── */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* ════════════════════════════════════════════════════
           RIBBON COMPONENT STYLES
           ════════════════════════════════════════════════════ */
        .ribbon-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.25rem;
          min-height: 56px;
        }
        .ribbon-group-content {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          flex: 1;
        }
        .ribbon-group-label {
          font-size: 7px;
          text-transform: uppercase;
          font-weight: 700;
          color: #4b5563;
          letter-spacing: 0.08em;
          margin-top: 2px;
          white-space: nowrap;
        }
        .ribbon-btn {
          width: 28px;
          height: 28px;
          padding: 0;
          color: #9ca3af;
          border-radius: 0.375rem;
          transition: all 0.15s;
        }
        .ribbon-btn:hover {
          color: #e5e7eb;
          background: rgba(255,255,255,0.06);
        }
        .ribbon-btn-active {
          color: #3b82f6 !important;
          background: rgba(59,130,246,0.12) !important;
        }
        .ribbon-btn-lg {
          width: auto;
          min-width: 40px;
          height: auto;
          padding: 4px 6px;
          color: #9ca3af;
          border-radius: 0.375rem;
          transition: all 0.15s;
        }
        .ribbon-btn-lg:hover {
          color: #e5e7eb;
          background: rgba(255,255,255,0.06);
        }
        .ribbon-btn-sm {
          height: 24px;
          padding: 0 6px;
          color: #9ca3af;
          border-radius: 0.25rem;
          transition: all 0.15s;
        }
        .ribbon-btn-sm:hover {
          color: #e5e7eb;
          background: rgba(255,255,255,0.06);
        }
      `}} />
    </div>
  );
};

export default RichTextEditor;
