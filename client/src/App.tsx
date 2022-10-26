import { Navbar } from './components';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const themeMUI = createTheme({
  palette: {
    primary: {
      main: '#991299',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={themeMUI}>
      <div className="app">
        <Navbar />
      </div>
    </ThemeProvider>
  );
}

export default App;
