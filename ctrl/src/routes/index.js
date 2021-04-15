import PropTypes from 'prop-types';
import { Switch } from "react-router-dom"
import { Route } from 'react-router';
import PrivateRoute from './PrivateRoute';
import { NotFoundPage } from 'components';
import routePaths from './routePaths';
import { privateRoutes, publicRoutes } from './config';

const AppRoutes = (props) => (
    <Switch>
        {props.publicRoutes.map((route) => (<Route key={route.id} exact {...route} />))}
        {props.privateRoutes.map((route) => (<PrivateRoute unauthorizedRedirectPath={props.unauthorizedRedirectPath} exact key={route.id} {...route} />))}
        <Route key="404-page" id="page-404" component={NotFoundPage} />
    </Switch>
);

AppRoutes.defaultProps = {
    unauthorizedRedirectPath: routePaths.LOGIN,
    publicRoutes,
    privateRoutes,
};

AppRoutes.propTypes = {
    unauthorizedRedirectPath: PropTypes.string,
    privateRoutes: PropTypes.arrayOf(PropTypes.shape({})),
    publicRoutes: PropTypes.arrayOf(PropTypes.shape({})),
};

export default AppRoutes;
