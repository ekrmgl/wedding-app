// components/templates/ThemeDecorations.tsx
'use client';

import { useTheme } from '@/context/ThemeContext';
import { ReactNode } from 'react';

interface ThemeDecorationsProps {
  children: ReactNode;
}

export default function ThemeDecorations({ children }: ThemeDecorationsProps) {
  const { getCurrentTheme, getCurrentColor } = useTheme();
  const currentTheme = getCurrentTheme();
  const primaryColor = getCurrentColor();
  
  // Tema fontunu ayarla
  const fontStyle = {
    fontFamily: currentTheme?.fontFamily || 'serif',
    color: primaryColor
  };
  
  // Eğer dekorasyon yoksa sadece içeriği döndür
  if (!currentTheme?.decorations) {
    return <div style={fontStyle}>{children}</div>;
  }
  
  return (
    <div className="theme-container relative min-h-screen" style={fontStyle}>
      {/* Üst süsleme */}
      {currentTheme.decorations.top && (
        <div className="absolute top-0 left-0 right-0 z-0">
          {/* <img 
            src={currentTheme.decorations.top} 
            alt="" 
            className="w-full object-contain"
          /> */}
        </div>
      )}
      
      {/* İçerik bölümü */}
      <div className="content-area relative z-10 py-16 px-6">
        {children}
      </div>
      
      {/* Alt süsleme */}
      {currentTheme.decorations.bottom && (
        <div className="absolute bottom-0 left-0 right-0 z-0">
          {/* <img 
            src={currentTheme.decorations.bottom} 
            alt="" 
            className="w-full object-contain"
          /> */}
        </div>
      )}
    </div>
  );
}