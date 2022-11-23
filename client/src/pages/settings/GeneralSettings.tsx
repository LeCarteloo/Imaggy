import {
  Box,
  Typography,
  Avatar,
  TextField,
  Grid,
  InputAdornment,
  Button,
} from '@mui/material';
import { useUserContext } from '../../context/UserContext';
import { AlternateEmail, Language } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import { generalSettingsSchema } from '../../schemas';

const sections = [
  {
    title: 'General',
    inputs: [
      {
        id: 'name',
        label: 'Name',
      },
      {
        id: 'surname',
        label: 'Surname',
      },
      {
        id: 'email',
        label: 'Email',
      },
      {
        id: 'username',
        label: 'Username',
      },
    ],
  },
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
        id: 'bio',
        label: 'Bio',
        multiline: true,
        maxRows: 4,
      },
      {
        id: 'skills',
        label: 'Skills',
      },
    ],
  },
  {
    title: 'Social',
    inputs: [
      {
        id: 'website',
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

const GeneralSettings = () => {
  const authUser = useUserContext();
  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: authUser.name,
      surname: authUser.surname,
      email: authUser.email,
      username: authUser.username,
      location: authUser.location,
      interest: authUser.interest,
      skills: authUser.skills,
      bio: authUser.bio,
      website: authUser.links.website,
      instagram: authUser.links.instagram,
      facebook: authUser.links.facebook,
    },
    onSubmit: (values) => {
      // TODO: Future API call
      console.log(values);
    },
    validationSchema: generalSettingsSchema,
  });

  return (
    <motion.div
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
        component="section"
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
            style={{
              width: '100%',
              borderRadius: 4,
              maxHeight: '250px',
              objectFit: 'cover',
            }}
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
      </Box>
      <form onSubmit={handleSubmit}>
        {sections.map((section) => (
          <Box component="section" sx={{ mt: 4 }} key={section.title}>
            <Typography variant="h6" component="h2">
              {section.title}
            </Typography>
            <Grid container spacing={4} sx={{ mt: -1 }}>
              {section.inputs.map((input) => {
                const id = input.id as keyof typeof values;
                return (
                  <Grid item xs={12} sm={6} key={input.id}>
                    <TextField
                      key={id}
                      value={values[id]}
                      helperText={errors[id] && touched[id] ? errors[id] : null}
                      error={Boolean(errors[id] && touched[id])}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      {...input}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ))}
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          {isSubmitting ? 'Updating profile...' : 'Update profile'}
        </Button>
      </form>
    </motion.div>
  );
};

export default GeneralSettings;
