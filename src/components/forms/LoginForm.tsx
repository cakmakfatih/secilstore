import Image from 'next/image';
import Button from '../shared/Button';
import Seperator from '../shared/Seperator';
import TextInput from '../shared/TextInput';
import Checkbox from '../shared/Checkbox';

export default function LoginForm() {
  return (
    <div className="border-color-form lg:border rounded-md flex-1 self lg:m-8 lg:w-[90%] lg:max-w-[792px] lg:h-[85%] lg:max-h-[867px] h-[100%] w-[80%] flex items-center justify-center flex-col">
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
        <TextInput placeholder="E-Posta" type="email" autoComplete="off" />
        <Seperator />
        <TextInput placeholder="Şifre" type="password" autoComplete="off" />
        <Seperator />
        <Checkbox />
        <Seperator />
        <div className="flex-[1] flex flex-col justify-start items-stretch">
          <Button>Giriş Yap</Button>
        </div>
      </div>
    </div>
  );
}
