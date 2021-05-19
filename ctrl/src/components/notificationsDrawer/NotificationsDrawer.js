import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  NOTIFICATION_TYPES,
  eventToMessageMap,
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
          const notificationEventTrigger = notification.event;
          const genericMessagePack =
            eventToMessageMap[notificationEventTrigger];
          const notificationType = notification.type;
          const notificationSelfMessage =
            notificationType === NOTIFICATION_TYPES.error
              ? genericMessagePack.error
              : genericMessagePack.success;
          const notificationPlaceholder = isSelfAuthor
            ? notificationSelfMessage
            : `${notification.author} ${genericMessagePack.info}`;
          if (notificationType === NOTIFICATION_TYPES.error && !isSelfAuthor)
            return null;
          return (
            <div
              key={`${notification.event}${notification.type}${notification.timestamp}}`}
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
