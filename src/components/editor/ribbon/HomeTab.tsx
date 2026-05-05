import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Type,
  Highlighter,
  Palette,
  Heading1,
  Heading2,
  Heading3,
  CheckSquare,
  Code,
  Quote,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Eraser,
  PaintBucket,
  IndentIncrease,
  IndentDecrease,
  ChevronDown,
  Clipboard,
  ClipboardPaste,
  Copy,
  Scissors,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface HomeTabProps {
  editor: Editor;
}

const FONTS = [
  { name: 'Default (Inter)', value: 'Inter' },
  { name: 'Serif (Georgia)', value: 'Georgia, serif' },
  { name: 'Monospace', value: 'ui-monospace, monospace' },
  { name: 'Playfair Display', value: 'Playfair Display' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Outfit', value: 'Outfit' },
];

const FONT_SIZES = ['10px', '11px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px', '64px', '72px'];

const COLORS = ['#ffffff', '#e2e8f0', '#94a3b8', '#64748b', '#3b82f6', '#2563eb', '#10b981', '#059669', '#f59e0b', '#d97706', '#ef4444', '#dc2626', '#8b5cf6', '#7c3aed', '#ec4899', '#db2777'];

const HIGHLIGHTS = ['#fbbf24', '#86efac', '#93c5fd', '#c084fc', '#f472b6', '#fca5a5', '#fed7aa', 'transparent'];

const LINE_HEIGHTS = [
  { label: '1.0', value: '1' },
  { label: '1.15', value: '1.15' },
  { label: '1.5', value: '1.5' },
  { label: '1.75', value: '1.75' },
  { label: '2.0', value: '2' },
  { label: '2.5', value: '2.5' },
  { label: '3.0', value: '3' },
];

const STYLES = [
  { label: 'Normal', action: (e: Editor) => e.chain().focus().setParagraph().run(), check: (e: Editor) => e.isActive('paragraph') && !e.isActive('heading') },
  { label: 'Heading 1', action: (e: Editor) => e.chain().focus().toggleHeading({ level: 1 }).run(), check: (e: Editor) => e.isActive('heading', { level: 1 }) },
  { label: 'Heading 2', action: (e: Editor) => e.chain().focus().toggleHeading({ level: 2 }).run(), check: (e: Editor) => e.isActive('heading', { level: 2 }) },
  { label: 'Heading 3', action: (e: Editor) => e.chain().focus().toggleHeading({ level: 3 }).run(), check: (e: Editor) => e.isActive('heading', { level: 3 }) },
  { label: 'Quote', action: (e: Editor) => e.chain().focus().toggleBlockquote().run(), check: (e: Editor) => e.isActive('blockquote') },
  { label: 'Code', action: (e: Editor) => e.chain().focus().toggleCodeBlock().run(), check: (e: Editor) => e.isActive('codeBlock') },
];

const HomeTab: React.FC<HomeTabProps> = ({ editor }) => {
  const [fontSizeInput, setFontSizeInput] = useState('16px');

  const currentFontSize = editor.getAttributes('textStyle')?.fontSize || '16px';
  const currentColor = editor.getAttributes('textStyle')?.color || '#ffffff';
  const currentHighlight = editor.getAttributes('highlight')?.color || 'transparent';

  const handleCopy = () => {
    document.execCommand('copy');
    editor.commands.focus();
  };
  const handleCut = () => {
    document.execCommand('cut');
    editor.commands.focus();
  };
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      editor.chain().focus().insertContent(text).run();
    } catch {
      document.execCommand('paste');
    }
  };

  return (
    <div className="flex items-stretch gap-0 px-2 py-1.5 overflow-x-auto no-scrollbar">
      {/* ── Clipboard Group ── */}
      <div className="ribbon-group">
        <div className="ribbon-group-content">
          <Button type="button" variant="ghost" size="sm" onClick={handlePaste} className="ribbon-btn-lg flex-col gap-0.5">
            <ClipboardPaste className="w-5 h-5" />
            <span className="text-[8px]">Paste</span>
          </Button>
          <div className="flex flex-col gap-0.5">
            <Button type="button" variant="ghost" size="sm" onClick={handleCut} className="ribbon-btn-sm" title="Cut">
              <Scissors className="w-3.5 h-3.5" />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={handleCopy} className="ribbon-btn-sm" title="Copy">
              <Copy className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
        <span className="ribbon-group-label">Clipboard</span>
      </div>

      <Separator orientation="vertical" className="h-auto bg-white/[0.06] mx-1" />

      {/* ── Font Group ── */}
      <div className="ribbon-group">
        <div className="ribbon-group-content flex-wrap gap-1">
          {/* Font Family */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-7 gap-1 bg-white/[0.04] text-[10px] text-gray-300 font-semibold px-2 border border-white/[0.06] rounded-md min-w-[100px] justify-between hover:bg-white/[0.08]">
                <Type className="w-3 h-3 text-blue-400 shrink-0" />
                <span className="truncate">Font</span>
                <ChevronDown className="w-3 h-3 shrink-0 opacity-40" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-xl border-white/10 text-white min-w-[200px]">
              {FONTS.map((f) => (
                <DropdownMenuItem key={f.value} onClick={() => editor.chain().focus().setFontFamily(f.value).run()} className="hover:bg-white/10 focus:bg-white/10 py-2.5 cursor-pointer" style={{ fontFamily: f.value }}>
                  {f.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Font Size */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-7 gap-1 bg-white/[0.04] text-[10px] text-gray-300 font-semibold px-2 border border-white/[0.06] rounded-md w-[64px] justify-between hover:bg-white/[0.08]">
                <span className="truncate">{currentFontSize}</span>
                <ChevronDown className="w-3 h-3 shrink-0 opacity-40" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-xl border-white/10 text-white min-w-[80px] max-h-[300px] overflow-y-auto">
              {FONT_SIZES.map((s) => (
                <DropdownMenuItem key={s} onClick={() => editor.chain().focus().setFontSize(s).run()} className="hover:bg-white/10 focus:bg-white/10 py-2 cursor-pointer text-sm">
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Font Style Buttons */}
          <div className="flex items-center gap-0.5">
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={`ribbon-btn ${editor.isActive('bold') ? 'ribbon-btn-active' : ''}`} title="Bold"><Bold className="w-3.5 h-3.5" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={`ribbon-btn ${editor.isActive('italic') ? 'ribbon-btn-active' : ''}`} title="Italic"><Italic className="w-3.5 h-3.5" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`ribbon-btn ${editor.isActive('underline') ? 'ribbon-btn-active' : ''}`} title="Underline"><UnderlineIcon className="w-3.5 h-3.5" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleStrike().run()} className={`ribbon-btn ${editor.isActive('strike') ? 'ribbon-btn-active' : ''}`} title="Strikethrough"><Strikethrough className="w-3.5 h-3.5" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleSubscript().run()} className={`ribbon-btn ${editor.isActive('subscript') ? 'ribbon-btn-active' : ''}`} title="Subscript"><SubscriptIcon className="w-3.5 h-3.5" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleSuperscript().run()} className={`ribbon-btn ${editor.isActive('superscript') ? 'ribbon-btn-active' : ''}`} title="Superscript"><SuperscriptIcon className="w-3.5 h-3.5" /></Button>
          </div>

          {/* Text Color & Highlight */}
          <div className="flex items-center gap-0.5 bg-white/[0.04] rounded-md border border-white/[0.06] p-0.5">
            <div className="relative">
              <Button type="button" variant="ghost" size="sm" className="ribbon-btn flex-col items-center justify-center" title="Text Color">
                <Type className="w-3 h-3" />
                <div className="w-4 h-1 rounded-full" style={{ backgroundColor: currentColor }} />
                <input type="color" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} value={currentColor} />
              </Button>
            </div>
            <div className="relative">
              <Button type="button" variant="ghost" size="sm" className="ribbon-btn flex-col items-center justify-center" title="Highlight">
                <PaintBucket className="w-3 h-3" />
                <div className="w-4 h-1 rounded-full" style={{ backgroundColor: currentHighlight === 'transparent' ? '#444' : currentHighlight }} />
                <input type="color" className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" onChange={(e) => editor.chain().focus().setHighlight({ color: e.target.value }).run()} value={currentHighlight === 'transparent' ? '#ffff00' : currentHighlight} />
              </Button>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} className="ribbon-btn text-red-400 hover:text-red-300 hover:bg-red-500/10" title="Clear Formatting">
              <Eraser className="w-3 h-3" />
            </Button>
          </div>
        </div>
        <span className="ribbon-group-label">Font</span>
      </div>

      <Separator orientation="vertical" className="h-auto bg-white/[0.06] mx-1" />

      {/* ── Paragraph Group ── */}
      <div className="ribbon-group">
        <div className="ribbon-group-content flex-wrap gap-1">
          {/* Alignment */}
          <div className="flex items-center gap-0.5">
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`ribbon-btn ${editor.isActive({ textAlign: 'left' }) ? 'ribbon-btn-active' : ''}`} title="Align Left"><AlignLeft className="w-3.5 h-3.5" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`ribbon-btn ${editor.isActive({ textAlign: 'center' }) ? 'ribbon-btn-active' : ''}`} title="Center"><AlignCenter className="w-3.5 h-3.5" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`ribbon-btn ${editor.isActive({ textAlign: 'right' }) ? 'ribbon-btn-active' : ''}`} title="Align Right"><AlignRight className="w-3.5 h-3.5" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={`ribbon-btn ${editor.isActive({ textAlign: 'justify' }) ? 'ribbon-btn-active' : ''}`} title="Justify"><AlignJustify className="w-3.5 h-3.5" /></Button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-0.5">
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`ribbon-btn ${editor.isActive('bulletList') ? 'ribbon-btn-active' : ''}`} title="Bullet List"><List className="w-3.5 h-3.5" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`ribbon-btn ${editor.isActive('orderedList') ? 'ribbon-btn-active' : ''}`} title="Numbered List"><ListOrdered className="w-3.5 h-3.5" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleTaskList().run()} className={`ribbon-btn ${editor.isActive('taskList') ? 'ribbon-btn-active' : ''}`} title="Task List"><CheckSquare className="w-3.5 h-3.5" /></Button>
          </div>

          {/* Indent */}
          <div className="flex items-center gap-0.5">
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.commands.indent()} className="ribbon-btn" title="Increase Indent"><IndentIncrease className="w-3.5 h-3.5" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.commands.outdent()} className="ribbon-btn" title="Decrease Indent"><IndentDecrease className="w-3.5 h-3.5" /></Button>
          </div>

          {/* Line Spacing */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="h-7 gap-1 bg-white/[0.04] text-[10px] text-gray-300 font-semibold px-2 border border-white/[0.06] rounded-md hover:bg-white/[0.08]" title="Line Spacing">
                <AlignJustify className="w-3 h-3 text-blue-400" />
                <span>Spacing</span>
                <ChevronDown className="w-3 h-3 opacity-40" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-xl border-white/10 text-white min-w-[120px]">
              {LINE_HEIGHTS.map((lh) => (
                <DropdownMenuItem key={lh.value} onClick={() => editor.commands.setLineHeight(lh.value)} className="hover:bg-white/10 focus:bg-white/10 py-2 cursor-pointer text-sm">
                  {lh.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <span className="ribbon-group-label">Paragraph</span>
      </div>

      <Separator orientation="vertical" className="h-auto bg-white/[0.06] mx-1" />

      {/* ── Styles Group ── */}
      <div className="ribbon-group">
        <div className="ribbon-group-content">
          <div className="flex items-center gap-1">
            {STYLES.map((style) => (
              <button
                key={style.label}
                type="button"
                onClick={() => style.action(editor)}
                className={`px-2.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all border whitespace-nowrap ${
                  style.check(editor)
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    : 'bg-white/[0.03] text-gray-500 border-white/[0.06] hover:bg-white/[0.06] hover:text-gray-300'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
        <span className="ribbon-group-label">Styles</span>
      </div>
    </div>
  );
};

export default HomeTab;
