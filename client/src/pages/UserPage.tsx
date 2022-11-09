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
  Link,
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

  // TODO: with real data -> <UserInterface, Error>
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<any, Error>({
    queryKey: ['user', username],
    enabled: Boolean(username),
    queryFn: () => getUser(username),
    refetchOnWindowFocus: false,
  });

  if (isLoading || isError) {
    return <Loader />;
  }

  // TODO: Remove [0] after real db is connected (json-server returns object in array)
  const links = [
    {
      icon: <LanguageSharp fontSize="small" />,
      label: 'Facebook',
      to: user[0].facebook,
    },
    {
      icon: <LanguageSharp fontSize="small" />,
      label: 'Instagram',
      to: user[0].instagram,
    },
    {
      icon: <LanguageSharp fontSize="small" />,
      label: 'Website',
      to: user[0].website,
    },
  ];

  // TODO: Remove [0] after real db is connected (json-server returns object in array)
  const tabs = [
    {
      label: `Posts (${user[0].posts.length})`,
      icon: <Image fontSize="small" />,
      to: '',
    },
    {
      label: `Followers (${user[0].followers.length})`,
      icon: <Favorite fontSize="small" />,
      to: 'followers',
    },
    {
      label: `Following (${user[0].following.length})`,
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
      {user[0].profileBg ? (
        <StyledBanner>
          <img src={user[0].profileBg} aria-hidden={true} />
        </StyledBanner>
      ) : null}
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
            img={user[0].avatar}
            isPro={user[0].isPro}
          />
          <Typography variant="h3" component="h1" sx={{ mt: 3 }}>
            {user[0].name} {user[0].surname}
          </Typography>
        </Box>
        <Typography variant="body1" component="p" sx={{ mb: 2, mt: 2 }}>
          {user[0].bio}
        </Typography>
        <Box>
          {user[0].location ? (
            <Box
              sx={{
                display: 'flex',
                mt: 1,
              }}
            >
              <PlaceSharp fontSize="small" />
              <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                {user[0].location}
              </Typography>
            </Box>
          ) : null}
          {links.map((link) =>
            link.to ? (
              <Box
                sx={{
                  display: 'flex',
                  mt: 1,
                }}
                to={link.to}
                component={Link}
              >
                {link.icon}
                <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                  {link.label}
                </Typography>
              </Box>
            ) : null
          )}
          {user[0].interest.length > 0 ? (
            <>
              <Typography variant="body1" component="h2" sx={{ mt: 2 }}>
                Interests
              </Typography>
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                {user[0].interest.map((elem: string) => (
                  <Chip label={elem} key={elem} />
                ))}
              </Stack>
            </>
          ) : null}
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
            <Route
              path="/"
              element={
                <ImageSection user={user[0]} posts={user[0].posts} animated />
              }
            />
            <Route
              path="/followers"
              element={<UserSection users={user[0].followers} />}
            />
            <Route
              path="/following"
              element={<UserSection users={user[0].following} />}
            />
            <Route path="/collection" element={<CollectionSection />} />
          </Routes>
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default UserPage;
