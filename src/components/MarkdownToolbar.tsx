import React, { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, Image as ImageIcon, Video, Music, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface MarkdownToolbarProps {
  onInsert: (text: string) => void;
}

const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({ onInsert }) => {
  const [uploading, setUploading] = useState<"image" | "video" | "audio" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadType, setActiveUploadType] = useState<"image" | "video" | "audio">("image");

  const handleUploadClick = (type: "image" | "video" | "audio") => {
    setActiveUploadType(type);
    if (fileInputRef.current) {
      if (type === "image") fileInputRef.current.accept = "image/*";
      if (type === "video") fileInputRef.current.accept = "video/*";
      if (type === "audio") fileInputRef.current.accept = "audio/*";
      fileInputRef.current.click();
    }
  };

  const generateUUID = () => {
    try {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    } catch { /* ignore */ }
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so the same file could be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = '';

    const type = activeUploadType;
    setUploading(type);

    try {
      // Validate size (50MB max for video/audio, 5MB for images)
      const maxSize = type === 'image' ? 5 : 50;
      if (file.size > maxSize * 1024 * 1024) {
        throw new Error(`File is too large. Maximum size for ${type} is ${maxSize}MB.`);
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${generateUUID()}.${fileExt}`;

      const { error } = await supabase.storage
        .from('article_assets')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("article_assets")
        .getPublicUrl(fileName);

      const url = publicUrlData.publicUrl;

      let injectedText = "";
      if (type === "image") {
        injectedText = `\n![${file.name}](${url})\n`;
      } else if (type === "video") {
        injectedText = `\n<video controls class="w-full rounded-xl aspect-video bg-black shadow-2xl border border-white/10 my-8"><source src="${url}" type="${file.type}" /></video>\n`;
      } else if (type === "audio") {
        injectedText = `\n<audio controls class="w-full mt-4 mb-8" src="${url}"></audio>\n`;
      }

      onInsert(injectedText);
      toast.success(`${type} uploaded successfully!`);

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || `Failed to upload ${type}`);
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-black/40 border border-white/10 rounded-t-2xl border-b-0 text-gray-400">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange} 
      />

      <div className="flex items-center gap-1 border-r border-white/10 pr-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onInsert("**Bold Text**")}
          className="w-8 h-8 p-0 hover:bg-white/10 hover:text-white"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onInsert("*Italic Text*")}
          className="w-8 h-8 p-0 hover:bg-white/10 hover:text-white"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onInsert("- List Item\n- List Item")}
          className="w-8 h-8 p-0 hover:bg-white/10 hover:text-white"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-1 pl-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleUploadClick("image")}
          disabled={uploading !== null}
          className="h-8 px-2 hover:bg-white/10 text-white hover:text-blue-400 text-xs font-bold uppercase tracking-widest gap-2"
        >
          {uploading === "image" ? <Loader2 className="w-4 h-4 animate-spin text-blue-500" /> : <ImageIcon className="w-4 h-4 text-blue-500" />}
          Attach Image
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleUploadClick("video")}
          disabled={uploading !== null}
          className="h-8 px-2 hover:bg-white/10 text-white hover:text-purple-400 text-xs font-bold uppercase tracking-widest gap-2"
        >
          {uploading === "video" ? <Loader2 className="w-4 h-4 animate-spin text-purple-500" /> : <Video className="w-4 h-4 text-purple-500" />}
          Attach Video
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleUploadClick("audio")}
          disabled={uploading !== null}
          className="h-8 px-2 hover:bg-white/10 text-white hover:text-emerald-400 text-xs font-bold uppercase tracking-widest gap-2"
        >
          {uploading === "audio" ? <Loader2 className="w-4 h-4 animate-spin text-emerald-500" /> : <Music className="w-4 h-4 text-emerald-500" />}
          Attach Audio
        </Button>
      </div>
      
      <div className="ml-auto text-[10px] uppercase font-bold text-gray-600 tracking-widest pr-2 hidden sm:block">
        Markdown Supported
      </div>
    </div>
  );
};

export default MarkdownToolbar;
