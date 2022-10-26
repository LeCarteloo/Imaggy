import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  Box,
} from '@mui/material';

const Navbar = () => {
  const pages = ['Explore', 'Advertise', 'Imaggy+'];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#24242424' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <MenuItem key={page}>
              <Typography variant="h6">{page}</Typography>
            </MenuItem>
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: '1em' }}>
          <Button variant="text">Login</Button>
          <Button variant="contained">Register</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
