'use client';

import Image from 'next/image';
import Button from './Button';
import { signOut } from 'next-auth/react';

export default function Header() {
  const logout = async () => {
    signOut({
      redirect: true,
      callbackUrl: '/login',
    });
  };

  return (
    <header className="flex min-h-[96px] px-1 py-0 pt-2 items-stretch">
      <div className="min-w-[256px] min-h-[100px] flex items-center justify-center">
        <Image
          src="./logo.svg"
          width={164}
          height={164}
          className="w-[164px] lg:w-[164px] h-auto"
          alt="logo"
        />
      </div>
      <div className="flex-1/2 mx-4 self-stretch; rounded-md border border-color-form flex">
        <div className="flex flex-col self-stretch justify-around px-6 py-2">
          <span className="font-bold text-xl">Koleksiyon</span>
          <span className="text-sm">Koleksiyon Listesi</span>
        </div>
        <div className="flex flex-1 justify-end items-center px-6">
          <Button
            onClick={logout}
            style={{
              width: 128,
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}
