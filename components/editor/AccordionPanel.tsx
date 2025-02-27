// components/editor/AccordionPanel.tsx
'use client';

import { ReactNode } from 'react';

interface AccordionPanelProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export default function AccordionPanel({ title, isOpen, onToggle, children }: AccordionPanelProps) {
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="w-full flex justify-between items-center focus:outline-none"
        onClick={onToggle}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      <div className={`${isOpen ? 'block' : 'hidden'} mt-4`}>
        {children}
      </div>
    </div>
  );
}