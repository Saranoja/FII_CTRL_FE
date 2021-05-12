import * as React from 'react';
import { Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import userManager from 'modules/userManager';

const LogoutButton = () => (
  <Button
    className="signout-button"
    color="primary"
    size="small"
    endIcon={<ExitToAppIcon />}
    onClick={() => userManager.logout()}
  >
    Log out
  </Button>
);

export default LogoutButton;
