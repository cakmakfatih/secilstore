'use server';

import CenteredLayout from '@/components/layouts/CenteredLayout';
import LoginForm from '@/components/pages/LoginForm';

export default async function Login() {
  return (
    <CenteredLayout>
      <LoginForm />
    </CenteredLayout>
  );
}
