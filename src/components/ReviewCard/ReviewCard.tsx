import { useNavigate } from 'react-router-dom';

import { CHANNEL } from '@/constants/channel';
import { PATH } from '@/routes/path';
import { getElapsedTime } from '@/utils/getElapsedTime';

import LikeIcon from '../Common/Icons/LikeIcon';
import ThumbsDownIcon from '../Common/Icons/ThumbsDownIcon';
import ThumbsUpIcon from '../Common/Icons/ThumbsUpIcon';
import {
  ElaspedTime,
  LikeContainer,
  ProfileNickname,
  RestaurantLocation,
  RestaurantName,
  ReviewCardBody,
  ReviewCardContainer,
  ReviewCardContents,
  ReviewCardHeader,
  ReviewCardImage,
  ReviewCardInfo,
  ThumbsDownWrapper,
} from './style';

interface ReviewCardProps extends React.ComponentProps<'div'> {
  imageUrl?: string;
  restaurant: string;
  location: string;
  review: string;
  profileName: string;
  createdAt: string;
  width?: string;
  likes: number;
  channelId: string;
  id?: string;
}

/**
 *
 * @summary 사용법 <ReviewCard imageUrl={imageUrl} content={content} profileName={profileName} profileImage={profileImage} width={80%} />
 * @description Review의 데이터를 이용해 리뷰 카드를 만드는 컴포넌트를 구현했습니다. theme 설정이 완료되면 color를 theme에서 가져오도록 수정할 예정입니다.
 * @param {string} imageUrl - 리뷰 이미지
 * @param {string} content - 리뷰 내용
 * @param {string} profileName - 프로필 닉네임
 * @param {string} width - 리뷰 카드 너비
 */

export const ReviewCard = ({
  imageUrl,
  restaurant,
  location,
  review,
  profileName,
  createdAt,
  likes,
  channelId,
  width = '100%',
  id,
  ...props
}: ReviewCardProps) => {
  const navigate = useNavigate();

  return (
    <ReviewCardContainer width={width} {...props}>
      <ReviewCardHeader>
        <ProfileNickname
          onClick={(event) => {
            event.stopPropagation();
            navigate(`${PATH.USERPROFILE}/${id}`);
          }}>
          {profileName}
        </ProfileNickname>
        <ElaspedTime>{getElapsedTime(createdAt)}</ElaspedTime>
      </ReviewCardHeader>
      <ReviewCardBody>
        <ReviewCardInfo>
          <RestaurantName>
            {restaurant}
            {channelId === CHANNEL.LIKE ? (
              <ThumbsUpIcon />
            ) : (
              <ThumbsDownWrapper>
                <ThumbsDownIcon />
              </ThumbsDownWrapper>
            )}
          </RestaurantName>
          <LikeContainer>
            <LikeIcon fill={'#EEA734'} /> {likes}
          </LikeContainer>
        </ReviewCardInfo>
        <RestaurantLocation>{location}</RestaurantLocation>
        {imageUrl && <ReviewCardImage src={imageUrl} />}
        <ReviewCardContents>{review}</ReviewCardContents>
      </ReviewCardBody>
    </ReviewCardContainer>
  );
};
