import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadAccountDetails } from 'modules/userManager/actions';
import PropTypes from 'prop-types';
import routePaths from './routePaths';
import Login from 'modules/login';
import { localStorageManager } from 'utils';
import { Route, Redirect } from 'react-router-dom';


const LoginRoute = ({
    redirectToPath,
    hasIdm,
    ...otherProps
}) => (
    <Route {...otherProps}
        render={() => {
            if (hasIdm) {
                console.log("LGON");
                localStorageManager.set('persisted_path', window.location.pathname + window.location.search);
                console.log('Redirectiong to ', redirectToPath);
                return <Redirect to={{ pathname: redirectToPath }} />
            }

            return <Route exact path={routePaths.LOGIN} component={Login} />
        }}
    />
);

LoginRoute.defaultProps = {
    location: {},
};

LoginRoute.propTypes = {
    redirectToPath: PropTypes.string.isRequired,
    location: PropTypes.shape({}),
};

const mapStateToProps = (state) => ({
    hasIdm: state.userManager.hasIdm,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        loadAccountDetails,
    },
        dispatch
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginRoute);