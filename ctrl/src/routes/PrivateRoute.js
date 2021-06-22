import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { loadAccountDetails } from 'modules/userManager/actions';
import { localStorageManager } from 'utils';
import { STORE_KEYS } from 'utils';

const PrivateRoute = ({
  unauthorizedRedirectPath,
  notAllowedPath,
  component: Component,
  componentProps,
  hasId,
  teacherAuthorized,
  studentAuthorized,
  isTeacher,
  isAdmin,
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

      if (
        !isAdmin &&
        ((!teacherAuthorized && isTeacher) ||
          (!studentAuthorized && !isTeacher))
      ) {
        console.log('Redirecting to ', notAllowedPath);
        return <Redirect to={{ pathname: notAllowedPath }} />;
      }

      return <Component {...props} {...componentProps} />;
    }}
  />
);

const mapStateToProps = (state) => ({
  hasId: state.userManager.hasId,
  isTeacher: state.userManager.teaching,
  isAdmin: state.userManager.admin,
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
