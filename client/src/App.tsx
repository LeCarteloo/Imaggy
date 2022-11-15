import { Navbar } from './components';
import { styled } from '@mui/system';
import { UserProvider } from './context/UserContext';
import { Routes, Route } from 'react-router-dom';
import { AboutPage, HomePage, ImaggyPlus, PostPage, UserPage } from './pages';
import { CssBaseline } from '@mui/material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUser } from './api/usersApi';
import Loader from './Loader';
import { ThemeModeProvider } from './context/ThemeContext';

const StyledMain = styled('main')({
  marginTop: 70,
  paddingBottom: '32px',
  height: '100%',
});

type ThemeType = 'dark' | 'light';

function App() {
  const [theme, setTheme] = useState<ThemeType>('dark');

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
    <ThemeModeProvider themeMode={theme}>
      <div className="app">
        <CssBaseline />
        {/* //TODO: Change it later from user[0] to user (json-server returns object in array) */}
        <UserProvider user={user[0]}>
          <Navbar
            theme={theme}
            setTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
          <StyledMain>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/imaggyplus" element={<ImaggyPlus />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/user/:username/*" element={<UserPage />} />
              <Route path="/post/:postId" element={<PostPage />} />
            </Routes>
          </StyledMain>
        </UserProvider>
      </div>
    </ThemeModeProvider>
  );
}

export default App;
