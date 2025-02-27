// components/editor/edit-website/PageContentEditor.tsx
'use client';

import { useState } from 'react';
import HomePageEditor from './pages/HomePageEditor';
import SchedulePageEditor from './pages/SchedulePageEditor';
import { useTheme } from '@/context/ThemeContext';

interface PageContentEditorProps {
  page: string;
  onBack: () => void;
}

export default function PageContentEditor({ page, onBack }: PageContentEditorProps) {
  const { getCurrentTheme } = useTheme();
  const currentTheme = getCurrentTheme();
  
  // İlgili sayfaya göre içerik düzenleyiciyi render et
  const renderContent = () => {
    switch (page) {
      case 'home':
        return <HomePageEditor />;
      case 'schedule':
        return <SchedulePageEditor />;
      case 'travel':
        return <div className="p-6">Travel page editor coming soon</div>;
      case 'wedding-party':
        return <div className="p-6">Wedding Party page editor coming soon</div>;
      case 'gallery':
        return <div className="p-6">Gallery page editor coming soon</div>;
      case 'things-to-do':
        return <div className="p-6">Things To Do page editor coming soon</div>;
      case 'faqs':
        return <div className="p-6">FAQs page editor coming soon</div>;
      case 'rsvp':
        return <div className="p-6">RSVP page editor coming soon</div>;
      case 'registry':
        return <div className="p-6">Registry page editor coming soon</div>;
      case 'website-title':
        return <div className="p-6">Website title and details editor coming soon</div>;
      case 'announcement-banner':
        return <div className="p-6">Announcement banner editor coming soon</div>;
      default:
        return (
          <div className="p-6 text-center">
            <p>Editor for {page} is under construction.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="p-4">
      {/* Geri Butonu */}
      <div className="mb-4">
        <button 
          className="flex items-center text-sm font-medium"
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Sections
        </button>
      </div>
      
      {/* Sayfa Başlığı */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {page === 'website-title' ? 'Website Title and Details' : 
           page === 'announcement-banner' ? 'Announcement Banner' : 
           page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, ' ')}
        </h1>
        
        {/* Sadece ana sayfa başlıkları için düzenleme butonu göster */}
        {!['website-title', 'announcement-banner'].includes(page) && (
          <button className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Sayfa İçerik Düzenleyicisi */}
      <div className="page-editor-content">
        {renderContent()}
      </div>
    </div>
  );
}