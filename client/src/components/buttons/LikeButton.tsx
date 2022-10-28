import {
  Favorite,
  FavoriteBorderSharp,
  PersonAddAlt,
  PersonAddAltSharp,
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

type LikeType = 'user' | 'post';

type LikeButtonProps = {
  isLiked: boolean;
  ariaLabel: string;
  type?: LikeType;
  onLike: () => void;
};

const LikeButton = ({
  isLiked,
  ariaLabel,
  type = 'post',
  onLike,
}: LikeButtonProps) => {
  return (
    <Tooltip title="Like the image">
      <IconButton
        sx={{ color: 'white' }}
        aria-label={ariaLabel}
        onClick={onLike}
      >
        {type === 'post' ? (
          isLiked ? (
            <Favorite color="primary" />
          ) : (
            <FavoriteBorderSharp />
          )
        ) : isLiked ? (
          <PersonAddAltSharp color="primary" />
        ) : (
          <PersonAddAlt />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default LikeButton;
