// components/templates/HomeTemplate.tsx
'use client';

import { useWebsite } from '@/context/WebsiteContext';
import Hero from './hero-layouts';
import { HeroLayoutType } from '@/context/ThemeContext';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

export default function HomeTemplate() {
  const { content } = useWebsite();
  const { getCurrentTheme, getCurrentColor } = useTheme();
  const currentTheme = getCurrentTheme();
  const primaryColor = getCurrentColor();
  const heroLayout = content?.heroLayout || 'slideshow';
  const slideshowImages = content?.slideshowImages || [];
  const welcomeMessage = content?.welcomeMessage || '';
  const coupleNames = content?.coupleNames || [];
  const weddingDate = content?.weddingDate || '';
  const showFeaturedGallery = content?.showFeaturedGallery || false;
  // String'i enum değerine dönüştür
  const getLayoutType = (layoutString: string): HeroLayoutType => {
    switch (layoutString) {
      case 'none':
        return HeroLayoutType.NONE;
      case 'overlapping-squares':
        return HeroLayoutType.OVERLAPPING_SQUARES;
      case 'side-by-side':
        return HeroLayoutType.SIDE_BY_SIDE;
      case 'marquee':
        return HeroLayoutType.MARQUEE;
      case 'slideshow':
      default:
        return HeroLayoutType.SLIDESHOW;
    }
  };

  // Öne çıkan galeri fotoğraflarını (ilk 3) al
  const featuredPhotos = content?.galleryPhotos && content.galleryPhotos.length > 0 
    ? content.galleryPhotos.slice(0, 3) 
    : [];

  return (
    <div className="wedding-template home-template">
      {/* Hero Section */}
      <Hero
        layoutType={getLayoutType(heroLayout)}
        images={slideshowImages}
        welcomeMessage={welcomeMessage}
      />

      {/* Couple Section */}
      <div className="py-10 px-6 text-center" style={{ position: 'relative', overflow: 'visible', paddingTop: '1px', marginTop: '-1px', display: 'block' }}>
        <img
          src={currentTheme?.decorations?.bottom || ''}
          alt=""
          style={{
            width: '80%',
            zIndex: 50,
            display: 'block',
            position: 'absolute',
            bottom: '0px',
            right: '0px',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        />
        <img
          src={currentTheme?.decorations?.top || ''}
          alt=""
          style={{
            width: '100%',
            zIndex: 50,
            display: 'block',
            position: 'absolute',
            top: '0px',
            left: '0px',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
        />
        
        {/* Footer - İsimler ve Tarih */}
        <div className="py-16 text-center" style={{
          maxWidth: '1020px',
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'relative',
          zIndex: 150,
          paddingTop: 65,
          paddingRight: 32,
          paddingLeft: 32
        }}>
          <h2 className="text-3xl mb-4" style={{
            fontFamily: currentTheme?.fontFamily,
            color: primaryColor
          }}>
            {coupleNames[0]}
            <br />&<br />
            {coupleNames[1]}
          </h2>

          <div className="mt-8 mb-8">
            <h3 className="text-xl" style={{ fontFamily: currentTheme?.fontFamily }}>
              MAY 30, 2024
            </h3>
          </div>

          {/* YENİ: Öne Çıkan Galeri Bölümü */}
          {showFeaturedGallery && featuredPhotos.length > 0 && (
            <div className="featured-gallery mt-16 mb-16">
              <h3 className="text-xl mb-6" style={{ color: primaryColor }}>Our Gallery</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {featuredPhotos.map((photo) => (
                  <div key={photo.id} className="aspect-w-4 aspect-h-3 overflow-hidden rounded">
                    <img 
                      src={photo.url} 
                      alt={photo.description}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link 
                  href="/gallery" 
                  className="inline-block px-6 py-2 border-2 rounded-full transition-colors hover:bg-gray-100"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  View All Photos
                </Link>
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 mt-12">
            <p>ZOLA</p>
            <p>For all the steps along the way</p>
          </div>
        </div>
      </div>
    </div>
  );
}