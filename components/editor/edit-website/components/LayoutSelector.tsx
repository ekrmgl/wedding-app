// components/editor/edit-website/components/LayoutSelector.tsx
'use client';

import { useState } from 'react';
import { useWebsite } from '@/context/WebsiteContext';
import { HeroLayoutType } from '@/context/ThemeContext';

export default function LayoutSelector() {
  const { content, updateContent } = useWebsite();
  const [isOpen, setIsOpen] = useState(false);

  const layouts = [
    { type: HeroLayoutType.NONE, label: 'None' },
    { type: HeroLayoutType.OVERLAPPING_SQUARES, label: 'Overlapping squares' },
    { type: HeroLayoutType.SIDE_BY_SIDE, label: 'Mixed side-by-side' },
    { type: HeroLayoutType.SLIDESHOW, label: 'Slideshow' },
    { type: HeroLayoutType.MARQUEE, label: 'Marquee' },
  ];

  const handleSelectLayout = (layout: HeroLayoutType) => {
    updateContent('heroLayout', layout);
    setIsOpen(false);
  };

  // Seçili layout'u bul
  const selectedLayout = layouts.find(layout => layout.type === content.heroLayout) || layouts[0];

  return (
    <div className="mt-2 mb-4">
      <p className="text-sm font-medium mb-2">Layout</p>
      <p className="text-xs text-gray-600 mb-4">Heads up! On your phone, 2+ photos will always appear in a slideshow.</p>
      
      <div className="relative">
        {/* Dropdown Trigger */}
        <div 
          className="border rounded-md p-3 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-16 h-10 bg-gray-200 border mr-3 flex items-center justify-center">
                {getLayoutIcon(selectedLayout.type)}
              </div>
              <span>{selectedLayout.label}</span>
            </div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
            {layouts.map((layout) => (
              <div 
                key={layout.type}
                className={`p-3 cursor-pointer hover:bg-gray-100 flex items-center ${
                  layout.type === content.heroLayout ? 'bg-gray-50' : ''
                }`}
                onClick={() => handleSelectLayout(layout.type)}
              >
                <div className="w-16 h-10 bg-gray-200 border mr-3 flex items-center justify-center">
                  {getLayoutIcon(layout.type)}
                </div>
                <span>{layout.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Layout ikonları için helper fonksiyon
function getLayoutIcon(layoutType: HeroLayoutType) {
  switch (layoutType) {
    case HeroLayoutType.NONE:
      return <span>None</span>;
    case HeroLayoutType.OVERLAPPING_SQUARES:
      return (
        <div className="flex">
          <div className="w-6 h-6 border bg-white"></div>
          <div className="w-6 h-6 border bg-white -ml-3 mt-2"></div>
        </div>
      );
    case HeroLayoutType.SIDE_BY_SIDE:
      return (
        <div className="flex">
          <div className="w-6 h-6 border bg-white"></div>
          <div className="w-6 h-6 border bg-white ml-1" />
        </div>
      );
    case HeroLayoutType.SLIDESHOW:
      return (
        <div className="w-10 h-6 border bg-white"></div>
      );
    case HeroLayoutType.MARQUEE:
      return (
        <div className="flex">
          <div className="w-2 h-6 border bg-white"></div>
          <div className="w-8 h-6 border bg-white ml-1"></div>
        </div>
      );
    default:
      return null;
  }
}