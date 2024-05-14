import { atom } from 'recoil';

interface ScrollState {
  [key: string]: number | null;
}

export const scrollAtom = atom<ScrollState>({
  key: 'scrollState',
  default: {},
});
