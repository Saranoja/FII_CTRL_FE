import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { localStorageManager, STORE_KEYS } from 'utils';
import { loadNotification } from 'modules/notifications/actions';
import { loadGroupAnnouncements } from 'modules/announcements/actions';
import { loadGroups } from 'modules/announcements/actions';
import { isBlank } from 'utils';
import withSocketProvider from 'modules/socketProvider/withSocketProvider';

class AnnouncementsConsumer extends React.Component {
  getLastVisitedGroup = () => {
    return localStorageManager.get(STORE_KEYS.LAST_VISITED_GROUP);
  };

  async componentDidMount() {
    const { socket, actions, groups } = this.props;
    if (isBlank(socket)) return;

    await actions.loadGroups().then(() =>
      R.forEach((group) => {
        socket.emit('join', { room: group.id });
      }, groups)
    );

    const lastVisitedGroupId = this.getLastVisitedGroup().id || groups[0].id;

    socket.on('message', (data) => {
      actions.loadNotification(data);
      actions.loadGroupAnnouncements(lastVisitedGroupId);
    });

    socket.on('error', (data) => {
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
      loadGroupAnnouncements,
    },
    dispatch
  ),
});

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSocketProvider
)(AnnouncementsConsumer);
