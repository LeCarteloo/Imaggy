import { Typography, Box, styled } from '@mui/material';
import { TrendingCard } from '../../components';

const StyledGrid = styled(Box)(({ theme }) => ({
  marginTop: '80px',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))',
  gridGap: '24px',

  [theme.breakpoints.down('md')]: {
    overflowX: 'auto',
    gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
    gridAutoFlow: 'column',
    gridAutoColumns: '200px',
  },
}));

const TrendingSection = () => {
  const trendingCards = [
    {
      title: 'Nature',
      img: '/community/trending-nature.jpg',
      to: '/topic/nature',
    },
    {
      title: 'Travel',
      img: '/community/trending-travel.jpg',
      to: '/topic/travel',
    },
    {
      title: 'Fashion',
      img: '/community/trending-fashion.jpg',
      to: '/topic/fashion',
    },
    {
      title: 'Animals',
      img: '/community/trending-animals.jpg',
      to: '/topic/animals',
    },
    {
      title: 'Architecture',
      img: '/community/trending-architecture.jpg',
      to: '/topic/architecture',
    },
  ];

  return (
    <Box component="section" sx={{ mt: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ textAlign: 'center', mb: 4 }}
          >
            Don't know what to contribute?
          </Typography>
          <Typography textAlign="center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequuntur neque quae vero corporis necessitatibus tenetur quo
            officiis est, fuga labore provident minima, veniam laborum molestias
            sapiente voluptas a! Beatae, animi.
          </Typography>
        </Box>
      </Box>
      <StyledGrid>
        {trendingCards.map((card) => (
          <TrendingCard {...card} />
        ))}
      </StyledGrid>
    </Box>
  );
};

export default TrendingSection;
