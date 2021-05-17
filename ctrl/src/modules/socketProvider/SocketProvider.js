import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { SocketContext } from './hepers';
import { registerListener, unregisterListener } from 'config/registerListener';
import io from 'socket.io-client';
import userManager from 'modules/userManager';
import { isBlank } from 'utils';
import { withSignedIn } from 'hocs';

const MAX_RETRY_CONNECTIONS = 3;
const CONNECTION_RETRY_INTERVAL = 3000;
const ENDPOINT = 'http://localhost:5000';
const TOKEN_REFRESH_SUCCESS = 'tokenRefreshSuccess';
const TOKEN_REFRESH_ERROR = 'tokenRefreshError';

class SocketProvider extends Component {
  constructor(props) {
    super(props);

    this.retryCounter = 0;
    this.shouldReconnect = true;
    this.state = {
      socket: null,
    };
  }

  componentDidMount() {
    registerListener(TOKEN_REFRESH_SUCCESS, this.connectSocket);
    registerListener(TOKEN_REFRESH_ERROR, this.disconnectSocket);
    const token = userManager.getIdToken();
    if (token) {
      this.connectSocket();
    }
  }

  componentWillUnmount() {
    unregisterListener(TOKEN_REFRESH_SUCCESS);
    unregisterListener(TOKEN_REFRESH_ERROR);
    this.disconnectSocket(false);
  }

  connectSocket = () => {
    const internalSocket = this.state.socket;
    if (internalSocket) return;

    const socket = io(ENDPOINT);

    if (isBlank(socket)) return;

    console.log('Socket connection opened');

    this.retryCounter = 0;
    this.shouldReconnect = true;
    this.setState({ socket });

    socket.on('message', (message) => {
      console.log('New message received: ', message);
    });

    socket.on('close', () => {
      console.log('Socket connection closed');
      if (this.shouldReconnect) {
        this.reconnectSocket();
      }
    });
  };

  disconnectSocket = (shouldReconnect = true) => {
    const { socket } = this.state;
    this.shouldReconnect = shouldReconnect;
    if (!isBlank(socket)) socket.disconnect();
  };

  reconnectSocket = () => {
    if (this.retryCounter < MAX_RETRY_CONNECTIONS) {
      console.log('Socket connection re-established');
      setTimeout(() => {
        this.retryCounter += 1;
        this.connectSocket();
      }, CONNECTION_RETRY_INTERVAL);
    } else {
      console.log(`Finished retrying ${MAX_RETRY_CONNECTIONS} times, stopping`);
    }
  };

  render() {
    const { children } = this.props;
    const { socket } = this.state;
    return (
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    );
  }
}

const mapStateToProps = (state) => ({
  isSignedIn: state.userManager.hasId,
});

export default R.compose(
  connect(mapStateToProps),
  withSignedIn
)(SocketProvider);
