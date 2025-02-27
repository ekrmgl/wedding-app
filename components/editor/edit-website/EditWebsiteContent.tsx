// components/editor/edit-website/EditWebsiteContent.tsx
'use client';

import { useState } from 'react';
import PagesSidebar from './PagesSidebar';
import PageContentEditor from './PageContentEditor';
import PreviewPanel from '../PreviewPanel';

export default function EditWebsiteContent() {
  const [activePage, setActivePage] = useState<string | null>(null);
  
  const handlePageSelect = (page: string) => {
    setActivePage(page);
  };
  
  const handleBackToSections = () => {
    setActivePage(null);
  };
  
  return (
    <div className="flex h-full">
      {/* Sol menü veya sayfa içerik editörü */}
      <div className="w-[280px] border-r border-gray-200 bg-white overflow-y-auto">
        {activePage ? (
          <PageContentEditor 
            page={activePage} 
            onBack={handleBackToSections} 
          />
        ) : (
          <PagesSidebar 
            onPageSelect={handlePageSelect} 
            activePage={activePage}
          />
        )}
      </div>
      
      {/* Sağ taraf önizleme paneli */}
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <PreviewPanel activePage={activePage || 'home'} />
      </div>
    </div>
  );
}