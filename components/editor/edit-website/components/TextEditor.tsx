// components/editor/edit-website/components/TextEditor.tsx
'use client';

import { useState } from 'react';

interface TextEditorProps {
  initialValue: string;
  maxLength?: number;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function TextEditor({ 
  initialValue, 
  maxLength = 150, 
  placeholder = 'Enter text here',
  onChange 
}: TextEditorProps) {
  const [text, setText] = useState(initialValue);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length <= maxLength) {
      setText(newValue);
      if (onChange) onChange(newValue);
    }
  };
  
  return (
    <div className="border rounded-md p-3">
      <textarea 
        className="w-full outline-none resize-none" 
        rows={3}
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
      ></textarea>
      {maxLength && (
        <div className="text-right text-xs text-gray-500">
          {text.length}/{maxLength}
        </div>
      )}
    </div>
  );
}