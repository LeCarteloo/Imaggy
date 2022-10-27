import { LogoDev, Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Menu,
  Box,
  Tooltip,
  Avatar,
} from '@mui/material';
import { useState } from 'react';

const Navbar = () => {
  const pages = ['Explore', 'Advertise', 'Imaggy+'];
  const menuItems = [
    'Profile',
    'My posts',
    'My likes',
    'Go Imaggy+',
    'Account Settings',
    'Sign out',
  ];
  const isLogged = true;
  const userFullName = 'Filip Papiernik';
  const userAvatar = '/images/avatar.jpg';
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenu(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#24242424' }}>
      <Toolbar>
        <IconButton
          sx={{ display: { xs: 'flex', md: 'none' } }}
          size="large"
          color="primary"
          aria-label="open menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Imaggy</Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <MenuItem key={page}>
              <Typography variant="h6">{page}</Typography>
            </MenuItem>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '1em',
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        >
          {isLogged ? (
            <>
              <Tooltip title="Open user settings">
                <IconButton
                  aria-label="open user settings"
                  onClick={handleOpenMenu}
                >
                  <Avatar alt={userFullName} src={userAvatar}>
                    {userFullName[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={menu}
                keepMounted
                open={Boolean(menu)}
                onClose={handleCloseMenu}
              >
                {menuItems.map((menuItem) => (
                  <MenuItem key={menuItem} onClick={handleCloseMenu}>
                    {menuItem}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              <Button variant="text">Sign in</Button>
              <Button variant="contained">Sign up</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
