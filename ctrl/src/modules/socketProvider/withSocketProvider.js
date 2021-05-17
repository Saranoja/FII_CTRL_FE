import React from 'react';
import { isBlank } from 'utils';
import { SocketContext } from './hepers';

const withSocketProvider = (Component) => {
  return (props) => {
    return (
      <SocketContext.Consumer>
        {(socket) => {
          if (isBlank(socket)) return <p> Socket is blank! </p>;
          if (!socket.connected) return null;
          return <Component {...props} socket={socket} />;
        }}
      </SocketContext.Consumer>
    );
  };
};

export default withSocketProvider;
