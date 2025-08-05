import { create } from 'zustand';
import { Token } from '@types';

interface SwapModalStore {
  isOpen: boolean;
  token: Token | null;
  open: (token: Token) => void;
  close: () => void;
}

export const useSwapModalStore = create<SwapModalStore>((set) => ({
  isOpen: false,
  token: null,
  open: (token) => set({ isOpen: true, token }),
  close: () => set({ isOpen: false, token: null }),
}));
