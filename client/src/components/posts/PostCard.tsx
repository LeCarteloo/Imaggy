import {
  Avatar,
  ImageListItemBar,
  Typography,
  Box,
  ImageListItem,
} from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/userContext';
import { PostInterface } from '../../types/types';
import DownloadButton from '../buttons/DownloadButton';
import LikeButton from '../buttons/LikeButton';

const StyledImageListItem = styled(ImageListItem)({
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    transition: '0.2s ease-in-out',
  },
  '&:hover': {
    '&::before': {
      backgroundColor: '#00000099',
    },
  },
});

type PostCardProps = {
  post: PostInterface;
};

const PostCard = ({ post }: PostCardProps) => {
  const user = useUserContext();
  const [isLiked, setIsLiked] = useState(false);
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

  return (
    <StyledImageListItem key={post._id}>
      <img
        src={post.image}
        alt="test alt"
        loading="lazy"
        style={{ maxHeight: '600px' }}
      />
      <ImageListItemBar
        sx={{ background: 'none', padding: 1 }}
        position="top"
        actionIcon={
          <>
            <LikeButton
              isLiked={isLiked}
              ariaLabel={`${!isLiked ? 'Like' : 'Unlike'} ${post.title}`}
              onLike={handeLike}
            />
            {/* <Tooltip title="Add to collection">
                <IconButton sx={{ color: 'white' }} aria-label={`star`}>
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
        sx={{ background: 'none', padding: 1 }}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt={`${mainAuthor.name} ${mainAuthor.surname}`}
              src={mainAuthor.avatar}
            >
              {`${mainAuthor.name[0]}${mainAuthor.surname[0]}`}
            </Avatar>
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
