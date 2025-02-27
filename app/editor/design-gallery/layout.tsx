// app/editor/design-gallery/layout.tsx
import React from 'react';

export default function DesignGalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="design-gallery-layout">
      {children}
    </div>
  );
}