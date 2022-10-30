import { Navbar } from './components';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { styled } from '@mui/system';
import { UserProvider } from './context/userContext';
import { Routes, Route } from 'react-router-dom';
import { HomePage, UserPage } from './pages';
import { CssBaseline } from '@mui/material';
import { useState } from 'react';

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
      default: '#e5e2e2',
    },
  },
});

darkTheme = responsiveFontSizes(darkTheme);
lightTheme = responsiveFontSizes(lightTheme);

const StyledMain = styled('main')({
  width: '100%',
  height: '100%',
});

function App() {
  const [theme, setTheme] = useState('dark');

  // Placeholder user data
  const user = {
    _id: 1,
    email: 'placeholder@email.com',
    avatar: 'https://place-hold.it/100x100',
    name: 'Place',
    surname: 'Holder',
    bio: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod nihil 
          sapiente cupiditate dolore dolorem. Minima ratione error perspiciatis laborum, 
          molestias, explicabo nemo porro aliquam consectetur eos a velit. Quidem, nemo!`,
    skills: ['Mobile Design, UI/Visual Design', 'Web Design'],
    interest: ['Travel Images', ' Mountain Images & Pictures', 'Nature Images'],
    links: {
      facebook: '#',
      instagram: '#',
      website: '#',
    },
    location: 'New York',
    followers: [],
    following: [],
    likedPosts: [
      {
        _id: 1,
        title: 'First post',
        image: 'https://place-hold.it/100x200',
        location: 'Warsaw',
        tags: ['Placeholder', 'Placeholder1'],
        description: 'Short description',
        views: 5,
        downloads: 1,
        device: '',
        users: [],
        likes: [],
        comments: [],
      },
    ],
  };

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
            </Routes>
          </StyledMain>
        </UserProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
