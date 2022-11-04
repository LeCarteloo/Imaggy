import { Box, Chip, Stack, styled, Typography, Container } from '@mui/material';
import {
  Image,
  Collections,
  Favorite,
  PlaceSharp,
  LanguageSharp,
} from '@mui/icons-material';
import {
  Route,
  Routes,
  useLocation,
  useParams,
  matchPath,
} from 'react-router-dom';
import { useState } from 'react';
import {
  Avatar,
  CollectionSection,
  ImageSection,
  ProfileTabs,
  UserSection,
} from '../components';
import { AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { UserInterface } from '../types/types';
import { getUser } from '../api/usersApi';
import Loader from '../Loader';

const StyledBanner = styled(Box)({
  position: 'absolute',
  width: '100%',
  zIndex: -1,
  top: 0,
  height: '250px',
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

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

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<UserInterface, Error>({
    queryKey: ['user', username],
    enabled: Boolean(username),
    queryFn: () => getUser(username),
    refetchOnWindowFocus: false,
  });

  if (isLoading || isError) {
    return <Loader />;
  }

  console.log(user);

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

  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setCurrentTab(newTab);
  };

  return (
    <Box sx={{ pt: 5, mt: 11.5 }}>
      {/* //TODO: Change banner img to variable later */}
      <StyledBanner>
        <img src={'/images/banner.jpg'} aria-hidden={true} />
      </StyledBanner>
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Avatar
            name={'Place'}
            surname={'Holder'}
            width={100}
            height={100}
            isPro={true}
          />
          <Typography variant="h3" component="h1" sx={{ mt: 3 }}>
            {user.name} {user.surname}
          </Typography>
        </Box>
        <Typography variant="body1" component="p" sx={{ mb: 2, mt: 2 }}>
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
            {user?.interest?.map((elem) => (
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
