'use client';

import { HTMLProps, useId } from 'react';

export default function Checkbox(props: HTMLProps<HTMLInputElement>) {
  const id = useId();
  return (
    <div className="px-1 py-1 flex">
      <input id={id} type="checkbox" className="mr-1 border-none w-8" {...props}></input>
      <label className="flex-1" htmlFor={id}>
        Beni Hatırla
      </label>
    </div>
  );
}
