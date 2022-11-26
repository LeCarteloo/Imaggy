import { AccountBox } from '@mui/icons-material';
import {
  Box,
  Button,
  Link as MuiLink,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <Box
      component="section"
      sx={{
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        height: '100%',
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
      <Paper sx={{ p: 4, width: { xs: '80%', md: '50%', lg: '30%' } }}>
        <Typography>LOGO</Typography>
        <Typography component="h1" variant="h5" fontWeight="bold">
          Sign in
        </Typography>
        <TextField label="E-mail adress" margin="normal" fullWidth />
        <TextField label="Password" margin="normal" fullWidth />
        <Button variant="contained" sx={{ mt: 1, mb: 2 }}>
          Login
        </Button>
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
