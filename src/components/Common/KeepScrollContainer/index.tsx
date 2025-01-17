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
  const isKeepScrollPath =
    pathname === PATH.ROOT || pathname.includes(PATH.DIRECTMESSAGEDETAIL);

  const handleScroll = useThrottle(() => {
    if (!isKeepScrollPath) return;
    if (scrollRef.current === null) return;

    setScrollState({
      ...scrollState,
      [pathname]: scrollRef.current.scrollTop,
    });
  });

  useEffect(() => {
    if (scrollRef.current === null) return;
    if (!isKeepScrollPath) {
      scrollRef.current.scrollTo(0, 0);
      return;
    }

    setTimeout(() => {
      const scrollY = scrollState[pathname] ?? 0;
      scrollRef.current?.scrollTo(0, scrollY);
    }, 0);

    scrollRef.current.addEventListener('scroll', handleScroll);
    return () => {
      scrollRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef, pathname]);

  return <ScrollWrapper ref={scrollRef}>{children}</ScrollWrapper>;
}
