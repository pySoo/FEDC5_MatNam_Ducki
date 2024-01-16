import { useLocation } from 'react-router-dom';

import {
  MAIN_PATH,
  NOTIFICATION_PATH,
  PROFILE_PATH,
  REVIEW_PATH,
} from '@/constants';
import { useCheckAuthUser } from '@/hooks/useAuth';
import { useGetNotifications } from '@/hooks/useNotification';

import MainIcon from '../Common/Icons/MainIcon';
import NotificationIcon from '../Common/Icons/NotificationIcon';
import ProfileIcon from '../Common/Icons/ProfileIcon';
import ReviewIcon from '../Common/Icons/ReviewIcon';
import NotificationBadge from '../Common/NotificationBadge';
import { BottomNavBarWrapper, LinkWrapper, TextStyle } from './style';

interface PropsBottomNavBar {
  path: pathType;
  icon: React.ReactNode;
  title: React.ReactNode;
}

type pathType =
  | typeof MAIN_PATH
  | typeof NOTIFICATION_PATH
  | typeof PROFILE_PATH
  | typeof REVIEW_PATH
  | `${typeof PROFILE_PATH}/${string}`;

export default function BottomNavBar() {
  const location = useLocation();
  const currentPathName = location.pathname;

  const isPathActive = (path: pathType) => {
    return currentPathName === path ? true : false;
  };

  const handleButtonClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: pathType,
  ) => {
    if (currentPathName === path) {
      e.preventDefault();
    }
  };

  const { data: authUser } = useCheckAuthUser();

  const { data: notifications } = useGetNotifications(authUser);

  const newNotification = notifications?.filter(
    (notification) => !notification.seen,
  );

  const navItems: PropsBottomNavBar[] = [
    {
      path: MAIN_PATH,
      icon: <MainIcon />,
      title: <TextStyle>홈</TextStyle>,
    },
    {
      path: REVIEW_PATH,
      icon: <ReviewIcon />,
      title: <TextStyle>후기 작성</TextStyle>,
    },
    {
      path: NOTIFICATION_PATH,
      icon: (
        <NotificationBadge count={newNotification?.length} maxCount={99}>
          <NotificationIcon />
        </NotificationBadge>
      ),
      title: <TextStyle>알림</TextStyle>,
    },
    {
      path: `${PROFILE_PATH}/${authUser?._id}`,
      icon: <ProfileIcon />,
      title: <TextStyle>내 정보</TextStyle>,
    },
  ];

  return (
    <BottomNavBarWrapper>
      {navItems.map(({ path, icon, title }) => (
        <LinkWrapper
          key={path}
          to={path}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
            handleButtonClick(e, path)
          }
          active={isPathActive(path).toString()}>
          {icon}
          {title}
        </LinkWrapper>
      ))}
    </BottomNavBarWrapper>
  );
}
