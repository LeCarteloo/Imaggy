import { ImageList } from '@mui/material';
import { styled } from '@mui/system';
import PostCard from '../posts/PostCard';

const StyledSection = styled('section')(({ theme }) => ({
  padding: '0 1em 1.5em 1em',
  '& .MuiImageList-root': {
    columnCount: '3 !important',
    [theme.breakpoints.down('lg')]: {
      columnCount: '2 !important',
    },
    [theme.breakpoints.down('sm')]: {
      columnCount: '1 !important',
    },
  },
}));

const ImageSection = () => {
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
    <StyledSection>
      <ImageList variant="masonry" gap={8}>
        {postList.map((postItem) => (
          <PostCard post={postItem} key={postItem._id} />
        ))}
      </ImageList>
    </StyledSection>
  );
};

export default ImageSection;
