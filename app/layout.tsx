// app/layout.tsx
import { NextAuthProvider } from '@/components/NextAuthProvider';
import { WebsiteProvider } from '@/context/WebsiteContext';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wedding Website Builder',
  description: 'Create your custom wedding website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <ThemeProvider>
            <WebsiteProvider>
              {children}
            </WebsiteProvider>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}