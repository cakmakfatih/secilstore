'use server';

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import LoginPage from '@/components/pages/LoginPage';

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (!session) return <LoginPage />;

  redirect('/collections');
}
