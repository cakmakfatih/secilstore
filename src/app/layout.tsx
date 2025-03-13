import type { Metadata } from 'next';
import './globals.css';
import { poppins } from '@/shared/fonts';

export const metadata: Metadata = {
  title: 'SecilStore',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${poppins.className} antialiased absolute min-w-screen h-screen`}>
        {children}
      </body>
    </html>
  );
}
