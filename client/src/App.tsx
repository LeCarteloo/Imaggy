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
import {
  useQuery,
  QueryClientProvider,
  QueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { UserInterface } from './types/types';
import { getUser } from './api/usersApi';

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

  const userId = 1;

  const { data: user, status } = useQuery<UserInterface, Error>({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    refetchOnWindowFocus: false,
    // enabled: Boolean(userId)
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error...</div>;
  }

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <div className="app">
        <CssBaseline />
        <UserProvider user={user}>
          <Navbar
            theme={theme === 'dark'}
            setTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
          <StyledMain>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user/:username/*" element={<UserPage />} />
              <Route path="/post/:id" element={<PostPage />} />
            </Routes>
          </StyledMain>
        </UserProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
