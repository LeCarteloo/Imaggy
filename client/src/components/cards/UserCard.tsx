import { Card, CardContent, CardHeader, styled } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { UserInterface } from '../../types/types';
import LikeButton from '../buttons/LikeButton';
import Avatar from '../nav/Avatar';

interface UserCardProps {
  user: UserInterface;
}

const StyledNoPostsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  minHeight: '82.66px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
}));

const UserCard = ({ user }: UserCardProps) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const authUser = useUserContext();

  useEffect(() => {
    const followedUser = user.followers.find(
      (follower) => follower.id === authUser.id
    );

    setIsFollowed(Boolean(followedUser));
  }, []);

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        avatar={
          <Link to={`/user/${user.username}`}>
            <Avatar
              width={50}
              height={50}
              img={user.avatar}
              name={user.name[0]}
              surname={user.surname[0]}
              isPro={user.isPro}
              fontSize="sm"
            />
          </Link>
        }
        action={
          <LikeButton
            isLiked={isFollowed}
            ariaLabel={`${isFollowed ? 'Unfollow' : 'Follow'} ${user.name} ${
              user.surname
            }`}
            type="user"
            onLike={() => {}}
          />
        }
        title={
          <Link to={`/user/${user.username}`}>
            {user.name} {user.surname}
          </Link>
        }
        subheader={<Link to={`/user/${user.username}`}>@{user.username}</Link>}
      />
      <CardContent>
        {user.posts.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gap: 1,
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            {user.posts.slice(0, 3).map((post) => (
              <div
                key={`img-${post.id}`}
                style={{
                  backgroundImage: `url(${post.image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  paddingTop: '75%',
                  borderRadius: '4px',
                }}
              ></div>
            ))}
          </Box>
        ) : (
          <StyledNoPostsBox>No posts just yet...</StyledNoPostsBox>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard;
