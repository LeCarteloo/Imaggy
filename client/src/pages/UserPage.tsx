import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import { Container } from '@mui/system';
import {
  Route,
  Routes,
  useLocation,
  useParams,
  matchPath,
} from 'react-router-dom';
import { useUserContext } from '../context/userContext';
import { PlaceSharp, LanguageSharp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import {
  CollectionSection,
  ImageSection,
  ProfileTabs,
  UserSection,
} from '../components';
import { Image, Collections, Favorite } from '@mui/icons-material';
import { AnimatePresence } from 'framer-motion';

const UserPage = () => {
  const getCurrentTab = () => {
    if (matchPath('/user/:username/followers', location.pathname)) {
      return 1;
    } else if (matchPath('/user/:username/following', location.pathname)) {
      return 2;
    } else if (matchPath('/user/:username/collection', location.pathname)) {
      return 3;
    }

    return 0;
  };

  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(getCurrentTab());
  const { username } = useParams();
  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setCurrentTab(newTab);
  };

  const tabs = [
    {
      label: 'Posts',
      icon: <Image fontSize="small" />,
      to: '',
    },
    {
      label: 'Followers',
      icon: <Favorite fontSize="small" />,
      to: 'followers',
    },
    {
      label: 'Following',
      icon: <Favorite fontSize="small" />,
      to: 'following',
    },
    {
      label: 'Collection',
      icon: <Collections fontSize="small" />,
      to: 'collection',
    },
  ];

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
      <ProfileTabs
        currentTab={currentTab}
        tabs={tabs}
        onChange={handleChange}
      />
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
