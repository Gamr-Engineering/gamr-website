import React from 'react';
import { useEditorStore, EditorTab } from '@/stores/editorStore';

const TABS: { id: EditorTab; label: string; isAi?: boolean }[] = [
  { id: 'write', label: 'WRITE' },
  { id: 'insert', label: 'INSERT' },
  { id: 'media', label: 'MEDIA' },
  { id: 'style', label: 'STYLE' },
  { id: 'layout', label: 'LAYOUT' },
  { id: 'ai', label: '✦ AI', isAi: true },
  { id: 'data', label: 'DATA' },
  { id: 'review', label: 'REVIEW' },
  { id: 'flow', label: 'FLOW' },
  { id: 'publish', label: 'PUBLISH' },
];

export const TabBar: React.FC = () => {
  const { activeTab, setActiveTab, ribbonCollapsed, setRibbonCollapsed } = useEditorStore();

  return (
    <div className="nx-tabbar">
      <div className="nx-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`nx-tab ${activeTab === tab.id ? 'nx-tab-active' : ''} ${tab.isAi ? 'nx-tab-ai' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button className="nx-hide-ribbon" onClick={() => setRibbonCollapsed(!ribbonCollapsed)}>
        {ribbonCollapsed ? '˅' : '˄'} Hide Ribbon
      </button>
    </div>
  );
};
