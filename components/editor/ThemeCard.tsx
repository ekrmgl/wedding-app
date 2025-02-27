// components/editor/design-gallery/ThemeCard.tsx
'use client';

import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Theme } from '@/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ThemeCardProps {
  theme: Theme;
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  const [selectedColor, setSelectedColor] = useState(theme.colorOptions[0].id);
  const { setTheme } = useTheme();
  const router = useRouter();
  
  // Temayı seç ve editöre geri dön
  const handleThemeSelect = () => {
    setTheme(theme.id, selectedColor);
    router.push('/editor');
  };
  
  return (
    <div className="theme-card p-4 border rounded-md hover:shadow-md transition-shadow">
      <div className="theme-preview cursor-pointer" onClick={handleThemeSelect}>
        <Image 
          src={theme.image} 
          alt={`${theme.name} theme preview`}
          width={200}
          height={300}
          className="w-full object-cover rounded-md"
        />
      </div>
      
      <div className="theme-info mt-3">
        <h3 className="font-medium">{theme.name}</h3>
        
        <div className="color-options flex gap-2 mt-2">
          {theme.colorOptions.map((color) => (
            <button
              key={color.id}
              className={`w-6 h-6 rounded-full border ${
                selectedColor === color.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              }`}
              style={{ backgroundColor: color.value }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(color.id);
              }}
              aria-label={`Select ${color.name || color.id} color`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}