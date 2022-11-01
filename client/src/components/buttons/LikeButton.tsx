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
  size?: 'small' | 'medium' | 'large';
  type?: LikeType;
  onLike: () => void;
};

const LikeButton = ({
  isLiked,
  ariaLabel,
  type = 'post',
  size = 'medium',
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
            <Favorite fontSize={size} color="primary" />
          ) : (
            <FavoriteBorderSharp fontSize={size} />
          )
        ) : isLiked ? (
          <PersonAddAltSharp fontSize={size} color="primary" />
        ) : (
          <PersonAddAlt fontSize={size} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default LikeButton;
