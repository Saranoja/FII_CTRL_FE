import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { removeNotification } from 'modules/notifications/actions';
import {
  NOTIFICATION_TYPES,
  eventToMessageMap,
  noNotificationsGeneric,
} from 'modules/notifications/constants';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StyledNotificationsDrawer from './NotificationsDrawer.style';

const DismissButton = ({ dismissAction }) => (
  <Button color="inherit" size="small" disableElevation onClick={dismissAction}>
    Dismiss
  </Button>
);

const NotificationsDrawer = ({
  isOpen,
  onClose,
  notificationsList,
  currentUserId,
  actions,
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
          const genericMessagePack = eventToMessageMap[notification.event];
          const notificationSelfMessage =
            notification.type === NOTIFICATION_TYPES.error
              ? genericMessagePack.error
              : genericMessagePack.success;
          const notificationPlaceholder = isSelfAuthor
            ? notificationSelfMessage
            : `${notification.author} ${genericMessagePack.info}`;

          if (notification.type === NOTIFICATION_TYPES.error && !isSelfAuthor)
            return null;

          return (
            <div
              key={`${notification.event}${notification.type}${notification.timestamp}}`}
            >
              <Alert
                severity={isSelfAuthor ? notification.type : 'info'}
                action={
                  <DismissButton
                    dismissAction={() =>
                      actions.removeNotification(notification)
                    }
                  />
                }
                className="snackbar-notification-content"
              >
                {`${notificationPlaceholder} ${notification.group}`}
              </Alert>
            </div>
          );
        }, R.reverse(notificationsList))
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
  actions: bindActionCreators(
    {
      removeNotification,
    },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsDrawer);
