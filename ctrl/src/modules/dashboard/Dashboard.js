import * as React from 'react';
import * as R from 'ramda';
import Grid from '@material-ui/core/Grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadAccountDetails } from 'modules/userManager/actions';
import Layout from 'components/layout';
import ErrorPage from 'components/errorPage';
import ActionCard from './components/actionCard';
import { studentCardsInfo, teacherCardsInfo, adminCardsInfo } from './helpers';
import StyledDashboard from './Dashboard.style';

class Dashboard extends React.Component {
  render() {
    const { hasError, teaching, admin } = this.props;
    const cardsType = admin
      ? adminCardsInfo
      : teaching
      ? teacherCardsInfo
      : studentCardsInfo;

    if (hasError) return <ErrorPage />;

    return (
      <StyledDashboard>
        <Layout>
          <div className="dashboard-content-wrapper">
            <Grid
              container
              justify="center"
              className="dashboard-cards-stack"
              alignContent="center"
            >
              {R.map(
                (column) => (
                  <Grid item key={column.id}>
                    <ActionCard
                      image={column.image}
                      title={column.title}
                      description={column.description}
                      route={column.route}
                    />
                  </Grid>
                ),
                cardsType
              )}
            </Grid>
          </div>
        </Layout>
      </StyledDashboard>
    );
  }
}

const mapStateToProps = (state) => ({
  firstName: state.userManager.first_name,
  teaching: state.userManager.teaching,
  admin: state.userManager.admin,
  hasError: state.userManager.hasError,
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

export default R.compose(connect(mapStateToProps, mapDispatchToProps))(
  Dashboard
);
