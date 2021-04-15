import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createAuthHeader, createHeaderWithToken } from 'config/http';
import { loadAuthToken, loadAccountDetails } from 'modules/userManager/actions'
import StyledLoginPage from './LoginPage.style';
import routePaths from 'routes/routePaths';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { LoginForm } from 'components';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldDisplayError: false,
        }
    }

    snackbarClose = () => {
        this.setState({ shouldDisplayError: false });
    }

    submit = async (data) => {
        const { actions } = this.props;
        let header = createAuthHeader(data.email, data.password);
        actions.loadAuthToken(header)
            .then(() => actions.loadAccountDetails(createHeaderWithToken()))
            .then(() => this.props.history.push(routePaths.DASHBOARD))
            .catch(() => this.setState({ shouldDisplayError: true }));
    }

    render() {
        const { isLoading, hasError } = this.props;

        return (
            <StyledLoginPage>
                {hasError ?
                    <Snackbar open={this.state.shouldDisplayError} onClose={this.snackbarClose} autoHideDuration={4000}>
                        <Alert severity="error">
                            Log in failed. Wrong credentials.
                        </Alert>
                    </Snackbar>
                    :
                    null
                }
                <h1 className="login-title"> Welcome </h1>
                <LoginForm className="login-form" submit={this.submit} />
                {isLoading ? <CircularProgress className="login-progress" /> : null}
            </StyledLoginPage>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.userManager.isLoading,
    hasError: state.userManager.hasError,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        loadAuthToken,
        loadAccountDetails,
    },
        dispatch
    ),
});

export default R.compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(LoginPage);