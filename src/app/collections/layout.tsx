import Body from '@/components/shared/Body';
import Header from '@/components/shared/Header';
import CollectionsStoreProvider from '@/providers/CollectionsStoreProvider';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'SecilStore - Collections',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CollectionsStoreProvider>
      <div className="flex flex-col antialiased absolute w-dvw h-dvh min-h-0">
        <Header />
        <Body>{children}</Body>
      </div>
    </CollectionsStoreProvider>
  );
}
