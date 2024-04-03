import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { useCreateFollow, useDeleteFollow } from '@/hooks/useFolllow';
import { useModal } from '@/hooks/useModal';
import { userAtom } from '@/recoil/user';
import { ModalType } from '@/types/modal';
import { Follow } from '@/types/response';

import { Button } from './style';

interface FollowButtonProps {
  followers: Follow[];
  userId: string;
}

export default function FollowButton({ followers, userId }: FollowButtonProps) {
  const [isMe, setIsMe] = useState(false);
  const [followData, setFollowData] = useState<Follow | null>(null);
  const user = useRecoilValue(userAtom);
  const { openModal } = useModal();

  const filteredFollowers = followers.filter(
    (follower: any) => follower.user === userId,
  );

  const { mutateAsync: createFollowMutate } = useCreateFollow({ userId });

  const { mutate: deleteFollowMutate } = useDeleteFollow();

  useEffect(() => {
    if (userId == user?.email) setIsMe(true);
    const followData =
      filteredFollowers.find((follow) => follow.follower === user?._id) ?? null;
    setFollowData(followData);
  }, []);

  const viewFriends = async () => {
    openModal({ type: ModalType.VIEW_FOLLOW });
  };

  const follow = async () => {
    const followData = await createFollowMutate(userId);
    setFollowData(followData);
  };

  const unfollow = () => {
    if (!followData) return;
    deleteFollowMutate(followData._id);
    setFollowData(null);
  };

  const handleOnClick = () => {
    if (isMe) {
      viewFriends();
    } else if (followData) {
      unfollow();
    } else {
      follow();
    }
  };

  return (
    <Button isMe={isMe} followData={!!followData} onClick={handleOnClick}>
      {isMe ? '친구 목록 보기' : followData ? '친구 끊기' : '친구 맺기'}
    </Button>
  );
}
