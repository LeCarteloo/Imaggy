import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import TrendingSection from './TrendingSection';

const CommunityPage = () => {
  const cards = [
    {
      title: 'title',
      desc: 'desc',
      img: 'https://unsplash-assets.imgix.net/marketing/misc/img04.jpg?auto=format&fit=crop&q=60',
    },
    {
      title: 'title',
      desc: 'desc',
      img: 'https://unsplash-assets.imgix.net/marketing/misc/img04.jpg?auto=format&fit=crop&q=60',
    },
    {
      title: 'title',
      desc: 'desc',
      img: 'https://unsplash-assets.imgix.net/marketing/misc/img04.jpg?auto=format&fit=crop&q=60',
    },
  ];

  return (
    <>
      <Container>
        <Box
          component="section"
          sx={{
            pt: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h2" component="h1">
              Contribute today
            </Typography>
            <Typography sx={{ mt: 3, mb: 3 }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus perspiciatis harum minima ab dicta perferendis
              nulla sit. Sapiente, corrupti minus?
            </Typography>
            <Box>
              <Button variant="contained">Upload a photo</Button>
            </Box>
          </Box>
          <Box sx={{ mt: 7 }}>
            <img
              src="https://unsplash-assets.imgix.net/marketing/community-header.jpg"
              width="100%"
            />
          </Box>
        </Box>
        <Box component="section" sx={{ mt: 10 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ textAlign: 'center', mb: 4 }}
          >
            Imaggy+ is unlike any other platform
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 4,
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            {cards.map((card) => (
              <Card>
                <CardMedia component="img" width="auto" image={card.img} />
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    component="h4"
                  >
                    {card.title}
                  </Typography>
                  <Typography>{card.desc}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
        <Box
          component="section"
          sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}
        >
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ textAlign: 'center', mb: 4 }}
            >
              See your work in the wild
            </Typography>
            <Typography textAlign="center">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consequuntur neque quae vero corporis necessitatibus tenetur quo
              officiis est, fuga labore provident minima, veniam laborum
              molestias sapiente voluptas a! Beatae, animi.
            </Typography>
          </Box>
        </Box>
      </Container>
      <Box sx={{ mt: 10 }}>
        <img
          src="https://unsplash-assets.imgix.net/marketing/madewith-banner.jpg?auto=format&fit=crop&w=1200&q=60"
          style={{ width: '100%', maxHeight: '800px', objectFit: 'cover' }}
        />
      </Box>
      <Container>
        <TrendingSection />
      </Container>
    </>
  );
};

export default CommunityPage;
