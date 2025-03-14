'use server';

import LoginForm from '@/components/forms/LoginForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Login() {
  const session = await getServerSession();

  if (!session) return <LoginForm />;

  redirect('/collections');
}
