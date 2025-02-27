// components/editor/edit-website/components/NameEditor.tsx
'use client';

import { useState } from 'react';

interface Name {
  id: string;
  name: string;
}

interface NameEditorProps {
  names: Name[];
  onUpdate: (names: Name[]) => void;
}

export default function NameEditor({ names, onUpdate }: NameEditorProps) {
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  
  const startEditing = (nameId: string, currentValue: string) => {
    setEditing(nameId);
    setEditValue(currentValue);
  };
  
  const saveEdit = () => {
    if (editing) {
      const updatedNames = names.map(name => 
        name.id === editing ? { ...name, name: editValue } : name
      );
      onUpdate(updatedNames);
      setEditing(null);
    }
  };
  
  const cancelEdit = () => {
    setEditing(null);
  };
  
  return (
    <div className="border rounded-md overflow-hidden">
      {names.map((name, index) => (
        <div 
          key={name.id} 
          className={`flex items-center justify-between p-3 ${
            index < names.length - 1 ? 'border-b' : ''
          }`}
        >
          <button className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
          
          {editing === name.id ? (
            <div className="flex-1 mx-2">
              <input 
                type="text" 
                className="w-full border rounded px-2 py-1"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={saveEdit}
                onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                autoFocus
              />
            </div>
          ) : (
            <span className="flex-1 mx-2">{name.name}</span>
          )}
          
          <button 
            className="p-1 text-gray-600"
            onClick={() => startEditing(name.id, name.name)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}