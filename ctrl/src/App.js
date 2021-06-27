import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
  AssignmentsConsumer,
  GroupsConsumer,
  MeetingsConsumer,
  MembersConsumer,
} from 'components';
import SocketProvider from 'modules/socketProvider/SocketProvider';

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
          <GroupsConsumer />
          <AnnouncementsConsumer />
          <AssignmentsConsumer />
          <MeetingsConsumer />
          <MembersConsumer />
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
