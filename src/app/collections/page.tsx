'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Collections() {
  const { data: session } = useSession();

  const logout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <>
      {session?.user.email} <button onClick={logout}>Sign out</button>
    </>
  );
}
