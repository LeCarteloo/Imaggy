import { Avatar, Box, Button, Menu, Typography } from '@mui/material';
import { UserInterface } from '../../types/types';
import LikeButton from '../buttons/LikeButton';

type UserPreviewProps = {
  user: UserInterface;
  isOpen: boolean;
  onClose: () => void;
};

const UserPreview = ({ user, isOpen, onClose }: UserPreviewProps) => {
  return (
    <Menu open={isOpen} onClose={onClose}>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            width: '320px',
            justifyContent: 'space-between',
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
    </Menu>
  );
};

export default UserPreview;
