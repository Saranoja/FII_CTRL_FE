import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Sidebar from 'modules/dashboard/components/sidebar';
import { NotificationsDrawer } from 'components';
import StyledLayout from './Layout.style';

const Layout = ({ children, username, isCentered }) => {
  const [isRightOpen, setIsRightOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsRightOpen(open);
  };

  return (
    <StyledLayout>
      <Sidebar className="sidebar-wrapper" username={username} />
      <div
        className={
          isCentered ? 'content-wrapper' : 'uncentered-content-wrapper'
        }
      >
        {children}
      </div>
      <IconButton className="notifications-icon" onClick={toggleDrawer(true)}>
        <NotificationsIcon />
      </IconButton>
      <NotificationsDrawer isOpen={isRightOpen} onClose={toggleDrawer(false)} />
    </StyledLayout>
  );
};

export default Layout;
