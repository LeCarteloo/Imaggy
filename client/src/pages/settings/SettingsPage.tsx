import {
  Avatar,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const SettingsPage = () => {
  const aboutInputs = [
    {
      id: 'location',
      label: 'Location',
    },
    {
      id: 'portfolio',
      label: 'Personal site/portfolio',
    },
    {
      id: 'bio',
      label: 'Bio',
      multiline: true,
    },
    {
      id: 'interest',
      label: 'Interests',
    },
  ];

  const socialInputs = [
    {
      id: 'location',
      label: 'Location',
    },
    {
      id: 'portfolio',
      label: 'Personal site/portfolio',
    },
    {
      id: 'bio',
      label: 'Bio',
      multiline: true,
    },
    {
      id: 'interest',
      label: 'Interests',
    },
  ];

  return (
    <Container sx={{ pt: 5 }}>
      <Typography variant="h6" component="h1">
        Edit profile
      </Typography>
      <Box
        sx={{
          display: 'flex',
          mt: 4,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Avatar sx={{ width: 100, height: 100 }}>FK</Avatar>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 0, sm: 2 },
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <TextField label="Name" margin="normal" fullWidth />
            <TextField label="Surname" margin="normal" fullWidth />
          </Box>
          <TextField label="Email" margin="normal" fullWidth />
          <TextField label="Username" margin="normal" fullWidth />
        </Box>
      </Box>
      <Box sx={{ mt: 4, pb: 4 }}>
        <Typography variant="h6" component="h2">
          About
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {aboutInputs.map((input) => (
            <Grid item xs={12} sm={6} key={input.id}>
              <TextField fullWidth {...input} />
            </Grid>
          ))}
        </Grid>
        {/* </Box> */}
      </Box>
    </Container>
  );
};

export default SettingsPage;
