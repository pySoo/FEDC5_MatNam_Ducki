import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Avatar from '@/components/Common/Avatar';
import { DEFAULT_PROFILE_IMAGE } from '@/constants/profile';
import { useModal } from '@/hooks/useModal';
import { userAtom } from '@/recoil/user';
import { getUserDetailsById } from '@/services/Follow/follow';
import { ModalType } from '@/types/modal';
import { Follow, User } from '@/types/response';

import {
  FollowButton,
  FollowButtonWrapper,
  NoListMessage,
  UserList,
  UserListItem,
  UserName,
  ViewFollowWrapper,
} from './style';

export default function FollowModal() {
  const user = useRecoilValue(userAtom);
  const { closeModal } = useModal();
  const [activeList, setActiveList] = useState('팔로잉');
  const [userDetails, setUserDetails] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUserDetails(ids: string[]) {
      const details = await Promise.all(
        ids.map((id: string) => getUserDetailsById(id)),
      );

      const filteredDetails = details.filter(
        (detail): detail is User => detail != null,
      );
      setUserDetails(filteredDetails);
    }

    const ids =
      activeList === '팔로잉'
        ? user?.following.map((following) => following.user)
        : user?.followers.map((follower: Follow) => follower.follower);

    ids && ids.length > 0 ? fetchUserDetails(ids) : setUserDetails([]);
  }, [activeList, user]);

  const navigate = useNavigate();

  const handleItemClick = (userId: string) => {
    navigate(`/profile/${userId}`);
    closeModal({ type: ModalType.VIEW_FOLLOW });
  };

  return (
    <ViewFollowWrapper>
      <FollowButtonWrapper>
        {['팔로잉', '팔로워'].map((list) => (
          <FollowButton
            key={list}
            active={activeList === list}
            onClick={() => setActiveList(list)}>
            {list}
          </FollowButton>
        ))}
      </FollowButtonWrapper>
      {userDetails.length > 0 ? (
        <UserList>
          {userDetails.map((detail, index) => (
            <UserListItem
              key={index}
              onClick={() => handleItemClick(detail._id)}>
              <Avatar
                imageUrl={detail.image || DEFAULT_PROFILE_IMAGE}
                size="small"
              />
              <UserName>{detail.fullName}</UserName>
            </UserListItem>
          ))}
        </UserList>
      ) : (
        <NoListMessage>{activeList} 목록이 없습니다.</NoListMessage>
      )}
    </ViewFollowWrapper>
  );
}
