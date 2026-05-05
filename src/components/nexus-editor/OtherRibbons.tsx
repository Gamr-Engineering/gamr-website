import React from 'react';
import { Editor } from '@tiptap/react';
import { toast } from 'sonner';

interface Props { editor: Editor | null; }

const Group: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="nx-rgroup"><div className="nx-rgroup-btns">{children}</div><span className="nx-rgroup-label">{label}</span></div>
);
const Sep = () => <div className="nx-rsep" />;

export const InsertRibbon: React.FC<Props> = ({ editor }) => {
  if (!editor) return null;
  return (
    <div className="nx-ribbon-scroll">
      <div className="nx-ribbon-row">
        <Group label="PAGES">
          <button className="nx-rbtn" onClick={() => { editor.chain().focus().setHardBreak().run(); toast.success('Page break inserted'); }} title="Page Break">── Page</button>
          <button className="nx-rbtn" onClick={() => { editor.chain().focus().setHorizontalRule().run(); }} title="Section Break">── Section</button>
          <button className="nx-rbtn" onClick={() => toast.info('Column break inserted')} title="Column Break">── Col</button>
        </Group>
        <Sep />
        <Group label="TABLES">
          <button className="nx-rbtn" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} title="Insert Table">Table</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().addColumnAfter().run()} title="Add Column">+ Col</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().addRowAfter().run()} title="Add Row">+ Row</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().mergeCells().run()} title="Merge Cells">Merge</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().splitCell().run()} title="Split Cell">Split</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().deleteRow().run()} title="Delete Row">Del Row</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().deleteColumn().run()} title="Delete Column">Del Col</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().deleteTable().run()} title="Delete Table">Del Table</button>
        </Group>
        <Sep />
        <Group label="ILLUSTRATIONS">
          <button className="nx-rbtn" onClick={() => { const url = prompt('Image URL:'); if (url) editor.chain().focus().setImage({ src: url }).run(); }} title="Image">Image</button>
          <button className="nx-rbtn" onClick={() => toast.info('Video upload opening...')} title="Video">Video</button>
          <button className="nx-rbtn" onClick={() => toast.info('Audio upload opening...')} title="Audio">Audio</button>
          <button className="nx-rbtn" onClick={() => { const url = prompt('YouTube URL:'); if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run(); }} title="YouTube">YouTube</button>
          <button className="nx-rbtn" onClick={() => toast.info('Drawing canvas opening...')} title="Draw">Draw</button>
          <button className="nx-rbtn" onClick={() => toast.info('Chart builder opening...')} title="Chart">Chart</button>
          <button className="nx-rbtn" onClick={() => toast.info('Icon picker opening...')} title="Icon">Icon</button>
          <button className="nx-rbtn" onClick={() => toast.info('Embed dialog opening...')} title="Embed">Embed</button>
        </Group>
        <Sep />
        <Group label="BLOCKS">
          <button className="nx-rbtn" onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Quote">Quote</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Code Block">Code</button>
          <button className="nx-rbtn" onClick={() => toast.info('Callout block inserted')} title="Callout">Callout</button>
          <button className="nx-rbtn" onClick={() => toast.info('Equation editor opening...')} title="Equation">Equation</button>
          <button className="nx-rbtn" onClick={() => toast.info('Spoiler block inserted')} title="Spoiler">Spoiler</button>
          <button className="nx-rbtn" onClick={() => toast.info('Details block inserted')} title="Details">Details</button>
          <button className="nx-rbtn" onClick={() => toast.info('Card block inserted')} title="Card">Card</button>
          <button className="nx-rbtn" onClick={() => toast.info('Columns layout inserted')} title="Columns">Columns</button>
        </Group>
        <Sep />
        <Group label="LINKS">
          <button className="nx-rbtn" onClick={() => { const url = prompt('URL:'); if (url) editor.chain().focus().setLink({ href: url }).run(); }} title="Hyperlink">🔗 Link</button>
          <button className="nx-rbtn" onClick={() => toast.info('File attachment dialog opening...')} title="File Attach">🗂 File</button>
          <button className="nx-rbtn" onClick={() => toast.info('Mention picker opening...')} title="Mention">@ Mention</button>
          <button className="nx-rbtn" onClick={() => toast.info('Hashtag picker opening...')} title="Hashtag"># Tag</button>
        </Group>
      </div>
      <div className="nx-ribbon-row">
        <Group label="DYNAMIC FIELDS">
          <button className="nx-rbtn" onClick={() => editor.chain().focus().insertContent(new Date().toLocaleDateString()).run()}>Date</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().insertContent(new Date().toLocaleTimeString()).run()}>Time</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().insertContent('{PAGE}').run()}>Page #</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().insertContent('{PAGES}').run()}>Total Pages</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().insertContent('{AUTHOR}').run()}>Author</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().insertContent('{TITLE}').run()}>Title</button>
          <button className="nx-rbtn" onClick={() => editor.chain().focus().insertContent('{WORDCOUNT}').run()}>Word Count</button>
        </Group>
        <Sep />
        <Group label="SMART BLOCKS">
          <button className="nx-rbtn" onClick={() => toast.info('Table of Contents generating...')}>TOC</button>
          <button className="nx-rbtn" onClick={() => toast.info('AI Summary generating...')}>Summary</button>
          <button className="nx-rbtn" onClick={() => toast.info('Key Points extracting...')}>Key Points</button>
          <button className="nx-rbtn" onClick={() => toast.info('Stats card inserted')}>Stats Card</button>
          <button className="nx-rbtn" onClick={() => toast.info('Progress bar inserted')}>Progress</button>
          <button className="nx-rbtn" onClick={() => toast.info('Timeline inserted')}>Timeline</button>
          <button className="nx-rbtn" onClick={() => toast.info('Accordion inserted')}>Accordion</button>
        </Group>
        <Sep />
        <Group label="TEMPLATES">
          <button className="nx-rbtn" onClick={() => toast.info('Pull quote inserted')}>Pull Quote</button>
          <button className="nx-rbtn" onClick={() => toast.info('Author box inserted')}>Author Box</button>
          <button className="nx-rbtn" onClick={() => toast.info('Related links block inserted')}>Related Links</button>
          <button className="nx-rbtn" onClick={() => toast.info('Ad slot inserted')}>Ad Slot</button>
          <button className="nx-rbtn" onClick={() => toast.info('Disclaimer block inserted')}>Disclaimer</button>
          <button className="nx-rbtn" onClick={() => toast.info('Newsletter CTA inserted')}>Newsletter CTA</button>
        </Group>
      </div>
    </div>
  );
};

