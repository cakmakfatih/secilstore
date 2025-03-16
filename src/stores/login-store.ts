/* eslint-disable */

import { InvalidFieldsResponse } from 'next-auth';
import { createStore } from 'zustand';

export type LoginError = {
  general: string;
  username: string[];
  password: string[];
};

export type LoginState = {
  username: string;
  password: string;
  error: LoginError;
  isLoading: boolean;
};

export type LoginActions = {
  setUsername: (text: string) => void;
  setPassword: (text: string) => void;
  setFieldErrors: (fieldErrResponse: InvalidFieldsResponse) => void;
  setGeneralError: (errMessage: string) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export type LoginStore = LoginState & LoginActions;

export const defaultState: LoginState = {
  username: '',
  password: '',
  error: {
    general: '',
    username: [],
    password: [],
  },
  isLoading: false,
};

export const createLoginStore = (initialState: LoginState = defaultState) => {
  return createStore<LoginStore>()(set => ({
    ...initialState,
    setUsername: (text: string) => set(state => ({ ...state, username: text })),
    setPassword: (text: string) => set(state => ({ ...state, password: text })),
    setFieldErrors: (fieldErrResponse: InvalidFieldsResponse) =>
      set(state => ({
        ...state,
        error: {
          ...state.error,
          username: fieldErrResponse.data.errors.Username ?? [],
          password: fieldErrResponse.data.errors.Password ?? [],
        },
      })),
    setGeneralError: (errMessage: string) =>
      set(state => ({
        ...state,
        error: {
          ...state.error,
          general: errMessage,
        },
      })),
    setIsLoading: (isLoading: boolean) => set(state => ({ ...state, isLoading })),
  }));
};
