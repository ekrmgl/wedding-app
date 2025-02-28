// components/editor/PreviewPanel.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useWebsite } from '@/context/WebsiteContext';
import ThemeDecorations from '../templates/ThemeDecorations';
import HomeTemplate from '../templates/HomeTemplate';
import ScheduleTemplate from '../templates/ScheduleTemplate';
import GalleryTemplate from '../templates/GalleryTemplate';

interface PreviewPanelProps {
  activePage?: string;
}

export default function PreviewPanel({ activePage = 'home' }: PreviewPanelProps) {
  const { content, isSaving, lastSaved, saveStatus, lastError, saveChanges } = useWebsite();
  const { getCurrentTheme, getCurrentColor } = useTheme();
  const currentTheme = getCurrentTheme();
  const primaryColor = getCurrentColor();
  const [viewMode, setViewMode] = useState('desktop'); // desktop, tablet, mobile
  
  // Format Last Saved Time
  const formatLastSaved = () => {
    if (!lastSaved) return '';
    console.log(lastSaved);
    // Son 60 saniye içinde ise "Az önce" göster
    const seconds = Math.floor((Date.now() - lastSaved.getTime()) / 1000);
    if (seconds < 60) return 'Az önce kaydedildi';
    
    // Saat:dakika formatında göster
    return `Son kayıt: ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };
  
  // Aktif sayfaya göre ilgili template'i göster
  const renderPageContent = () => {
    switch (activePage) {
      case 'home':
        return <HomeTemplate />;
      case 'schedule':
        return <ScheduleTemplate />;
      case 'gallery':
        return <GalleryTemplate />;
      default:
        return (
          <div className="py-8 px-6 text-center">
            <h2 className="text-2xl mb-4" style={{ fontFamily: currentTheme?.fontFamily }}>
              {activePage.charAt(0).toUpperCase() + activePage.slice(1).replace(/-/g, ' ')}
            </h2>
            <p>Bu sayfa yapım aşamasındadır.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="w-full flex flex-col h-full">
      {/* URL ve Butonlar */}
      <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-gray-500 mr-1">www.zola.com/wedding/ekremandnisa</span>
          <button className="text-sm text-blue-600">Özel URL al</button>
        </div>
        <div className="flex items-center space-x-2">
          {/* Kaydetme durumu göstergesi */}
          {saveStatus === 'saving' && (
            <span className="text-blue-500 text-sm animate-pulse">Kaydediliyor...</span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-green-500 text-sm">✓ {formatLastSaved()}</span>
          )}
          {saveStatus === 'error' && (
            <div className="flex items-center">
              <span className="text-red-500 text-sm">Kaydetme hatası!</span>
              <button 
                onClick={saveChanges}
                className="ml-2 text-sm text-blue-600 underline"
              >
                Tekrar dene
              </button>
            </div>
          )}
          
          <button className="px-4 py-2 border rounded-full text-sm">Önizle</button>
          <button 
            className={`px-4 py-2 ${isSaving ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'} text-white rounded-full text-sm`}
            onClick={saveChanges}
            disabled={isSaving}
          >
            {isSaving ? 'Kaydediliyor...' : 'Yayınla'}
          </button>
        </div>
      </div>
      
      {/* Preview İçeriği */}
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <div className={`${
          viewMode === 'mobile' ? 'max-w-xs' : 
          viewMode === 'tablet' ? 'max-w-md' : 
          'max-w-3xl'
        } mx-auto my-6 bg-white border shadow-sm`}>
          <ThemeDecorations>
            {/* Header */}
            <div className="p-6 text-center">
              <h1 className="text-3xl" style={{ 
                fontFamily: currentTheme?.fontFamily,
                color: primaryColor
              }}>
                {content?.title || "Düğün Web Sitemiz"}
              </h1>
            </div>
            
            {/* Navigation */}
            <div className="border-t border-b py-4">
              <ul className="flex justify-center space-x-6 text-sm flex-wrap" style={{ 
                fontFamily: currentTheme?.fontFamily 
              }}>
                <li className={`${activePage === 'home' ? 'border-b-2 pb-1' : ''}`} style={{ 
                  borderColor: activePage === 'home' ? primaryColor : 'transparent' 
                }}>Anasayfa</li>
                <li className={`${activePage === 'schedule' ? 'border-b-2 pb-1' : ''}`} style={{ 
                  borderColor: activePage === 'schedule' ? primaryColor : 'transparent' 
                }}>Program</li>
                <li className={`${activePage === 'travel' ? 'border-b-2 pb-1' : ''}`} style={{ 
                  borderColor: activePage === 'travel' ? primaryColor : 'transparent' 
                }}>Ulaşım</li>
                <li className={`${activePage === 'wedding-party' ? 'border-b-2 pb-1' : ''}`} style={{ 
                  borderColor: activePage === 'wedding-party' ? primaryColor : 'transparent' 
                }}>Düğün Ekibi</li>
                <li className={`${activePage === 'gallery' ? 'border-b-2 pb-1' : ''}`} style={{ 
                  borderColor: activePage === 'gallery' ? primaryColor : 'transparent' 
                }}>Galeri</li>
                <li className={`${activePage === 'things-to-do' ? 'border-b-2 pb-1' : ''}`} style={{ 
                  borderColor: activePage === 'things-to-do' ? primaryColor : 'transparent' 
                }}>Yapılacaklar</li>
                <li className={`${activePage === 'faqs' ? 'border-b-2 pb-1' : ''}`} style={{ 
                  borderColor: activePage === 'faqs' ? primaryColor : 'transparent' 
                }}>SSS</li>
                <li className={`${activePage === 'registry' ? 'border-b-2 pb-1' : ''}`} style={{ 
                  borderColor: activePage === 'registry' ? primaryColor : 'transparent' 
                }}>Hediye Listesi</li>
              </ul>
            </div>
            
            {/* Sayfa İçeriği */}
            {renderPageContent()}
            
          </ThemeDecorations>
        </div>
      </div>
      
      {/* Responsive kontrolleri */}
      <div className="p-4 border-t border-gray-200 flex justify-center bg-white">
        <button 
          className={`mx-2 p-2 rounded-full ${viewMode === 'desktop' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          onClick={() => setViewMode('desktop')}
          title="Masaüstü görünümü"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
          </svg>
        </button>
        <button 
          className={`mx-2 p-2 rounded-full ${viewMode === 'tablet' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          onClick={() => setViewMode('tablet')}
          title="Tablet görünümü"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm4 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </button>
        <button 
          className={`mx-2 p-2 rounded-full ${viewMode === 'mobile' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          onClick={() => setViewMode('mobile')}
          title="Mobil görünüm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}