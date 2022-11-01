import { Comment } from '@mui/icons-material';
import { IconButton, styled, Tooltip } from '@mui/material';

const StyledCommentCount = styled('span')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 1,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.grey['500']}`,
  fontSize: '12px',
  padding: '2px',
  borderRadius: '50%',
}));

const CommentButton = () => {
  return (
    <Tooltip title="Show comments">
      <IconButton sx={{ position: 'relative' }}>
        <Comment />
        <StyledCommentCount>15</StyledCommentCount>
      </IconButton>
    </Tooltip>
  );
};

export default CommentButton;
