// components/DashboardClient.tsx
'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Session } from 'next-auth';
import { WeddingSite } from '@/types';

export default function DashboardClient({ session }: { session: Session }) {
  const router = useRouter();
  const [weddingSites, setWeddingSites] = useState<WeddingSite[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Kullanıcının düğün sitelerini getir
  useEffect(() => {
    async function fetchWeddingSites() {
      try {
        const response = await fetch(`/api/wedding-sites?userId=${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          setWeddingSites(data);
        }
      } catch (error) {
        console.error('Düğün siteleri alınırken hata oluştu:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeddingSites();
  }, [session]);

  // Yeni düğün sitesi oluştur
  const createNewSite = async () => {
    try {
      const slug = `${session.user.name?.toLowerCase().replace(/\s+/g, '-') || 'wedding'}-${Date.now()}`;
      const response = await fetch('/api/wedding-sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Yeni Düğün Sitem',
          urlSlug: slug,
        }),
      });

      if (response.ok) {
        const newSite = await response.json();
        router.push(`/editor?siteId=${newSite._id}`);
      }
    } catch (error) {
      console.error('Düğün sitesi oluşturulurken hata oluştu:', error);
    }
  };
  
  // Düğün sitesi sil
  const handleDeleteSite = async (siteId: string) => {
    if (confirm('Bu düğün sitesini silmek istediğinize emin misiniz?')) {
      try {
        const response = await fetch(`/api/wedding-sites/${siteId}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          // Siteyi listeden kaldır
          setWeddingSites(prev => prev.filter(site => site._id !== siteId));
        }
      } catch (error) {
        console.error('Düğün sitesi silinirken hata oluştu:', error);
      }
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Düğün Sitelerim</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Hoş geldin, {session.user.name}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
            {weddingSites.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {weddingSites.map((site) => (
                  <div key={site._id} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{site.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {site.isPublished ? 'Yayında' : 'Taslak'}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        URL: zola.com/wedding/{site.urlSlug}
                      </p>
                    </div>
                    <div className="bg-gray-50 px-5 py-3 flex justify-between">
                      <Link
                        href={`/editor?siteId=${site._id}`}
                        className="text-sm text-indigo-700 font-medium"
                      >
                        Düzenle
                      </Link>
                      <button 
                        onClick={() => handleDeleteSite(site._id)}
                        className="text-sm text-red-700 font-medium"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500 mb-4">
                  Henüz bir düğün siteniz bulunmuyor.
                </p>
                <button
                  onClick={createNewSite}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                >
                  İlk Düğün Sitemi Oluştur
                </button>
              </div>
            )}
            
            {weddingSites.length > 0 && (
              <div className="mt-6 text-center">
                <button
                  onClick={createNewSite}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
                >
                  Yeni Düğün Sitesi Oluştur
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}