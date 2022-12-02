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

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
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
          <StyledLink to={`/u/${user.username}`}>
            <Avatar
              width={50}
              height={50}
              img={user.avatar}
              name={user.name[0]}
              surname={user.surname[0]}
              isPro={user.isPro}
              fontSize="sm"
            />
          </StyledLink>
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
          <StyledLink to={`/u/${user.username}`}>
            {user.name} {user.surname}
          </StyledLink>
        }
        subheader={
          <StyledLink to={`/u/${user.username}`}>@{user.username}</StyledLink>
        }
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
              <Box
                key={`img-${post.id}`}
                component={Link}
                to={`/p/${post.id}`}
                style={{
                  backgroundImage: `url(${post.image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  paddingTop: '75%',
                  borderRadius: '4px',
                }}
              ></Box>
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
