// components/editor/edit-website/components/PhotoDetailModal.tsx
'use client';

import { useState } from 'react';
import { GalleryPhoto } from '@/types';

interface PhotoDetailModalProps {
  photos: GalleryPhoto[];
  currentPhotoIndex: number;
  onClose: () => void;
  onSave: (photo: GalleryPhoto) => void;
  onRemove: (photoId: string) => void;
}

export default function PhotoDetailModal({ 
  photos, 
  currentPhotoIndex, 
  onClose, 
  onSave, 
  onRemove 
}: PhotoDetailModalProps) {
  const [currentPhotos, setCurrentPhotos] = useState<GalleryPhoto[]>(photos);
  const [activeIndex, setActiveIndex] = useState<number>(currentPhotoIndex);
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPhotos = [...currentPhotos];
    newPhotos[activeIndex] = {
      ...newPhotos[activeIndex],
      description: e.target.value
    };
    setCurrentPhotos(newPhotos);
  };
  
  const handleSave = () => {
    // Tüm fotoğrafları kaydet
    currentPhotos.forEach((photo: GalleryPhoto) => {
      onSave(photo);
    });
    onClose();
  };
  
  const handleRemove = (photoId: string) => {
    onRemove(photoId);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add photo details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-6">
          {currentPhotos.map((photo: GalleryPhoto, index: number) => (
            <div 
              key={photo.id} 
              className="border-b last:border-b-0 py-4"
            >
              <div className="flex items-start">
                <button className="p-1 mt-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
                
                <div className="w-20 h-16 bg-gray-200 overflow-hidden rounded mr-3">
                  <img 
                    src={photo.url} 
                    alt={`Photo ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-grow">
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={photo.description}
                    onChange={handleDescriptionChange}
                    placeholder="We first said 'I love you' right before our friend snapped this pic of us."
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    rows={2}
                    maxLength={200}
                  />
                  <div className="text-right text-xs text-gray-500">{photo.description.length}/200</div>
                </div>
                
                <div className="ml-3 flex flex-col">
                  <button 
                    className="p-1 text-gray-500 hover:text-gray-700 mb-1"
                    onClick={() => {
                      // Edit image - placeholder for future functionality
                    }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button 
                    className="p-1 text-gray-500 hover:text-gray-700"
                    onClick={() => handleRemove(photo.id)}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-end">
          <button 
            className="px-5 py-2 bg-black text-white rounded-full"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}