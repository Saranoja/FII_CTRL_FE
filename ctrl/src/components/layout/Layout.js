import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from 'modules/dashboard/components/sidebar';
import { NotificationsDrawer } from 'components';
import StyledLayout from './Layout.style';

const Layout = ({ children, username, isCentered }) => {
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsRightOpen(open);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <StyledLayout className="layout">
      <Sidebar
        className="sidebar-wrapper"
        username={username}
        isSidebarOpen={isSidebarOpen}
        handleSidebarToggle={toggleSidebar}
      />
      <div className="content-wrapper">{children}</div>
      <IconButton className="notifications-icon" onClick={toggleDrawer(true)}>
        <NotificationsIcon />
      </IconButton>
      <IconButton className="hamburger-menu" onClick={toggleSidebar}>
        <MenuIcon />
      </IconButton>
      <NotificationsDrawer isOpen={isRightOpen} onClose={toggleDrawer(false)} />
    </StyledLayout>
  );
};

export default Layout;
