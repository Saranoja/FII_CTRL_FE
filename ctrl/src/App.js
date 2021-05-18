import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SocketProvider from 'modules/socketProvider/SocketProvider';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider as MuiThemePRovider } from '@material-ui/core/styles';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import { isBlank, localStorageManager, STORE_KEYS } from 'utils';
import theme from 'theme';
import AppRoutes from 'routes';
import {
  Header,
  DarkThemeToggle,
  SnackbarToast,
  AnnouncementsConsumer,
} from 'components';

const App = () => {
  const [darkTheme, setDarkTheme] = useState(
    localStorageManager.get(STORE_KEYS.IS_DARK_THEME)
  );
  const themeType = darkTheme ? 'dark' : 'light';

  useEffect(() => {
    localStorageManager.set(STORE_KEYS.IS_DARK_THEME, darkTheme);
  });

  return (
    <MuiThemePRovider theme={theme(themeType)}>
      <ScThemeProvider theme={theme(themeType)}>
        <SocketProvider>
          <AnnouncementsConsumer />
        </SocketProvider>
        <Router>
          <Header />
          <SnackbarToast />
          <AppRoutes />
          <CssBaseline />
          <DarkThemeToggle
            checked={isBlank(darkTheme) ? false : darkTheme}
            onChange={() => setDarkTheme(!darkTheme)}
          />
        </Router>
      </ScThemeProvider>
    </MuiThemePRovider>
  );
};

export default App;
