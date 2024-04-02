import styled from '@emotion/styled';

import { theme } from '@/styles/Theme';

export const Button = styled.button<{ isMe: boolean; followData: boolean }>`
  background-color: ${({ isMe, followData }) =>
    isMe || !followData ? theme.colors.primary : theme.colors.gray};
  font-size: 1.4rem;
  border: none;
  border-radius: 1.5rem;
  padding: 0.5rem;
  color: white;
  cursor: pointer;
`;
