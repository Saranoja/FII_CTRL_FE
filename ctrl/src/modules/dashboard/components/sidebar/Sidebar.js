import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadAccountDetails } from '../../../userManager/actions';
import StyledSidebar from './Sidebar.style';

const Sidebar = ({ username, className }) => {
    const theme = useTheme();
    return (
        <StyledSidebar className={className} theme={theme}>
            <h1 className="username-greet"> Hello {username}! </h1>
        </StyledSidebar>
    )
}


const mapStateToProps = (state) => ({
    username: state.userManager.first_name,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        loadAccountDetails,
    },
        dispatch
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);