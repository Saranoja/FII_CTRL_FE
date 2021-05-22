import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from 'modules/dashboard/components/sidebar';
import { NotificationsDrawer } from 'components';
import StyledLayout from './Layout.style';
import { Badge } from '@material-ui/core';

const Layout = ({ children, username, notificationsList }) => {
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
      <IconButton onClick={toggleDrawer(true)} className="notifications-icon">
        <Badge
          className="badge"
          color="secondary"
          badgeContent={notificationsList.length}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton className="hamburger-menu" onClick={toggleSidebar}>
        <MenuIcon />
      </IconButton>
      <NotificationsDrawer isOpen={isRightOpen} onClose={toggleDrawer(false)} />
    </StyledLayout>
  );
};

const mapStateToProps = (state) => ({
  notificationsList: state.notifications.notfications_list,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
