import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  NOTIFICATION_TYPES,
  messageGeneric,
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
  if (lastAnnouncement) {
    isSelfAuthor = currentUserId === lastAnnouncement.author_id;
    notificationType = lastAnnouncement.type;
  }

  const notificationSelfMessage =
    notificationType === NOTIFICATION_TYPES.error
      ? messageGeneric.error
      : messageGeneric.success;

  const notificationPlaceholder = isSelfAuthor
    ? notificationSelfMessage
    : `${lastAnnouncement ? lastAnnouncement.author : ''} ${
        messageGeneric.info
      }`;

  const notificationMessage = lastAnnouncement
    ? `${notificationPlaceholder} ${lastAnnouncement.group}`
    : '';

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
