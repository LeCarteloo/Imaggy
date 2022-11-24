import { Language } from '@mui/icons-material';
import { Container, Box, Typography, Link as MuiLink, styled } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  const groups = [
    {
      name: 'Unsplash',
      links: [
        {
          name: 'About',
          to: '/about',
        },
        {
          name: 'API/Developers',
          to: '/developers',
        },
        {
          name: 'Community',
          to: '/community',
        },
      ],
    },
    {
      name: 'Popular',
      links: [
        {
          name: 'Backgrounds',
          to: '/topic/backgrounds',
        },
        {
          name: 'Nature',
          to: '/topic/nature',
        },
        {
          name: 'People',
          to: '/topic/people',
        },
      ],
    },
  ];

  return (
    <Container component={'footer'} sx={{ mt: 15 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {groups.map((group) => (
          <Box key={group.name} sx={{ minWidth: '150px', flex: 1 }}>
            <Typography variant="body1" component="h6">
              {group.name}
            </Typography>
            <ul style={{ padding: 0, listStyle: 'none' }}>
              {group.links.map((link) => (
                <li key={link.name}>
                  <MuiLink
                    component={Link}
                    to={link.to}
                    underline="hover"
                    color="grey"
                  >
                    {link.name}
                  </MuiLink>
                </li>
              ))}
            </ul>
          </Box>
        ))}
      </Box>
      <hr />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <MuiLink component={Link} to="/privacy" underline="hover" color="grey">Privacy Policy </MuiLink>
          <MuiLink component={Link} to="/terms" underline="hover" color="grey">Terms </MuiLink>
          <MuiLink component={Link} to="/security" underline="hover" color="grey">Security </MuiLink>
        </Box>
        <Box>
          <MuiLink href="#">
            <Language />
          </MuiLink>
          <MuiLink href="#" >
            <Language />
          </MuiLink>
          <MuiLink href="#" >
            <Language />
          </MuiLink>
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
