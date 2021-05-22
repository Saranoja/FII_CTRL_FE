import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { sidebarMenuItems } from './helpers';
import { LogoutButton } from 'components';
import { loadAccountDetails } from 'modules/userManager/actions';
import StyledSidebar from './Sidebar.style';

const Sidebar = ({
  username,
  teaching,
  isSidebarOpen,
  handleSidebarToggle,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index, callback) => {
    setSelectedIndex(index);
    callback();
  };

  const Drawer = (
    <>
      <h1 className="username-greet">Hello {username}!</h1>
      <List component="nav" aria-label="main sidebar items">
        {R.map((item) => {
          if (item.teachingRequired && !teaching) return null;
          return (
            <ListItem
              button
              divider
              selected={selectedIndex === item.index}
              onClick={(event) =>
                handleListItemClick(event, item.index, item.action)
              }
              key={item.index}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          );
        }, sidebarMenuItems)}
      </List>
      <LogoutButton className="signout-button" />
    </>
  );

  return (
    <StyledSidebar
      variant="temporary"
      elevation={3}
      anchor="left"
      open={isSidebarOpen}
      onClose={handleSidebarToggle}
      classes={{
        paperAnchorLeft: 'sidebar-paper',
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      PaperProps={{ square: true }}
    >
      {Drawer}
    </StyledSidebar>
  );
};

const mapStateToProps = (state) => ({
  username: state.userManager.first_name,
  teaching: state.userManager.teaching,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadAccountDetails,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
