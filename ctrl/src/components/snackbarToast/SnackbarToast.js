import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  NOTIFICATION_TYPES,
  EVENT_TYPES,
  eventToMessageMap,
} from 'modules/notifications/constants';
import { hideNotification } from 'modules/notifications/actions';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionRight(props) {
  return <Slide {...props} direction="left" />;
}

const SnackbarToast = ({
  isToastOpen,
  lastAnnouncement,
  currentUserId,
  actions,
}) => {
  let isSelfAuthor = false;
  let notificationType = NOTIFICATION_TYPES.success;
  let notificationEventTrigger = EVENT_TYPES.post;
  if (lastAnnouncement) {
    isSelfAuthor = currentUserId === lastAnnouncement.author_id;
    notificationType = lastAnnouncement.type;
    notificationEventTrigger = lastAnnouncement.event;
  }

  const genericMessagePack = eventToMessageMap[notificationEventTrigger];

  const notificationSelfMessage =
    notificationType === NOTIFICATION_TYPES.error
      ? genericMessagePack.error
      : genericMessagePack.success;

  const notificationPlaceholder = isSelfAuthor
    ? notificationSelfMessage
    : `${lastAnnouncement ? lastAnnouncement.author : ''} ${
        genericMessagePack.info
      }`;

  const notificationMessage = lastAnnouncement
    ? `${notificationPlaceholder} ${lastAnnouncement.group}`
    : '';

  if (notificationType === NOTIFICATION_TYPES.error && !isSelfAuthor)
    return null;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isToastOpen}
      onClose={actions.hideNotification}
      TransitionComponent={TransitionRight}
      message={notificationMessage}
      autoHideDuration={4000}
    />
  );
};

const mapStateToProps = (state) => ({
  isToastOpen: state.notifications.is_toast_on,
  lastAnnouncement: R.last(state.notifications.notfications_list),
  currentUserId: state.userManager.id,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      hideNotification,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarToast);
