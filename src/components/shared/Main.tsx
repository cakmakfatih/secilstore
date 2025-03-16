import { ReactNode } from 'react';

export default function Main({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col flex-1 ml-1 mr-5 my-2 border border-color-form rounded-md min-h-0">
      {children}
    </div>
  );
}
