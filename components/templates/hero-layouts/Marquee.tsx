// components/templates/hero-layouts/Marquee.tsx
'use client';

interface MarqueeProps {
  images: string[];
  welcomeMessage: string;
}

export default function Marquee({ images, welcomeMessage }: MarqueeProps) {
  // Görsel yoksa yedek içerik göster
  if (images.length === 0) {
    return (
      <div className="h-80 bg-gray-300 flex items-center justify-center">
        <h2 className="text-3xl text-white font-light">{welcomeMessage}</h2>
      </div>
    );
  }
  
  return (
    <div className="flex h-80">
      {/* Sol taraf - dar banner */}
      <div className="w-1/4 bg-gray-800 text-white flex items-center justify-center p-4">
        <h2 className="text-xl md:text-2xl font-light text-center writing-vertical-lr">
          {welcomeMessage}
        </h2>
      </div>
      
      {/* Sağ taraf - görsel */}
      <div className="w-3/4 relative overflow-hidden">
        <img 
          src={images[0]} 
          alt="Marquee image" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}