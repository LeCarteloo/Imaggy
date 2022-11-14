import {
  ImageListItemBar,
  Typography,
  Box,
  ImageListItem,
} from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PostInterface, UserInterface } from '../../types/types';
import DownloadButton from '../buttons/DownloadButton';
import LikeButton from '../buttons/LikeButton';
import Avatar from '../nav/Avatar';
import UserPreview from '../nav/UserPreview';

type PostCardProps = {
  post: PostInterface;
  user?: UserInterface;
};

type ImageItemProps = {
  isPreviewOpen: boolean;
};

const StyledImageListItem = styled(ImageListItem, {
  shouldForwardProp: (prop) => prop !== 'isPreviewOpen',
})<ImageItemProps>(({ theme, isPreviewOpen }) => ({
  cursor: 'pointer',
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

const PostCard = ({ post, user }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate();

  const author = user ? user : post.user;

  useEffect(() => {
    const isPostLiked = post.likes.find((like) => like.id === post.id);

    setIsLiked(Boolean(isPostLiked));
  }, []);

  const handeLike = () => {
    setIsLiked(!isLiked);
  };

  // TODO: Add logic to download and openImage fn
  const handleDownload = () => {};

  const handleOpenImage = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    navigate(`/post/${post.id}`);
  };

  return (
    <StyledImageListItem isPreviewOpen={isPreviewOpen}>
      <img
        src={post.image}
        alt={post.title}
        loading="lazy"
        style={{ maxHeight: '600px' }}
        onClick={handleOpenImage}
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
          <Box
            sx={{ display: 'flex', alignItems: 'center' }}
            component={Link}
            to={`/user/${author.username}`}
          >
            <UserPreview
              user={author}
              open={isPreviewOpen}
              onOpen={() => setIsPreviewOpen(true)}
              onClose={() => setIsPreviewOpen(false)}
            >
              <Box component={Link} to="#">
                <Avatar
                  name={author.name}
                  surname={author.surname}
                  fontSize="sm"
                  img={author.avatar}
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
                {`${author.name} ${author.surname}`}
              </Typography>
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
