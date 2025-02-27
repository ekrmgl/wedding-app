// context/ThemeContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeSelection,Theme, ThemeColor, ThemeDecorations, HeroLayoutType } from '@/types';
import { themes, getThemeById } from '@/lib/data/themes';



interface ThemeContextType {
  themes: Theme[];
  selectedTheme: ThemeSelection | null;
  setTheme: (themeId: string, colorId: string) => void;
  getCurrentTheme: () => Theme | null;
  getCurrentColor: () => string;
}



const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {

  const defaultTheme = themes[0]; // İlk tema
  const defaultColor = defaultTheme.colorOptions[0].id; // İlk temanın ilk rengi

  const [selectedTheme, setSelectedTheme] = useState<ThemeSelection>({
    themeId: themes[0].id,
    colorId: themes[0].colorOptions[0].id
  });
  const setTheme = (themeId: string, colorId: string) => {
    setSelectedTheme({ themeId, colorId });
  };

  const getCurrentTheme = (): Theme | null => {
    if (!selectedTheme) return null;
    return themes.find(theme => theme.id === selectedTheme.themeId) || null;
  };

  const getCurrentColor = (): string => {
    if (!selectedTheme) return '#000000';
    const theme = themes.find(theme => theme.id === selectedTheme.themeId);
    if (!theme) return '#000000';
    const color = theme.colorOptions.find(color => color.id === selectedTheme.colorId);
    return color?.value || '#000000';
  };

  return (
    <ThemeContext.Provider value={{ 
      themes, 
      selectedTheme, 
      setTheme, 
      getCurrentTheme, 
      getCurrentColor 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export const getThemes = () => themes;
export const findThemeById = (id: string) => themes.find(theme => theme.id === id);

export { HeroLayoutType };
