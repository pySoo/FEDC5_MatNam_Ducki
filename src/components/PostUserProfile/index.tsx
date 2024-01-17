import { useParams } from 'react-router-dom';

import UserInfo from '@/components/UserInfo/UserInfo';
import { useGetUser } from '@/hooks/useGetProfile';

import Avatar from '../Common/Avatar';
import UserPosts from '../UserPosts';
import {
  ImageWrapper,
  Introduction,
  IntroductionBar,
  IntroductionWrapper,
  Label,
  PostsTitle,
  ProfileBackGroundImage,
  ProfileWrapper,
  SelectorWrapper,
  UserInfoWrapper,
  UserWrapper,
} from './style';

export default function PostUserProfile() {
  const { userId } = useParams() as { userId: string };
  if (userId === 'undefined') {
    return;
  }

  const { data: user } = useGetUser(userId);

  return (
    <>
      {user && (
        <ProfileWrapper>
          <ProfileBackGroundImage>
            <UserInfoWrapper>
              <ImageWrapper>
                <Avatar
                  imageUrl={user.image}
                  size={'large'}
                  style={{
                    boxShadow: '0 10px 10px rgba(255, 232, 61, 0.29)',
                  }}
                />
              </ImageWrapper>
              <UserInfo userName={user.fullName} userId={user.email} />
            </UserInfoWrapper>
          </ProfileBackGroundImage>

          <UserWrapper>
            <Label>자기소개</Label>
            <IntroductionWrapper>
              <Introduction>{user.username}</Introduction>
              <IntroductionBar />
            </IntroductionWrapper>
            <SelectorWrapper>
              <PostsTitle>{user.fullName}님이 작성한 게시글</PostsTitle>
            </SelectorWrapper>
            <UserPosts
              userPost={user.posts}
              userImage={user.image}
              userName={user.fullName}
            />
          </UserWrapper>
        </ProfileWrapper>
      )}
    </>
  );
}
