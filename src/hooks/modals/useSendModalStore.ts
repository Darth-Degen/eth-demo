import { create } from 'zustand';
import { Token } from '@types';

interface SendModalState {
  isOpen: boolean;
  token: Token | null;
  openModal: (token: Token) => void;
  closeModal: () => void;
}

export const useSendModalStore = create<SendModalState>((set) => ({
  isOpen: false,
  token: null,
  openModal: (token) => set({ isOpen: true, token }),
  closeModal: () => set({ isOpen: false, token: null }),
}));
