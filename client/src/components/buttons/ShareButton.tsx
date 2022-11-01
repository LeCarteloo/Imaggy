import { Share } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

const ShareButton = () => {
  return (
    <Tooltip title="Share post">
      <IconButton>
        <Share />
      </IconButton>
    </Tooltip>
  );
};

export default ShareButton;
