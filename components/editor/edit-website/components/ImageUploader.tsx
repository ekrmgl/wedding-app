// components/editor/edit-website/components/ImageUploader.tsx
'use client';

import { useState, useRef } from 'react';
import { useWebsite } from '@/context/WebsiteContext';

interface ImageUploaderProps {
  minImages?: number;
  maxImages?: number;
}

export default function ImageUploader({ minImages = 2, maxImages = 6 }: ImageUploaderProps) {
  const { content, updateContent } = useWebsite();
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Görsel ekleme (dosya seçiciden)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      addImageFile(file);
    }
  };

  // Görsel ekleme (sürükle-bıraktan)
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      addImageFile(file);
    }
  };

  // Görsel dosyası eklemek için yardımcı fonksiyon
  const addImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Dosyadan URL oluştur
    const imageUrl = URL.createObjectURL(file);
    
    // Görseli contexte ekle
    updateContent('slideshowImages', [...content.slideshowImages, imageUrl]);
  };

  // Görsel silme
  const handleRemoveImage = (index: number) => {
    const newImages = [...content.slideshowImages];
    
    // URL'yi temizle (bellek sızıntısını önlemek için)
    if (newImages[index].startsWith('blob:')) {
      URL.revokeObjectURL(newImages[index]);
    }
    
    newImages.splice(index, 1);
    updateContent('slideshowImages', newImages);
  };

  // Görsellerin sırasını değiştirme
  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...content.slideshowImages];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    updateContent('slideshowImages', newImages);
  };

  // Sürükleme fonksiyonları
  const handleDragStart = (index: number) => {
    setIsDragging(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (isDragging !== null && isDragging !== index) {
      handleMoveImage(isDragging, index);
      setIsDragging(index);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(null);
  };

  // Dokümana sürükleme işlemleri
  const handleDragOverDocument = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="image-uploader">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium">
          Photos ({minImages} - {maxImages} required)
        </p>
        <div className="flex space-x-1">
          <button className="p-1" title="Move up">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button className="p-1" title="Move down">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Görsel listesi */}
      <div 
        className="border rounded-md overflow-hidden"
        onDragOver={handleDragOverDocument}
        onDrop={handleDrop}
      >
        {content.slideshowImages.map((image, index) => (
          <div 
            key={index}
            className={`flex items-center border-b last:border-b-0 p-3 ${isDragging === index ? 'bg-gray-100' : ''}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <button className="p-1" title="Reorder">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            
            <div className="w-20 h-14 bg-gray-200 mx-auto overflow-hidden">
              <img 
                src={image} 
                alt={`Uploaded image ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <button 
              className="p-1 ml-auto"
              onClick={() => handleRemoveImage(index)}
              title="Remove"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
        
        {/* Boş liste durumunda sürükle-bırak alanı */}
        {content.slideshowImages.length === 0 && (
          <div 
            className="p-6 text-center text-gray-500"
            onDragOver={handleDragOverDocument}
            onDrop={handleDrop}
          >
            Drag and drop images here
          </div>
        )}
      </div>
      
      {/* Görsel yükleme butonu */}
      {content.slideshowImages.length < maxImages && (
        <>
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*" 
            onChange={handleFileSelect}
          />
          <button 
            className="mt-4 bg-black text-white rounded-full px-4 py-2 text-sm"
            onClick={() => fileInputRef.current?.click()}
          >
            Add a photo
          </button>
        </>
      )}
    </div>
  );
}