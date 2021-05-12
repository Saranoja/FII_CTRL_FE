import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LogoutButton } from 'components';
import { loadAccountDetails } from 'modules/userManager/actions';
import StyledSidebar from './Sidebar.style';

const Sidebar = ({ username, className }) => (
  <StyledSidebar className={className} elevation={3} square>
    <h1 className="username-greet">Hello {username}!</h1>
    <LogoutButton className="signout-button" />
  </StyledSidebar>
);

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
