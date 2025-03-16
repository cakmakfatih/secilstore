'use server';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import LoginPage from '@/components/pages/LoginPage';
import { authOptions } from '@/lib/configs/auth/auth-options';

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (!session) return <LoginPage />;

  redirect('/collections');
}
