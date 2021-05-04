import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadAccountDetails } from '../../../userManager/actions';
import StyledSidebar from './Sidebar.style';

const Sidebar = ({ username, className }) => {
	return (
		<StyledSidebar className={className}>
			<h1 className="username-greet"> Hello {username}! </h1>
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
