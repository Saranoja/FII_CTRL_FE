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

  componentDidMount() {
    const { socket, actions, groups } = this.props;
    if (isBlank(socket)) return;

    setTimeout(() => {
      actions.loadGroups().then((result) => {
        R.forEach((group) => {
          socket.emit('join', {
            room: String(group.id),
            uid: localStorageManager.get(STORE_KEYS.ID).id,
          });
        }, R.path(['payload', 'data', 'current_user_groups'], result));
      });
    }, 2000);

    socket.on('announcements', (data) => {
      const currentGroupId = this.getLastVisitedGroup()?.id || groups[0]?.id;
      actions.loadNotification(data);
      if (data.group_id === String(currentGroupId))
        actions.loadGroupAnnouncements(currentGroupId);
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
