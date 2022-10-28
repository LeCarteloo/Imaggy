import { ImageSection, Navbar, UserPreview } from './components';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { styled } from '@mui/system';
import { Home } from './pages';
import { UserProvider } from './context/userContext';

let themeMUI = createTheme({
  palette: {
    primary: {
      main: '#991299',
    },
  },
});

themeMUI = responsiveFontSizes(themeMUI);

const StyledMain = styled('main')({
  width: '100%',
  height: '100%',
});

function App() {
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
    <ThemeProvider theme={themeMUI}>
      <div className="app">
        <UserProvider user={user}>
          <Navbar />
          <StyledMain>
            <Home />
            <ImageSection />
          </StyledMain>
        </UserProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
