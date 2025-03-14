import Image from 'next/image';
import Button from '../shared/Button';
import Seperator from '../shared/Seperator';
import TextInput from '../shared/TextInput';
import Checkbox from '../shared/Checkbox';

export default function LoginForm() {
  return (
    <div className="border-color-form border rounded-md flex-1 self-center m-8 w-[90%] max-w-[792px] h-[85%] max-h-[867px] flex items-center justify-center flex-col">
      <div className="flex-[2]" />
      <div className="flex-[1] flex justify-center items-center">
        <Image src="./logo.svg" width={256} height={256} className="w-[256px] h-auto" alt="logo" />
      </div>
      <div className="flex-[1]" />
      <div className="flex-[4] justify-start w-[35%] min-w-[380px] flex flex-col items-stretch">
        <TextInput placeholder="E-Posta" type="email" autoComplete="off" />
        <Seperator />
        <TextInput placeholder="Şifre" type="password" autoComplete="off" />
        <Seperator />
        <Checkbox />
        <Seperator />
        <Button>Giriş Yap</Button>
      </div>
    </div>
  );
}
