import { PropsWithChildren, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { useThrottle } from '@/hooks/useThrottle';
import { scrollAtom } from '@/recoil/scroll';
import { PATH } from '@/routes/path';

import { ScrollWrapper } from './style';

export default function KeepScrollContainer({ children }: PropsWithChildren) {
  const [scrollState, setScrollState] = useRecoilState(scrollAtom);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();
  const isKeepScrollPath = pathname === PATH.ROOT;

  const handleScroll = useThrottle(() => {
    if (scrollRef.current === null) return;
    if (!isKeepScrollPath) return;

    setScrollState({
      ...scrollState,
      y: scrollRef.current.scrollTop,
    });
  });

  useEffect(() => {
    if (scrollRef.current === null) return;

    if (isKeepScrollPath) {
      setTimeout(() => {
        scrollRef.current?.scrollTo(scrollState.x, scrollState.y);
      }, 0);

      scrollRef.current.addEventListener('scroll', handleScroll);
      return () => {
        scrollRef.current?.removeEventListener('scroll', handleScroll);
      };
    } else {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [scrollRef, pathname]);

  return <ScrollWrapper ref={scrollRef}>{children}</ScrollWrapper>;
}
