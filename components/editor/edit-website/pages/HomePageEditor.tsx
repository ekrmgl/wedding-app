// components/editor/edit-website/pages/HomePageEditor.tsx
'use client';

import { useState } from 'react';
import { useWebsite } from '@/context/WebsiteContext';
import AccordionPanel from '../../AccordionPanel';
import ImageUploader from '../components/ImageUploader';
import LayoutSelector from '../components/LayoutSelector';

// Bu kısımdaki hataları gidermek için interface ekliyoruz
interface SectionState {
  header: boolean;
  names: boolean;
  [key: string]: boolean;
}

export default function HomePageEditor() {
  const { content, updateContent } = useWebsite();
  const [openSections, setOpenSections] = useState<SectionState>({
    header: true,
    names: true,
  });
  
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handleWelcomeMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateContent('welcomeMessage', e.target.value);
  };
  
  return (
    <div className="space-y-4">
      {/* Header Bölümü */}
      <AccordionPanel 
        title="Header" 
        isOpen={openSections.header}
        onToggle={() => toggleSection('header')}
      >
        <div className="mt-4">
          {/* Layout Seçimi */}
          <LayoutSelector />
          
          {/* Görsel Yükleyici */}
          <ImageUploader minImages={2} maxImages={6} />
          
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Welcome message</p>
            <div className="border rounded-md p-3">
              <textarea 
                className="w-full outline-none resize-none" 
                rows={2}
                placeholder="Enter your welcome message"
                value={content.welcomeMessage}
                onChange={handleWelcomeMessageChange}
                maxLength={150}
              ></textarea>
              <div className="text-right text-xs text-gray-500">
                {content.welcomeMessage.length}/150
              </div>
            </div>
          </div>
        </div>
      </AccordionPanel>
      
      {/* Names Bölümü */}
      <AccordionPanel 
        title="Your names" 
        isOpen={openSections.names}
        onToggle={() => toggleSection('names')}
      >
        <div className="mt-4">
          <div className="border rounded-md overflow-hidden mb-3">
            {content.coupleNames.map((name, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 ${
                  index === 0 ? 'border-b' : ''
                }`}
              >
                <button className="p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                <span className="flex-1 mx-2">{name}</span>
                <button className="p-1 text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-right">
            <button className="text-sm text-gray-600 hover:underline">
              Customize
            </button>
          </div>
        </div>
      </AccordionPanel>
    </div>
  );
}