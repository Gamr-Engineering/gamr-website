import React from 'react';
import { useEditorStore, AiTone } from '@/stores/editorStore';
import { toast } from 'sonner';

export const RightSidebar: React.FC = () => {
  const {
    rightSidebarVisible, aiCopilotTone, setAiCopilotTone,
    readabilityScore, seoScore, grammarScore, gradeLevel
  } = useEditorStore();

  if (!rightSidebarVisible) return null;

  const tones: { key: AiTone; label: string }[] = [
    { key: 'professional', label: 'Pro' },
    { key: 'casual', label: 'Casual' },
    { key: 'bold', label: 'Bold' },
    { key: 'warm', label: 'Warm' },
    { key: 'witty', label: 'Witty' },
    { key: 'epic', label: 'Epic' },
  ];

  const scoreColor = (s: number) => s >= 70 ? '#4ade80' : s >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="nx-sidebar nx-sidebar-right">
      <div className="nx-ai-header">✦ AI COPILOT</div>

      {/* GENERATE */}
      <div className="nx-ai-section-label">GENERATE</div>
      <div className="nx-ai-grid">
        <button className="nx-ai-gbtn" onClick={() => toast.info('AI Suggest: Generating suggestions...')}>✦ Suggest</button>
        <button className="nx-ai-gbtn" onClick={() => toast.info('AI Continue: Writing continuation...')}>✦ Continue</button>
        <button className="nx-ai-gbtn" onClick={() => toast.info('AI Outline: Building structure...')}>✦ Outline</button>
        <button className="nx-ai-gbtn" onClick={() => toast.info('AI Summarize: Creating summary...')}>✦ Summarize</button>
      </div>

      {/* TRANSFORM */}
      <div className="nx-ai-section-label">TRANSFORM</div>
      <div className="nx-ai-grid">
        <button className="nx-ai-tbtn" onClick={() => toast.info('Expanding text...')}>Expand</button>
        <button className="nx-ai-tbtn" onClick={() => toast.info('Shortening text...')}>Shorten</button>
        <button className="nx-ai-tbtn" onClick={() => toast.info('Rewriting text...')}>Rewrite</button>
        <button className="nx-ai-tbtn" onClick={() => toast.info('Simplifying text...')}>Simplify</button>
        <button className="nx-ai-tbtn" onClick={() => toast.info('Formalizing text...')}>Formalize</button>
        <button className="nx-ai-tbtn" onClick={() => toast.info('Humanizing text...')}>Humanize</button>
      </div>

      {/* TONE SHIFT */}
      <div className="nx-ai-section-label">TONE SHIFT</div>
      <div className="nx-tone-grid">
        {tones.map(t => (
          <button key={t.key}
            className={`nx-tone-btn ${aiCopilotTone === t.key ? 'nx-tone-active' : ''}`}
            onClick={() => setAiCopilotTone(t.key)}
          >{t.label}</button>
        ))}
      </div>

      {/* ANALYZE */}
      <div className="nx-ai-section-label">ANALYZE</div>
      <div className="nx-ai-grid">
        <button className="nx-ai-tbtn" onClick={() => toast.info('Readability analysis running...')}>Readability</button>
        <button className="nx-ai-tbtn" onClick={() => toast.info('SEO check running...')}>SEO Score</button>
        <button className="nx-ai-tbtn" onClick={() => toast.info('Sentiment analysis running...')}>Sentiment</button>
        <button className="nx-ai-tbtn" onClick={() => toast.info('Plagiarism check running...')}>Plagiarism</button>
        <button className="nx-ai-tbtn" onClick={() => toast.info('Grammar check running...')}>Grammar</button>
        <button className="nx-ai-tbtn" onClick={() => toast.info('Fact check running...')}>Fact Check</button>
      </div>

      {/* LIVE SCORES */}
      <div className="nx-ai-section-label">LIVE SCORES</div>
      <div className="nx-scores">
        <div className="nx-score-row">
          <span className="nx-score-label">Readability</span>
          <span className="nx-score-val" style={{ color: scoreColor(readabilityScore) }}>{readabilityScore}/100</span>
        </div>
        <div className="nx-score-row nx-score-bar-wrap">
          <div className="nx-score-bar"><div className="nx-score-fill" style={{ width: `${readabilityScore}%`, background: scoreColor(readabilityScore) }} /></div>
        </div>
        <div className="nx-score-row">
          <span className="nx-score-label">SEO</span>
          <span className="nx-score-val" style={{ color: scoreColor(seoScore) }}>{seoScore}/100</span>
        </div>
        <div className="nx-score-row nx-score-bar-wrap">
          <div className="nx-score-bar"><div className="nx-score-fill" style={{ width: `${seoScore}%`, background: scoreColor(seoScore) }} /></div>
        </div>
        <div className="nx-score-row">
          <span className="nx-score-label">Grammar</span>
          <span className="nx-score-val" style={{ color: scoreColor(grammarScore) }}>{grammarScore}/100</span>
        </div>
        <div className="nx-score-row nx-score-bar-wrap">
          <div className="nx-score-bar"><div className="nx-score-fill" style={{ width: `${grammarScore}%`, background: scoreColor(grammarScore) }} /></div>
        </div>
        <div className="nx-score-row">
          <span className="nx-score-label">Grade Level</span>
          <span className="nx-score-val" style={{ color: '#d0d0e8' }}>{gradeLevel}</span>
        </div>
      </div>
    </div>
  );
};
