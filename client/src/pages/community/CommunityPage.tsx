import { Container, Box, Typography, Button } from '@mui/material';

const CommunityPage = () => {
  return (
    <Container>
      <Box
        component="section"
        sx={{
          pt: 10,
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
            Necessitatibus perspiciatis harum minima ab dicta perferendis nulla
            sit. Sapiente, corrupti minus?
          </Typography>
          <Box>
            <Button variant="contained">Upload a photo</Button>
          </Box>
        </Box>
        <Box>
          <img
            src="https://unsplash-assets.imgix.net/marketing/community-header.jpg"
            width="100%"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default CommunityPage;
