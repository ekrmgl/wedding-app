// app/editor/edit-website/gallery/page.tsx
import GalleryPageEditor from '@/components/editor/edit-website/pages/GalleryPageEditor';

export default function GalleryPage() {
  return <GalleryPageEditor />;
}

// Context güncellemesi - WebsiteContext.tsx içine eklemeler
// Bu kısmı mevcut WebsiteContext.tsx dosyasına entegre etmeniz gerekecek

// context/WebsiteContext.tsx dosyasına eklenecek tipler
interface GalleryPhoto {
  id: string;
  url: string;
  description: string;
}

interface GalleryVideo {
  id: string;
  url: string;
  caption: string;
  provider: 'youtube' | 'vimeo';
}

// WebsiteContent interface'ine eklenecek alanlar
/*
WebsiteContent interface'ine şu alanları ekleyin:

galleryPhotos: GalleryPhoto[];
galleryVideos: GalleryVideo[];
galleryDescription: string;
*/

// defaultContent içine eklenecek varsayılan değerler
/*
defaultContent nesnesine şu alanları ekleyin:

galleryPhotos: [],
galleryVideos: [],
galleryDescription: 'A few photos of us over the years.',
*/

// components/editor/edit-website/PagesSidebar.tsx dosyasına yeni galeri sayfası bağlantısını ekleyin
/*
pages dizisinde 'gallery' öğesinin tanımını şu şekilde güncelleyin:

{ 
  id: 'gallery', 
  title: 'Gallery', 
  hasLock: false 
},
*/