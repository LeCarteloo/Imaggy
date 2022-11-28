import { AccountBox } from '@mui/icons-material';
import {
  Box,
  Button,
  Link as MuiLink,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { loginSchema } from '../../schemas';

const inputs = [
  {
    id: 'email',
    label: 'E-mail adress',
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
  },
];

const initialValues = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      onSubmit: () => {},
      validationSchema: loginSchema,
      // validateOnChange: false,
      // validateOnBlur: false,
    });

  return (
    <Box
      component="section"
      sx={{
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />
      <Paper sx={{ p: 4, width: { xs: '90%', md: '50%', lg: '30%' } }}>
        <Typography>LOGO</Typography>
        <Typography component="h1" variant="h5" fontWeight="bold">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => {
            const id = input.id as keyof typeof initialValues;
            return (
              <TextField
                margin="normal"
                fullWidth
                value={values[id]}
                error={Boolean(touched[id] && errors[id])}
                helperText={touched[id] && errors[id] ? errors[id] : null}
                onChange={handleChange}
                onBlur={handleBlur}
                {...input}
              />
            );
          })}
          <Button type="submit" variant="contained" sx={{ mt: 1, mb: 2 }}>
            Login
          </Button>
        </form>
        <hr />
        <Typography sx={{ mt: 2 }}>
          {'New user? '}
          <MuiLink underline="hover" component={Link} to="/register">
            Create account
          </MuiLink>
        </Typography>
      </Paper>
      <MuiLink
        underline="hover"
        href="#"
        aria-label="Photo artist"
        sx={{
          position: 'absolute',
          bottom: '5px',
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

export default LoginPage;
