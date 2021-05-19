import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

const withAuthor = (ChildComponent) => {
  class AuthorWrapper extends PureComponent {
    render() {
      const { currentUserId, announcementAuthorId } = this.props;
      const isAuthor = announcementAuthorId === currentUserId;
      return isAuthor ? <ChildComponent {...this.props} /> : null;
    }
  }

  const mapStateToProps = (state) => ({
    currentUserId: state.userManager.id,
  });

  return connect(mapStateToProps)(AuthorWrapper);
};

export default withAuthor;
