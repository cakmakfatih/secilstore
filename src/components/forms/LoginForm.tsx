'use client';

import Image from 'next/image';
import Button from '../shared/Button';
import Seperator from '../shared/Seperator';
import TextInput from '../shared/TextInput';
import Checkbox from '../shared/Checkbox';
import { signIn } from 'next-auth/react';
import { ChangeEvent, useEffect } from 'react';
import { useLoginStore } from '@/providers/LoginStoreProvider';
import { isGeneralError, isInvalidFieldsError } from '@/lib/helpers';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const {
    username,
    password,
    error,
    isLoading,
    rememberUser,
    setUsername,
    setPassword,
    setFieldErrors,
    setGeneralError,
    setIsLoading,
    setRememberUser,
  } = useLoginStore(state => state);

  const login = async () => {
    setIsLoading(true);
    if (rememberUser) {
      localStorage.setItem('rememberUser', JSON.stringify(true));
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    } else {
      localStorage.clear();
    }

    const authResult = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (!authResult?.error) {
      router.push('/collections');
      return;
    }

    const errParsed = JSON.parse(authResult.error);

    if (isGeneralError(errParsed)) {
      setGeneralError(errParsed.message);
    } else if (isInvalidFieldsError(errParsed)) {
      setFieldErrors(errParsed);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const remember = localStorage.getItem('rememberUser');
    if (remember === null) {
      return;
    }

    const shouldRemember = JSON.parse(remember) as boolean;
    if (!shouldRemember) {
      return;
    }

    const rememberedUsername = localStorage.getItem('username');
    const rememberedPassword = localStorage.getItem('password');
    if (rememberedUsername === null || rememberedPassword === null) {
      return;
    }

    setUsername(rememberedUsername);
    setPassword(rememberedPassword);
    setRememberUser(true);
  }, [setUsername, setRememberUser, setPassword]);

  const btnDisabled = isLoading || username === '' || password === '';

  return (
    <div className="border-color-form lg:border rounded-md flex-1 self lg:max-w-[792px] lg:max-h-[867px] lg:h-[85%] w-[80%] flex self-center items-center justify-center flex-col">
      <div className="flex-[2] hidden lg:block" />
      <div className="flex-[1] flex justify-center items-center">
        <Image
          src="./logo.svg"
          width={256}
          height={256}
          className="w-[196px] lg:w-[256px] h-auto"
          alt="logo"
        />
      </div>
      <div className="flex-[1] hidden lg:block" />
      <div className="flex-[4] justify-start lg:w-[35%] min-w-[340px] lg:min-w-[380px] w-[80%] flex flex-col items-stretch">
        {error.general && (
          <span className="absolute -mt-12 px-3 my-3 text-red-600 py-1 bg-gray-100 border border-gray-300 rounded-md self-center">
            {error.general}
          </span>
        )}
        <TextInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          value={username}
          name="username"
          placeholder="E-Posta"
          type="email"
          required={true}
          errors={error.username}
          autoComplete="off"
        />
        <Seperator />
        <TextInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          value={password}
          name="password"
          placeholder="Şifre"
          type="password"
          required={true}
          errors={error.password}
          autoComplete="off"
        />
        <Seperator />
        <Checkbox
          checked={rememberUser}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberUser(e.target.checked)}
        />
        <Seperator />
        <div className="flex-[1] flex flex-col justify-start items-stretch">
          <Button disabled={btnDisabled} isLoading={isLoading} onClick={login}>
            Giriş Yap
          </Button>
        </div>
      </div>
    </div>
  );
}
