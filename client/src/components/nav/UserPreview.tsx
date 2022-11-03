import { ReactElement } from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { UserInterface } from '../../types/types';
import LikeButton from '../buttons/LikeButton';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

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
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Avatar
          width={60}
          height={60}
          name={user.name}
          surname={user.surname}
          isPro={true}
          fontSize="sm"
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            ml: 2,
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
          onLike={() => console.log('')}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 1, mt: 2, mb: 2, height: '75px' }}>
        {/* //TODO: Future last 3 user images also ALT needed */}
        <img src="https://place-hold.it/100x100" width={'100%'} height="auto" />
        <img src="https://place-hold.it/100x100" width={'100%'} height="auto" />
        <img src="https://place-hold.it/100x100" width={'100%'} height="auto" />
      </Box>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to={`/user/${user.username}`}
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
      componentsProps={{
        tooltip: {
          sx: {
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
