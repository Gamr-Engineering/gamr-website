import React, { useCallback, useState, useEffect, useRef } from 'react';
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
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

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
  Image as ImageIcon, 
  Link as LinkIcon, 
  Type, 
  Highlighter, 
  Palette,
  Undo,
  Redo,
  Heading1,
  Heading2,
  CheckSquare,
  Video,
  Music,
  Youtube as YoutubeIcon,
  Plus,
  Quote,
  X,
  Code,
  Table as TableIcon,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Minus,
  Paperclip,
  Loader2,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

// Custom Video Extension
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
      class: { default: 'w-full rounded-xl aspect-video bg-black shadow-2xl border border-white/10 my-8' }
    };
  },
  parseHTML() { return [{ tag: 'video' }]; },
  renderHTML({ HTMLAttributes }) { return ['video', mergeAttributes(HTMLAttributes)]; },
});

// Custom Audio Extension
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
      class: { default: 'w-full mt-4 mb-8' }
    };
  },
  parseHTML() { return [{ tag: 'audio' }]; },
  renderHTML({ HTMLAttributes }) { return ['audio', mergeAttributes(HTMLAttributes)]; },
});

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, placeholder = "Start writing your article..." }) => {
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, show: false });
  const [floatingMenuPos, setFloatingMenuPos] = useState({ top: 0, left: 0, show: false });
  const [uploading, setUploading] = useState<"image" | "video" | "audio" | "attachment" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadType, setActiveUploadType] = useState<"image" | "video" | "audio" | "attachment">("image");
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      FontFamily,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({ allowBase64: true, HTMLAttributes: { class: 'rounded-xl max-w-full h-auto my-8 mx-auto block shadow-2xl' } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-blue-500 underline decoration-blue-500/30 hover:decoration-blue-500 transition-all' } }),
      Placeholder.configure({ placeholder }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Youtube.configure({ width: 800, height: 450, HTMLAttributes: { class: 'rounded-xl aspect-video w-full my-8 shadow-2xl border border-white/10' } }),
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
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      const isTextSelection = from !== to;
      
      if (isTextSelection) {
        const { view } = editor;
        const { state } = view;
        const { selection } = state;
        const coords = view.coordsAtPos(selection.from);
        setMenuPos({ top: coords.top - 50, left: coords.left, show: true });
      } else {
        setMenuPos(prev => ({ ...prev, show: false }));
      }

      // Floating menu logic (empty paragraph)
      const isAtStartOfEmptyParagraph = editor.state.selection.$from.parent.content.size === 0;
      if (isAtStartOfEmptyParagraph && !isTextSelection) {
        const coords = editor.view.coordsAtPos(editor.state.selection.from);
        setFloatingMenuPos({ top: coords.top, left: coords.left - 50, show: true });
      } else {
        setFloatingMenuPos(prev => ({ ...prev, show: false }));
      }
    },
    onBlur: () => {
      setMenuPos(prev => ({ ...prev, show: false }));
      setFloatingMenuPos(prev => ({ ...prev, show: false }));
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] p-6 text-white leading-relaxed lg:text-lg',
      },
    },
  });

  const handleUploadClick = (type: "image" | "video" | "audio" | "attachment") => {
    setActiveUploadType(type);
    if (fileInputRef.current) {
      if (type === "image") fileInputRef.current.accept = "image/*";
      else if (type === "video") fileInputRef.current.accept = "video/*";
      else if (type === "audio") fileInputRef.current.accept = "audio/*";
      else fileInputRef.current.accept = "*/*";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (fileInputRef.current) fileInputRef.current.value = '';

    const type = activeUploadType;
    setUploading(type);

    try {
      const maxSize = type === 'image' ? 10 : 100; // Increased limits
      if (file.size > maxSize * 1024 * 1024) {
        throw new Error(`File is too large. Maximum size for ${type} is ${maxSize}MB.`);
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('article_assets')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("article_assets")
        .getPublicUrl(fileName);

      const url = publicUrlData.publicUrl;

      if (type === "image") {
        editor?.chain().focus().setImage({ src: url }).run();
      } else if (type === "video") {
        editor?.chain().focus().insertContent(`<video src="${url}" controls></video>`).run();
      } else if (type === "audio") {
        editor?.chain().focus().insertContent(`<audio src="${url}" controls></audio>`).run();
      } else if (type === "attachment") {
        editor?.chain().focus().insertContent(`<a href="${url}" target="_blank" class="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl my-4 no-underline hover:bg-white/10 transition-all"><span class="p-2 bg-blue-500/20 rounded-lg"><Paperclip class="w-4 h-4 text-blue-400" /></span><div class="flex flex-col"><span class="text-sm font-bold text-white">${file.name}</span><span class="text-[10px] text-gray-500 uppercase tracking-widest">Attachment • ${(file.size / (1024 * 1024)).toFixed(2)} MB</span></div></a>`).run();
      }

      toast.success(`${type} uploaded successfully!`);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || `Failed to upload ${type}`);
    } finally {
      setUploading(null);
    }
  };

  const addYoutubeVideo = useCallback(() => {
    const url = window.prompt('YouTube URL');
    if (url) editor?.commands.setYoutubeVideo({ src: url });
  }, [editor]);

  if (!editor) return null;

  const fonts = [
    { name: 'Default', value: 'Inter' },
    { name: 'Serif', value: 'serif' },
    { name: 'Monospace', value: 'monospace' },
    { name: 'Playfair', value: 'Playfair Display' },
  ];

  const colors = ['#ffffff', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6b7280'];
  const highlights = ['#fbbf24', '#86efac', '#93c5fd', '#c084fc', '#f472b6', 'transparent'];

  return (
    <div className="w-full border border-white/10 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-2xl shadow-2xl relative group">
      
      {/* Custom Bubble Menu using Framer Motion (Stable & Builds) */}
      <AnimatePresence>
        {menuPos.show && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed z-[100] flex bg-gray-900/95 backdrop-blur-xl border border-white/10 p-1 rounded-xl shadow-2xl gap-1"
            style={{ top: menuPos.top, left: menuPos.left }}
          >
            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={`w-8 h-8 p-0 rounded-md ${editor.isActive('bold') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><Bold className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={`w-8 h-8 p-0 rounded-md ${editor.isActive('italic') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><Italic className="w-4 h-4" /></Button>
            <Separator orientation="vertical" className="h-6 bg-white/10 mx-1" />
            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`w-8 h-8 p-0 rounded-md ${editor.isActive('heading', { level: 1 }) ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><Heading1 className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`w-8 h-8 p-0 rounded-md ${editor.isActive('blockquote') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><Quote className="w-4 h-4" /></Button>
          </motion.div>
        )}
      </AnimatePresence>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange} 
      />

      {/* Custom Floating Menu */}
      <AnimatePresence>
        {floatingMenuPos.show && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="fixed z-[99] flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 transition-colors cursor-pointer border border-blue-500/30 shadow-lg"
            style={{ top: floatingMenuPos.top, left: floatingMenuPos.left }}
            onClick={(e) => {
              e.preventDefault();
              handleUploadClick("image");
            }}
          >
            <Plus className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toolbar */}
      <div className="bg-gray-900/70 border-b border-white/10 sticky top-0 z-20 backdrop-blur-xl">
        {/* Mobile Toolbar (Single Row Scrollable) */}
        <div className="flex items-center gap-1 p-2 md:hidden overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1">
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="w-8 h-8 p-0 text-gray-500"><Undo className="w-4 h-4" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="w-8 h-8 p-0 text-gray-500"><Redo className="w-4 h-4" /></Button>
          </div>
          <Separator orientation="vertical" className="h-6 bg-white/10 mx-1 shrink-0" />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] px-2 hover:bg-white/5">
                <Type className="w-3.5 h-3.5" />
                Font
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-white/10 text-white min-w-[150px]">
              {fonts.map((f) => (
                <DropdownMenuItem key={f.value} onClick={() => editor.chain().focus().setFontFamily(f.value).run()} className="hover:bg-white/10 focus:bg-white/10 py-2 cursor-pointer" style={{ fontFamily: f.value }}>{f.name}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`w-8 h-8 p-0 ${editor.isActive('heading', { level: 1 }) ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><Heading1 className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={`w-8 h-8 p-0 ${editor.isActive('bold') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><Bold className="w-4 h-4" /></Button>
          </div>

          <Separator orientation="vertical" className="h-6 bg-white/10 mx-1 shrink-0" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-gray-400 hover:text-white bg-white/5 rounded-full"><Plus className="w-4 h-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-900 border-white/10 text-white min-w-[200px]">
              <DropdownMenuItem onClick={() => handleUploadClick("image")} className="gap-3 py-2.5 cursor-pointer hover:bg-white/5"><ImageIcon className="w-4 h-4 text-blue-400" /> Image</DropdownMenuItem>
              <DropdownMenuItem onClick={addYoutubeVideo} className="gap-3 py-2.5 cursor-pointer hover:bg-white/5"><YoutubeIcon className="w-4 h-4 text-red-500" /> YouTube</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUploadClick("video")} className="gap-3 py-2.5 cursor-pointer hover:bg-white/5"><Video className="w-4 h-4 text-purple-400" /> Video</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleUploadClick("audio")} className="gap-3 py-2.5 cursor-pointer hover:bg-white/5"><Music className="w-4 h-4 text-emerald-400" /> Audio</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Toolbar (Two Layers) */}
        <div className="hidden md:block">
          {/* Row 1: Formatting & Typography */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
            <div className="flex flex-col items-center shrink-0 border-r border-white/10 pr-2">
              <div className="flex items-center gap-0.5">
                <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="w-7 h-7 p-0 text-gray-400"><Undo className="w-3.5 h-3.5" /></Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="w-7 h-7 p-0 text-gray-400"><Redo className="w-3.5 h-3.5" /></Button>
              </div>
              <span className="text-[8px] uppercase font-bold text-gray-600 tracking-tight mt-0.5">History</span>
            </div>

            <div className="flex flex-col items-center shrink-0 border-r border-white/10 pr-2">
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 gap-1.5 bg-white/5 text-[10px] text-gray-300 font-bold uppercase tracking-wider px-2 border border-white/5">
                      <Type className="w-3 h-3 text-blue-400" />
                      Font
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900 border-white/10 text-white min-w-[180px]">
                    {fonts.map((f) => (
                      <DropdownMenuItem key={f.value} onClick={() => editor.chain().focus().setFontFamily(f.value).run()} className="hover:bg-white/10 focus:bg-white/10 py-2 cursor-pointer" style={{ fontFamily: f.value }}>{f.name}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center bg-white/5 rounded p-0.5 border border-white/5">
                  <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`h-6 px-1.5 text-[9px] font-bold ${editor.isActive('heading', { level: 1 }) ? 'text-blue-500 bg-white/10' : 'text-gray-500'}`}>H1</Button>
                  <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`h-6 px-1.5 text-[9px] font-bold ${editor.isActive('heading', { level: 2 }) ? 'text-blue-500 bg-white/10' : 'text-gray-500'}`}>H2</Button>
                  <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`h-6 px-1.5 text-[9px] font-bold ${editor.isActive('heading', { level: 3 }) ? 'text-blue-500 bg-white/10' : 'text-gray-500'}`}>H3</Button>
                </div>
              </div>
              <span className="text-[8px] uppercase font-bold text-gray-600 tracking-tight mt-0.5">Typography</span>
            </div>

            <div className="flex flex-col items-center shrink-0 border-r border-white/10 pr-2">
              <div className="flex items-center gap-0.5">
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={`w-7 h-7 p-0 ${editor.isActive('bold') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><Bold className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={`w-7 h-7 p-0 ${editor.isActive('italic') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><Italic className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`w-7 h-7 p-0 ${editor.isActive('underline') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><UnderlineIcon className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleStrike().run()} className={`w-7 h-7 p-0 ${editor.isActive('strike') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><Strikethrough className="w-3.5 h-3.5" /></Button>
                <Separator orientation="vertical" className="h-3.5 bg-white/10 mx-0.5" />
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleSubscript().run()} className={`w-7 h-7 p-0 ${editor.isActive('subscript') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><SubscriptIcon className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleSuperscript().run()} className={`w-7 h-7 p-0 ${editor.isActive('superscript') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><SuperscriptIcon className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleCode().run()} className={`w-7 h-7 p-0 ${editor.isActive('code') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><Code className="w-3.5 h-3.5" /></Button>
              </div>
              <span className="text-[8px] uppercase font-bold text-gray-600 tracking-tight mt-0.5">Font Styles</span>
            </div>

            <div className="flex flex-col items-center shrink-0">
              <div className="flex items-center gap-0.5">
                <Popover>
                  <PopoverTrigger asChild><Button variant="ghost" size="sm" className="w-7 h-7 p-0 text-gray-400 hover:text-white"><Palette className="w-3.5 h-3.5" /></Button></PopoverTrigger>
                  <PopoverContent className="w-auto p-2 bg-gray-900 border-white/10 flex gap-1 shadow-2xl backdrop-blur-xl">
                    {colors.map(c => (<button key={c} className="w-6 h-6 rounded border border-white/10 shadow-sm" style={{ backgroundColor: c }} onClick={() => editor.chain().focus().setColor(c).run()} />))}
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild><Button variant="ghost" size="sm" className="w-7 h-7 p-0 text-gray-400 hover:text-white"><Highlighter className="w-3.5 h-3.5" /></Button></PopoverTrigger>
                  <PopoverContent className="w-auto p-2 bg-gray-900 border-white/10 flex gap-1 shadow-2xl backdrop-blur-xl">
                    {highlights.map(h => (<button key={h} className={`w-6 h-6 rounded border border-white/10 ${h === 'transparent' ? 'relative overflow-hidden bg-white' : ''}`} style={{ backgroundColor: h === 'transparent' ? 'transparent' : h }} onClick={() => editor.chain().focus().toggleHighlight({ color: h }).run()}>{h === 'transparent' && <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500 rotate-45" />}</button>))}
                  </PopoverContent>
                </Popover>
              </div>
              <span className="text-[8px] uppercase font-bold text-gray-600 tracking-tight mt-0.5">Colors</span>
            </div>
          </div>

          {/* Row 2: Layout, Media & Tables */}
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="flex flex-col items-center shrink-0 border-r border-white/10 pr-2">
              <div className="flex items-center gap-0.5">
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`w-7 h-7 p-0 ${editor.isActive({ textAlign: 'left' }) ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><AlignLeft className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`w-7 h-7 p-0 ${editor.isActive({ textAlign: 'center' }) ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><AlignCenter className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`w-7 h-7 p-0 ${editor.isActive({ textAlign: 'right' }) ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><AlignRight className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={`w-7 h-7 p-0 ${editor.isActive({ textAlign: 'justify' }) ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><AlignJustify className="w-3.5 h-3.5" /></Button>
              </div>
              <span className="text-[8px] uppercase font-bold text-gray-600 tracking-tight mt-0.5">Alignment</span>
            </div>

            <div className="flex flex-col items-center shrink-0 border-r border-white/10 pr-2">
              <div className="flex items-center gap-0.5">
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`w-7 h-7 p-0 ${editor.isActive('bulletList') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><List className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`w-7 h-7 p-0 ${editor.isActive('orderedList') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><ListOrdered className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleTaskList().run()} className={`w-7 h-7 p-0 ${editor.isActive('taskList') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><CheckSquare className="w-3.5 h-3.5" /></Button>
              </div>
              <span className="text-[8px] uppercase font-bold text-gray-600 tracking-tight mt-0.5">Lists</span>
            </div>

            <div className="flex flex-col items-center shrink-0 border-r border-white/10 pr-2">
              <div className="flex items-center gap-1">
                 <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="h-7 gap-1 bg-white/5 text-[9px] text-gray-400 font-bold px-2 border border-white/5"><TableIcon className="w-3 h-3" /> Table</Button>
                 <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().setHorizontalRule().run()} className="w-7 h-7 p-0 text-gray-400 hover:text-white"><Minus className="w-3.5 h-3.5" /></Button>
                 <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`w-7 h-7 p-0 ${editor.isActive('blockquote') ? 'text-blue-500 bg-white/10' : 'text-gray-400'}`}><Quote className="w-3.5 h-3.5" /></Button>
              </div>
              <span className="text-[8px] uppercase font-bold text-gray-600 tracking-tight mt-0.5">Structure</span>
            </div>

            <div className="flex flex-col items-center shrink-0 ml-auto pl-2 border-l border-white/10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" size="sm" className="h-7 gap-1.5 bg-blue-500 text-white text-[9px] font-bold uppercase tracking-wide px-3 hover:bg-blue-600 shadow-lg rounded-full whitespace-nowrap" disabled={uploading !== null}>
                    {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                    {uploading ? "Uploading..." : "Insert Media"}
                   </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border-white/10 text-white min-w-[200px]">
                  <DropdownMenuItem onClick={() => handleUploadClick("image")} className="gap-3 py-2.5 cursor-pointer hover:bg-white/5"><ImageIcon className="w-4 h-4 text-blue-400" /> Image File</DropdownMenuItem>
                  <DropdownMenuItem onClick={addYoutubeVideo} className="gap-3 py-2.5 cursor-pointer hover:bg-white/5"><YoutubeIcon className="w-4 h-4 text-red-500" /> YouTube Video</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUploadClick("video")} className="gap-3 py-2.5 cursor-pointer hover:bg-white/5"><Video className="w-4 h-4 text-purple-400" /> Video File</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUploadClick("audio")} className="gap-3 py-2.5 cursor-pointer hover:bg-white/5"><Music className="w-4 h-4 text-emerald-400" /> Audio File</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUploadClick("attachment")} className="gap-3 py-2.5 cursor-pointer hover:bg-white/5"><Paperclip className="w-4 h-4 text-orange-400" /> Attachment</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="text-[8px] uppercase font-bold text-gray-600 tracking-tight mt-0.5">Media</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <EditorContent editor={editor} />
        
        <div className="absolute bottom-4 right-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 flex gap-4 pointer-events-none transition-opacity group-hover:opacity-100 opacity-60">
          <span>{editor.storage.characterCount.words()} Words</span>
          <span>{editor.storage.characterCount.characters()} Characters</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #4b5563;
          pointer-events: none;
          height: 0;
          font-style: italic;
        }
        .tiptap { outline: none !important; }
        .tiptap ul, .tiptap ol { padding: 0 1.2rem; margin: 1.5rem 0; }
        .tiptap ul { list-style-type: disc; }
        .tiptap ol { list-style-type: decimal; }
        .tiptap blockquote {
          border-left: 4px solid #3b82f6;
          padding: 0.5rem 1.5rem;
          margin: 2rem 0;
          background: rgba(59, 130, 246, 0.05);
          border-radius: 0 0.75rem 0.75rem 0;
          font-style: italic;
          color: #94a3b8;
        }
        .tiptap img.ProseMirror-selectednode { outline: 4px solid #3b82f6; outline-offset: 4px; }
        .tiptap video.ProseMirror-selectednode { outline: 4px solid #a855f7; outline-offset: 4px; }
        .tiptap audio.ProseMirror-selectednode { outline: 4px solid #10b981; outline-offset: 4px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
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
        
        .tiptap sub { vertical-align: sub; font-size: smaller; }
        .tiptap sup { vertical-align: super; font-size: smaller; }
      `}} />
    </div>
  );
};

export default RichTextEditor;
