import { create } from 'zustand';

export type EditorTab = 'write' | 'insert' | 'media' | 'style' | 'layout' | 'ai' | 'data' | 'review' | 'flow' | 'publish';
export type Alignment = 'left' | 'center' | 'right' | 'justify';
export type AutoSaveStatus = 'saved' | 'saving' | 'unsaved';
export type AiTone = 'professional' | 'casual' | 'bold' | 'warm' | 'witty' | 'epic';

interface VersionSnapshot {
  timestamp: Date;
  snapshot: string;
  wordCount: number;
}

interface Bookmark {
  id: string;
  label: string;
  position: number;
}

interface Comment {
  id: string;
  text: string;
  position: number;
  resolved: boolean;
}

interface EditorState {
  activeTab: EditorTab;
  activeMarks: Set<string>;
  currentFont: string;
  currentSize: number;
  currentAlignment: Alignment;
  currentHeadingLevel: number;
  zoom: number;
  wordCount: number;
  charCount: number;
  lineCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTimeMinutes: number;
  isFocusMode: boolean;
  isPreviewMode: boolean;
  isFullscreen: boolean;
  isMinimized: boolean;
  autoSaveStatus: AutoSaveStatus;
  lastSavedAt: Date | null;
  versionHistory: VersionSnapshot[];
  bookmarks: Bookmark[];
  comments: Comment[];
  aiCopilotTone: AiTone;
  readabilityScore: number;
  seoScore: number;
  grammarScore: number;
  gradeLevel: string;
  currentLanguage: string;
  ribbonCollapsed: boolean;
  leftSidebarVisible: boolean;
  rightSidebarVisible: boolean;
  filename: string;
  spellcheckEnabled: boolean;
  cursorLine: number;
  cursorCol: number;
  wordGoal: number;
  findReplaceOpen: boolean;
  
