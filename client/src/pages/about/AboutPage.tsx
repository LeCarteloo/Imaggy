import {
  Button,
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import { Link } from 'react-router-dom';
import Img from '../../assets/imaggyplus-profile.png';
import { Footer } from '../../components';
import CommunitySection from './CommunitySection';
import InfoBlock from './InfoBlock';

const StyledHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '32px',
  padding: '120px 0',
  [theme.breakpoints.down('md')]: {
    padding: '32px 0',
    flexDirection: 'column',
  },
}));

const StyledCardDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '16px',
  marginTop: '32px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const AboutPage = () => {
  const blocks = [
    {
      title: 'Test title1',
      desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit officiis quos dignissimos cum minima non ea in ipsa nisi exercitationem.',
      img: Img,
    },
    {
      title: 'Test title2',
      desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit officiis quos dignissimos cum minima non ea in ipsa nisi exercitationem.',
      img: Img,
    },
    {
      title: 'Test title3',
      desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit officiis quos dignissimos cum minima non ea in ipsa nisi exercitationem.',
      img: Img,
    },
  ];

  return (
    <>
      <Container>
        <StyledHeader component={'section'}>
          <Box>
            <Typography variant="h2" component="h1" fontWeight="bold">
              Photos for everyone
            </Typography>
            <Typography
              variant="h6"
              component="p"
              fontWeight="300"
              sx={{ mt: 3, mb: 3 }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              molestiae ut aliquid nobis distinctio aperiam odio reprehenderit
              minus rem voluptas.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" component={Link} to="/">
                Start browsing
              </Button>
              <Button variant="outlined" component={Link} to="/community">
                Check community
              </Button>
            </Box>
          </Box>
          <Box>
            <img
              width="100%"
              src="https://unsplash-assets.imgix.net/unsplashplus/why-grid-b.webp?auto=format&fit=crop&h=1226&q=75"
              alt="placeholder"
            />
          </Box>
        </StyledHeader>
        <Box component="section" sx={{ mt: 4 }}>
          <Typography variant="h4" component="h2" textAlign="center">
            Imaggy+ is the best source for images.
          </Typography>
          <StyledCardDisplay>
            {blocks.map((block) => (
              <Card key={block.title}>
                <CardMedia component="img" width="auto" image={block.img} />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    component="h4"
                  >
                    {block.title}
                  </Typography>
                  <Typography>{block.desc}</Typography>
                </CardContent>
              </Card>
            ))}
          </StyledCardDisplay>
        </Box>
        <Box component="section" sx={{ mt: 4, mb: 4 }}>
          <StyledHeader>
            <Box>
              <Typography variant="h4" component="h3">
                Find the best images
              </Typography>
              <Typography
                variant="h6"
                component="p"
                fontWeight="300"
                sx={{ mt: 3, mb: 3 }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                molestiae ut aliquid nobis distinctio aperiam odio reprehenderit
                minus rem voluptas.
              </Typography>
              <Button variant="contained" component={Link} to="/explore">
                Find the perfect image
              </Button>
            </Box>
            <Box>
              <img
                width="100%"
                src="https://unsplash-assets.imgix.net/unsplashplus/why-grid-b.webp?auto=format&fit=crop&h=1226&q=75"
                alt="placeholder"
              />
            </Box>
          </StyledHeader>
        </Box>
        <InfoBlock
          title="Test title"
          desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor quas aliquam non debitis atque nostrum voluptate quibusdam odit voluptatum est!"
          img={Img}
          reverse
        />
      </Container>
      <CommunitySection />
      <Container>
        <InfoBlock
          title="Test title"
          desc="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor quas aliquam non debitis atque nostrum voluptate quibusdam odit voluptatum est!"
          img={
            'https://unsplash-assets.imgix.net/marketing/callout-02.jpg?auto=format&fit=crop&q=60'
          }
          bgColor="#25415c"
        />
      </Container>
      <Footer />
    </>
  );
};

export default AboutPage;
