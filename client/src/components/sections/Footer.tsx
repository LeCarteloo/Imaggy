import { Language } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';

const Footer = () => {
  const groups = [
    {
      name: 'Unsplash',
      links: [
        {
          name: 'About',
          to: '#',
        },
        {
          name: 'Blog',
          to: '#',
        },
        {
          name: 'Community',
          to: '#',
        },
      ],
    },
    {
      name: 'Popular',
      links: [
        {
          name: 'Backgrounds',
          to: '#',
        },
        {
          name: 'Nature',
          to: '#',
        },
        {
          name: 'People',
          to: '#',
        },
      ],
    },
  ];

  return (
    <Container component={'footer'} sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {groups.map((group) => (
          <Box sx={{ minWidth: '150px', flex: 1 }}>
            <Typography variant="body1" component="h6">
              {group.name}
            </Typography>
            <ul style={{ padding: 0, listStyle: 'none' }}>
              {group.links.map((link) => (
                <li>
                  <Link
                    to={link.to}
                    style={{ textDecoration: 'none', color: 'gray' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        ))}
      </Box>
      <hr />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Link to="#">Privacy Policy </Link>
          <Link to="#">Terms </Link>
          <Link to="#">Security </Link>
        </Box>
        <Box>
          <Link to="#">
            <Language />
          </Link>
          <Link to="#">
            <Language />
          </Link>
          <Link to="#">
            <Language />
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
