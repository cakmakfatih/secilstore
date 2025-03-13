import Image from 'next/image';
import TextInput from './TextInput';
import Seperator from './Seperator';
import Button from './Button';

export default function LoginForm() {
  return (
    <form className="border-color-form border rounded-md flex-1 self-center m-8 w-[90%] max-w-[792px] h-[85%] max-h-[867px] flex items-center justify-center flex-col">
      <div className="flex-[2]" />
      <div className="flex-[1] flex justify-center items-center">
        <Image src="./logo.svg" width={256} height={256} alt="logo" />
      </div>
      <div className="flex-[1]" />
      <div className="flex-[4] justify-start w-[35%] min-w-[380px] flex flex-col items-stretch">
        <TextInput placeholder="E-Posta" type="email" autoComplete="off" />
        <Seperator />
        <TextInput placeholder="Şifre" type="password" autoComplete="off" />
        <Seperator />
        <div className="px-1 py-1 flex">
          <input type="checkbox" className="mr-1 border-none w-8"></input>
          <label>Beni Hatırla</label>
        </div>
        <Seperator />
        <Button>Giriş Yap</Button>
      </div>
    </form>
  );
}
