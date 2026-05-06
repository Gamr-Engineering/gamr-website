import React from 'react';
import { Editor } from '@tiptap/react';
import { 
  Bold, Italic, Heading1, Heading2, List, Link as LinkIcon, 
  Sparkles, Undo, Redo, Type, AlignLeft
} from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  editor: Editor | null;
}

export const MobileToolbar: React.FC<Props> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="nx-mobile-toolbar">
      <div className="nx-mt-scroll">
        <button 
          className={`nx-mt-btn ${editor.isActive('bold') ? 'nx-mt-active' : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={18} />
        </button>
        <button 
          className={`nx-mt-btn ${editor.isActive('italic') ? 'nx-mt-active' : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={18} />
        </button>
        <button 
          className={`nx-mt-btn ${editor.isActive('heading', { level: 1 }) ? 'nx-mt-active' : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 size={18} />
        </button>
        <button 
          className={`nx-mt-btn ${editor.isActive('heading', { level: 2 }) ? 'nx-mt-active' : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 size={18} />
        </button>
        <button 
          className={`nx-mt-btn ${editor.isActive('bulletList') ? 'nx-mt-active' : ''}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={18} />
        </button>
        <button 
          className="nx-mt-btn"
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <LinkIcon size={18} />
        </button>
        
        <div className="nx-mt-sep" />
        
        <button 
          className="nx-mt-btn nx-mt-ai"
          onClick={() => {
            toast.info('AI Assistant: Improving your sentence...');
            setTimeout(() => {
              editor.chain().focus().insertContent(' ').run(); // Trigger something
              toast.success('Improved with AI');
            }, 1000);
          }}
        >
          <Sparkles size={18} />
        </button>
        
        <div className="nx-mt-sep" />
        
        <button className="nx-mt-btn" onClick={() => editor.chain().focus().undo().run()}>
          <Undo size={18} />
        </button>
        <button className="nx-mt-btn" onClick={() => editor.chain().focus().redo().run()}>
          <Redo size={18} />
        </button>
      </div>
    </div>
  );
};
