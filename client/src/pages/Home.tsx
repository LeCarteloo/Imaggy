import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';
import HomeVideo from '../assets/home-bg.mp4';

const StyledBox = styled(Box)({
  maxWidth: '100%',
  height: '650px',
  overflow: 'hidden',
  position: 'relative',
});

const StyledHeaderBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: 'calc(100% - 2em)',
  height: '100%',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1em',
  padding: '0 1em',
}));

const StyledVideo = styled('video')(({ theme }) => ({
  position: 'absolute',
  height: 'auto',
  width: '100vw',
  opacity: 0.5,
  [theme.breakpoints.down('md')]: {
    height: '100vh',
    width: 'auto',
  },
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '50vh',
    backgroundColor: '#242424',
  },
});

const Home = () => {
  return (
    <StyledBox component="section">
      <StyledHeaderBox>
        <Typography
          variant="h4"
          component="h1"
          textAlign="center"
          fontWeight="bold"
          maxWidth="600px"
        >
          Explore the internet's best source for visuals
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          textAlign="center"
          fontWeight="400"
          maxWidth="600px"
        >
          Milions of creators around the world showcase their videos and photos
          on Imaggy
        </Typography>
        <Box width="100%" maxWidth="600px">
          <StyledTextField
            fullWidth
            variant="outlined"
            //   label="Search"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </StyledHeaderBox>
      <StyledVideo
        src={HomeVideo}
        autoPlay
        muted
        loop
        playsInline
      ></StyledVideo>
    </StyledBox>
  );
};

export default Home;
