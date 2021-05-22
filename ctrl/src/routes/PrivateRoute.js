import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loadAccountDetails } from 'modules/userManager/actions';
import { localStorageManager } from 'utils';
import { STORE_KEYS } from 'utils';

const PrivateRoute = ({
  unauthorizedRedirectPath,
  component: Component,
  componentProps,
  hasId,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={(props) => {
      if (!hasId) {
        localStorageManager.set(
          STORE_KEYS.PERSISTED_PATH,
          window.location.pathname + window.location.search
        );
        console.log('Redirecting to ', unauthorizedRedirectPath);
        return <Redirect to={{ pathname: unauthorizedRedirectPath }} />;
      }

      return <Component {...props} {...componentProps} />;
    }}
  />
);

const mapStateToProps = (state) => ({
  hasId: state.userManager.hasId,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadAccountDetails,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
