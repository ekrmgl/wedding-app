// context/WebsiteContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { WebsiteContent, GalleryPhoto, GalleryVideo } from '@/types';

interface WebsiteContextProps {
  content: WebsiteContent | null;
  isLoading: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  updateContent: (path: string, value: any) => void;
  saveChanges: () => Promise<void>;
}

const WebsiteContext = createContext<WebsiteContextProps | undefined>(undefined);

// Varsayılan içerik
const defaultContent: WebsiteContent = {
  welcomeMessage: 'Join us as we celebrate our special day!',
  coupleNames: ['Couple Name 1', 'Couple Name 2'],
  weddingDate: 'MAY 30, 2024',
  heroLayout: 'slideshow',
  slideshowImages: [],
  galleryHeaderImage: '',
  galleryDescription: 'A few photos of us over the years.',
  galleryPhotos: [],
  galleryVideos: [],
  galleryVisible: true,
  showFeaturedGallery: true,
  schedule: [],
  scheduleHeaderImage: '',
  scheduleDescription: ''
};

export function WebsiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<WebsiteContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const siteId = searchParams?.get('siteId');

  // Düğün sitesi içeriğini getir
  useEffect(() => {
    async function fetchSiteContent() {
      if (siteId && session) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/wedding-sites/${siteId}`);
          
          if (response.ok) {
            const data = await response.json();
            setContent(data.content || defaultContent);
          } else {
            console.error('Site içeriği alınamadı');
            setContent(defaultContent);
          }
        } catch (error) {
          console.error('Site içeriği alınırken hata oluştu:', error);
          setContent(defaultContent);
        } finally {
          setIsLoading(false);
        }
      }
    }

    if (siteId && session) {
      fetchSiteContent();
    }
  }, [siteId, session]);

  // İçeriği güncelle ve otomatik kaydet
  const updateContent = (path: string, value: any) => {
    if (!content) return;
    
    // Yerel güncelleme
    setContent(prevContent => {
      if (!prevContent) return defaultContent;
      
      const pathParts = path.split('.');
      const newContent = {...prevContent};
      
      let current: any = newContent;
      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        if (!isNaN(Number(part))) {
          current = current[Number(part)];
        } else {
          if (!current[part]) current[part] = {};
          current = current[part];
        }
      }
      
      const lastPart = pathParts[pathParts.length - 1];
      if (!isNaN(Number(lastPart))) {
        current[Number(lastPart)] = value;
      } else {
        current[lastPart] = value;
      }
      
      return newContent;
    });
    
    // Değişikliklerden sonra otomatik kaydet (debounce eklenebilir)
    const timer = setTimeout(() => {
      saveChanges();
    }, 2000);
    
    return () => clearTimeout(timer);
  };

  // Değişiklikleri sunucuya kaydet
  const saveChanges = async (): Promise<void> => {
    if (!siteId || !session || !content) return;
    
    setIsSaving(true);
    
    try {
      const response = await fetch(`/api/wedding-sites/${siteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      
      if (response.ok) {
        setLastSaved(new Date());
      } else {
        console.error('Değişiklikler kaydedilemedi');
      }
    } catch (error) {
      console.error('Değişiklikler kaydedilirken hata oluştu:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const value = {
    content,
    isLoading,
    isSaving,
    lastSaved,
    updateContent,
    saveChanges,
  };

  return (
    <WebsiteContext.Provider value={value}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
}