import React from 'react';
import { Redirect } from 'react-router-dom';
import routePaths from 'routes/routePaths';

const withLogin = (Component) => (props) => {
  return (
    <div className="with-login">
      {props.hasId ? (
        <Component {...props} />
      ) : (
        <Redirect to={routePaths.LOGIN} />
      )}
    </div>
  );
};

export default withLogin;
