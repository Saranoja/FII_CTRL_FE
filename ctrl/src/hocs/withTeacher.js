import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

const withTeacher = (ChildComponent) => {
  class TeacherWrapper extends PureComponent {
    render() {
      const { isTeacher } = this.props;
      return isTeacher ? <ChildComponent {...this.props} /> : null;
    }
  }

  const mapStateToProps = (state) => ({
    isTeacher: state.userManager.teaching,
  });

  return connect(mapStateToProps)(TeacherWrapper);
};

export default withTeacher;
