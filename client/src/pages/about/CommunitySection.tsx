import { Typography, Box, styled, Container } from '@mui/material';

type StyledImgProps = {
  pos: 'left' | 'right';
};

const StyledImg = styled('img')<StyledImgProps>(({ theme, pos }) => ({
  position: 'absolute',
  height: '100%',
  zIndex: -1,
  left: pos === 'left' ? 0 : '',
  right: pos === 'right' ? 0 : '',
  [theme.breakpoints.down('md')]: {
    left: pos === 'left' ? '-30%' : '',
    right: pos === 'right' ? '-30%' : '',
    height: '70%',
  },
}));

const CommunitySection = () => {
  return (
    <Box
      component="section"
      sx={{
        mt: 6,
        mb: 6,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <StyledImg
        pos="left"
        src="https://unsplash-assets.imgix.net/marketing/photographers-left-img.png?auto=format&fit=crop&w=986&q=60"
      />
      <StyledImg
        pos="right"
        src="https://unsplash-assets.imgix.net/marketing/photographers-right-img.png?auto=format&fit=crop&w=986&q=60"
      />
      <Container
        sx={{
          display: 'flex',
          minHeight: { xs: '500px', md: '900px' },
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Typography variant="h4" component="h3" textAlign="center">
            Anyone can join the Imaggy community
          </Typography>
          <Typography textAlign="center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            natus maiores odit temporibus fugit consectetur aliquam eligendi
            illum autem officia expedita assumenda cumque sapiente, cum earum
            et, nam error non dolorem culpa perspiciatis quam perferendis. Sint
            veritatis est iure iste?
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CommunitySection;
