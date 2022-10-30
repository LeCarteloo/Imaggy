import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import { PlaceSharp, LanguageSharp } from '@mui/icons-material';
import { useState } from 'react';
import {
  CollectionSection,
  ImageSection,
  ProfileTabs,
  UserSection,
} from '../components';
import { AnimatePresence } from 'framer-motion';

const UserPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const { username } = useParams();
  const location = useLocation();
  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setCurrentTab(newTab);
  };

  // TODO: Only for test, later use API with username param
  const user = useUserContext();

  return (
    <Box>
      <Container>
        <Avatar sx={{ width: 100, height: 100 }}>PH</Avatar>
        <Typography variant="h3" component="h1">
          {user.name} {user.surname}
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 2 }}>
          {user.bio}
        </Typography>
        <Box>
          <Box
            sx={{
              display: 'flex',
              mt: 1,
            }}
          >
            <PlaceSharp fontSize="small" />
            <Typography variant="body2" component="span" sx={{ ml: 1 }}>
              {user.location}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              mt: 1,
            }}
          >
            <LanguageSharp fontSize="small" />
            <Typography variant="body2" component="span" sx={{ ml: 1 }}>
              Facebook
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              mt: 1,
            }}
          >
            <LanguageSharp fontSize="small" />
            <Typography variant="body2" component="span" sx={{ ml: 1 }}>
              Instagram
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              mt: 1,
            }}
          >
            <LanguageSharp fontSize="small" />
            <Typography variant="body2" component="span" sx={{ ml: 1 }}>
              Website
            </Typography>
          </Box>
          <Typography variant="body1" component="h2" sx={{ mt: 2 }}>
            Interests
          </Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
            {user.interest.map((elem) => (
              <Chip label={elem} key={elem} />
            ))}
          </Stack>
        </Box>
      </Container>
      <ProfileTabs currentTab={currentTab} onChange={handleChange} />
      <Container sx={{ position: 'relative' }}>
        <AnimatePresence initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<ImageSection animated />} />
            <Route path="/followers" element={<UserSection />} />
            <Route path="/following" element={<UserSection />} />
            <Route path="/collection" element={<CollectionSection />} />
          </Routes>
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default UserPage;
