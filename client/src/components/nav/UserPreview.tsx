import { ReactElement } from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { UserInterface } from '../../types/types';
import LikeButton from '../buttons/LikeButton';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import { useUserContext } from '../../context/UserContext';

type UserPreviewProps = {
  user: UserInterface;
  open?: boolean;
  onOpen?: () => any;
  onClose?: () => any;
  children: ReactElement<any, any>;
};

type TooltipContentProps = {
  user: UserInterface;
};

const TooltipContent = ({ user }: TooltipContentProps) => {
  return (
    <Box sx={{ p: 2, width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar
          width={60}
          height={60}
          img={user.avatar}
          name={user.name}
          surname={user.surname}
          isPro={user.isPro}
          fontSize="sm"
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}
        >
          <Typography variant="body1" component="span">
            {`${user.name} ${user.surname}`}
          </Typography>
          <Typography variant="caption" component="span">
            {`@${user.username}`}
          </Typography>
        </Box>
        <LikeButton
          isLiked={true}
          type="user"
          //TODO: Change ariaLabel
          ariaLabel="like X user"
          onLike={() => {}}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mt: 2,
          mb: 2,
          height: '75px',
        }}
      >
        {user.posts.slice(0, 3).map((post) => (
          <img
            key={post.title}
            src={post.image}
            alt={post.title}
            style={{
              minWidth: '82px',
              minHeight: '82px',
              objectFit: 'cover',
              borderRadius: '2px',
            }}
            height="auto"
          />
        ))}
      </Box>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to={`/u/${user.username}`}
        fullWidth
      >
        View profile
      </Button>
    </Box>
  );
};

const UserPreview = ({
  user,
  open,
  onOpen,
  onClose,
  children,
}: UserPreviewProps) => {
  return (
    <Tooltip
      title={<TooltipContent user={user} />}
      placement="top-end"
      open={open}
      leaveDelay={100}
      onOpen={onOpen}
      onClose={onClose}
      sx={{}}
      componentsProps={{
        tooltip: {
          sx: {
            maxWidth: '500px',
            backgroundColor: 'background.paper',
            color: 'text.primary',
            '& .MuiTooltip-arrow': {
              color: 'background.paper',
            },
          },
        },
      }}
      arrow
    >
      {children}
    </Tooltip>
  );
};

export default UserPreview;
