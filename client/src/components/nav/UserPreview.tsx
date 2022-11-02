import { ReactElement } from 'react';
import { Avatar, Box, Button, Tooltip, Typography } from '@mui/material';
import { UserInterface } from '../../types/types';
import LikeButton from '../buttons/LikeButton';

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
    <Box>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ width: 60, height: 60 }}>PH</Avatar>
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
            {/* //TODO: add username  */}
            <Typography variant="caption" component="span">
              @username
            </Typography>
          </Box>
          <LikeButton
            isLiked={true}
            type="user"
            ariaLabel="like X user"
            onLike={() => console.log('')}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1, mt: 2, mb: 2, height: '75px' }}>
          {/* //TODO: Future last 3 user images */}
          <img
            src="https://place-hold.it/100x100"
            width={'100%'}
            height="auto"
          />
          <img
            src="https://place-hold.it/100x100"
            width={'100%'}
            height="auto"
          />
          <img
            src="https://place-hold.it/100x100"
            width={'100%'}
            height="auto"
          />
        </Box>
        <Button variant="outlined" color="secondary" fullWidth>
          View profile
        </Button>
      </Box>
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
