// components/editor/FontSelector.tsx
'use client';

import { useState } from 'react';

interface FontSelectorProps {
  defaultFont: string;
  options: string[];
  onChange?: (font: string) => void;
}

export default function FontSelector({ defaultFont, options, onChange }: FontSelectorProps) {
  const [selectedFont, setSelectedFont] = useState(defaultFont);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFont(e.target.value);
    if (onChange) onChange(e.target.value);
  };
  
  return (
    <div className="relative">
      <select 
        value={selectedFont}
        onChange={handleChange}
        className="appearance-none bg-white border rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ fontFamily: selectedFont }}
      >
        {options.map((font) => (
          <option 
            key={font} 
            value={font}
            style={{ fontFamily: font }}
          >
            {font} {font === defaultFont ? '(Default)' : ''}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}