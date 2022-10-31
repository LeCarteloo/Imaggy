import { ImageList } from '@mui/material';
import { styled } from '@mui/system';
import PostCard from '../cards/PostCard';
import { motion } from 'framer-motion';

type ImageSectionProps = {
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

const ImageSection = ({ animated = false }: ImageSectionProps) => {
  const postList = [
    {
      _id: 1,
      title: 'First post',
      image: '/images/photo.avif',
      location: 'Warsaw',
      tags: ['Placeholder', 'Placeholder1'],
      description: 'Short description',
      views: 5,
      downloads: 1,
      device: '',
      users: [
        {
          _id: 2,
          email: 'placeholder2@email.com',
          avatar: 'https://place-hold.it/100x100',
          name: 'Place2',
          surname: 'Holder2',
          bio: '',
          skills: [],
          interest: [],
          links: {
            facebook: '#',
            instagram: '#',
            website: '#',
          },
          location: '',
          followers: [],
          following: [],
          likedPosts: [],
        },
      ],
      likes: [],
      comments: [],
    },
  ];

  return (
    <>
      {animated ? (
        <motion.section
          animate={{ x: '0%' }}
          exit={{ x: '-100%' }}
          initial={{ x: '100%' }}
          transition={{
            duration: 0.75,
            ease: 'easeInOut',
          }}
          style={{ position: 'absolute', width: '100%' }}
        >
          <StyledImageList variant="masonry" gap={8}>
            {postList.map((postItem) => (
              <PostCard post={postItem} key={postItem._id} />
            ))}
          </StyledImageList>
        </motion.section>
      ) : (
        <section>
          <StyledImageList variant="masonry" gap={8}>
            {postList.map((postItem) => (
              <PostCard post={postItem} key={postItem._id} />
            ))}
          </StyledImageList>
        </section>
      )}
    </>
  );
};

export default ImageSection;
