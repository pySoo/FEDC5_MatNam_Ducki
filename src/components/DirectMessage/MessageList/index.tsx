import { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { useThrottle } from '@/hooks/useThrottle';
import { scrollAtom } from '@/recoil/scroll';
import { Message } from '@/types/response';

import MessageItem from '../MessageItem';
import { MessageListWrapper } from './style';

interface MessageListProps {
  userId: string;
  messageList: Message[];
}

export default function MessageList({ userId, messageList }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const [scrollState, setScrollState] = useRecoilState(scrollAtom);

  const prevMessageList = useMemo(() => messageList, []);

  const handleScroll = useThrottle(() => {
    if (scrollRef.current === null) return;

    setScrollState({
      ...scrollState,
      [pathname]: scrollRef.current.scrollTop,
    });
  });

  useEffect(() => {
    if (!scrollRef.current) return;

    if (prevMessageList.length !== messageList.length) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageList, prevMessageList]);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollY = scrollState[pathname] ?? scrollRef.current.scrollHeight;
    scrollRef.current.scrollTop = scrollY;

    scrollRef.current.addEventListener('scroll', handleScroll);
    return () => {
      scrollRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <MessageListWrapper ref={scrollRef}>
      {messageList.map((message, index) => (
        <MessageItem
          key={message._id}
          userId={userId}
          messageItem={message}
          prevDate={index === 0 ? null : messageList[index - 1].createdAt}
        />
      ))}
    </MessageListWrapper>
  );
}
