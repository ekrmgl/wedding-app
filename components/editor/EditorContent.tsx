// components/editor/EditorContent.tsx
'use client';

import DesignPanel from './DesignPanel';
import PreviewPanel from './PreviewPanel';

export default function EditorContent() {
  return (
    <>
      <div className="w-[320px] border-r border-gray-200 bg-white overflow-y-auto">
        <DesignPanel />
      </div>
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <PreviewPanel />
      </div>
    </>
  );
}