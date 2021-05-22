import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadAccountDetails } from 'modules/userManager/actions';
import PropTypes from 'prop-types';
import Login from 'modules/login';
import { localStorageManager } from 'utils';
import { Route, Redirect } from 'react-router-dom';
import routePaths from './routePaths';

const LoginRoute = ({ redirectToPath, hasId, ...otherProps }) => (
  <Route
    {...otherProps}
    render={() => {
      if (hasId) {
        localStorageManager.set(
          'persisted_path',
          window.location.pathname + window.location.search
        );
        console.log('Redirectiong to ', redirectToPath);
        return <Redirect to={{ pathname: redirectToPath }} />;
      }

      return <Route exact path={routePaths.LOGIN} component={Login} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginRoute);
