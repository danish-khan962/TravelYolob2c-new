import React from 'react';
import { Header } from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../styles/index.css';
import Banner from '@/components/common/Banner';
import { Toaster } from 'react-hot-toast';
import BannerMobile from '@/components/common/BannerMobile';
import { AuthProvider } from '@/contexts/AuthContext';

// Add suppressHydrationWarning to <body> to disable hydration errors

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'TravelYollo - Your Ultimate Travel Companion',
  description: 'Discover amazing destinations, curated experiences, and plan your perfect trip with TravelYollo. Your trusted travel partner for unforgettable adventures.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                zIndex: 999999999,
              },
            }}
          />
          <Banner />
          <BannerMobile />
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <script type="module" src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fdibyasoms5481back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.6"></script>
        </AuthProvider>
      </body>
    </html>
  );
}
