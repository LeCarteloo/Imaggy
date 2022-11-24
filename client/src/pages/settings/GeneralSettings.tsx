import {
  Box,
  Typography,
  Avatar,
  TextField,
  Grid,
  InputAdornment,
  Button,
  Autocomplete,
  Chip,
} from '@mui/material';
import { useUserContext } from '../../context/UserContext';
import { AlternateEmail, Language } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import { generalSettingsSchema } from '../../schemas';

interface IInputs {
  id: string;
  label: string;
  chipInput?: boolean;
  [key: string]: any;
}

interface ISections {
  title: string;
  inputs: IInputs[];
}

const sections: ISections[] = [
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
        id: 'bio',
        label: 'Bio',
        multiline: true,
        maxRows: 4,
      },
      {
        id: 'interest',
        label: 'Interests',
        chipInput: true,
      },
      {
        id: 'skills',
        label: 'Skills',
        chipInput: true,
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

interface ITest {
  [key: string]: any;
}

const GeneralSettings = () => {
  const authUser = useUserContext();
  const initialValues: ITest = {
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
  };

  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      // TODO: Future API call
      console.log(values);
    },
    validationSchema: generalSettingsSchema,
  });

  const handleAddChip = (
    e: React.SyntheticEvent<Element, Event>,
    value: (string | string[])[],
    id: string
  ) => {
    if (e.type === 'click') {
      setFieldValue(id, []);
      return;
    }

    setFieldValue(id, value);
  };

  const handleDeleteChip = (e: any, chipToDelete: string, id: any) => {
    const filteredValue = values[id as any].filter(
      (chip: string) => chip !== chipToDelete
    );

    setFieldValue(id, filteredValue);
  };

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
                    {input.chipInput ? (
                      <Autocomplete
                        value={values[id] as string[]}
                        options={[]}
                        onChange={(e, value) =>
                          handleAddChip(e, value, input.id)
                        }
                        onBlur={handleBlur}
                        multiple
                        freeSolo
                        renderTags={(value) =>
                          value.map((option: any, index: number) => {
                            return (
                              <Chip
                                key={index}
                                label={option}
                                onDelete={(e) =>
                                  handleDeleteChip(e, option, input.id)
                                }
                                sx={{ mr: 1 }}
                              />
                            );
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            label={input.label}
                            placeholder="Type and press enter"
                            helperText={
                              errors[id] && touched[id]
                                ? errors[id]?.toString()
                                : null
                            }
                            error={Boolean(errors[id] && touched[id])}
                            {...params}
                          />
                        )}
                      />
                    ) : (
                      <TextField
                        key={id}
                        value={values[id]}
                        helperText={
                          errors[id] && touched[id]
                            ? errors[id]?.toString()
                            : null
                        }
                        error={Boolean(errors[id] && touched[id])}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        {...input}
                      />
                    )}
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
