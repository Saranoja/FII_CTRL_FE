import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { SocketContext } from './helpers';
import { registerListener, unregisterListener } from 'config/registerListener';
import io from 'socket.io-client';
import userManager from 'modules/userManager';
import { isBlank } from 'utils';
import { withSignedIn } from 'hocs';

const MAX_RETRY_CONNECTIONS = 3;
const CONNECTION_RETRY_INTERVAL = 3000;
const ENDPOINT = 'http://3.66.198.206:5000';
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

  async componentDidMount() {
    registerListener(TOKEN_REFRESH_SUCCESS, this.connectSocket);
    registerListener(TOKEN_REFRESH_ERROR, this.disconnectSocket);
    const token = userManager.getIdToken();
    if (token) {
      await this.connectSocket();
    }
  }

  componentWillUnmount() {
    unregisterListener(TOKEN_REFRESH_SUCCESS);
    unregisterListener(TOKEN_REFRESH_ERROR);
    this.disconnectSocket(false);
  }

  connectSocket = async () => {
    const internalSocket = this.state.socket;
    if (internalSocket) return;

    const socket = io(ENDPOINT);

    if (isBlank(socket)) return;
    this.retryCounter = 0;
    this.shouldReconnect = true;

    socket.on('connect', () => {
      this.setState({ socket });
    });

    socket.on('message', (message) => {
      console.log('New message received: ', message);
    });

    socket.on('close', () => {
      console.log('Socket connection closed');
      if (this.shouldReconnect) {
        this.reconnectSocket();
      } else this.disconnectSocket();
    });
  };

  disconnectSocket = (shouldReconnect = true) => {
    const { socket } = this.state;
    this.shouldReconnect = shouldReconnect;
    if (!isBlank(socket)) socket.disconnect();
    console.log('Socket disconnected');
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

    if (!this.state.socket) return null;

    return (
      <SocketContext.Provider value={this.state.socket}>
        {children}
      </SocketContext.Provider>
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
