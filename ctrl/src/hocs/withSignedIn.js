import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

const withSignedIn = (ChildComponent) => {
  class SignInWrapper extends PureComponent {
    render() {
      const { isSignedIn } = this.props;
      return isSignedIn ? <ChildComponent {...this.props} /> : null;
    }
  }

  const mapStateToProps = (state) => ({
    isSignedIn: state.userManager.hasId,
  });

  return connect(mapStateToProps)(SignInWrapper);
};

export default withSignedIn;
