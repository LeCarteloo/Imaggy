import { Menu as MenuIcon } from '@mui/icons-material';
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
  Switch,
} from '@mui/material';
import { useState } from 'react';
import { useUserContext } from '../../context/userContext';
import GoProText from '../buttons/GoProText';
import SideMenu from './SideMenu';
import Logo from '../../assets/logo.png';

type NavbarProps = {
  theme: boolean;
  setTheme: () => void;
};

const Navbar = ({ theme, setTheme }: NavbarProps) => {
  const pages = ['Explore', 'Advertise'];
  const menuItems = [
    'Profile',
    'My posts',
    'My likes',
    'Go Imaggy+',
    'Account Settings',
    'Sign out',
  ];

  const { name, surname, avatar } = useUserContext();
  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);
  const [sideMenu, setSideMenu] = useState(false);

  const handleOpenUserMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setUserMenu(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenu(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          sx={{ display: { xs: 'flex', md: 'none' } }}
          size="large"
          color="primary"
          aria-label="open menu"
          onClick={() => setSideMenu(!sideMenu)}
        >
          <MenuIcon />
        </IconButton>
        <img src={Logo} alt="Imaggy logo" width="50px" height="25px" />
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <MenuItem key={page}>
              <Typography variant="h6">{page}</Typography>
            </MenuItem>
          ))}
          <MenuItem>
            <GoProText />
          </MenuItem>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '1em',
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
        >
          {name ? (
            <>
              <Tooltip title="Open user settings">
                <IconButton
                  aria-label="open user settings"
                  onClick={handleOpenUserMenu}
                >
                  <Avatar alt={`${name} ${surname}`} src={avatar}>
                    {`${name[0]}${surname[0]}`}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={userMenu}
                open={Boolean(userMenu)}
                onClose={handleCloseUserMenu}
              >
                {menuItems.map((menuItem) => (
                  <MenuItem key={menuItem} onClick={handleCloseUserMenu}>
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
        <Switch checked={theme} onChange={setTheme} />
      </Toolbar>
      <SideMenu open={sideMenu} handleOpen={() => setSideMenu(!sideMenu)} />
    </AppBar>
  );
};

export default Navbar;
