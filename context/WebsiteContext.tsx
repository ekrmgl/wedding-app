// context/WebsiteContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Düğün websitesi için temel alanlar
interface WebsiteContent {
  title: string;
  coupleNames: string[];
  headerImage: string;
  welcomeMessage: string;
  heroLayout: string;
  slideshowImages: string[];
  weddingDate: string;
  scheduleHeaderImage: string;
  scheduleDescription: string;
  schedule: Array<{
    type: string;
    name: string;
    startDate: string;
    startTime: string;
    endDate?: string;
    endTime?: string;
    venueName: string;
    streetAddress?: string;
    aptFloor?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country: string;
    isPublic: boolean;
    allowRsvp: boolean;
  }>;
  // Diğer sayfalar için içerik alanları buraya eklenebilir
}

// Varsayılan içerik
const defaultContent: WebsiteContent = {
  title: "EKREM & NISA",
  coupleNames: ["ASDASD ASD", "EKREM GÜL"],
  headerImage: "/images/couple.jpg",
  welcomeMessage: "Join us as we celebrate our special day!",
  heroLayout: "slideshow",
  slideshowImages: ['/images/1.jpg', '/images/2.jpg'],
  weddingDate: "MAY 30, 2024",
  schedule: [
    {
      type: 'Welcome Event',
      name: 'Welcome Event',
      startDate: 'May 30, 2025',
      startTime: '6:00 pm',
      endTime: '11:45 pm',
      venueName: 'Dear Irving Gramercy',
      streetAddress: '55 Irving Pl',
      city: 'New York',
      state: 'NY',
      zipCode: '10003',
      country: 'United States',
      isPublic: true,
      allowRsvp: true
    },
    {
      type: 'Ceremony',
      name: 'Wedding Ceremony',
      startDate: 'May 31, 2025',
      startTime: '3:00 pm',
      endTime: '4:00 pm',
      venueName: 'Brooklyn Botanical Garden',
      streetAddress: '990 Washington Ave',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11225',
      country: 'United States',
      isPublic: true,
      allowRsvp: true
    },
    {
      type: 'Reception',
      name: 'Wedding Reception',
      startDate: 'May 31, 2025',
      startTime: '5:00 pm',
      endTime: '11:00 pm',
      venueName: 'The Liberty Warehouse',
      streetAddress: '260 Conover St',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11231',
      country: 'United States',
      isPublic: true,
      allowRsvp: true
    }
  ],
  scheduleHeaderImage: '',
  scheduleDescription: ''
};

interface WebsiteContextType {
  content: WebsiteContent;
  updateContent: (path: string, value: any) => void;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export function WebsiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<WebsiteContent>(defaultContent);

  // Belirli bir path'deki içeriği güncellemek için
  const updateContent = (path: string, value: any) => {
    setContent(prevContent => {
      // path örneği: "coupleNames.0" veya "schedule.1.title"
      const pathParts = path.split('.');
      const newContent = {...prevContent};
      
      let current: any = newContent;
      for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        if (!isNaN(Number(part))) {
          // Dizin elemanı 
          current = current[Number(part)];
        } else {
          // Nesne özelliği
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
  };

  return (
    <WebsiteContext.Provider value={{ content, updateContent }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const context = useContext(WebsiteContext);
  if (context === undefined) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
}