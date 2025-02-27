// components/editor/edit-website/PagesSidebar.tsx
'use client';

// Props tipini açıkça tanımlıyoruz
interface PagesSidebarProps {
  onPageSelect: (page: string) => void;
  activePage: string | null;
}

export default function PagesSidebar({ onPageSelect, activePage }: PagesSidebarProps) {
  // Website sayfaları
  const pages = [
    { id: 'home', title: 'Home', hasLock: true },
    { id: 'schedule', title: 'Schedule', hasLock: false },
    { id: 'travel', title: 'Travel', hasLock: false },
    { id: 'wedding-party', title: 'Wedding Party', hasLock: false },
    { id: 'gallery', title: 'Gallery', hasLock: false },
    { id: 'things-to-do', title: 'Things To Do', hasLock: false },
    { id: 'faqs', title: 'FAQs', hasLock: false },
    { id: 'rsvp', title: 'RSVP', hasLock: false },
    { id: 'registry', title: 'Registry', hasLock: false },
  ];
  
  // Genel ayarlar
  const generalSettings = [
    { id: 'website-title', title: 'Website title and details' },
    { id: 'announcement-banner', title: 'Announcement banner' },
  ];
  
  return (
    <div className="p-4">
      <div className="mb-4">
        {/* Sayfa listesi */}
        <ul className="space-y-1">
          {pages.map((page) => (
            <li key={page.id}>
              <button
                className={`w-full flex items-center justify-between py-2 px-3 rounded-md ${
                  activePage === page.id 
                    ? 'bg-gray-100' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onPageSelect(page.id)}
              >
                <div className="flex items-center">
                  {page.hasLock && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {!page.hasLock && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  )}
                  <span>{page.title}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="border-t pt-4">
        {/* Genel ayarlar */}
        <ul className="space-y-2">
          {generalSettings.map((setting) => (
            <li key={setting.id} className="py-2 px-1 hover:bg-gray-50">
              <button
                className={`w-full text-left ${
                  activePage === setting.id ? 'font-medium' : ''
                }`}
                onClick={() => onPageSelect(setting.id)}
              >
                {setting.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}