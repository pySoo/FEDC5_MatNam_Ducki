import { PropsWithChildren } from 'react';

import { useKeepScroll } from '@/hooks/useKeepScroll';

import { ScrollWrapper } from './style';

export default function KeepScrollContainer({ children }: PropsWithChildren) {
  const { scrollRef } = useKeepScroll();

  return <ScrollWrapper ref={scrollRef}>{children}</ScrollWrapper>;
}
