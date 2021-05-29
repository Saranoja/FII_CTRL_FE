import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  NOTIFICATION_TYPES,
  EVENT_TYPES,
  DOMAINS,
  eventToMessageMap,
} from 'modules/notifications/constants';
import { hideNotification } from 'modules/notifications/actions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarToast = ({
  isToastOpen,
  lastNotification,
  currentUserId,
  actions,
}) => {
  let isSelfAuthor = false;
  let notificationType = NOTIFICATION_TYPES.success;
  let notificationEventTrigger = EVENT_TYPES.post;
  let domain = DOMAINS.ANNOUNCEMENTS;
  if (lastNotification) {
    isSelfAuthor = currentUserId === lastNotification.author_id;
    notificationType = lastNotification.type;
    notificationEventTrigger = lastNotification.event;
    domain = lastNotification.domain;
  }

  const genericMessagePack =
    eventToMessageMap[notificationEventTrigger][domain];

  const notificationSelfMessage =
    notificationType === NOTIFICATION_TYPES.error
      ? genericMessagePack.error
      : genericMessagePack.success;

  const notificationPlaceholder = isSelfAuthor
    ? notificationSelfMessage
    : `${lastNotification ? lastNotification.author : ''} ${
        genericMessagePack.info
      }`;

  const notificationMessage = lastNotification
    ? `${notificationPlaceholder} ${lastNotification.group}`
    : '';

  if (notificationType === NOTIFICATION_TYPES.error && !isSelfAuthor)
    return null;

  if (!isSelfAuthor) notificationType = NOTIFICATION_TYPES.info;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isToastOpen}
      onClose={actions.hideNotification}
      autoHideDuration={4000}
    >
      <Alert
        variant="standard"
        onClose={actions.hideNotification}
        severity={notificationType}
      >
        {lastNotification?.message ?? notificationMessage}
      </Alert>
    </Snackbar>
  );
};

const mapStateToProps = (state) => ({
  isToastOpen: state.notifications.is_toast_on,
  lastNotification: R.last(state.notifications.notfications_list),
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
