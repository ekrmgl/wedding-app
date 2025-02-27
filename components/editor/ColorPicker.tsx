// components/editor/ColorPicker.tsx
'use client';

import { useState } from 'react';

interface ColorPickerProps {
  defaultColor: string;
  onChange?: (color: string) => void;
}

export default function ColorPicker({ defaultColor, onChange }: ColorPickerProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (onChange) onChange(color);
    setShowColorPicker(false);
  };
  
  return (
    <div className="relative">
      <div className="flex items-center">
        <button 
          className="w-6 h-6 rounded-full border shadow-sm"
          style={{ backgroundColor: selectedColor }}
          onClick={() => setShowColorPicker(!showColorPicker)}
          aria-label="Select color"
        />
        
        <button 
          className="ml-2"
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <div className="w-6 h-6 rounded-full border bg-gradient-to-r from-red-500 via-green-500 to-blue-500"></div>
        </button>
      </div>
      
      {showColorPicker && (
        <div className="absolute z-10 mt-2 p-2 bg-white border rounded shadow-lg">
          <div className="flex flex-wrap gap-2 w-48">
            {['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#c0c0c0', '#808080', '#800000', '#808000', '#008000', '#800080', '#008080', '#000080'].map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-full border"
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}