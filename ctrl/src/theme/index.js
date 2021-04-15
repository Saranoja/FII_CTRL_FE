import { createMuiTheme } from '@material-ui/core/styles';
import { lightPalette, darkPalette } from './palette';
import { customTypography } from './typography';

export const theme = (themeType) => createMuiTheme({
    palette: themeType === 'dark' ? darkPalette : lightPalette,
    typography: customTypography
});

export default theme;