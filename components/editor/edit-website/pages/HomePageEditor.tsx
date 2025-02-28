// components/editor/edit-website/pages/HomePageEditor.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWebsite } from '@/context/WebsiteContext';
import AccordionPanel from '../../AccordionPanel';
import ImageUploader from '../components/ImageUploader';
import LayoutSelector from '../components/LayoutSelector';
import Link from 'next/link';

// Bu kısımdaki hataları gidermek için interface ekliyoruz
interface SectionState {
  header: boolean;
  names: boolean;
  featuredGallery: boolean; // Yeni: Öne çıkan galeri bölümü eklendi
  [key: string]: boolean;
}

export default function HomePageEditor() {
  const { content, updateContent } = useWebsite();
  const router = useRouter();
  const [openSections, setOpenSections] = useState<SectionState>({
    header: true,
    names: true,
    featuredGallery: true, // Yeni bölüm varsayılan olarak açık
  });
  const galleryPhotos = content?.galleryPhotos || [];
  const welcomeMessage = content?.welcomeMessage || [];
  const coupleNames = content?.coupleNames || [];
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handleWelcomeMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateContent('welcomeMessage', e.target.value);
  };
  
  // Galeri sayfasına yönlendirme
  const handleEditGallery = () => {
    router.push('/editor/edit-website/gallery');
  };
  
  // Öne çıkan galeri fotoğraflarını göster (en fazla 3 tane)
  const featuredGalleryPhotos = galleryPhotos ? galleryPhotos.slice(0, 3) : [];
  console.log('featuredGalleryPhotos:', featuredGalleryPhotos);
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
                value={welcomeMessage}
                onChange={handleWelcomeMessageChange}
                maxLength={150}
              ></textarea>
              <div className="text-right text-xs text-gray-500">
                {welcomeMessage.length}/150
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
            {coupleNames.map((name, index) => (
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

      {/* YENİ: Öne Çıkan Galeri Bölümü */}
      <AccordionPanel 
        title="Featured Gallery" 
        isOpen={openSections.featuredGallery}
        onToggle={() => toggleSection('featuredGallery')}
      >
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-3">
            Showcase a few photos from your gallery on your home page. Add photos to your gallery to feature them here.
          </p>

          {featuredGalleryPhotos.length > 0 ? (
            <>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {featuredGalleryPhotos.map((photo, index) => (
                  <div key={photo.id} className="aspect-w-4 aspect-h-3 bg-gray-100 rounded overflow-hidden">
                    <img 
                      src={photo.url} 
                      alt={photo.description}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              <button 
                onClick={handleEditGallery}
                className="mt-2 px-4 py-2 bg-black text-white rounded-full text-sm"
              >
                Edit Gallery
              </button>
            </>
          ) : (
            <div className="border border-dashed rounded-md p-5 text-center">
              <p className="text-sm text-gray-500 mb-4">
                You haven't added any photos to your gallery yet. Add photos to showcase them on your home page.
              </p>
              <button 
                onClick={handleEditGallery}
                className="px-4 py-2 bg-black text-white rounded-full text-sm"
              >
                Add to Gallery
              </button>
            </div>
          )}
          
          <div className="mt-4">
            <label className="flex items-center text-sm text-gray-700">
              <input 
                type="checkbox" 
                className="mr-2 rounded"
                checked={content?.showFeaturedGallery} 
                onChange={(e) => updateContent('showFeaturedGallery', e.target.checked)}
              />
              Show featured gallery on home page
            </label>
          </div>
        </div>
      </AccordionPanel>
    </div>
  );
}