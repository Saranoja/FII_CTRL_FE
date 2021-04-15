import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import StyledHeader from './Header.style';
import RouterLink from '../routerLink';
import routePaths from 'routes/routePaths';
import images from 'assets/images/header';

const Header = () => {
    const theme = useTheme();

    return (
        <StyledHeader theme={theme}>
            <RouterLink to={routePaths.DASHBOARD} id="home-link">
                <img src={images.logoFII} alt="FII-logo" className="logo-fii" />
            </RouterLink>
        </StyledHeader>
    )
};

export default Header;
