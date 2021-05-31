import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadNotification } from 'modules/notifications/actions';
import { loadGroups } from 'modules/announcements/actions';
import { isBlank } from 'utils';
import withSocketProvider from 'modules/socketProvider/withSocketProvider';

class GroupsConsumer extends React.Component {
  componentDidMount() {
    const { socket, actions, currentUserId } = this.props;
    if (isBlank(socket)) return;

    socket.on('groups', async (data) => {
      await actions.loadNotification(data);
      await actions.loadGroups();
      if (data.event === 'post')
        socket.emit('join', { room: data.group_id, uid: currentUserId });
      if (data.event === 'delete')
        socket.emit('leave', { room: data.group_id });
    });

    socket.on('error_groups', (data) => {
      actions.loadNotification(data);
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  currentUserId: state.userManager.id,
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
)(GroupsConsumer);
