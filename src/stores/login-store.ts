import { createStore } from 'zustand';

export type LoginState = {
  username: string;
  password: string;
};

export type LoginActions = {
  setUsername: (text: string) => void;
  setPassword: (text: string) => void;
};

export type LoginStore = LoginState & LoginActions;

export const defaultState: LoginState = {
  username: '',
  password: '',
};

export const createLoginStore = (initialState: LoginState = defaultState) => {
  return createStore<LoginStore>()(set => ({
    ...initialState,
    setUsername: (text: string) => set(state => ({ ...state, username: text })),
    setPassword: (text: string) => set(state => ({ ...state, password: text })),
  }));
};
