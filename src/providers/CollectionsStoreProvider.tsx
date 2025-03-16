'use client';

import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { type CollectionsStore, createCollectionsStore } from '@/stores/collections-store';

export type CollectionsStoreApi = ReturnType<typeof createCollectionsStore>;

export const CollectionsStoreContext = createContext<CollectionsStoreApi | undefined>(undefined);

export interface CollectionsStoreProviderProps {
  children: ReactNode;
}

export default function CollectionsStoreProvider({ children }: CollectionsStoreProviderProps) {
  const storeRef = useRef<CollectionsStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createCollectionsStore();
  }

  return (
    <CollectionsStoreContext.Provider value={storeRef.current}>
      {children}
    </CollectionsStoreContext.Provider>
  );
}

export const useCollectionsStore = <T,>(selector: (store: CollectionsStore) => T): T => {
  const loginStoreContext = useContext(CollectionsStoreContext);

  if (!loginStoreContext) {
    throw new Error(`useLoginStore must be used within LoginStoreProvider`);
  }

  return useStore(loginStoreContext, selector);
};
