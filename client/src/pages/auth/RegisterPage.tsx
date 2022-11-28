import { AccountBox } from '@mui/icons-material';
import {
  Box,
  Button,
  Link as MuiLink,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const steps = ['Sign up', 'Details', 'Extra'];

const initialValues = {
  // First
  email: '',
  username: '',
  password: '',
  repeatPassword: '',
  // Second
  name: '',
  surname: '',
  bio: '',
  // Third
  skills: '',
  interest: '',
};

const inputs = [
  [
    {
      id: 'email',
      label: 'E-mail adress*',
    },
    {
      id: 'username',
      label: 'Username*',
    },
    {
      id: 'password',
      label: 'Password*',
    },
    {
      id: 'repeatPassword',
      label: 'Repeat password*',
    },
  ],
  [
    {
      id: 'name',
      label: 'Name*',
    },
    {
      id: 'surname',
      label: 'Surname*',
    },
    {
      id: 'bio',
      label: 'Bio',
      multiline: true,
      maxRows: 4,
    },
  ],
  [
    {
      id: 'skills',
      label: 'Skills',
    },
    {
      id: 'interest',
      label: 'Interest',
    },
    {
      id: 'location',
      label: 'Location',
      multiline: true,
      maxRows: 4,
    },
  ],
];

const RegisterPage = () => {
  const [page, setPage] = useState(0);
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      onSubmit: () => {},
    });

  // Function renders a form depending on page number (inputs are taken from global variable)
  const renderPage = () => {
    return (
      <Box>
        {inputs[page].map((input) => {
          const id = input.id as keyof typeof initialValues;
          return (
            <TextField
              value={values[id]}
              onChange={handleChange}
              margin="normal"
              fullWidth
              {...input}
            />
          );
        })}
      </Box>
    );
  };

  const handlePageChange = (page: number) => {
    setPage((prev) => prev + page);
  };

  return (
    <Box
      component={'section'}
      sx={{
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        pt: 4,
        pb: 4,
        minHeight: '100vh',
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
      <AnimatePresence key={page}>
        <Paper
          component={motion.div}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          sx={{
            p: { xs: 2, sm: 4 },
            width: { xs: '90%', md: '50%', lg: '30%' },
          }}
        >
          <Typography>LOGO</Typography>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Register
          </Typography>
          <Box>
            <Stepper activeStep={page} sx={{ mt: 1, mb: 1 }}>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <form onSubmit={handleSubmit}>
            {renderPage()}
            <Box sx={{ display: 'flex', gap: 2 }}>
              {page > 0 ? (
                <Button
                  variant="outlined"
                  sx={{ mt: 1, mb: 2 }}
                  onClick={(e) => handlePageChange(-1)}
                >
                  PREVIOUS
                </Button>
              ) : null}
              {page < 2 ? (
                <Button
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  onClick={() => handlePageChange(1)}
                >
                  NEXT
                </Button>
              ) : null}
              {page === 2 ? (
                <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2 }}>
                  REGISTER
                </Button>
              ) : null}
            </Box>
          </form>
          <hr />
          <Typography sx={{ mt: 2 }}>
            {'Already have an account? '}
            <MuiLink underline="hover" component={Link} to="/register">
              Sign in
            </MuiLink>
          </Typography>
        </Paper>
      </AnimatePresence>
      <MuiLink
        underline="hover"
        href="#"
        aria-label="Photo artist"
        sx={{
          position: 'absolute',
          top: '5px',
          left: '5px',
          display: 'flex',
          color: '#FFF',
        }}
      >
        <AccountBox />
        Username
      </MuiLink>
    </Box>
  );
};

export default RegisterPage;
