import { Box, keyframes, styled } from '@mui/material';

const infiteSlideLg = keyframes({
  '0%': {
    transform: 'translateX(0)',
  },
  '100%': {
    transform: 'translateX(-2950px)',
  },
});

const infiteSlideSm = keyframes({
  '0%': {
    transform: 'translateX(0)',
  },
  '100%': {
    transform: 'translateX(-1580px)',
  },
});

const StyledDiv = styled('div')(({ theme }) => ({
  width: '4800px',
  height: '600px',
  backgroundImage: 'url(/dev/grid.png)',
  backgroundSize: '2950px',
  animation: `${infiteSlideLg} 120s linear infinite`,
  [theme.breakpoints.down('md')]: {
    animation: `${infiteSlideSm} 120s linear infinite`,
    backgroundSize: '1580px',
    width: '2400px',
    height: '325px',
  },
}));

const ImageSlide = () => {
  return (
    <Box sx={{ mt: 6, overflow: 'hidden' }}>
      <StyledDiv></StyledDiv>
    </Box>
  );
};

export default ImageSlide;
