import { ImageList, ImageListItem } from '@mui/material';
import { styled } from '@mui/system';

const StyledSection = styled('section')(({ theme }) => ({
  padding: '0 1em',
  '& .MuiImageList-root': {
    columnCount: '3 !important',
    [theme.breakpoints.down('md')]: {
      columnCount: '2 !important',
    },
    [theme.breakpoints.down('sm')]: {
      columnCount: '1 !important',
    },
  },
}));

const ImageSection = () => {
  const imageList = [
    'https://place-hold.it/100x200',
    'https://place-hold.it/500x500',
    'https://place-hold.it/1920x1080',
    'https://place-hold.it/300x300',
    'https://place-hold.it/1900x600',
    'https://place-hold.it/600x1900',
    'https://place-hold.it/500x500',
    'https://place-hold.it/800x300',
  ];
  return (
    <StyledSection>
      <ImageList variant="masonry" gap={8}>
        {imageList.map((image) => (
          <ImageListItem key={image}>
            <img
              src={image}
              alt="test alt"
              loading="lazy"
              style={{ maxHeight: '600px' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </StyledSection>
  );
};

export default ImageSection;
