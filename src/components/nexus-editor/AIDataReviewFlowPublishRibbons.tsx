import React from 'react';
import { Editor } from '@tiptap/react';
import { useEditorStore, AiTone } from '@/stores/editorStore';
import { toast } from 'sonner';

interface Props { editor: Editor | null; }

const Group: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="nx-rgroup"><div className="nx-rgroup-btns">{children}</div><span className="nx-rgroup-label">{label}</span></div>
);
const Sep = () => <div className="nx-rsep" />;

const aiCall = async (action: string, content: string, editor: Editor) => {
  toast.info(`AI ${action}: Processing...`);
  // Mock AI response since there's no real endpoint yet
  setTimeout(() => {
    const responses: Record<string, string> = {
      'write': 'In the ever-evolving landscape of digital innovation, we find ourselves at a crossroads where technology meets creativity...',
      'continue': 'Furthermore, this development opens new possibilities for content creators and publishers alike...',
      'outline': '## Outline\n1. Introduction\n2. Background\n3. Key Findings\n4. Analysis\n5. Conclusion',
      'firstdraft': '# Article Title\n\n## Introduction\nThis article explores...\n\n## Main Body\nThe key points are...\n\n## Conclusion\nIn summary...',
      'conclusion': 'In conclusion, the evidence presented demonstrates a clear trajectory toward innovation...',
      'introduction': 'Welcome to an exploration of one of the most compelling topics in modern discourse...',
      'expand': content + ' This point deserves further elaboration. When we examine the underlying factors...',
      'shorten': content.split(' ').slice(0, Math.ceil(content.split(' ').length / 2)).join(' ') + '.',
      'rewrite': 'Rephrased: ' + content.split(' ').reverse().join(' '),
      'simplify': content.replace(/furthermore|consequently|nevertheless/gi, 'also'),
      'formalize': 'It is imperative to note that ' + content.toLowerCase(),
      'humanize': "Here's the thing — " + content.toLowerCase(),
    };
    const result = responses[action] || 'AI response generated successfully.';
    editor.chain().focus().insertContent(result).run();
    toast.success(`AI ${action} complete`);
  }, 1500);
};

