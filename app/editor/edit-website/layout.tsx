// app/editor/edit-website/layout.tsx
import React from 'react';

export default function EditWebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="edit-website-layout">
      {children}
    </div>
  );
}