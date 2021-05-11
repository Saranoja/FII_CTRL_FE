import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider as MuiThemePRovider } from '@material-ui/core/styles';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import { localStorageManager, STORE_KEYS } from 'utils';
import theme from 'theme';
import AppRoutes from 'routes';
import { Header, DarkThemeToggle } from 'components';

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
        <Router>
          <Header />
          <AppRoutes />
          <CssBaseline />
          <DarkThemeToggle
            checked={darkTheme.length ? darkTheme : false}
            onChange={() => setDarkTheme(!darkTheme)}
          />
        </Router>
      </ScThemeProvider>
    </MuiThemePRovider>
  );
};

export default App;
