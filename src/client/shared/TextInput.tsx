'use client';

import { useCallback, useId, useMemo, useRef, useState, HTMLProps } from 'react';

export interface TextInputProps extends HTMLProps<HTMLInputElement> {
  placeholder: string;
}

export default function TextInput({ placeholder, ...rest }: TextInputProps) {
  const inputId = useId();
  const inpRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const wrapperStyles = useMemo(
    () =>
      [
        'flex flex-col items-stretch border rounded-lg',
        isFocused ? 'border-color-input-active' : 'border-color-input',
      ].join(' '),
    [isFocused]
  );
  const labelStyles = useMemo(
    () =>
      [
        'absolute my-3 px-1 ml-2 text-lg transition-all duration-150 bg-white z-1',
        (isFocused || !!inpRef.current?.value) && '-translate-y-5.5 text-sm',
        !isFocused && 'text-label-inactive',
      ].join(' '),
    [isFocused]
  );

  return (
    <div className={wrapperStyles}>
      <label className={labelStyles} htmlFor={inputId}>
        {placeholder}
      </label>
      <input
        ref={inpRef}
        id={inputId}
        className="text-lg border-none outline-0 p-3 z-10 inp-default"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    </div>
  );
}
