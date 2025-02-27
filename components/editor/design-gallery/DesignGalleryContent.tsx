// components/editor/design-gallery/DesignGalleryContent.tsx
'use client';

import { getThemes } from '@/lib/data/themes';
import ThemeGrid from '@/components/editor/ThemeGrid';
import BackButton from '@/components/editor/BackButton';

export default function DesignGalleryContent() {
  const themes = getThemes();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      
      <h1 className="text-2xl font-semibold mb-6">Select a Design</h1>
      
      <ThemeGrid themes={themes} />
    </div>
  );
}