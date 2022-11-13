import {
  Box,
  Container,
  Button,
  Typography,
  styled,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Gif01 from '../assets/imaggyplus-gif-01.gif';
import Profile from '../assets/imaggyplus-profile.png';
import { FeatureCard, PlanCard } from '../components';

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
  const [plan, setPlan] = useState('monthly');

  const handlePlanChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlan: string
  ) => {
    setPlan(newPlan);
  };

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
    <Container>
      <Box
        component={'section'}
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
              Special avatar outline and banner on profile page
            </li>
            <li>
              <span>+ </span>
              Priority in search results
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
      <Box component={'section'}>
        <Typography
          variant="h3"
          component="h2"
          sx={{ textAlign: 'center', pb: 3 }}
        >
          Why go Imaggy+
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FeatureCard
                title="Uploading videos and gifs"
                subtitle="Imaggy+ allows you to upload not only bigger images but
                      also videos and gifs"
                img={Gif01}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FeatureCard
                title="Avatar outline and custom banner"
                subtitle="Distinguish yourself from others with custom banner on
                your profile and with special outline around your avatar"
                img={Profile}
                display="column"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FeatureCard
                title="Priority in search results"
                subtitle="Your images will be displayed before non-pro users, it will get around 40% more views"
                img={
                  'https://unsplash-assets.imgix.net/unsplashplus/why-grid-b.webp?auto=format&fit=crop&h=1226&q=75'
                }
                display="column"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box component={'section'} sx={{ pt: 10 }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{ textAlign: 'center', pb: 3 }}
        >
          Imaggy+ Pircing
        </Typography>
        <Typography sx={{ textAlign: 'center' }}>
          No bundles. No add-ons. One simple plan unlocks everything.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4, pb: 4 }}>
          <ToggleButtonGroup
            exclusive
            value={plan}
            onChange={handlePlanChange}
            aria-label="Premium plans"
          >
            <ToggleButton value="monthly" aria-label="Monthly plan">
              Monthly
            </ToggleButton>
            <ToggleButton value="yearly" aria-label="Yearly plan">
              Yearly
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <PlanCard />
        </Box>
      </Box>
    </Container>
  );
};

export default ImaggyPlus;
