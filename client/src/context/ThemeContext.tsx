import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import { createContext, ReactNode, useMemo, useState } from 'react';

type ThemeType = 'dark' | 'light';

interface IThemeModeProvider {
  children: ReactNode;
  themeMode: ThemeType;
}

export const ThemeModeContext = createContext<ThemeType | undefined>(undefined);

export const ThemeModeProvider = ({
  children,
  themeMode,
}: IThemeModeProvider) => {
  const muiTheme = useMemo(() => {
    let theme = createTheme({
      palette: {
        mode: themeMode,
      },
    });
    // console.log(themeMode);
    theme = createTheme(theme, {
      palette: {
        mode: themeMode,
        primary: {
          light: '#fa5bf7',
          main: '#e91e63',
          dark: '#8f0093',
          contrastText: '#fff',
        },
        ...(themeMode === 'dark'
          ? {
              background: {
                default: '#242424',
              },
            }
          : {
              background: {
                paper: '#E7EBF0',
              },
            }),
      },
      components: {
        MuiImageList: {
          styleOverrides: {
            root: {
              columnCount: '3 !important',
              [theme.breakpoints.down('lg')]: {
                columnCount: '2 !important',
              },
              [theme.breakpoints.down('sm')]: {
                columnCount: '1 !important',
              },
            },
          },
        },
      },
    });
    theme = responsiveFontSizes(theme);

    return theme;
  }, [themeMode]);

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

//
// export cont useThemeContext =
