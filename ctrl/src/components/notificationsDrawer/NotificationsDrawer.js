import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as R from 'ramda';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import StyledNotificationsDrawer from './NotificationsDrawer.style';

const action = (
  <Button color="secondary" size="small">
    Dismiss
  </Button>
);

const NotificationsDrawer = ({ isOpen, onClose, notificationsList }) => {
  return (
    <StyledNotificationsDrawer>
      <Drawer anchor="right" open={isOpen} onClose={onClose}>
        <Box minWidth="200px">
          {notificationsList.length ? (
            R.map(
              (notification) => (
                <div
                  key={`${notification.title}${notification.text}${notification.author}}`}
                >
                  <SnackbarContent
                    message={`${notification.author} posted a new announcement in ${notification.group}`}
                    action={action}
                  />
                </div>
              ),
              notificationsList
            )
          ) : (
            <p> No new notifications </p> // TODO: style this
          )}
        </Box>
      </Drawer>
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