export const AIRibbon: React.FC<Props> = ({ editor }) => {
  const { aiCopilotTone, setAiCopilotTone } = useEditorStore();
  if (!editor) return null;

  const getSelected = () => {
    const { from, to } = editor.state.selection;
    return editor.state.doc.textBetween(from, to) || '';
  };

  const tones: AiTone[] = ['professional','casual','bold','warm','witty','epic'];

  return (
    <div className="nx-ribbon-scroll">
      <div className="nx-ribbon-row">
        <Group label="GENERATE">
          <button className="nx-rbtn nx-ai-btn" onClick={() => aiCall('write', '', editor)}>✦ Write for Me</button>
          <button className="nx-rbtn nx-ai-btn" onClick={() => aiCall('continue', '', editor)}>✦ Continue</button>
          <button className="nx-rbtn nx-ai-btn" onClick={() => aiCall('outline', '', editor)}>✦ Outline</button>
          <button className="nx-rbtn nx-ai-btn" onClick={() => aiCall('firstdraft', '', editor)}>✦ First Draft</button>
          <button className="nx-rbtn nx-ai-btn" onClick={() => aiCall('conclusion', '', editor)}>✦ Conclusion</button>
          <button className="nx-rbtn nx-ai-btn" onClick={() => aiCall('introduction', '', editor)}>✦ Intro</button>
        </Group>
        <Sep />
        <Group label="TRANSFORM">
          <button className="nx-rbtn" onClick={() => aiCall('expand', getSelected(), editor)}>Expand</button>
          <button className="nx-rbtn" onClick={() => aiCall('shorten', getSelected(), editor)}>Shorten</button>
          <button className="nx-rbtn" onClick={() => aiCall('rewrite', getSelected(), editor)}>Rewrite</button>
          <button className="nx-rbtn" onClick={() => aiCall('simplify', getSelected(), editor)}>Simplify</button>
          <button className="nx-rbtn" onClick={() => aiCall('formalize', getSelected(), editor)}>Formalize</button>
          <button className="nx-rbtn" onClick={() => aiCall('humanize', getSelected(), editor)}>Humanize</button>
          <button className="nx-rbtn" onClick={() => toast.info('Translate language picker opening...')}>Translate▾</button>
        </Group>
        <Sep />
        <Group label="TONE SHIFT">
          {tones.map(t => (
            <button key={t} className={`nx-rbtn nx-tone-pill ${aiCopilotTone === t ? 'nx-tone-active' : ''}`}
              onClick={() => setAiCopilotTone(t)}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
        </Group>
      </div>
      <div className="nx-ribbon-row">
        <Group label="ANALYZE">
          <button className="nx-rbtn" onClick={() => toast.info('Readability analysis: Score 82/100 — Good')}>Readability</button>
          <button className="nx-rbtn" onClick={() => toast.info('SEO Check: Score 61/100 — Needs improvement')}>SEO Check</button>
          <button className="nx-rbtn" onClick={() => toast.info('Sentiment: Positive (0.72)')}>Sentiment</button>
          <button className="nx-rbtn" onClick={() => toast.info('Plagiarism check running...')}>Plagiarism</button>
          <button className="nx-rbtn" onClick={() => toast.info('Grammar check: Score 97/100 — Excellent')}>Grammar</button>
          <button className="nx-rbtn" onClick={() => toast.info('Fact check running...')}>Fact Check</button>
        </Group>
        <Sep />
        <Group label="SMART SUGGESTIONS">
          <button className="nx-rbtn" onClick={() => toast.info('Auto-complete toggled')}>Auto-complete</button>
          <button className="nx-rbtn" onClick={() => toast.info('Smart quotes toggled')}>Smart Quotes</button>
          <button className="nx-rbtn" onClick={() => toast.info('Auto-link toggled')}>Auto-Link</button>
        </Group>
      </div>
    </div>
  );
};

export const DataRibbon: React.FC<Props> = ({ editor }) => {
  if (!editor) return null;
  return (
    <div className="nx-ribbon-scroll">
      <div className="nx-ribbon-row">
        <Group label="CHARTS">
          {['Bar','Line','Pie','Doughnut','Scatter','Bubble','Radar','Area'].map(c => (
            <button key={c} className="nx-rbtn" onClick={() => toast.info(`${c} chart builder opening...`)}>{c}</button>
          ))}
        </Group>
        <Sep />
        <Group label="TABLES">
          <button className="nx-rbtn" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>Insert Table</button>
          <button className="nx-rbtn" onClick={() => toast.info('CSV import opening...')}>Import CSV</button>
          <button className="nx-rbtn" onClick={() => toast.info('Spreadsheet editor opening...')}>Spreadsheet</button>
        </Group>
      </div>
      <div className="nx-ribbon-row">
        <Group label="DATA BLOCKS">
          <button className="nx-rbtn" onClick={() => toast.info('Stats block inserted')}>Stats Block</button>
          <button className="nx-rbtn" onClick={() => toast.info('Comparison table inserted')}>Comparison</button>
          <button className="nx-rbtn" onClick={() => toast.info('Timeline inserted')}>Timeline</button>
          <button className="nx-rbtn" onClick={() => toast.info('Progress bar inserted')}>Progress Bar</button>
        </Group>
      </div>
    </div>
  );
};

export const ReviewRibbon: React.FC<Props> = ({ editor }) => {
  const { resolveAllComments, deleteResolvedComments } = useEditorStore();
  if (!editor) return null;
  return (
    <div className="nx-ribbon-scroll">
      <div className="nx-ribbon-row">
        <Group label="COMMENTS">
          <button className="nx-rbtn" onClick={() => toast.info('Comment added at selection')}>Add Comment</button>
          <button className="nx-rbtn" onClick={() => toast.info('All comments shown')}>Show All</button>
          <button className="nx-rbtn" onClick={() => { resolveAllComments(); toast.success('All comments resolved'); }}>Resolve All</button>
          <button className="nx-rbtn" onClick={() => { deleteResolvedComments(); toast.success('Resolved comments deleted'); }}>Delete Resolved</button>
        </Group>
        <Sep />
        <Group label="TRACK CHANGES">
          <button className="nx-rbtn" onClick={() => toast.info('Track changes toggled')}>Track Changes</button>
          <button className="nx-rbtn" onClick={() => toast.info('Change accepted')}>Accept</button>
          <button className="nx-rbtn" onClick={() => toast.info('Change rejected')}>Reject</button>
          <button className="nx-rbtn" onClick={() => toast.info('All changes accepted')}>Accept All</button>
          <button className="nx-rbtn" onClick={() => toast.info('All changes rejected')}>Reject All</button>
          <button className="nx-rbtn" onClick={() => toast.info('Show changes filter opening...')}>Show▾</button>
        </Group>
        <Sep />
        <Group label="COMPARE">
          <button className="nx-rbtn" onClick={() => toast.info('Version comparison opening...')}>Compare Versions</button>
        </Group>
      </div>
      <div className="nx-ribbon-row">
        <Group label="PROOFING">
          <button className="nx-rbtn" onClick={() => toast.info('Spell check running...')}>Spell Check</button>
          <button className="nx-rbtn" onClick={() => toast.info('Grammar check running...')}>Grammar Check</button>
          <button className="nx-rbtn" onClick={() => toast.info('Thesaurus lookup opening...')}>Thesaurus</button>
          <button className="nx-rbtn" onClick={() => toast.info(`Word count: ${useEditorStore.getState().wordCount}`)}>Word Count</button>
          <button className="nx-rbtn" onClick={() => toast.info(`Reading level: ${useEditorStore.getState().gradeLevel} grade`)}>Reading Level</button>
        </Group>
        <Sep />
        <Group label="PROTECTION">
          <button className="nx-rbtn" onClick={() => toast.info('Section locked')}>Lock Section</button>
          <button className="nx-rbtn" onClick={() => toast.info('Password protection dialog opening...')}>Password</button>
        </Group>
      </div>
    </div>
  );
};

export const FlowRibbon: React.FC<Props> = ({ editor }) => {
  if (!editor) return null;
  return (
    <div className="nx-ribbon-scroll">
      <div className="nx-ribbon-row">
        <Group label="DIAGRAMS">
          {['Flowchart','Mind Map','Org Chart','Sequence','Gantt','ER Diagram','State','Wireframe'].map(d => (
            <button key={d} className="nx-rbtn" onClick={() => toast.info(`${d} editor opening...`)}>{d}</button>
          ))}
        </Group>
      </div>
      <div className="nx-ribbon-row">
        <Group label="VISUAL BLOCKS">
          <button className="nx-rbtn" onClick={() => toast.info('Process steps block inserted')}>Process Steps</button>
          <button className="nx-rbtn" onClick={() => toast.info('Decision tree inserted')}>Decision Tree</button>
          <button className="nx-rbtn" onClick={() => toast.info('Comparison matrix inserted')}>Comparison Matrix</button>
          <button className="nx-rbtn" onClick={() => toast.info('Kanban board inserted')}>Kanban Block</button>
        </Group>
      </div>
    </div>
  );
};

export const PublishRibbon: React.FC<Props> = ({ editor }) => {
  if (!editor) return null;
  const exportHTML = () => {
    const html = editor.getHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'article.html'; a.click();
    URL.revokeObjectURL(url);
    toast.success('HTML exported');
  };
  const exportTxt = () => {
    const text = editor.getText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'article.txt'; a.click();
    URL.revokeObjectURL(url);
    toast.success('Text exported');
  };
  const exportMd = () => {
    const text = editor.getText();
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'article.md'; a.click();
    URL.revokeObjectURL(url);
    toast.success('Markdown exported');
  };
  const copyHTML = () => {
    navigator.clipboard.writeText(editor.getHTML()).then(() => toast.success('HTML copied to clipboard'));
  };
  return (
    <div className="nx-ribbon-scroll">
      <div className="nx-ribbon-row">
        <Group label="EXPORT">
          <button className="nx-rbtn" onClick={() => { window.print(); toast.success('PDF export via print'); }}>Export PDF</button>
          <button className="nx-rbtn" onClick={() => toast.info('DOCX export generating...')}>Export DOCX</button>
          <button className="nx-rbtn" onClick={exportHTML}>Export HTML</button>
          <button className="nx-rbtn" onClick={exportMd}>Export MD</button>
          <button className="nx-rbtn" onClick={exportTxt}>Export TXT</button>
          <button className="nx-rbtn" onClick={copyHTML}>Copy HTML</button>
        </Group>
        <Sep />
        <Group label="SEO">
          <input className="nx-seo-input" placeholder="Meta Title (60 chars)" maxLength={60} />
          <input className="nx-seo-input" placeholder="Focus Keyword" />
        </Group>
        <Sep />
        <Group label="SHARE">
          <button className="nx-rbtn" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied'); }}>Copy Link</button>
          <button className="nx-rbtn nx-publish-btn" onClick={() => toast.success('Article published!')}>Publish Now</button>
          <button className="nx-rbtn" onClick={() => toast.info('Schedule picker opening...')}>Schedule▾</button>
          <button className="nx-rbtn" onClick={() => toast.info('Article unpublished')}>Unpublish</button>
        </Group>
      </div>
      <div className="nx-ribbon-row">
        <Group label="ACCESSIBILITY">
          <button className="nx-rbtn" onClick={() => toast.info('A11y check: ✓ All images have alt text, ✓ Heading hierarchy valid')}>A11y Check</button>
        </Group>
        <Sep />
        <Group label="SOCIAL PREVIEW">
          <button className="nx-rbtn" onClick={() => toast.info('Twitter/X preview card shown')}>Twitter/X</button>
          <button className="nx-rbtn" onClick={() => toast.info('Facebook OG preview shown')}>Facebook</button>
          <button className="nx-rbtn" onClick={() => toast.info('LinkedIn preview shown')}>LinkedIn</button>
        </Group>
      </div>
    </div>
  );
};
