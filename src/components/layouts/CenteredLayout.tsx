'use client';

import React from 'react';

export default function CenteredLayout({ children, ...rest }: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-white" {...rest}>
      {children}
    </div>
  );
}
