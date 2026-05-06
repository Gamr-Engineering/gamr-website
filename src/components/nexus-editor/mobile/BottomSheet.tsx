import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  height?: '50vh' | '75vh' | '90vh' | 'auto';
  title: string;
  titleColor?: string;
  children: React.ReactNode;
}

// Ensure portal root exists
function getPortalRoot() {
  let el = document.getElementById('nxm-sheet-portal');
  if (!el) {
    el = document.createElement('div');
    el.id = 'nxm-sheet-portal';
    document.body.appendChild(el);
  }
  return el;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen, onClose, height = '75vh', title, titleColor, children
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    currentY.current = 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - startY.current;
    currentY.current = delta;
    if (delta > 0 && sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${delta}px)`;
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (currentY.current > 80) {
      onClose();
    }
    if (sheetRef.current) {
      sheetRef.current.style.transform = '';
    }
  }, [onClose]);

  if (!isOpen) return null;

  // Use portal to render directly into body — avoids all overflow:hidden ancestors
  return ReactDOM.createPortal(
    <div className="nxm-sheet-overlay" onClick={onClose}>
      <div
        ref={sheetRef}
        className="nxm-sheet-panel"
        style={{ height: height === 'auto' ? 'auto' : height, maxHeight: '92vh' }}
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="nxm-sheet-handle" />
        <div className="nxm-sheet-header">
          <span className="nxm-sheet-title" style={titleColor ? { color: titleColor } : undefined}>
            {title}
          </span>
          <button className="nxm-sheet-close" onClick={onClose}>✕</button>
        </div>
        <div className="nxm-sheet-content">
          {children}
        </div>
      </div>
    </div>,
    getPortalRoot()
  );
};