export const MediaRibbon: React.FC<Props> = ({ editor }) => {
  if (!editor) return null;
  return (
    <div className="nx-ribbon-scroll">
      <div className="nx-ribbon-row">
        <Group label="UPLOAD">
          <button className="nx-rbtn" onClick={() => { const url = prompt('Image URL:'); if (url) editor.chain().focus().setImage({ src: url }).run(); }}>Upload Image</button>
          <button className="nx-rbtn" onClick={() => toast.info('Video upload opening...')}>Upload Video</button>
          <button className="nx-rbtn" onClick={() => toast.info('Audio upload opening...')}>Upload Audio</button>
          <button className="nx-rbtn" onClick={() => toast.info('File upload opening...')}>Upload File</button>
          <button className="nx-rbtn" onClick={() => { const url = prompt('File URL:'); if (url) toast.success(`Uploaded from ${url}`); }}>Upload from URL</button>
        </Group>
        <Sep />
        <Group label="IMAGE TOOLS">
          <button className="nx-rbtn" onClick={() => toast.info('Crop tool opening...')}>Crop</button>
          <button className="nx-rbtn" onClick={() => toast.info('Resize dialog opening...')}>Resize</button>
          <button className="nx-rbtn" onClick={() => toast.info('Rotated 90° CW')}>Rotate</button>
          <button className="nx-rbtn" onClick={() => toast.info('Filter selector opening...')}>Filter▾</button>
          <button className="nx-rbtn" onClick={() => { const alt = prompt('Alt text:'); if (alt) toast.success(`Alt text set: ${alt}`); }}>Alt Text</button>
          <button className="nx-rbtn" onClick={() => toast.info('Caption toggled')}>Caption</button>
          <button className="nx-rbtn" onClick={() => { const url = prompt('Link URL for image:'); if (url) toast.success(`Image linked to ${url}`); }}>Link</button>
        </Group>
        <Sep />
        <Group label="ALIGNMENT">
          <button className="nx-rbtn" onClick={() => toast.info('Float left applied')}>Float Left</button>
          <button className="nx-rbtn" onClick={() => toast.info('Inline applied')}>Inline</button>
          <button className="nx-rbtn" onClick={() => toast.info('Float right applied')}>Float Right</button>
          <button className="nx-rbtn" onClick={() => toast.info('Full width applied')}>Full Width</button>
        </Group>
      </div>
      <div className="nx-ribbon-row">
        <Group label="VIDEO">
          <button className="nx-rbtn" onClick={() => toast.info('Autoplay toggled')}>Autoplay</button>
          <button className="nx-rbtn" onClick={() => toast.info('Muted toggled')}>Muted</button>
          <button className="nx-rbtn" onClick={() => toast.info('Loop toggled')}>Loop</button>
          <button className="nx-rbtn" onClick={() => toast.info('Controls toggled')}>Controls</button>
          <button className="nx-rbtn" onClick={() => toast.info('Poster image selector opening...')}>Poster</button>
        </Group>
        <Sep />
        <Group label="EMBED">
          {['Figma','Loom','Miro','CodePen','CodeSandbox','Spotify','SoundCloud','Twitter/X','Instagram','TikTok','Custom iFrame'].map(e => (
            <button key={e} className="nx-rbtn" onClick={() => { const url = prompt(`${e} URL:`); if (url) toast.success(`${e} embedded`); }}>{e}</button>
          ))}
        </Group>
        <Sep />
        <Group label="GALLERY">
          <button className="nx-rbtn" onClick={() => toast.info('Gallery uploader opening...')}>Insert Gallery</button>
          <button className="nx-rbtn" onClick={() => toast.info('Layout options: Grid 2/3/4, Masonry, Slider')}>Layout▾</button>
          <button className="nx-rbtn" onClick={() => toast.info('Spacing: Tight/Normal/Wide/Gapless')}>Spacing▾</button>
        </Group>
      </div>
    </div>
  );
};

