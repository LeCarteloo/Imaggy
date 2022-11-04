import { Navbar } from './components';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { styled } from '@mui/system';
import { UserProvider } from './context/userContext';
import { Routes, Route } from 'react-router-dom';
import { HomePage, PostPage, UserPage } from './pages';
import { CssBaseline } from '@mui/material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserInterface } from './types/types';
import { getUser } from './api/usersApi';
import Loader from './Loader';

let darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#fa5bf7',
      main: '#e91e63',
      dark: '#8f0093',
      contrastText: '#fff',
    },
    background: {
      default: '#242424',
    },
  },
});

let lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#fa5bf7',
      main: '#e91e63',
      dark: '#8f0093',
      contrastText: '#fff',
    },
    background: {
      paper: '#E7EBF0',
    },
  },
});

darkTheme = responsiveFontSizes(darkTheme);
lightTheme = responsiveFontSizes(lightTheme);

const StyledMain = styled('main')({
  marginTop: 40,
  paddingBottom: '32px',
  height: '100%',
});

function App() {
  const [theme, setTheme] = useState('dark');

  const username = 'placeholder';

  // TODO: with real data -> <UserInterface, Error>
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<any, Error>({
    queryKey: ['user', username],
    queryFn: () => getUser(username),
    refetchOnWindowFocus: false,
    // enabled: Boolean(userId)
  });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>{error.toString()}</div>;
  }

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <div className="app">
        <CssBaseline />
        {/* //TODO: Change it later from user[0] to user (json-server returns object in array) */}
        <UserProvider user={user[0]}>
          <Navbar
            theme={theme === 'dark'}
            setTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
          <StyledMain>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user/:username/*" element={<UserPage />} />
              <Route path="/post/:postId" element={<PostPage />} />
            </Routes>
          </StyledMain>
        </UserProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
