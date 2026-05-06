import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorContent } from '@tiptap/react';
import { useEditorStore } from '@/stores/editorStore';
import { toast } from 'sonner';
import { MobileTopBar } from './MobileTopBar';
import { MobileFormattingStrip } from './MobileFormattingStrip';
import { MobileCommandStrip } from './MobileCommandStrip';
import { BottomSheet } from './BottomSheet';
import {
  OutlineSheetContent, InsertSheetContent, AICopilotSheetContent,
  MoreOptionsSheetContent, StyleSheetContent, PublishSheetContent
} from './MobileSheets';

interface Props {
  editor: Editor | null;
  embedded?: boolean;
}

export const MobileLayout: React.FC<Props> = ({ editor, embedded = false }) => {
  const [activeSheet, setActiveSheet] = useState<string | null>(null);
  const { wordCount } = useEditorStore();

  // Keyboard visibility handling
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const handler = () => {
      const kbHeight = window.innerHeight - vv.height;
      document.documentElement.style.setProperty('--nxm-kb-height', `${Math.max(0, kbHeight)}px`);
    };
    vv.addEventListener('resize', handler);
    return () => vv.removeEventListener('resize', handler);
  }, []);

  const openSheet = (name: string) => setActiveSheet(name);
  const closeSheet = () => setActiveSheet(null);

  const hasContent = editor && editor.getText().trim().length > 0;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '100vw',
      height: '75vh',
      minHeight: '480px',
      overflow: 'hidden',
      background: '#0d0d1c',
      borderRadius: '12px',
      border: '1px solid #1e1e38',
      position: 'relative',
    }}>
      {/* TOP BAR — 44px */}
      <MobileTopBar onOpenMore={() => openSheet('more')} />

      {/* EDITOR CANVAS — flex:1 */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '20px 16px 24px',
        background: '#0a0a18',
        WebkitOverflowScrolling: 'touch',
        position: 'relative',
      }}>
        {editor && <EditorContent editor={editor} />}

        {/* Empty state — quick start chips */}
        {!hasContent && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            pointerEvents: 'none',
            width: '100%',
            padding: '0 20px',
            boxSizing: 'border-box' as const,
          }}>
            <span style={{ color: '#1e1e38', fontSize: '18px', fontStyle: 'italic', fontFamily: 'Lora, serif' }}>
              Tap to begin writing...
            </span>
            <div style={{ display: 'flex', gap: '10px', pointerEvents: 'all' as const }}>
              <button className="nxm-quickstart-chip" onClick={() => {
                toast.info('AI Write: Generating content...');
                setTimeout(() => {
                  editor?.chain().focus().insertContent('In the rapidly evolving landscape of gaming and esports, Africa stands at the forefront of a digital revolution...').run();
                  toast.success('AI content generated');
                }, 1500);
              }}>✦ AI Write</button>
              <button className="nxm-quickstart-chip" onClick={() => toast.info('Templates — Coming soon')}>+ Template</button>
              <button className="nxm-quickstart-chip" onClick={() => {
                navigator.clipboard.readText().then(t => editor?.chain().focus().insertContent(t).run()).catch(() => toast.error('Paste failed'));
              }}>Paste</button>
            </div>
          </div>
        )}
      </div>

      {/* FORMATTING STRIP — 44px */}
      <MobileFormattingStrip editor={editor} />

      {/* COMMAND STRIP — 56px */}
      <MobileCommandStrip
        editor={editor}
        onOpenInsert={() => openSheet('insert')}
        onOpenAI={() => openSheet('ai')}
        onOpenOutline={() => openSheet('outline')}
        onOpenStyle={() => openSheet('style')}
        onOpenPublish={() => openSheet('publish')}
      />

      {/* ═══ BOTTOM SHEETS — portaled to document.body ═══ */}
      {typeof document !== 'undefined' && ReactDOM.createPortal(
        <>
          <BottomSheet isOpen={activeSheet === 'outline'} onClose={closeSheet} height="75vh" title="Document Outline">
            <OutlineSheetContent editor={editor} onClose={closeSheet} />
          </BottomSheet>
          <BottomSheet isOpen={activeSheet === 'insert'} onClose={closeSheet} height="75vh" title="Insert">
            <InsertSheetContent editor={editor} onClose={closeSheet} />
          </BottomSheet>
          <BottomSheet isOpen={activeSheet === 'ai'} onClose={closeSheet} height="90vh" title="✦ AI Copilot" titleColor="#4ade80">
            <AICopilotSheetContent editor={editor} />
          </BottomSheet>
          <BottomSheet isOpen={activeSheet === 'more'} onClose={closeSheet} height="75vh" title="More">
            <MoreOptionsSheetContent editor={editor} onClose={closeSheet} />
          </BottomSheet>
          <BottomSheet isOpen={activeSheet === 'style'} onClose={closeSheet} height="75vh" title="Style">
            <StyleSheetContent editor={editor} />
          </BottomSheet>
          <BottomSheet isOpen={activeSheet === 'publish'} onClose={closeSheet} height="90vh" title="Publish">
            <PublishSheetContent editor={editor} />
          </BottomSheet>
        </>,
        document.body
      )}
    </div>
  );
};