  // Actions
  setActiveTab: (tab: EditorTab) => void;
  setActiveMarks: (marks: Set<string>) => void;
  setCurrentFont: (font: string) => void;
  setCurrentSize: (size: number) => void;
  setCurrentAlignment: (alignment: Alignment) => void;
  setCurrentHeadingLevel: (level: number) => void;
  setZoom: (zoom: number) => void;
  setWordCount: (count: number) => void;
  setCharCount: (count: number) => void;
  setLineCount: (count: number) => void;
  setSentenceCount: (count: number) => void;
  setParagraphCount: (count: number) => void;
  setReadingTimeMinutes: (minutes: number) => void;
  toggleFocusMode: () => void;
  setIsPreviewMode: (preview: boolean) => void;
  toggleFullscreen: () => void;
  toggleMinimize: () => void;
  setAutoSaveStatus: (status: AutoSaveStatus) => void;
  setLastSavedAt: (date: Date | null) => void;
  addVersionSnapshot: (snapshot: VersionSnapshot) => void;
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  addComment: (comment: Comment) => void;
  resolveComment: (id: string) => void;
  resolveAllComments: () => void;
  deleteResolvedComments: () => void;
  setAiCopilotTone: (tone: AiTone) => void;
  setReadabilityScore: (score: number) => void;
  setSeoScore: (score: number) => void;
  setGrammarScore: (score: number) => void;
  setGradeLevel: (level: string) => void;
  setCurrentLanguage: (lang: string) => void;
  setRibbonCollapsed: (collapsed: boolean) => void;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  setFilename: (name: string) => void;
  toggleSpellcheck: () => void;
  setCursorPosition: (line: number, col: number) => void;
  setWordGoal: (goal: number) => void;
  setFindReplaceOpen: (open: boolean) => void;
  updateDocStats: (stats: { words: number; chars: number; lines: number; sentences: number; paragraphs: number; readingTime: number }) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  activeTab: 'write',
  activeMarks: new Set<string>(),
  currentFont: 'Satoshi',
  currentSize: 16,
  currentAlignment: 'left',
  currentHeadingLevel: 0,
  zoom: 100,
  wordCount: 0,
  charCount: 0,
  lineCount: 0,
  sentenceCount: 0,
  paragraphCount: 0,
  readingTimeMinutes: 0,
  isFocusMode: false,
  isPreviewMode: false,
  isFullscreen: false,
  isMinimized: false,
  autoSaveStatus: 'saved',
  lastSavedAt: new Date(),
  versionHistory: [],
  bookmarks: [
    { id: '1', label: 'Key Thesis', position: 0 },
    { id: '2', label: 'Argument A', position: 0 },
    { id: '3', label: 'Main Claim', position: 0 },
  ],
  comments: [],
  aiCopilotTone: 'casual',
  readabilityScore: 82,
  seoScore: 61,
  grammarScore: 97,
  gradeLevel: '8th',
  currentLanguage: 'English (US)',
  ribbonCollapsed: false,
  leftSidebarVisible: true,
  rightSidebarVisible: true,
  filename: 'gamr-article-draft.gx',
  spellcheckEnabled: true,
  cursorLine: 1,
  cursorCol: 1,
  wordGoal: 1000,
  findReplaceOpen: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setActiveMarks: (marks) => set({ activeMarks: marks }),
  setCurrentFont: (font) => set({ currentFont: font }),
  setCurrentSize: (size) => set({ currentSize: size }),
  setCurrentAlignment: (alignment) => set({ currentAlignment: alignment }),
  setCurrentHeadingLevel: (level) => set({ currentHeadingLevel: level }),
  setZoom: (zoom) => set({ zoom }),
  setWordCount: (count) => set({ wordCount: count }),
  setCharCount: (count) => set({ charCount: count }),
  setLineCount: (count) => set({ lineCount: count }),
  setSentenceCount: (count) => set({ sentenceCount: count }),
  setParagraphCount: (count) => set({ paragraphCount: count }),
  setReadingTimeMinutes: (minutes) => set({ readingTimeMinutes: minutes }),
  toggleFocusMode: () => set((s) => ({ isFocusMode: !s.isFocusMode })),
  setIsPreviewMode: (preview) => set({ isPreviewMode: preview }),
  toggleFullscreen: () => set((s) => ({ isFullscreen: !s.isFullscreen })),
  toggleMinimize: () => set((s) => ({ isMinimized: !s.isMinimized })),
  setAutoSaveStatus: (status) => set({ autoSaveStatus: status }),
  setLastSavedAt: (date) => set({ lastSavedAt: date }),
  addVersionSnapshot: (snapshot) => set((s) => ({ versionHistory: [...s.versionHistory, snapshot] })),
  addBookmark: (bookmark) => set((s) => ({ bookmarks: [...s.bookmarks, bookmark] })),
  removeBookmark: (id) => set((s) => ({ bookmarks: s.bookmarks.filter((b) => b.id !== id) })),
  addComment: (comment) => set((s) => ({ comments: [...s.comments, comment] })),
  resolveComment: (id) => set((s) => ({ comments: s.comments.map((c) => c.id === id ? { ...c, resolved: true } : c) })),
  resolveAllComments: () => set((s) => ({ comments: s.comments.map((c) => ({ ...c, resolved: true })) })),
  deleteResolvedComments: () => set((s) => ({ comments: s.comments.filter((c) => !c.resolved) })),
  setAiCopilotTone: (tone) => set({ aiCopilotTone: tone }),
  setReadabilityScore: (score) => set({ readabilityScore: score }),
  setSeoScore: (score) => set({ seoScore: score }),
  setGrammarScore: (score) => set({ grammarScore: score }),
  setGradeLevel: (level) => set({ gradeLevel: level }),
  setCurrentLanguage: (lang) => set({ currentLanguage: lang }),
  setRibbonCollapsed: (collapsed) => set({ ribbonCollapsed: collapsed }),
  toggleLeftSidebar: () => set((s) => ({ leftSidebarVisible: !s.leftSidebarVisible })),
  toggleRightSidebar: () => set((s) => ({ rightSidebarVisible: !s.rightSidebarVisible })),
  setFilename: (name) => set({ filename: name }),
  toggleSpellcheck: () => set((s) => ({ spellcheckEnabled: !s.spellcheckEnabled })),
  setCursorPosition: (line, col) => set({ cursorLine: line, cursorCol: col }),
  setWordGoal: (goal) => set({ wordGoal: goal }),
  setFindReplaceOpen: (open) => set({ findReplaceOpen: open }),
  updateDocStats: (stats) => set({
    wordCount: stats.words,
    charCount: stats.chars,
    lineCount: stats.lines,
    sentenceCount: stats.sentences,
    paragraphCount: stats.paragraphs,
    readingTimeMinutes: stats.readingTime,
  }),
}));
