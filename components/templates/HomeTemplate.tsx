// components/templates/HomeTemplate.tsx
'use client';

import { useWebsite } from '@/context/WebsiteContext';
import Hero from './hero-layouts';
import { HeroLayoutType } from '@/context/ThemeContext';
import { useTheme } from '@/context/ThemeContext';

export default function HomeTemplate() {
  const { content } = useWebsite();
  const { getCurrentTheme, getCurrentColor } = useTheme();
  const currentTheme = getCurrentTheme();
  const primaryColor = getCurrentColor();
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

  return (
    <div className="wedding-template home-template">
      {/* Hero Section */}
      <Hero
        layoutType={getLayoutType(content.heroLayout)}
        images={content.slideshowImages}
        welcomeMessage={content.welcomeMessage}
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
            {content.coupleNames[0]}
            <br />&<br />
            {content.coupleNames[1]}
          </h2>

          <div className="mt-8 mb-8">
            <h3 className="text-xl" style={{ fontFamily: currentTheme?.fontFamily }}>
              MAY 30, 2024
            </h3>
          </div>

          <div className="text-xs text-gray-500 mt-12">
            <p>ZOLA</p>
            <p>For all the steps along the way</p>
          </div>
        </div>


      </div>
    </div>
  );
}