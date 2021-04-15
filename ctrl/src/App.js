import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'theme';
import AppRoutes from 'routes';
import { Header, DarkThemeToggle } from 'components';

const App = () => {
    const [darkTheme, setDarkTheme] = useState(false);
    const themeType = darkTheme ? 'dark' : 'light';
    return (
        <ThemeProvider theme={theme(themeType)}>
            <Router>
                <Header />
                <AppRoutes />
                <CssBaseline />
                <DarkThemeToggle
                    checked={darkTheme}
                    onChange={() => setDarkTheme(!darkTheme)}
                />
            </Router>
        </ThemeProvider>
    );
};

export default App;