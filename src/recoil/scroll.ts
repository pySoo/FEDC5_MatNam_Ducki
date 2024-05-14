import { atom } from 'recoil';

interface ScrollState {
  [pathname: string]: number | null;
}

export const scrollAtom = atom<ScrollState>({
  key: 'scrollState',
  default: {},
});
