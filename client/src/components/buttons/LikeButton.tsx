import { Favorite, FavoriteBorderSharp } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

type LikeButtonProps = {
  isLiked: boolean;
  ariaLabel: string;
  onLike: () => void;
};

const LikeButton = ({ isLiked, ariaLabel, onLike }: LikeButtonProps) => {
  return (
    <Tooltip title="Like the image">
      <IconButton
        sx={{ color: 'white' }}
        aria-label={ariaLabel}
        onClick={onLike}
      >
        {isLiked ? <Favorite color="primary" /> : <FavoriteBorderSharp />}
      </IconButton>
    </Tooltip>
  );
};

export default LikeButton;
