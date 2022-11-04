import {
  ImageListItemBar,
  Typography,
  Box,
  ImageListItem,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import { PostInterface } from '../../types/types';
import DownloadButton from '../buttons/DownloadButton';
import LikeButton from '../buttons/LikeButton';
import Avatar from '../nav/Avatar';
import UserPreview from '../nav/UserPreview';

type PostCardProps = {
  post: PostInterface;
};

type ImageItemProps = {
  isPreviewOpen: boolean;
};

const StyledImageListItem = styled(ImageListItem, {
  shouldForwardProp: (prop) => prop !== 'isPreviewOpen',
})<ImageItemProps>(({ theme, isPreviewOpen }) => ({
  [theme.breakpoints.up('md')]: {
    '& .MuiImageListItemBar-root': {
      opacity: isPreviewOpen ? 1 : 0,
      transition: '0.3s ease-in-out',
    },
    '&:hover, &:focus-within': {
      '& .MuiImageListItemBar-root': {
        opacity: 1,
      },
    },
  },
}));

const PostCard = ({ post }: PostCardProps) => {
  const user = useUserContext();
  const [isLiked, setIsLiked] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const mainAuthor = post.users[0];

  useEffect(() => {
    const isPostLiked = user.likedPosts.find(
      (likedPost) => likedPost._id === post._id
    );

    setIsLiked(Boolean(isPostLiked));
  }, []);

  const handeLike = () => {
    setIsLiked(!isLiked);
  };

  const handleDownload = () => {};

  const handleOpenImage = () => {};

  return (
    <StyledImageListItem
      isPreviewOpen={isPreviewOpen}
      onClick={handleOpenImage}
    >
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        style={{ maxHeight: '600px' }}
      />
      <ImageListItemBar
        sx={{
          background: 'linear-gradient(#000000b5, transparent)',
          padding: 1,
        }}
        position="top"
        actionIcon={
          <>
            <LikeButton
              isLiked={isLiked}
              ariaLabel={`${!isLiked ? 'Like' : 'Unlike'} ${post.title}`}
              onLike={handeLike}
            />
            {/* <Tooltip title="Add to collection">
                <IconButton sx={{ color: 'white' }} aria-label={`add X to collection`}>
                {isAddedToCollection ? (
                    <AddToPhotos color="primary" />
                ) : (
                    <AddToPhotosOutlined />
                )}
                </IconButton>
             </Tooltip> */}
          </>
        }
        actionPosition="right"
      />
      <ImageListItemBar
        sx={{
          background: 'linear-gradient(transparent, #000000b5)',
          padding: 1,
        }}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <UserPreview
              user={mainAuthor}
              open={isPreviewOpen}
              onOpen={() => setIsPreviewOpen(true)}
              onClose={() => setIsPreviewOpen(false)}
            >
              <Box component={Link} to="#">
                <Avatar
                  name={mainAuthor.name}
                  surname={mainAuthor.surname}
                  fontSize="sm"
                  img={mainAuthor.avatar}
                />
              </Box>
            </UserPreview>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                ml: 1,
              }}
            >
              <Typography variant="subtitle1">
                {`${mainAuthor.name} ${mainAuthor.surname}`}
              </Typography>
              {post.users.length > 1 && (
                <Typography
                  variant="caption"
                  sx={{ lineHeight: '0.5' }}
                >{`and ${post.users.length} more...`}</Typography>
              )}
            </Box>
          </Box>
        }
        position="bottom"
        actionIcon={
          <DownloadButton fileTitle={post.title} onDownload={handleDownload} />
        }
        actionPosition="right"
      />
    </StyledImageListItem>
  );
};

export default PostCard;
