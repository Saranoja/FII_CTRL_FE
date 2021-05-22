import React from 'react';
import { isBlank } from 'utils';
import { SocketContext } from './helpers';

const withSocketProvider = (Component) => {
  return (props) => {
    return (
      <SocketContext.Consumer>
        {(socket) => {
          if (isBlank(socket)) return null;
          if (!socket.connected) return null;
          return <Component {...props} socket={socket} />;
        }}
      </SocketContext.Consumer>
    );
  };
};

export default withSocketProvider;
