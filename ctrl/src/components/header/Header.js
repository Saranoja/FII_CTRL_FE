import * as React from 'react';
import routePaths from 'routes/routePaths';
import images from 'assets/images/header';
import StyledHeader from './Header.style';
import RouterLink from '../routerLink';

const Header = () => (
  <StyledHeader>
    <RouterLink to={routePaths.DASHBOARD} id="home-link">
      <img src={images.logoFII} alt="FII-logo" className="logo-fii" />
    </RouterLink>
  </StyledHeader>
);

export default Header;
