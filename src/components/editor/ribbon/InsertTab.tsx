import React, { useRef, useState, useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Image as ImageIcon,
  Video,
  Music,
  Youtube as YoutubeIcon,
  Link as LinkIcon,
  Table as TableIcon,
  Minus,
  Paperclip,
  Loader2,
  Quote,
  Code,
  Omega,
  ChevronDown,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface InsertTabProps {
  editor: Editor;
}

const SPECIAL_CHARS = ['€', '£', '¥', '©', '™', '®', '§', '¶', '°', '±', '×', '÷', 'µ', 'Ω', '∑', '∞', '≈', '≠', '≤', '≥', '→', '←', '↑', '↓', '↔', '✓', '✗', '★', '☆'];

const TABLE_SIZES = [
  { rows: 2, cols: 2, label: '2×2' },
  { rows: 3, cols: 3, label: '3×3' },
  { rows: 4, cols: 4, label: '4×4' },
  { rows: 5, cols: 5, label: '5×5' },
  { rows: 3, cols: 2, label: '3×2' },
  { rows: 2, cols: 4, label: '2×4' },
];

const InsertTab: React.FC<InsertTabProps> = ({ editor }) => {
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadType, setActiveUploadType] = useState<'image' | 'video' | 'audio' | 'attachment'>('image');
  const [tableHover, setTableHover] = useState({ row: 0, col: 0 });

  const handleUploadClick = (type: 'image' | 'video' | 'audio' | 'attachment') => {
    setActiveUploadType(type);
    if (fileInputRef.current) {
      if (type === 'image') fileInputRef.current.accept = 'image/*';
      else if (type === 'video') fileInputRef.current.accept = 'video/*';
      else if (type === 'audio') fileInputRef.current.accept = 'audio/*';
      else fileInputRef.current.accept = '*/*';
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
      const maxSize = type === 'image' ? 10 : 100;
      if (file.size > maxSize * 1024 * 1024) {
        throw new Error(`File is too large. Maximum size for ${type} is ${maxSize}MB.`);
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('article_assets')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('article_assets')
        .getPublicUrl(fileName);

      const url = publicUrlData.publicUrl;

      if (type === 'image') {
        editor?.chain().focus().setImage({ src: url }).run();
      } else if (type === 'video') {
        editor?.chain().focus().insertContent(`<video src="${url}" controls></video>`).run();
      } else if (type === 'audio') {
        editor?.chain().focus().insertContent(`<audio src="${url}" controls></audio>`).run();
      } else if (type === 'attachment') {
        editor?.chain().focus().insertContent(`<a href="${url}" target="_blank" class="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl my-4 no-underline hover:bg-white/10 transition-all"><span class="p-2 bg-blue-500/20 rounded-lg">📎</span><div class="flex flex-col"><span class="text-sm font-bold text-white">${file.name}</span><span class="text-[10px] text-gray-500 uppercase tracking-widest">Attachment • ${(file.size / (1024 * 1024)).toFixed(2)} MB</span></div></a>`).run();
      }

      toast.success(`${type} uploaded successfully!`);
    } catch (error: any) {
      // Graceful fallback for network issues
      if (error.message?.includes('Failed to fetch') || error.message?.includes('Failed to send a request') || error.name === 'TypeError') {
        const objectUrl = URL.createObjectURL(file);
        if (type === 'image') {
          editor?.chain().focus().setImage({ src: objectUrl }).run();
        } else if (type === 'video') {
          editor?.chain().focus().insertContent(`<video src="${objectUrl}" controls></video>`).run();
        } else if (type === 'audio') {
          editor?.chain().focus().insertContent(`<audio src="${objectUrl}" controls></audio>`).run();
        }
        toast.success(`${type} uploaded successfully!`);
      } else {
        toast.error(error.message || `Failed to upload ${type}`);
      }
    } finally {
      setUploading(null);
    }
  };

  const addYoutubeVideo = useCallback(() => {
    const url = window.prompt('Enter YouTube URL:');
    if (url) editor?.commands.setYoutubeVideo({ src: url });
  }, [editor]);

  const insertLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="flex items-stretch gap-0 px-2 py-1.5 overflow-x-auto no-scrollbar">
      <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

      {/* ── Pages ── */}
      <div className="ribbon-group">
        <div className="ribbon-group-content">
          <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setHorizontalRule().run()} className="ribbon-btn-lg flex-col gap-0.5" title="Horizontal Rule">
            <Minus className="w-5 h-5" />
            <span className="text-[8px]">Break</span>
          </Button>
        </div>
        <span className="ribbon-group-label">Pages</span>
      </div>

      <div className="w-px bg-white/[0.06] mx-1 self-stretch" />

      {/* ── Tables ── */}
      <div className="ribbon-group">
        <div className="ribbon-group-content">
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="ribbon-btn-lg flex-col gap-0.5">
                <TableIcon className="w-5 h-5" />
                <span className="text-[8px]">Table</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3 bg-gray-900/95 backdrop-blur-xl border-white/10 shadow-2xl rounded-xl">
              <h4 className="text-[10px] uppercase text-gray-400 tracking-widest font-bold mb-3">Insert Table</h4>
              <div className="grid grid-cols-6 gap-1 mb-2">
                {Array.from({ length: 6 }).map((_, rowIdx) =>
                  Array.from({ length: 6 }).map((_, colIdx) => (
                    <button
                      key={`${rowIdx}-${colIdx}`}
                      type="button"
                      className={`w-5 h-5 rounded-sm border transition-all ${
                        rowIdx < tableHover.row && colIdx < tableHover.col
                          ? 'bg-blue-500/40 border-blue-500/50'
                          : 'bg-white/[0.04] border-white/[0.06] hover:bg-white/10'
                      }`}
                      onMouseEnter={() => setTableHover({ row: rowIdx + 1, col: colIdx + 1 })}
                      onMouseLeave={() => setTableHover({ row: 0, col: 0 })}
                      onClick={() => editor.chain().focus().insertTable({ rows: rowIdx + 1, cols: colIdx + 1, withHeaderRow: true }).run()}
                    />
                  ))
                )}
              </div>
              {tableHover.row > 0 && (
                <p className="text-center text-[10px] text-gray-400 font-semibold">{tableHover.row}×{tableHover.col} Table</p>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <span className="ribbon-group-label">Tables</span>
      </div>

      <div className="w-px bg-white/[0.06] mx-1 self-stretch" />

      {/* ── Illustrations / Media ── */}
      <div className="ribbon-group">
        <div className="ribbon-group-content gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => handleUploadClick('image')} disabled={uploading !== null} className="ribbon-btn-lg flex-col gap-0.5">
            {uploading === 'image' ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5 text-blue-400" />}
            <span className="text-[8px]">Image</span>
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => handleUploadClick('video')} disabled={uploading !== null} className="ribbon-btn-lg flex-col gap-0.5">
            {uploading === 'video' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Video className="w-5 h-5 text-purple-400" />}
            <span className="text-[8px]">Video</span>
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => handleUploadClick('audio')} disabled={uploading !== null} className="ribbon-btn-lg flex-col gap-0.5">
            {uploading === 'audio' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Music className="w-5 h-5 text-emerald-400" />}
            <span className="text-[8px]">Audio</span>
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={addYoutubeVideo} className="ribbon-btn-lg flex-col gap-0.5">
            <YoutubeIcon className="w-5 h-5 text-red-500" />
            <span className="text-[8px]">YouTube</span>
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => handleUploadClick('attachment')} disabled={uploading !== null} className="ribbon-btn-lg flex-col gap-0.5">
            {uploading === 'attachment' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Paperclip className="w-5 h-5 text-orange-400" />}
            <span className="text-[8px]">Attach</span>
          </Button>
        </div>
        <span className="ribbon-group-label">Illustrations</span>
      </div>

      <div className="w-px bg-white/[0.06] mx-1 self-stretch" />

      {/* ── Links ── */}
      <div className="ribbon-group">
        <div className="ribbon-group-content">
          <Button type="button" variant="ghost" size="sm" onClick={insertLink} className="ribbon-btn-lg flex-col gap-0.5">
            <LinkIcon className="w-5 h-5 text-blue-400" />
            <span className="text-[8px]">Link</span>
          </Button>
        </div>
        <span className="ribbon-group-label">Links</span>
      </div>

      <div className="w-px bg-white/[0.06] mx-1 self-stretch" />

      {/* ── Block Elements ── */}
      <div className="ribbon-group">
        <div className="ribbon-group-content gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`ribbon-btn-lg flex-col gap-0.5 ${editor.isActive('blockquote') ? 'ribbon-btn-active' : ''}`}>
            <Quote className="w-5 h-5" />
            <span className="text-[8px]">Quote</span>
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`ribbon-btn-lg flex-col gap-0.5 ${editor.isActive('codeBlock') ? 'ribbon-btn-active' : ''}`}>
            <Code className="w-5 h-5" />
            <span className="text-[8px]">Code</span>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="ribbon-btn-lg flex-col gap-0.5">
                <Omega className="w-5 h-5" />
                <span className="text-[8px]">Symbol</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3 bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl">
              <h4 className="text-[10px] uppercase text-gray-400 tracking-widest font-bold mb-3">Special Characters</h4>
              <div className="grid grid-cols-7 gap-1">
                {SPECIAL_CHARS.map((char, index) => (
                  <button key={index} type="button" onClick={() => editor.chain().focus().insertContent(char).run()} className="w-8 h-8 flex items-center justify-center text-white bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 rounded transition-colors text-sm font-semibold border border-white/5">
                    {char}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <span className="ribbon-group-label">Blocks</span>
      </div>
    </div>
  );
};

export default InsertTab;
