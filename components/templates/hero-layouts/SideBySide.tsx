// components/templates/hero-layouts/SideBySide.tsx
'use client';

interface SideBySideProps {
  images: string[];
  welcomeMessage: string;
}

export default function SideBySide({ images, welcomeMessage }: SideBySideProps) {
  // En az 2 görsel gerekiyor, yoksa yedek içerik göster
  if (images.length < 2) {
    return (
      <div className="h-80 bg-gray-300 flex items-center justify-center">
        <h2 className="text-3xl text-white font-light">{welcomeMessage}</h2>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 h-80">
      {/* Sol görsel */}
      <div className="relative overflow-hidden">
        <img src={images[0]} alt="Left image" className="w-full h-full object-cover" />
      </div>
      
      {/* Sağ görsel ve metin */}
      <div className="relative overflow-hidden">
        <img src={images[1]} alt="Right image" className="w-full h-full object-cover" />
        
        {/* Metin Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <h2 className="text-2xl md:text-3xl text-white font-light px-4 text-center">
            {welcomeMessage}
          </h2>
        </div>
      </div>
    </div>
  );
}