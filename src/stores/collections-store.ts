import { Collection, CollectionResponse, PaginationMeta } from '@/lib/types';
import { createStore } from 'zustand';

export type ConstantStoreItem = {
  meta: PaginationMeta;
  data: Collection[];
};

export type CollectionsState = {
  isFetchingConstants: boolean;
  constantsCurrentPage: number;
  constantsTotalPages: number;
  constantItems: ConstantStoreItem[];
};

export type CollectionsActions = {
  setIsFetchingConstants: (isFetching: boolean) => void;
  addConstantsPage: ({ meta, data }: { meta: PaginationMeta; data: Collection[] }) => void;
  setConstantsCurrentPage: (page: number) => void;
  setConstantsTotalPages: (page: number) => void;
};

export type CollectionsStore = CollectionsState & CollectionsActions;

export const defaultState: CollectionsState = {
  isFetchingConstants: false,
  constantsCurrentPage: 0,
  constantsTotalPages: 0,
  constantItems: [],
};

export const createCollectionsStore = (initialState: CollectionsState = defaultState) => {
  return createStore<CollectionsStore>()(set => ({
    ...initialState,
    setIsFetchingConstants: (isFetching: boolean) =>
      set(state => ({ ...state, isFetchingConstants: isFetching })),
    addConstantsPage: ({ meta, data }: ConstantStoreItem) =>
      set(state => ({
        ...state,
        constantItems: [...state.constantItems, { meta, data }],
      })),
    setConstantsCurrentPage: (page: number) =>
      set(state => ({ ...state, constantsCurrentPage: page })),
    setConstantsTotalPages: (page: number) =>
      set(state => ({ ...state, constantsTotalPages: page })),
  }));
};
