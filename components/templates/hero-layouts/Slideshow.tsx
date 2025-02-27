// components/templates/hero-layouts/Slideshow.tsx
'use client';

import { useState, useEffect } from 'react';

interface SlideshowProps {
  images: string[];
  welcomeMessage: string;
  autoPlay?: boolean;
  interval?: number;
}

export default function Slideshow({ 
  images, 
  welcomeMessage, 
  autoPlay = true, 
  interval = 5000 
}: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Otomatik slayt değiştirme
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);
  
  // Görsel yoksa yedek içerik göster
  if (images.length === 0) {
    return (
      <div className="h-80 bg-gray-300 flex items-center justify-center">
        <h2 className="text-3xl text-white font-light">{welcomeMessage}</h2>
      </div>
    );
  }
  
  return (
    <div className="relative h-80 overflow-hidden">
      {/* Görseller */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Slideshow image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Metin Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <h2 className="text-4xl md:text-6xl text-white font-light px-6 text-center">
          {welcomeMessage}
        </h2>
      </div>
      
      {/* Kontroller (sadece birden fazla görsel varsa) */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}