import { ImageSection, Navbar } from './components';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { styled } from '@mui/system';
import { Home } from './pages';

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
  return (
    <ThemeProvider theme={themeMUI}>
      <div className="app">
        <Navbar />
        <StyledMain>
          <Home />
          <ImageSection />
        </StyledMain>
      </div>
    </ThemeProvider>
  );
}

export default App;
