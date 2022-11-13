import { Box, Container, Button, Typography, styled } from '@mui/material';
import { motion } from 'framer-motion';

const StyledList = styled('ul')({
  listStyle: 'none',
  padding: 0,
});

const StyledGrid = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: { display: 'none' },
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
  alignItems: 'center',
  width: '100%',
}));

type StyledGridItemProps = {
  grid: boolean;
};

type StyledDivProps = {
  bgColor?: string;
};

const StyledGridItem = styled('div')<StyledGridItemProps>(({ grid }) => ({
  display: grid === true ? 'grid' : '',
  gridTemplateColumns: grid === true ? 'repeat(2, 1fr)' : '',
  gridTemplateRows: grid === true ? 'repeat(2, 1fr)' : '',
  height: '100%',
}));

const StyledDiv = styled(motion.div)<StyledDivProps>(({ bgColor }) => ({
  height: '100%',
  backgroundColor: bgColor ? bgColor : '',
}));

const ImaggyPlus = () => {
  const gridTiles = [
    {
      children: [
        { color: '' },
        { color: '' },
        { color: '' },
        {
          src: 'https://unsplash-assets.imgix.net/unsplashplus/header-grid-01.jpg?dpr=1&auto=format&fit=crop&w=196&h=196&q=60',
        },
      ],
    },
    {
      children: [{ color: 'pink' }],
    },
    {
      children: [
        {
          src: 'https://unsplash-assets.imgix.net/unsplashplus/header-grid-03.jpg?dpr=1&auto=format&fit=crop&w=196&h=196&q=60',
        },
      ],
    },
    {
      children: [
        { color: 'lightgreen' },
        { color: '' },
        { color: '' },
        { color: 'pink' },
      ],
    },
    {
      children: [
        {
          src: 'https://unsplash-assets.imgix.net/unsplashplus/header-grid-02.jpg?dpr=1&auto=format&fit=crop&w=196&h=196&q=60',
        },
      ],
    },
    {
      children: [{ color: 'lightblue' }],
    },
    {
      children: [
        { color: '' },
        {
          src: 'https://unsplash-assets.imgix.net/unsplashplus/header-grid-04.jpg?dpr=1&auto=format&fit=crop&w=196&h=196&q=60',
        },
        { color: '' },
        { color: '' },
      ],
    },
    {
      children: [
        { color: '' },
        { color: 'lightyellow' },
        {
          src: 'https://unsplash-assets.imgix.net/unsplashplus/header-grid-05.jpg?dpr=1&auto=format&fit=crop&w=196&h=196&q=60',
        },
        { color: '' },
      ],
    },
    {
      children: [
        {
          src: 'https://unsplash-assets.imgix.net/unsplashplus/header-grid-06.jpg?dpr=1&auto=format&fit=crop&w=196&h=196&q=60',
        },
      ],
    },
  ];

  return (
    <Container component={'section'}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10%',
          height: '80vh',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold' }}>
            Upgrade to Imaggy+ and start creating with extra features.
          </Typography>
          <StyledList>
            <li>
              <span>+ </span>
              Uploading videos and gifs
            </li>
            <li>
              <span>+ </span>
              Special banner on profile
            </li>
            <li>
              <span>+ </span>
              Banner on profile
            </li>
          </StyledList>
          <Button variant="contained">
            <Typography variant="body1">
              Get <strong>Imaggy+</strong> for $5/month
            </Typography>
          </Button>
        </Box>
        <StyledGrid>
          {gridTiles.map((tile, i) => (
            <StyledGridItem
              key={`grid-item-${i}`}
              grid={tile.children.length > 1}
            >
              {tile.children.map((children, j) => (
                <StyledDiv
                  key={`grid-div-${j}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.5 + i * 0.5,
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                  bgColor={children?.color}
                >
                  {children?.src && (
                    <img src={children.src} width="100%" height="100%" />
                  )}
                </StyledDiv>
              ))}
            </StyledGridItem>
          ))}
        </StyledGrid>
      </Box>
    </Container>
  );
};

export default ImaggyPlus;
