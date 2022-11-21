import {
  Box,
  Typography,
  Avatar,
  TextField,
  Grid,
  InputAdornment,
} from '@mui/material';
import { useUserContext } from '../../context/UserContext';
import { AlternateEmail, Language } from '@mui/icons-material';
import { motion } from 'framer-motion';

const GeneralSettings = () => {
  const authUser = useUserContext();

  const sections = [
    {
      title: 'About',
      inputs: [
        {
          id: 'location',
          label: 'Location',
        },
        {
          id: 'interest',
          label: 'Interests',
        },
        {
          id: 'skills',
          label: 'Skills',
        },
        {
          id: 'bio',
          label: 'Bio',
          multiline: true,
          maxRows: 4,
        },
      ],
    },
    {
      title: 'Social',
      inputs: [
        {
          id: 'portfolio',
          label: 'Personal site/portfolio',
          InputProps: {
            startAdornment: (
              <InputAdornment position="start">
                <Language fontSize="small" />
              </InputAdornment>
            ),
          },
        },
        {
          id: 'instagram',
          label: 'Instagram username',
          InputProps: {
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmail fontSize="small" />
              </InputAdornment>
            ),
          },
        },
        {
          id: 'facebook',
          label: 'Facebook username',
          InputProps: {
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmail fontSize="small" />
              </InputAdornment>
            ),
          },
        },
      ],
    },
  ];

  return (
    <motion.section
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{
        duration: 0.7,
        ease: 'easeInOut',
      }}
    >
      <Typography variant="h6" component="h1">
        Edit profile
      </Typography>
      <Box
        sx={{
          display: 'flex',
          mt: 4,
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1, position: 'relative' }}>
          <img
            src={authUser.profileBg}
            style={{ width: '100%', borderRadius: 4 }}
          />
          <Avatar
            src={authUser.avatar}
            sx={{
              width: 100,
              height: 100,
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, 0%)',
            }}
          >
            {authUser.name[0]}
            {authUser.surname[0]}
          </Avatar>
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
      {sections.map((section) => (
        <Box component="section" sx={{ mt: 4 }} key={section.title}>
          <Typography variant="h6" component="h2">
            {section.title}
          </Typography>
          <Grid container spacing={4} sx={{ mt: -1 }}>
            {section.inputs.map((input) => (
              <Grid item xs={12} sm={6} key={input.id}>
                <TextField fullWidth {...input} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </motion.section>
  );
};

export default GeneralSettings;
