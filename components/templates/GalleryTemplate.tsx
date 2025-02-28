// components/templates/GalleryTemplate.tsx
'use client';

import { useState } from 'react';
import { useWebsite } from '@/context/WebsiteContext';
import { useTheme } from '@/context/ThemeContext';

export default function GalleryTemplate() {
  const { content } = useWebsite();
  const { getCurrentTheme, getCurrentColor } = useTheme();
  const currentTheme = getCurrentTheme();
  const primaryColor = getCurrentColor();
  
  // State for gallery preview
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  // Galeri verileri
  const galleryPhotos = content?.galleryPhotos || [];
  const galleryVideos = content?.galleryVideos || [];
  const galleryDescription = content?.galleryDescription || 'A few photos of us over the years.';
  const galleryHeaderImage = content?.galleryHeaderImage || '';
  
  // Ana fotoğrafı değiştir
  const handlePhotoChange = (index: number) => {
    setCurrentPhotoIndex(index);
  };
  
  // Bir sonraki fotoğrafa geç
  const handleNextPhoto = () => {
    if (galleryPhotos.length > 0) {
      setCurrentPhotoIndex((prev) => (prev + 1) % galleryPhotos.length);
    }
  };
  
  // Bir önceki fotoğrafa geç
  const handlePrevPhoto = () => {
    if (galleryPhotos.length > 0) {
      setCurrentPhotoIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
    }
  };
  
  // Eğer hiç içerik yoksa
  if (galleryPhotos.length === 0 && !galleryHeaderImage) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl mb-4" style={{ color: primaryColor }}>Gallery</h2>
        <p className="text-gray-500">This page is under construction.</p>
      </div>
    );
  }
  
  return (
    <div className="wedding-template gallery-template py-8">
      {/* Galeri Başlığı */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>Gallery</h2>
        {galleryDescription && (
          <p className="mt-4 max-w-2xl mx-auto text-center">
            {galleryDescription}
          </p>
        )}
      </div>
      
      {/* Galeri Başlık Fotoğrafı */}
      {galleryHeaderImage && (
        <div className="mb-12 max-w-4xl mx-auto px-4">
          <div className="overflow-hidden rounded-lg shadow-md">
            <img 
              src={galleryHeaderImage}
              alt="Gallery header"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
      
      {/* Ana Fotoğraf Gösterimi */}
      {galleryPhotos.length > 0 && (
        <div className="photo-gallery max-w-5xl mx-auto px-4 mb-16">
          <div className="mb-8 relative">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden rounded-lg shadow-md">
              <img 
                src={galleryPhotos[currentPhotoIndex].url} 
                alt={galleryPhotos[currentPhotoIndex].description || 'Gallery photo'}
                className="w-full h-full object-contain"
              />
            </div>
            
            {galleryPhotos.length > 1 && (
              <>
                {/* Önceki/Sonraki butonları */}
                <button 
                  onClick={handlePrevPhoto}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={handleNextPhoto}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-2 rounded-full shadow-md"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Açıklama */}
            {galleryPhotos[currentPhotoIndex]?.description && (
              <div className="text-center mt-2">
                <p className="text-sm text-gray-600">
                  {galleryPhotos[currentPhotoIndex].description}
                </p>
              </div>
            )}
          </div>
          
          {/* Küçük Önizlemeler */}
          {galleryPhotos.length > 1 && (
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 mb-8">
              {galleryPhotos.map((photo, idx) => (
                <div 
                  key={photo.id || idx}
                  className={`aspect-w-1 aspect-h-1 overflow-hidden cursor-pointer rounded-md ${
                    idx === currentPhotoIndex ? `ring-2 ring-offset-2 ring-${primaryColor}` : ''
                  }`}
                  onClick={() => handlePhotoChange(idx)}
                >
                  <img 
                    src={photo.url} 
                    alt={photo.description || `Photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Videolar */}
      {galleryVideos && galleryVideos.length > 0 && (
        <div className="video-gallery max-w-4xl mx-auto mt-16 px-4">
          <h3 className="text-xl font-medium text-center mb-8" style={{ color: primaryColor }}>
            Videos
          </h3>
          
          <div className="space-y-12">
            {galleryVideos.map((video, idx) => (
              <div key={video.id || idx} className="video-container">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 mb-3 rounded-lg overflow-hidden shadow-md">
                  {/* Video gösterim komponenti */}
                  <div className="w-full h-full">
                    {video.provider === 'youtube' && (
                      <iframe
                        src={`https://www.youtube.com/embed/${getVideoId(video.url)}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    )}
                    {video.provider === 'vimeo' && (
                      <iframe
                        src={`https://player.vimeo.com/video/${getVimeoId(video.url)}`}
                        title="Vimeo video player"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    )}
                  </div>
                </div>
                
                {/* Video açıklaması */}
                {video.caption && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      {video.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Video ID'lerini alma yardımcı fonksiyonları
function getVideoId(url: string): string {
  // YouTube URL'inden video ID'sini çıkar
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

function getVimeoId(url: string): string {
  // Vimeo URL'inden video ID'sini çıkar
  const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
  const match = url.match(regExp);
  return match ? match[1] : '';
}



// WebsiteContext.tsx'e eklenecek güncellemeler

// GalleryPhoto ve GalleryVideo tipleri zaten tanımlandı

// WebsiteContent interface'ine eklenecek alanlar
/*
WebsiteContent interface:

  // Galeri sayfası için yeni alanlar
  galleryHeaderImage: string;   // Galeri sayfasının başlık fotoğrafı
  galleryDescription: string;   // Galeri sayfasının açıklaması
  galleryPhotos: GalleryPhoto[]; // Galeri fotoğrafları
  galleryVideos: GalleryVideo[]; // Galeri videoları
  galleryVisible: boolean;      // Galeri sayfasının görünürlüğü
  
  // Ana sayfa için featured gallery
  showFeaturedGallery: boolean; // Ana sayfada galeri gösterilsin mi
*/

// defaultContent içine eklenecek varsayılan değerler
/*
defaultContent:

  // Galeri için varsayılan değerler
  galleryHeaderImage: '',
  galleryDescription: 'A few photos of us over the years.',
  galleryPhotos: [],
  galleryVideos: [],
  galleryVisible: true,
  showFeaturedGallery: true,
*/