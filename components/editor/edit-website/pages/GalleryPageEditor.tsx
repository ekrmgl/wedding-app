// components/editor/edit-website/pages/GalleryPageEditor.tsx
'use client';

import { useState, useRef } from 'react';
import { useWebsite } from '@/context/WebsiteContext';
import AccordionPanel from '../../AccordionPanel';
import PhotoDetailModal from '../components/PhotoDetailModal';
import VideoModal from '../components/VideoModal';
import { GalleryPhoto, GalleryVideo } from '@/types';

interface SectionState {
  header: boolean;
  videos: boolean;
  photos: boolean;
  [key: string]: boolean;
}

export default function GalleryPageEditor() {
  const { content, updateContent } = useWebsite();
  const [openSections, setOpenSections] = useState<SectionState>({
    header: true,
    videos: true,
    photos: true,
  });
  
  // State for modals
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [isPhotoDetailModalOpen, setIsPhotoDetailModalOpen] = useState<boolean>(false);
  const [isPhotoUploaderOpen, setIsPhotoUploaderOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(content?.galleryVisible || true);
  const [currentEditingPhoto, setCurrentEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(-1);
  const [headerDescription, setHeaderDescription] = useState<string>(content?.galleryDescription || 'A few photos of us over the years.');
  
  // File input refs
  const mainPhotoInputRef = useRef<HTMLInputElement>(null);
  const photosInputRef = useRef<HTMLInputElement>(null);
  
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Handle description change
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHeaderDescription(e.target.value);
    updateContent('galleryDescription', e.target.value);
  };
  
  // --------- MAIN PHOTO HANDLERS ---------
  
  // Ana fotoğraf seçme
  const handleMainPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file);
        updateContent('galleryHeaderImage', imageUrl);
      }
    }
  };
  
  // Ana fotoğrafı kaldırma
  const handleRemoveMainPhoto = () => {
    if (content?.galleryHeaderImage && content.galleryHeaderImage.startsWith('blob:')) {
      URL.revokeObjectURL(content.galleryHeaderImage);
    }
    updateContent('galleryHeaderImage', '');
  };
  
  // Ana fotoğrafı değiştirme
  const handleSwapMainPhoto = () => {
    if (mainPhotoInputRef.current) {
      mainPhotoInputRef.current.click();
    }
  };
  
  // --------- GALLERY PHOTOS HANDLERS ---------
  
  // Galeri fotoğrafı ekleme
  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      addPhotosToGallery(files);
    }
  };
  
  // Fotoğraf sürükleme
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      addPhotosToGallery(files);
    }
  };
  
  // Galeriye fotoğraf ekleme yardımcı fonksiyonu
  const addPhotosToGallery = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) return;
    
    const newPhotos: GalleryPhoto[] = imageFiles.map(file => ({
      id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      url: URL.createObjectURL(file),
      description: ''
    }));
    
    const currentPhotos = content?.galleryPhotos || [];
    updateContent('galleryPhotos', [...currentPhotos, ...newPhotos]);
  };
  
  // Fotoğraf düzenleme
  const handleEditPhoto = (photo: GalleryPhoto, index: number) => {
    setCurrentEditingPhoto(photo);
    setCurrentPhotoIndex(index);
    setIsPhotoDetailModalOpen(true);
  };
  
  // Fotoğraf kaldırma
  const handleRemovePhoto = (photoId: string) => {
    const currentPhotos = content?.galleryPhotos || [];
    const photoToRemove = currentPhotos.find(p => p.id === photoId);
    
    if (photoToRemove && photoToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(photoToRemove.url);
    }
    
    const newPhotos = currentPhotos.filter((photo: GalleryPhoto) => photo.id !== photoId);
    updateContent('galleryPhotos', newPhotos);
  };
  
  // Fotoğraf detaylarını kaydetme
  const handleSavePhotoDetails = (photo: GalleryPhoto) => {
    const currentPhotos = content?.galleryPhotos || [];
    const newPhotos = [...currentPhotos];
    newPhotos[currentPhotoIndex] = photo;
    updateContent('galleryPhotos', newPhotos);
    setIsPhotoDetailModalOpen(false);
  };
  
  // --------- VIDEO HANDLERS ---------
  
  // Video ekleme
  const handleAddVideo = (video: GalleryVideo) => {
    const currentVideos = content?.galleryVideos || [];
    updateContent('galleryVideos', [...currentVideos, video]);
    setIsVideoModalOpen(false);
  };
  
  // Video kaldırma
  const handleRemoveVideo = (videoId: string) => {
    const currentVideos = content?.galleryVideos || [];
    const newVideos = currentVideos.filter((video: GalleryVideo) => video.id !== videoId);
    updateContent('galleryVideos', newVideos);
  };
  
  // Görünürlük değiştirme
  const toggleVisibility = () => {
    setVisible(!visible);
    updateContent('galleryVisible', !visible);
  };
  
  // Mevcut galeri verilerini al
  const galleryPhotos = content?.galleryPhotos || [];
  const galleryVideos = content?.galleryVideos || [];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gallery</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Visible</span>
          <button 
            className={`w-12 h-6 rounded-full ${visible ? 'bg-green-500' : 'bg-gray-300'} 
            relative transition-colors duration-200 focus:outline-none`}
            onClick={toggleVisibility}
          >
            <span 
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
              transform transition-transform duration-200 ${visible ? 'translate-x-6' : ''}`}
            />
          </button>
        </div>
      </div>
      
      {/* Header Bölümü */}
      <AccordionPanel 
        title="Header" 
        isOpen={openSections.header}
        onToggle={() => toggleSection('header')}
      >
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-medium mb-2">Main photo</h3>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-20 bg-gray-200 rounded overflow-hidden">
                {content?.galleryHeaderImage ? (
                  <img 
                    src={content.galleryHeaderImage}
                    alt="Gallery header"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={mainPhotoInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleMainPhotoSelect}
              />
              <div>
                {content?.galleryHeaderImage ? (
                  <>
                    <button 
                      className="text-sm flex items-center space-x-1 mb-2"
                      onClick={handleSwapMainPhoto}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Swap</span>
                    </button>
                    <button 
                      className="text-sm flex items-center space-x-1 text-red-500"
                      onClick={handleRemoveMainPhoto}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Remove</span>
                    </button>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Pro tip: A horizontal photo will look best.</p>
                    <button 
                      className="px-3 py-1 bg-white border rounded-md text-sm"
                      onClick={() => mainPhotoInputRef.current?.click()}
                    >
                      Browse photos
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <textarea 
              className="w-full border rounded-md p-3 text-sm min-h-[100px]"
              placeholder="Add a description for your gallery page"
              value={headerDescription}
              onChange={handleDescriptionChange}
              maxLength={1000}
            />
            <div className="text-right text-xs text-gray-500">{headerDescription.length}/1000</div>
          </div>
        </div>
      </AccordionPanel>
      
      {/* Videos Section */}
      <AccordionPanel 
        title="Videos" 
        isOpen={openSections.videos}
        onToggle={() => toggleSection('videos')}
      >
        <div className="mt-4 space-y-4">
          {galleryVideos.length === 0 ? (
            <div className="border border-dashed rounded p-6 text-center">
              <p className="text-sm text-gray-500 mb-4">Some couples add an engagement video or slideshow.</p>
              <button 
                className="px-4 py-2 bg-white border rounded-md text-sm"
                onClick={() => setIsVideoModalOpen(true)}
              >
                Add a video
              </button>
            </div>
          ) : (
            <div>
              {galleryVideos.map((video: GalleryVideo, index: number) => (
                <div 
                  key={video.id} 
                  className="flex items-center border rounded-md p-3 mb-3"
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-14 h-14 bg-blue-100 flex items-center justify-center rounded">
                      <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none">
                        <path d="M15 10l-6 4V6l6 4z" fill="currentColor" />
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm truncate">{video.caption || video.url}</p>
                  </div>
                  <div className="flex">
                    <button 
                      className="p-1 text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        // Video düzenleme - şu an için basitçe yeni bir video ekliyor
                        setIsVideoModalOpen(true);
                      }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button 
                      className="p-1 text-gray-500 hover:text-gray-700"
                      onClick={() => handleRemoveVideo(video.id)}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              <button 
                className="mt-4 px-4 py-2 bg-black text-white rounded-full text-sm"
                onClick={() => setIsVideoModalOpen(true)}
              >
                Add more videos
              </button>
            </div>
          )}
        </div>
      </AccordionPanel>
      
      {/* Photos Section */}
      <AccordionPanel 
        title="Photos" 
        isOpen={openSections.photos}
        onToggle={() => toggleSection('photos')}
      >
        <div className="mt-4 space-y-4">
          <div 
            className="border rounded-md p-4"
            onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <p className="text-sm font-medium mb-3">Fact: the more photos you share, the happier the guests.</p>
            
            {galleryPhotos?.length > 0 ? (
              <div className="space-y-3">
                {galleryPhotos?.map((photo: GalleryPhoto, index: number) => (
                  <div 
                    key={photo.id} 
                    className="flex items-center border-b last:border-b-0 py-3"
                  >
                    <button className="p-1 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    <div className="w-20 h-14 bg-gray-200 mx-2 overflow-hidden">
                      <img 
                        src={photo.url} 
                        alt={`Gallery photo ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex ml-auto">
                      <button 
                        className="p-1 text-gray-500 hover:text-gray-700"
                        onClick={() => handleEditPhoto(photo, index)}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button 
                        className="p-1 text-gray-500 hover:text-gray-700"
                        onClick={() => handleRemovePhoto(photo.id)}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-4 border border-dashed rounded-md">
                <p className="text-gray-500 mb-2">Drag photos here or click to browse</p>
              </div>
            )}
            
            <input
              type="file"
              ref={photosInputRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleAddPhoto}
            />
            
            <div className="mt-4 flex justify-center">
              <button 
                className="px-4 py-2 bg-white border rounded-md text-sm"
                onClick={() => photosInputRef.current?.click()}
              >
                Browse photos
              </button>
            </div>
          </div>
        </div>
      </AccordionPanel>
      
      {/* Video Modal */}
      {isVideoModalOpen && (
        <VideoModal 
          onClose={() => setIsVideoModalOpen(false)}
          onSave={handleAddVideo}
        />
      )}
      
      {/* Photo Detail Modal */}
      {isPhotoDetailModalOpen && currentEditingPhoto && (
        <PhotoDetailModal
          photos={galleryPhotos}
          currentPhotoIndex={currentPhotoIndex}
          onClose={() => setIsPhotoDetailModalOpen(false)}
          onSave={handleSavePhotoDetails}
          onRemove={handleRemovePhoto}
        />
      )}
    </div>
  );
}