import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  NOTIFICATION_TYPES,
  messageGeneric,
  noNotificationsGeneric,
} from 'modules/notifications/constants';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StyledNotificationsDrawer from './NotificationsDrawer.style';

const action = (
  <Button color="inherit" size="small" disableElevation>
    Dismiss
  </Button>
);

const NotificationsDrawer = ({
  isOpen,
  onClose,
  notificationsList,
  currentUserId,
}) => {
  return (
    <StyledNotificationsDrawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      classes={{
        paperAnchorRight: 'drawer-paper',
      }}
    >
      {notificationsList.length ? (
        R.map((notification) => {
          const isSelfAuthor = currentUserId === notification.author_id;
          const notificationType = notification.type;
          const notificationSelfMessage =
            notificationType === NOTIFICATION_TYPES.error
              ? messageGeneric.error
              : messageGeneric.success;
          const notificationPlaceholder = isSelfAuthor
            ? notificationSelfMessage
            : `${notification.author} ${messageGeneric.info}`;
          return (
            <div
              key={`${notification.title}${notification.text}${notification.author}}`}
            >
              <Alert
                severity={isSelfAuthor ? notificationType : 'info'}
                action={action}
                className="snackbar-notification-content"
              >
                {`${notificationPlaceholder} ${notification.group}`}
              </Alert>
            </div>
          );
        }, notificationsList)
      ) : (
        <Typography variant="h6" className="empty-drawer-text">
          {noNotificationsGeneric}
        </Typography>
      )}
    </StyledNotificationsDrawer>
  );
};

const mapStateToProps = (state) => ({
  notificationsList: state.notifications.notfications_list,
  currentUserId: state.userManager.id,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsDrawer);
