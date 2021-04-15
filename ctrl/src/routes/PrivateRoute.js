import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadAccountDetails } from 'modules/userManager/actions';
import { localStorageManager } from 'utils';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({
    unauthorizedRedirectPath,
    component: Component,
    componentProps,
    hasIdm,
    ...otherProps
}) => (
    <Route {...otherProps}
        render={(props) => {
            if (!hasIdm) {
                localStorageManager.set('persisted_path', window.location.pathname + window.location.search);
                console.log('Redirecting to ', unauthorizedRedirectPath);
                return <Redirect to={{ pathname: unauthorizedRedirectPath }} />
            }

            return <Component {...props} {...componentProps} />
        }}
    />
);

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

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);