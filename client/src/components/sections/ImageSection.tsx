import { ImageList } from '@mui/material';
import { styled } from '@mui/system';
import PostCard from '../cards/PostCard';
import { motion } from 'framer-motion';
import { PostInterface } from '../../types/types';
import Loader from '../../Loader';

type ImageSectionProps = {
  posts: PostInterface[];
  animated?: boolean;
};

const StyledImageList = styled(ImageList)(({ theme }) => ({
  columnCount: '3 !important',
  [theme.breakpoints.down('lg')]: {
    columnCount: '2 !important',
  },
  [theme.breakpoints.down('sm')]: {
    columnCount: '1 !important',
  },
}));

const ImageSection = ({ posts, animated = false }: ImageSectionProps) => {
  if (!posts) {
    return <Loader />;
  }

  return (
    <>
      {animated ? (
        <motion.section
          animate={{ x: '0%' }}
          exit={{ x: '-150%' }}
          initial={{ x: '100%' }}
          transition={{
            duration: 0.75,
            ease: 'easeInOut',
          }}
          style={{ position: 'absolute', width: '100%' }}
        >
          <StyledImageList variant="masonry" gap={8}>
            {posts.map((postItem) => (
              <PostCard post={postItem} key={postItem._id} />
            ))}
          </StyledImageList>
        </motion.section>
      ) : (
        <section>
          <StyledImageList variant="masonry" gap={8}>
            {posts.map((postItem) => (
              <PostCard post={postItem} key={postItem._id} />
            ))}
          </StyledImageList>
        </section>
      )}
    </>
  );
};

export default ImageSection;
