import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadNotification } from 'modules/notifications/actions';
import { loadAssignments } from 'modules/assignments/actions';
import { isBlank } from 'utils';
import withSocketProvider from 'modules/socketProvider/withSocketProvider';

class AssignmentsConsumer extends React.Component {
  componentDidMount() {
    const { socket, actions } = this.props;
    if (isBlank(socket)) return;

    socket.on('assignment', async (data) => {
      await actions.loadNotification(data);
      await actions.loadAssignments();
    });

    socket.on('error_assignment', (data) => {
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
      loadAssignments,
    },
    dispatch
  ),
});

export default R.compose(
  connect(null, mapDispatchToProps),
  withSocketProvider
)(AssignmentsConsumer);
