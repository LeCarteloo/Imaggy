import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';
import HomeVideo from '../../assets/home-bg.mp4';

const StyledSection = styled(Box)({
  maxWidth: '100%',
  height: '650px',
  overflow: 'hidden',
});

const StyledHeaderBox = styled(Box)({
  position: 'absolute',
  top: 0,
  width: '100%',
  height: 'inherit',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1em',
  padding: '0 1em',
  color: '#fff',
});

const StyledVideo = styled('video')(({ theme }) => ({
  position: 'absolute',
  objectFit: 'cover',
  zIndex: -1,
  width: '100%',
  height: '100%',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '50vh',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}));

const SectionHeader = () => {
  return (
    <StyledSection component="section">
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
        <StyledVideo
          src={HomeVideo}
          autoPlay
          muted
          loop
          playsInline
        ></StyledVideo>
      </StyledHeaderBox>
    </StyledSection>
  );
};

export default SectionHeader;
