import { useRecoilValue } from 'recoil';

import { userAtom } from '@/recoil/user';
import { PropsUserInfo } from '@/types/profile';

import FollowButton from '../FollowButton';
import { UserId, UserInfoSection, UserName } from './style';

export default function UserInfo({
  userName,
  userEmail,
  userId,
  followers,
}: PropsUserInfo) {
  const user = useRecoilValue(userAtom);
  return (
    <UserInfoSection>
      <UserName>{userName}</UserName>
      <UserId>{userEmail}</UserId>
      {user && (
        <FollowButton userId={userId} followers={followers}></FollowButton>
      )}
    </UserInfoSection>
  );
}
