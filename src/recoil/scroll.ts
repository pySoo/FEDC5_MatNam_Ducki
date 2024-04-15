import { atom } from 'recoil';

interface ScrollState {
  x: number;
  y: number;
}

export const scrollAtom = atom<ScrollState>({
  key: 'scrollState',
  default: {
    x: 0,
    y: 0,
  },
});
