import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { localStorageManager, STORE_KEYS } from 'utils';
import { loadNotification } from 'modules/notifications/actions';
import { loadProfileDetails } from 'modules/profile/actions';
import { isBlank } from 'utils';
import withSocketProvider from 'modules/socketProvider/withSocketProvider';

class ProfileConsumer extends React.Component {
  getLastVisitedGroup = () => {
    return localStorageManager.get(STORE_KEYS.LAST_VISITED_GROUP);
  };

  componentDidMount() {
    const { socket, actions } = this.props;
    if (isBlank(socket)) return;

    socket.on('profile_update', (data) => {
      actions.loadProfileDetails();
      actions.loadNotification(data);
    });

    socket.on('profile_error', (data) => {
      actions.loadNotification(data);
    });
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadNotification,
      loadProfileDetails,
    },
    dispatch
  ),
});

export default R.compose(
  connect(null, mapDispatchToProps),
  withSocketProvider
)(ProfileConsumer);
