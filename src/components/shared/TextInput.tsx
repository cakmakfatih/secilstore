'use client';

import { useCallback, useId, useMemo, useRef, useState, HTMLProps } from 'react';

export interface TextInputProps extends HTMLProps<HTMLInputElement> {
  value: string;
  placeholder: string;
  errors?: string[];
}

export default function TextInput({ value, errors = [], placeholder, ...rest }: TextInputProps) {
  const inputId = useId();
  const inpRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const hasValue = useMemo(() => value.length > 0, [value]);
  const wrapperStyles = useMemo(
    () =>
      [
        'flex flex-col items-stretch border rounded-lg',
        isFocused || hasValue ? 'border-color-input-active' : 'border-color-input',
      ].join(' '),
    [isFocused, hasValue]
  );
  const labelStyles = useMemo(
    () =>
      [
        'absolute my-3 px-1 ml-2 text-lg transition-all duration-150 bg-white z-1',
        (isFocused || !!inpRef.current?.value || hasValue) && '-translate-y-5.5 text-sm',
        !isFocused && 'text-label-inactive',
      ].join(' '),
    [isFocused, hasValue]
  );

  return (
    <div className="my-1">
      <div className={wrapperStyles}>
        <label className={labelStyles} htmlFor={inputId}>
          {placeholder}
        </label>
        <input
          ref={inpRef}
          id={inputId}
          value={value}
          className="text-lg border-none outline-0 p-3 z-10 inp-default"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
      </div>
      {errors.length > 0 && (
        <div className="flex flex-col px-3">
          {errors.map((e, idx) => (
            <span className="text-red-600 font-light text-sm" key={idx}>
              {e}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
