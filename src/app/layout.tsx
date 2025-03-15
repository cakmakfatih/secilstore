import type { Metadata } from 'next';
import './globals.css';
import { poppins } from '@/shared/fonts';
import { AuthProvider } from './providers';

export const metadata: Metadata = {
  title: 'SecilStore',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${poppins.className} antialiased absolute w-dvw h-dvh`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
