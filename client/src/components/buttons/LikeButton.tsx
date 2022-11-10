import {
  Favorite,
  FavoriteBorderSharp,
  PersonAddAlt,
  PersonAddAltSharp,
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

type LikeButtonProps = {
  isLiked: boolean;
  ariaLabel: string;
  size?: 'small' | 'medium' | 'large';
  type?: 'user' | 'post';
  onLike: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const LikeButton = ({
  isLiked,
  ariaLabel,
  type = 'post',
  size = 'medium',
  onLike,
}: LikeButtonProps) => {
  return (
    <Tooltip title={type === 'post' ? 'Like the image' : 'Follow user'}>
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
