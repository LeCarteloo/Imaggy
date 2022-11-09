import { ImageList } from '@mui/material';
import { styled } from '@mui/system';
import PostCard from '../cards/PostCard';
import { motion } from 'framer-motion';
import { PostInterface, UserInterface } from '../../types/types';
import Loader from '../../Loader';

type ImageSectionProps = {
  posts: PostInterface[];
  user?: UserInterface;
  animated?: boolean;
};

const ImageSection = ({ posts, user, animated = false }: ImageSectionProps) => {
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
          <ImageList variant="masonry" gap={8}>
            {posts.map((postItem) => (
              <PostCard user={user} post={postItem} key={postItem.id} />
            ))}
          </ImageList>
        </motion.section>
      ) : (
        <section>
          <ImageList variant="masonry" gap={8}>
            {posts.map((postItem) => (
              <PostCard post={postItem} key={postItem._id} />
            ))}
          </ImageList>
        </section>
      )}
    </>
  );
};

export default ImageSection;
