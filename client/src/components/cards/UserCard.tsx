import { Avatar, Card, CardContent, CardHeader, styled } from '@mui/material';
import { Box } from '@mui/system';
import LikeButton from '../buttons/LikeButton';

type UserCardProps = {
  imgs: string[];
};

const StyledNoPostsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  minHeight: '82.66px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
}));

const UserCard = ({ imgs }: UserCardProps) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ width: 50, height: 50 }} aria-label="X user">
            R
          </Avatar>
        }
        action={
          <LikeButton
            isLiked={true}
            ariaLabel="Follow X user"
            type="user"
            onLike={() => {}}
          />
        }
        title="Name Surname"
        subheader="@namesurname"
      />
      <CardContent>
        {imgs.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gap: 1,
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
          >
            {imgs.map((img, i) => (
              <div
                key={`img-${i}`}
                style={{
                  backgroundImage: `url(${img})`,
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
