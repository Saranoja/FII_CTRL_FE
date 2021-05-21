import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LogoutButton } from 'components';
import { loadAccountDetails } from 'modules/userManager/actions';
import StyledSidebar from './Sidebar.style';

const Sidebar = ({ username, isSidebarOpen, handleSidebarToggle }) => {
  const drawer = (
    <>
      <h1 className="username-greet">Hello {username}!</h1>
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
      {drawer}
    </StyledSidebar>
  );
};

const mapStateToProps = (state) => ({
  username: state.userManager.first_name,
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
