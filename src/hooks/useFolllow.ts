import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createFollow, deleteFollow } from '@/services/Follow/follow';

const followKey = {
  post: (userId: string) => ['post', userId] as const,
  delete: (userId: string) => ['delete', userId] as const,
};

export const useCreateFollow = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFollow,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: followKey.post(userId) });
    },
  });
};

export const useDeleteFollow = () => {
  return useMutation({
    mutationFn: deleteFollow,
  });
};
