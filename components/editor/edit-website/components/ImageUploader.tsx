// components/editor/edit-website/components/ImageUploader.tsx
'use client';

import { useState, useRef } from 'react';
import { useWebsite } from '@/context/WebsiteContext';

interface ImageUploaderProps {
  minImages?: number;
  maxImages?: number;
  onUpload?: (files: File[]) => void;
  onClose?: () => void;
}

export default function ImageUploader({ 
  minImages = 1, 
  maxImages = 6,
  onUpload,
  onClose
}: ImageUploaderProps) {
  const { content, updateContent } = useWebsite();
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const slideshowImages = content?.slideshowImages || [];
  
  // Görsel ekleme (dosya seçiciden)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      validateAndAddFiles(files);
    }
  };

  // Dosya doğrulama ve ekleme
  const validateAndAddFiles = (files: File[]) => {
    // Sadece resim dosyalarını kabul et
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      setError('Lütfen geçerli resim dosyaları seçin.');
      return;
    }
    
    // Dosya boyutu kontrolü (20MB)
    const validFiles = imageFiles.filter(file => file.size <= 20 * 1024 * 1024);
    
    if (validFiles.length < imageFiles.length) {
      setError('Bazı dosyalar 20MB sınırını aşıyor ve eklenemedi.');
    }
    
    if (validFiles.length > 0) {
      if (onUpload) {
        // Modal versiyonu için callback
        onUpload(validFiles);
      } else {
        // Ana sayfa için doğrudan içerik güncelleme
        addImageFiles(validFiles);
      }
      setError('');
    }
  };

  // Görsel dosyası ekleme yardımcı fonksiyonu
  const addImageFiles = (files: File[]) => {
    const imageUrls = files.map(file => URL.createObjectURL(file));
    
    // Şu anki slideshowImages'a ekle, ancak maxImages sınırını aşma
    const currentImages = slideshowImages;
    const newImages = [...currentImages, ...imageUrls].slice(0, maxImages);
    
    updateContent('slideshowImages', newImages);
  };

  // Görsel silme
  const handleRemoveImage = (index: number) => {
    const newImages = slideshowImages;
    
    // URL'yi temizle (bellek sızıntısını önlemek için)
    if (newImages[index].startsWith('blob:')) {
      URL.revokeObjectURL(newImages[index]);
    }
    
    newImages.splice(index, 1);
    updateContent('slideshowImages', newImages);
  };

  // Modal açma
  const openFileUploadModal = () => {
    setIsModalOpen(true);
  };

  // Modal kapatma
  const closeModal = () => {
    setIsModalOpen(false);
    if (onClose) onClose();
  };

  // Sürükle bırak işlemleri
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      validateAndAddFiles(files);
    }
  };

  // ------------ MODAL RENDERING LOGIC ------------
  if (isModalOpen || onClose) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Upload</h2>
            <button 
              onClick={closeModal}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex">
            {/* Sol menü - Upload kaynakları */}
            <div className="w-1/3 border-r pr-4">
              <ul className="space-y-4">
                <li className="flex items-center text-sm p-2 bg-gray-100 rounded">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload
                </li>
                <li className="flex items-center text-sm p-2 text-gray-600 hover:bg-gray-50 rounded">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-8.9" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13l-3-3m0 0l-3 3m3-3v9" />
                  </svg>
                  Dropbox
                </li>
                <li className="flex items-center text-sm p-2 text-gray-600 hover:bg-gray-50 rounded">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                    <circle cx="9" cy="9" r="2" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21" />
                  </svg>
                  Google Photos
                </li>
                <li className="flex items-center text-sm p-2 text-gray-600 hover:bg-gray-50 rounded">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  OneDrive
                </li>
                <li className="flex items-center text-sm p-2 text-gray-600 hover:bg-gray-50 rounded">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.5 16a6.5 6.5 0 008-6.5 6.5 6.5 0 00-6.5-6.5 6.5 6.5 0 00-6.5 6.5c0 1.6.6 3.1 1.5 4.2" />
                  </svg>
                  Facebook
                </li>
                <li className="flex items-center text-sm p-2 text-gray-600 hover:bg-gray-50 rounded">
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
                    <circle cx="12" cy="12" r="3" strokeWidth="2" />
                    <circle cx="17.5" cy="6.5" r="1.5" strokeWidth="2" />
                  </svg>
                  Instagram
                </li>
              </ul>
            </div>
            
            {/* Sağ taraf - Yükleme alanı */}
            <div className="w-2/3 pl-4">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center h-64 text-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <h3 className="text-lg font-medium mb-2">Drag & drop here</h3>
                <p className="text-sm text-gray-500 mb-4">or</p>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-black text-white rounded-full text-sm"
                >
                  Upload your files
                </button>
                
                <p className="text-xs text-gray-500 mt-4">
                  Images (JPG or PNG) must be under 20MB each.
                </p>
                
                {error && (
                  <p className="text-red-500 text-xs mt-2">{error}</p>
                )}
                
                {selectedFiles.length > 0 && (
                  <div className="mt-4 text-sm">
                    You've chosen {selectedFiles.length} files.
                  </div>
                )}
              </div>
              
              {selectedFiles.length > 0 && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      if (onUpload) onUpload(selectedFiles);
                      closeModal();
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                  >
                    Show files
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------ INLINE RENDERING LOGIC ------------
  return (
    <div className="image-uploader">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-medium">
          Photos ({minImages} - {maxImages} required)
        </p>
        {slideshowImages.length > 0 && (
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
        )}
      </div>

      {/* Görsel listesi */}
      <div 
        className="border rounded-md overflow-hidden"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {slideshowImages.length > 0 ? (
          slideshowImages.map((image: string, index: number) => (
            <div 
              key={index}
              className="flex items-center border-b last:border-b-0 p-3"
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
          ))
        ) : (
          <div className="p-6 text-center">
            <p className="text-sm text-gray-500 mb-4">Pro tip: A horizontal photo will look best.</p>
            <button 
              className="px-4 py-2 bg-white border rounded-md text-sm"
              onClick={openFileUploadModal}
            >
              Browse photos
            </button>
          </div>
        )}
      </div>
      
      {/* Görsel yükleme butonu */}
      {slideshowImages.length > 0 && slideshowImages.length < maxImages && (
        <button 
          className="mt-4 bg-black text-white rounded-full px-4 py-2 text-sm"
          onClick={openFileUploadModal}
        >
          Add a photo
        </button>
      )}
    </div>
  );
}