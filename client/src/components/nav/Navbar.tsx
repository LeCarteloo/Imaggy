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
  Switch,
} from '@mui/material';
import { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import GoProText from '../buttons/GoProText';
import SideMenu from './SideMenu';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

type NavbarProps = {
  theme: string;
  setTheme: () => void;
};

const Navbar = ({ theme, setTheme }: NavbarProps) => {
  const authUser = useUserContext();
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

  const pages = ['Explore', 'Advertise'];
  const menuItems = [
    {
      name: 'Profile',
      to: `/user/${authUser.username}`,
    },
    {
      name: 'Go Imaggy+',
      to: `#!`,
    },
    {
      name: 'Account Settings',
      to: `#!`,
    },
    {
      name: 'Sign out',
      to: `#!`,
    },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#201d1d3b',
        backgroundImage: 'none',
        backdropFilter: 'blur(5px)',
      }}
    >
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
        <Link to="/">
          <img src={Logo} alt="Imaggy logo" width="50px" height="25px" />
        </Link>
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
          {authUser ? (
            <>
              <Tooltip title="Open user settings">
                <IconButton
                  aria-label="open user settings"
                  onClick={handleOpenUserMenu}
                >
                  <Avatar
                    name={authUser.name}
                    surname={authUser.surname}
                    isPro={authUser.isPro}
                    img={authUser.avatar}
                    fontSize={'sm'}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={userMenu}
                open={Boolean(userMenu)}
                onClose={handleCloseUserMenu}
              >
                {menuItems.map((menuItem) => (
                  <MenuItem
                    key={menuItem.name}
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to={menuItem.to}
                  >
                    {menuItem.name}
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
        <Switch checked={theme === 'dark'} onChange={setTheme} />
      </Toolbar>
      <SideMenu open={sideMenu} handleOpen={() => setSideMenu(!sideMenu)} />
    </AppBar>
  );
};

export default Navbar;
