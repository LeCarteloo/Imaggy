import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Footer, InfoBlock, StatCard } from '../../components';

const AdvertisePage = () => {
  const brands = [
    {
      name: 'Square',
      src: 'advertise/01-square.svg',
    },
    {
      name: 'Spotify',
      src: 'advertise/02-spotify.svg',
    },
    {
      name: 'Creuset',
      src: 'advertise/03-creuset.svg',
    },
    {
      name: 'Samsung',
      src: 'advertise/04-samsung.svg',
    },
  ];

  const blocks = [
    {
      title: 'Download',
      desc: '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae maiores dolorum ipsa, enim voluptate cumque exercitationem perspiciatis sed voluptatem.',
    },
    {
      title: 'Feed',
      desc: '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae maiores dolorum ipsa, enim voluptate cumque exercitationem perspiciatis sed voluptatem.',
    },
    {
      title: 'Homepage',
      desc: '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae maiores dolorum ipsa, enim voluptate cumque exercitationem perspiciatis sed voluptatem.',
    },
    {
      title: 'Video',
      desc: '  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum molestiae maiores dolorum ipsa, enim voluptate cumque exercitationem perspiciatis sed voluptatem.',
    },
  ];

  const audienceBlocks = [
    {
      title: 'All Creative Professionals',
      desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam eius voluptatum, eligendi rerum unde dolorem tempore. Ipsa autem consectetur similique.',
      bgColor: 'black',
      fontColor: 'white',
    },
    {
      title: 'Targeting Capability',
      desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    },
    {
      title: 'Up to 2.00% clickthrough rate',
      desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
      bgColor: '#e91e63',
      fontColor: 'white',
    },
    {
      title: '75%',
      desc: 'Lorem ipsum, dolor sit amet.',
    },
    {
      title: '71%',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae fugiat corporis voluptatem magnam qui accusantium.',
      bgColor: 'black',
      fontColor: 'white',
    },
    {
      title: '51%',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae fugiat corporis voluptatem magnam qui accusantium.',
    },
  ];

  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            pt: 4,
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: '10%' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <Typography variant="h2" component="h1">
              Advertise on Imaggy+
            </Typography>
            <Typography sx={{ mt: 3, mb: 3 }}>
              The world's most popular creative platform.
            </Typography>
            <Box>
              <Button variant="contained" component={Link} to="#">
                Get in touch with us
              </Button>
            </Box>
          </Box>
          <Box>
            <img src="/advertise/header.png" width="100%" />
          </Box>
        </Box>
        <Box component="section" sx={{ mt: 10, mb: 10 }}>
          <Typography textAlign="center">
            Trusted by the world's biggest brands
          </Typography>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            {brands.map((brand) => (
              <img src={brand.src} alt={brand.name} key={brand.name} />
            ))}
          </Box>
        </Box>
        <InfoBlock
          img="advertise/studio.png"
          title="Don't have images readily available?"
          desc=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia quas architecto dolore quam similique alias voluptate odit repellat commodi nostrum modi cum, optio, adipisci ratione voluptatum harum? Incidunt, fuga libero!"
        />
        <Box
          component="section"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            mt: 10,
          }}
        >
          {blocks.map((block) => (
            <Card key={block.title}>
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
        </Box>
        <Box component="section" sx={{ mt: 10 }}>
          <Typography
            textAlign="center"
            variant="h4"
            component="h2"
            sx={{ mb: 5 }}
          >
            Our Audience
          </Typography>
          <Grid container spacing={4}>
            {audienceBlocks.map((block) => (
              <Grid item xs={12} md={6} lg={4}>
                <StatCard {...block} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          component="section"
          sx={{
            mt: 10,
            p: 4,
            bgcolor: 'black',
            color: 'white',
            borderRadius: '4px',
            display: 'flex',
            gap: 3,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h1"
              component="h5"
              fontWeight="bold"
              sx={{ textAlign: { xs: 'center', md: 'initial' } }}
            >
              Ready to get started?
            </Typography>
            <Box sx={{ mt: 5, textAlign: { xs: 'center', md: 'initial' } }}>
              <Typography sx={{ mt: 5, display: 'inline' }}>
                Not sure where to start? Email us directly&nbsp;
              </Typography>
              <Typography
                component="a"
                href="mailto:partnerships@imaggy.pl"
                sx={{ color: 'gray', '&:hover': { color: 'white' } }}
              >
                partnerships@imaggy.pl
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button variant="contained" sx={{ p: 2 }}>
              Get in touch with us
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default AdvertisePage;
