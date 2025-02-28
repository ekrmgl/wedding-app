// app/auth/error/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams?.get('error');

  // Kullanıcı dostu hata mesajları
  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'AccessDenied':
        return 'Erişim reddedildi. Bu kaynağa erişim için yetkiniz yok.';
      case 'Configuration':
        return 'Bir yapılandırma hatası oluştu. Lütfen daha sonra tekrar deneyin.';
      case 'EmailCreateAccount':
        return 'Hesap oluşturulurken bir hata oluştu. Lütfen farklı bir e-posta adresi ile tekrar deneyin.';
      case 'EmailSignin':
        return 'E-posta ile giriş yapılırken bir hata oluştu. Lütfen geçerli bir e-posta adresi girdiğinizden emin olun.';
      case 'OAuthCallback':
        return 'Sosyal medya hesabınızla giriş yaparken bir hata oluştu.';
      case 'OAuthCreateAccount':
        return 'Sosyal medya hesabınızla kayıt olurken bir hata oluştu.';
      case 'OAuthSignin':
        return 'Sosyal medya hesabınızla giriş yapılırken bir hata oluştu.';
      default:
        return 'Kimlik doğrulama sırasında bir hata oluştu. Lütfen tekrar deneyin.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-red-600">
            Oops!
          </h2>
          <p className="mt-2 text-center text-gray-600">
            {error ? getErrorMessage(error) : 'Bir hata oluştu.'}
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          <Link 
            href="/auth/signin"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
          >
            Giriş Sayfasına Dön
          </Link>
        </div>
      </div>
    </div>
  );
}