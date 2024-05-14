import { useRef } from 'react';

export const useThrottle = (callback: () => void, delay?: number) => {
  const isWaiting = useRef(false);

  const timerId = useRef<ReturnType<typeof setTimeout>>();
  const timeDelay = delay ?? 200;

  return () => {
    if (!isWaiting.current) {
      callback();
      isWaiting.current = true;

      setTimeout(() => {
        isWaiting.current = false;
      }, timeDelay);
    }

    if (timerId.current) clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      callback();
    }, timeDelay);
  };
};
