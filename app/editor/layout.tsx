// app/editor/layout.tsx
import React from 'react';
import Link from 'next/link';

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="editor-layout h-screen flex">
      {/* Sol kenar çubuğu */}
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center">
        <Link href="/editor/edit-website" className="p-4 hover:bg-gray-100 w-full flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          <span className="text-xs mt-1">Edit Website</span>
        </Link>
        
        <Link href="/editor/design-gallery" className="p-4 hover:bg-gray-100 w-full flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
            <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-xs mt-1">Change Design</span>
        </Link>
        
        <button className="p-4 hover:bg-gray-100 w-full flex flex-col items-center justify-center mt-auto">
          <div className="h-5 w-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">N</div>
          <span className="text-xs mt-1">New</span>
        </button>
      </div>
      
      {/* Ana içerik */}
      <div className="flex-1 flex overflow-hidden">
        {children}
      </div>
    </div>
  );
}