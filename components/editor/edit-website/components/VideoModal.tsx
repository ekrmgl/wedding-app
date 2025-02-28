// components/editor/edit-website/components/VideoModal.tsx
'use client';

import { useState } from 'react';
import { GalleryVideo } from '@/types';

interface VideoModalProps {
  onClose: () => void;
  onSave: (video: GalleryVideo) => void;
  initialData?: {
    url: string;
    caption: string;
  };
}

export default function VideoModal({ onClose, onSave, initialData }: VideoModalProps) {
  const [url, setUrl] = useState<string>(initialData?.url || '');
  const [caption, setCaption] = useState<string>(initialData?.caption || '');
  
  const handleSave = () => {
    // Basit URL doğrulama
    if (!url || (!url.includes('youtube.com') && !url.includes('vimeo.com'))) {
      alert('Lütfen geçerli bir YouTube veya Vimeo linki girin.');
      return;
    }
    
    // Video sağlayıcısını belirle
    const provider = url.includes('youtube.com') ? 'youtube' : 'vimeo';
    
    const newVideo: GalleryVideo = {
      id: `video-${Date.now()}`,
      url,
      caption,
      provider
    };
    
    onSave(newVideo);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add your video</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">For the best quality, we recommend Vimeo.</p>
            <label className="block text-sm font-medium mb-2">
              Vimeo or YouTube URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
              placeholder="Paste it here"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCaption(e.target.value)}
              placeholder="This will appear on your website below the video (optional)"
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
              maxLength={200}
            />
            <div className="text-right text-xs text-gray-500">{caption.length}/200</div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button 
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
            onClick={handleSave}
          >
            All set
          </button>
        </div>
      </div>
    </div>
  );
}