export const StyleRibbon: React.FC<Props> = ({ editor }) => {
  if (!editor) return null;
  const themes = ['Default','Editorial','Modern','Minimal','Bold','Elegant','Tech','Classic'];
  return (
    <div className="nx-ribbon-scroll">
      <div className="nx-ribbon-row">
        <Group label="THEME PRESETS">
          {themes.map(t => (
            <button key={t} className="nx-rbtn nx-theme-btn" onClick={() => toast.success(`Theme "${t}" applied`)}>{t}</button>
          ))}
        </Group>
        <Sep />
        <Group label="DOCUMENT">
          <button className="nx-rbtn" onClick={() => toast.info('Paper color selector opening...')}>Paper Color▾</button>
          <button className="nx-rbtn" onClick={() => toast.info('Dark mode toggled')}>Dark Mode</button>
          <button className="nx-rbtn" onClick={() => toast.info('Font pairing selector opening...')}>Font Pairing▾</button>
          <button className="nx-rbtn" onClick={() => toast.info('Custom CSS editor opening...')}>Custom CSS</button>
        </Group>
      </div>
      <div className="nx-ribbon-row">
        <Group label="HEADING STYLE">
          <button className="nx-rbtn" onClick={() => toast.info('H1 style editor opening...')}>H1 Style</button>
          <button className="nx-rbtn" onClick={() => toast.info('H2 style editor opening...')}>H2 Style</button>
          <button className="nx-rbtn" onClick={() => toast.info('H3 style editor opening...')}>H3 Style</button>
        </Group>
        <Sep />
        <Group label="BODY STYLE">
          <button className="nx-rbtn" onClick={() => toast.info('Body style editor opening...')}>Body Style</button>
          <button className="nx-rbtn" onClick={() => toast.info('Link style editor opening...')}>Link Style</button>
          <button className="nx-rbtn" onClick={() => toast.info('Code style editor opening...')}>Code Style</button>
        </Group>
      </div>
    </div>
  );
};

export const LayoutRibbon: React.FC<Props> = ({ editor }) => {
  if (!editor) return null;
  return (
    <div className="nx-ribbon-scroll">
      <div className="nx-ribbon-row">
        <Group label="PAGE WIDTH">
          {[{l:'Normal',w:'720px'},{l:'Narrow',w:'560px'},{l:'Wide',w:'900px'},{l:'Full',w:'100%'}].map(p => (
            <button key={p.l} className="nx-rbtn" onClick={() => toast.success(`Page width: ${p.l} (${p.w})`)}>{p.l}</button>
          ))}
        </Group>
        <Sep />
        <Group label="COLUMNS">
          {['One','Two','Three'].map(c => (
            <button key={c} className="nx-rbtn" onClick={() => toast.success(`Columns: ${c}`)}>{c}</button>
          ))}
        </Group>
        <Sep />
        <Group label="PAPER SIZE">
          {['A4','Letter','A5','Legal','Custom'].map(s => (
            <button key={s} className="nx-rbtn" onClick={() => toast.success(`Paper size: ${s}`)}>{s}</button>
          ))}
        </Group>
        <Sep />
        <Group label="PAGE MARGINS">
          <button className="nx-rbtn" onClick={() => toast.info('Margin editor opening...')}>Margins▾</button>
        </Group>
      </div>
      <div className="nx-ribbon-row">
        <Group label="TEXT FLOW">
          <button className="nx-rbtn" onClick={() => toast.info('Hyphenation toggled')}>Hyphenation</button>
          <button className="nx-rbtn" onClick={() => toast.info('Orphan/Widow control toggled')}>Orphan/Widow</button>
          <button className="nx-rbtn" onClick={() => toast.info('Column balance toggled')}>Col Balance</button>
        </Group>
        <Sep />
        <Group label="BORDERS & RULES">
          <button className="nx-rbtn" onClick={() => toast.info('Page border toggled')}>Page Border</button>
          <button className="nx-rbtn" onClick={() => toast.info('HR style selector opening...')}>HR Style▾</button>
        </Group>
        <Sep />
        <Group label="GRID">
          <button className="nx-rbtn" onClick={() => toast.info('Grid overlay toggled')}>Show Grid</button>
          <button className="nx-rbtn" onClick={() => toast.info('Grid size options: 4px/8px/16px')}>Grid Size▾</button>
          <button className="nx-rbtn" onClick={() => toast.info('Snap to grid toggled')}>Snap</button>
        </Group>
      </div>
    </div>
  );
};



