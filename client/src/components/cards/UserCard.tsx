import { Card, CardContent, CardHeader, styled } from '@mui/material';
import { Box } from '@mui/system';
import LikeButton from '../buttons/LikeButton';
import Avatar from '../nav/Avatar';

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
  // TODO: Update component with dynamic data
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        avatar={
          <Avatar
            width={50}
            height={50}
            name={'P'}
            surname={'P'}
            isPro={true}
            fontSize="sm"
          />
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
