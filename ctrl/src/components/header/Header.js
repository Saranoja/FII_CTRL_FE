import * as React from 'react';
import routePaths from 'routes/routePaths';
import images from 'assets/images/header';
import StyledHeader from './Header.style';
import RouterLink from '../routerLink';
// import { Button } from '@material-ui/core';
// import userManager from 'modules/userManager';

//TODO: see for logout button

const Header = () => (
  <StyledHeader>
    <RouterLink to={routePaths.DASHBOARD} id="home-link">
      <img src={images.logoFII} alt="FII-logo" className="logo-fii" />
    </RouterLink>
    {/* <Button
      color="primary"
      variant="contained"
      onClick={() => userManager.logout()}
    >
      Log out
    </Button> */}
  </StyledHeader>
);

export default Header;
