// components/templates/hero-layouts/OverlappingSquares.tsx
'use client';

interface OverlappingSquaresProps {
  images: string[];
  welcomeMessage: string;
}

export default function OverlappingSquares({ images, welcomeMessage }: OverlappingSquaresProps) {
  // En az 2 görsel gerekiyor, yoksa yedek içerik göster
  if (images.length < 2) {
    return (
      <div className="h-80 bg-gray-300 flex items-center justify-center">
        <h2 className="text-3xl text-white font-light">{welcomeMessage}</h2>
      </div>
    );
  }
  
  return (
    <div className="relative h-80 overflow-hidden bg-gray-100 p-6">
      <div className="relative w-full h-full max-w-4xl mx-auto">
        {/* İlk görsel */}
        <div className="absolute left-0 top-0 w-2/3 h-2/3 shadow-md z-10">
          <img src={images[0]} alt="First image" className="w-full h-full object-cover" />
        </div>
        
        {/* İkinci görsel */}
        <div className="absolute right-0 bottom-0 w-2/3 h-2/3 shadow-md">
          <img src={images[1]} alt="Second image" className="w-full h-full object-cover" />
        </div>
        
        {/* Metin Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-white bg-opacity-80 px-8 py-4">
            <h2 className="text-2xl md:text-4xl font-light text-center">
              {welcomeMessage}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}