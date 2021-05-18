import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StyledNotificationsDrawer from './NotificationsDrawer.style';

const action = (
  <Button color="primary" size="small" disableElevation>
    Dismiss
  </Button>
);

const NotificationsDrawer = ({ isOpen, onClose, notificationsList }) => {
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
        R.map(
          (notification) => (
            <div
              key={`${notification.title}${notification.text}${notification.author}}`}
            >
              <Alert
                severity="info"
                action={action}
                className="snackbar-notification-content"
              >
                {`${notification.author} posted a new announcement in ${notification.group}`}
              </Alert>
            </div>
          ),
          notificationsList
        )
      ) : (
        <Typography variant="h6" className="empty-drawer-text">
          No new notifications
        </Typography>
      )}
    </StyledNotificationsDrawer>
  );
};

const mapStateToProps = (state) => ({
  notificationsList: state.notifications.notfications_list,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({}, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsDrawer);
