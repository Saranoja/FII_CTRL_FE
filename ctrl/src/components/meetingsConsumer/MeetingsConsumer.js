import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadNotification } from 'modules/notifications/actions';
import { getMeetings } from 'modules/meetings/actions';
import { isBlank } from 'utils';
import withSocketProvider from 'modules/socketProvider/withSocketProvider';

class MeetingsConsumer extends React.Component {
  componentDidMount() {
    const { socket, actions } = this.props;
    if (isBlank(socket)) return;

    socket.on('meetings', async (data) => {
      await actions.loadNotification(data);
      await actions.getMeetings();
    });

    socket.on('error_meetings', (data) => {
      actions.loadNotification(data);
    });
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadNotification,
      getMeetings,
    },
    dispatch
  ),
});

export default R.compose(
  connect(null, mapDispatchToProps),
  withSocketProvider
)(MeetingsConsumer);
