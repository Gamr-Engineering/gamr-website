import React from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { Editor } from '@tiptap/react';
import { toast } from 'sonner';

interface Props { editor: Editor | null; }

export const QuickAccessBar: React.FC<Props> = ({ editor }) => {
  const {
    isPreviewMode, setIsPreviewMode, isFocusMode, toggleFocusMode,
    setFindReplaceOpen, wordCount, charCount, sentenceCount, paragraphCount,
    readingTimeMinutes, lineCount
  } = useEditorStore();

  const handleUndo = () => editor?.chain().focus().undo().run();
  const handleRedo = () => editor?.chain().focus().redo().run();
  const handleAIDraft = () => toast.info('AI Draft: Generating introduction...');
  const handleBlock = () => toast.info('Block picker opening...');
  const handleTemplates = () => toast.info('Templates drawer opening...');
  const handleShortcuts = () => toast.info('Keyboard shortcuts: Ctrl+B Bold, Ctrl+I Italic, Ctrl+U Underline, Ctrl+K Link, Ctrl+Z Undo, Ctrl+Y Redo, Ctrl+S Save, Ctrl+F Find');
  const handleFindReplace = () => setFindReplaceOpen(true);
  const handleWordCount = () => toast.info(`Words: ${wordCount} | Chars: ${charCount} | Lines: ${lineCount} | Sentences: ${sentenceCount} | Paragraphs: ${paragraphCount} | Reading: ${readingTimeMinutes < 1 ? '<1' : readingTimeMinutes} min`);
  const handleDocMap = () => toast.info('Document map opening...');
  const handleCollab = () => toast.info('Collaboration: Invite collaborators via email');
  const handleHistory = () => toast.info('Version history opening...');

  const handleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  };

  return (
    <div className="nx-quickbar">
      <div className="nx-quickbar-left">
        <button className="nx-qbtn" onClick={handleUndo} title="Undo (Ctrl+Z)">↩</button>
        <button className="nx-qbtn" onClick={handleRedo} title="Redo (Ctrl+Y)">↪</button>
        <span className="nx-qsep" />
        <button className="nx-qbtn nx-qbtn-ai" onClick={handleAIDraft}>✦ AI Draft</button>
        <button className="nx-qbtn" onClick={handleBlock}>+ Block</button>
        <button className="nx-qbtn" onClick={handleTemplates}>Templates</button>
        <button className="nx-qbtn" onClick={handleShortcuts}>Shortcuts</button>
        <span className="nx-qsep" />
        <button className="nx-qbtn" onClick={handleFindReplace}>Find & Replace</button>
        <button className="nx-qbtn" onClick={handleWordCount}>Word Count</button>
        <button className="nx-qbtn" onClick={handleDocMap}>Doc Map</button>
        <span className="nx-qsep" />
        <button className="nx-qbtn" onClick={handleCollab}>Collab</button>
        <button className="nx-qbtn" onClick={handleHistory}>History</button>
      </div>
      <div className="nx-quickbar-right">
        <button className={`nx-qbtn nx-qbtn-mode ${!isPreviewMode ? 'nx-active' : ''}`}
          onClick={() => setIsPreviewMode(false)}>✏ EDIT</button>
        <button className={`nx-qbtn nx-qbtn-mode ${isPreviewMode ? 'nx-active' : ''}`}
          onClick={() => setIsPreviewMode(true)}>👁 PREVIEW</button>
        <button className={`nx-qbtn nx-qbtn-mode ${isFocusMode ? 'nx-active' : ''}`}
          onClick={toggleFocusMode}>◉ FOCUS</button>
        <button className="nx-qbtn nx-qbtn-mode" onClick={handleFullscreen}>⤢ FULLSCREEN</button>
      </div>
    </div>
  );
};
