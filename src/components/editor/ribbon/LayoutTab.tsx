import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import {
  Columns2,
  Columns3,
  Maximize,
  Minimize,
  Square,
  AlignVerticalSpaceAround,
  RectangleHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutTabProps {
  editor: Editor;
  onMarginChange?: (margin: string) => void;
  currentMargin: string;
}

const MARGINS = [
  { name: 'Normal', value: 'normal', icon: Square, desc: 'Standard margins', maxWidth: '65ch' },
  { name: 'Narrow', value: 'narrow', icon: Minimize, desc: 'More writing area', maxWidth: '80ch' },
  { name: 'Wide', value: 'wide', icon: Maximize, desc: 'Wider layout', maxWidth: '90ch' },
  { name: 'Full', value: 'full', icon: RectangleHorizontal, desc: 'Full width', maxWidth: '100%' },
];

const LayoutTab: React.FC<LayoutTabProps> = ({ editor, onMarginChange, currentMargin }) => {
  return (
    <div className="flex items-stretch gap-0 px-2 py-1.5 overflow-x-auto no-scrollbar">
      {/* ── Margins ── */}
      <div className="ribbon-group">
        <div className="ribbon-group-content gap-1">
          {MARGINS.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.value}
                type="button"
                onClick={() => onMarginChange?.(m.value)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all min-w-[56px] ${
                  currentMargin === m.value
                    ? 'border-blue-500/50 bg-blue-500/10 ring-1 ring-blue-500/20'
                    : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${currentMargin === m.value ? 'text-blue-400' : 'text-gray-500'}`} />
                <span className={`text-[8px] font-bold ${currentMargin === m.value ? 'text-blue-400' : 'text-gray-500'}`}>{m.name}</span>
              </button>
            );
          })}
        </div>
        <span className="ribbon-group-label">Margins</span>
      </div>

      <div className="w-px bg-white/[0.06] mx-1 self-stretch" />

      {/* ── Spacing ── */}
      <div className="ribbon-group">
        <div className="ribbon-group-content gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">Before ¶</label>
            <div className="flex items-center gap-1 bg-white/[0.04] rounded-md border border-white/[0.06] px-2 py-1">
              <input
                type="number"
                min="0"
                max="48"
                step="4"
                defaultValue={0}
                className="w-10 bg-transparent text-[11px] text-gray-300 text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-[8px] text-gray-600">pt</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">After ¶</label>
            <div className="flex items-center gap-1 bg-white/[0.04] rounded-md border border-white/[0.06] px-2 py-1">
              <input
                type="number"
                min="0"
                max="48"
                step="4"
                defaultValue={8}
                className="w-10 bg-transparent text-[11px] text-gray-300 text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-[8px] text-gray-600">pt</span>
            </div>
          </div>
        </div>
        <span className="ribbon-group-label">Spacing</span>
      </div>

      <div className="w-px bg-white/[0.06] mx-1 self-stretch" />

      {/* ── Columns (Visual Indicator) ── */}
      <div className="ribbon-group">
        <div className="ribbon-group-content gap-1">
          <button
            type="button"
            className="flex flex-col items-center gap-1 p-2 rounded-lg border border-blue-500/50 bg-blue-500/10 ring-1 ring-blue-500/20 min-w-[56px] transition-all"
          >
            <div className="w-8 h-6 border border-white/20 rounded-sm" />
            <span className="text-[8px] font-bold text-blue-400">One</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-1 p-2 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 min-w-[56px] transition-all"
          >
            <div className="w-8 h-6 flex gap-0.5">
              <div className="flex-1 border border-white/20 rounded-sm" />
              <div className="flex-1 border border-white/20 rounded-sm" />
            </div>
            <span className="text-[8px] font-bold text-gray-500">Two</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-1 p-2 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 min-w-[56px] transition-all"
          >
            <div className="w-8 h-6 flex gap-0.5">
              <div className="flex-1 border border-white/20 rounded-sm" />
              <div className="flex-1 border border-white/20 rounded-sm" />
              <div className="flex-1 border border-white/20 rounded-sm" />
            </div>
            <span className="text-[8px] font-bold text-gray-500">Three</span>
          </button>
        </div>
        <span className="ribbon-group-label">Columns</span>
      </div>
    </div>
  );
};

export default LayoutTab;
