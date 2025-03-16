/* eslint-disable */

'use client';

import { createContext, ReactNode, useContext, useRef } from 'react';
import { type LoginStore, createLoginStore } from '@/stores/login-store';
import { useStore } from 'zustand';

export type LoginStoreApi = ReturnType<typeof createLoginStore>;

export const LoginStoreContext = createContext<LoginStoreApi | undefined>(undefined);

export interface LoginStoreProviderProps {
  children: ReactNode;
}

export default function LoginStoreProvider({ children }: LoginStoreProviderProps) {
  const storeRef = useRef<LoginStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createLoginStore();
  }

  return (
    <LoginStoreContext.Provider value={storeRef.current}>{children}</LoginStoreContext.Provider>
  );
}

export const useLoginStore = <T,>(selector: (store: LoginStore) => T): T => {
  const loginStoreContext = useContext(LoginStoreContext);

  if (!loginStoreContext) {
    throw new Error(`useLoginStore must be used within LoginStoreProvider`);
  }

  return useStore(loginStoreContext, selector);
};
