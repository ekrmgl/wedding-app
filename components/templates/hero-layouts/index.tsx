// components/templates/hero-layouts/index.tsx
'use client';

import { HeroLayoutType } from '@/context/ThemeContext'; // Doğru import
import Slideshow from './Slideshow';
import OverlappingSquares from './OverlappingSquares';
import SideBySide from './SideBySide';
import Marquee from './Marquee';

interface HeroProps {
  layoutType: HeroLayoutType;
  images: string[];
  welcomeMessage: string;
}

export default function Hero({ layoutType, images, welcomeMessage }: HeroProps) {
  // Layout tipine göre ilgili bileşeni döndür
  switch (layoutType) {
    case HeroLayoutType.OVERLAPPING_SQUARES:
      return <OverlappingSquares images={images} welcomeMessage={welcomeMessage} />;
    case HeroLayoutType.SIDE_BY_SIDE:
      return <SideBySide images={images} welcomeMessage={welcomeMessage} />;
    case HeroLayoutType.SLIDESHOW:
      return <Slideshow images={images} welcomeMessage={welcomeMessage} />;
    case HeroLayoutType.MARQUEE:
      return <Marquee images={images} welcomeMessage={welcomeMessage} />;
    case HeroLayoutType.NONE:
    default:
      return (
        <div className="py-8 px-6 text-center bg-gray-100">
          <h2 className="text-3xl font-light">{welcomeMessage}</h2>
        </div>
      );
  }
}