import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout } from 'components';
import { loadGroups } from './actions';
import StyledAnnouncements from './Announcements.style';
import { Button } from '@material-ui/core';

const Announcements = ({ groups, actions }) => {
  return (
    <Layout isCentered={false}>
      <StyledAnnouncements>
        <p> Announcements page! </p>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => actions.loadGroups()}
        >
          Get groups
        </Button>
      </StyledAnnouncements>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  groups: state.announcements.groups,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadGroups,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);
