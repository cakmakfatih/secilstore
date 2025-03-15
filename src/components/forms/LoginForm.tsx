'use client';

import Image from 'next/image';
import Button from '../shared/Button';
import Seperator from '../shared/Seperator';
import TextInput from '../shared/TextInput';
import Checkbox from '../shared/Checkbox';
import { signIn } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    console.log(result);
  };

  return (
    <form
      onSubmit={login}
      className="border-color-form lg:border rounded-md flex-1 self lg:max-w-[792px] lg:max-h-[867px] lg:h-[85%] w-[80%] flex self-center items-center justify-center flex-col"
    >
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
        <TextInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          value={username}
          name="username"
          placeholder="E-Posta"
          type="email"
          autoComplete="off"
        />
        <Seperator />
        <TextInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          value={password}
          name="password"
          placeholder="Şifre"
          type="password"
          autoComplete="off"
        />
        <Seperator />
        <Checkbox />
        <Seperator />
        <div className="flex-[1] flex flex-col justify-start items-stretch">
          <Button type="submit">Giriş Yap</Button>
        </div>
      </div>
    </form>
  );
}
