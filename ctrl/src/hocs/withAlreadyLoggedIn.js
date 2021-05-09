import React from 'react';
import { Redirect } from 'react-router-dom';
import routePaths from 'routes/routePaths';

const withAlreadyLoggedIn = (Component) => (props) => {
  return (
    <div className="with-already-logged-in">
      {props.hasId ? (
        <Redirect to={routePaths.DASHBOARD} />
      ) : (
        <Component {...props} />
      )}
    </div>
  );
};

export default withAlreadyLoggedIn;
