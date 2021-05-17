import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadNotification } from 'modules/notifications/actions';
import { loadGroups } from 'modules/announcements/actions';
import { isBlank } from 'utils';
import withSocketProvider from 'modules/socketProvider/withSocketProvider';

class AnnouncementsConsumer extends React.Component {
  componentDidMount() {
    const { socket, actions, groups } = this.props;
    if (isBlank(socket)) return;

    actions.loadGroups().then(() =>
      R.forEach((group) => {
        socket.emit('join', { room: group.id });
      }, groups)
    );

    socket.on('message', (data) => {
      actions.loadNotification(data);
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  groups: state.announcements.groups,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadNotification,
      loadGroups,
    },
    dispatch
  ),
});

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSocketProvider
)(AnnouncementsConsumer);
