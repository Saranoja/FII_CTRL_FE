import React, { useEffect } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LinearProgress, Typography } from '@material-ui/core';
import { Layout } from 'components';
import {
  getMeetings,
  postMeeting,
  deleteMeeting,
  patchMeeting,
} from './actions';
import MeetingCreationSegment from './components/meetingCreationSegment';
import StyledMeetings from './Meetings.style';
import MeetingDetailsSegment from './components/meetingDetailsSegment';

const Meetings = ({ actions, currentMeetings, isLoading, groups }) => {
  useEffect(() => {
    const retrieveMeetings = async () => {
      await actions.getMeetings();
    };
    retrieveMeetings();
  }, [actions]);

  return (
    <Layout>
      <StyledMeetings>
        <div className="header-wrapper">
          <Typography variant="h5">Upcoming meetings</Typography>
        </div>
        <MeetingCreationSegment />
        {isLoading ? <LinearProgress color="secondary" /> : null}
        <div className="meetings-wrapper">
          {currentMeetings.length > 0
            ? R.map(
                (meeting) => (
                  <MeetingDetailsSegment
                    title={meeting.title}
                    url={meeting.url}
                    isRecurrent={meeting.recurrent}
                    recurrenceInterval={meeting.recurrence_interval}
                    timestamp={meeting.next_occurrence}
                    groupName={
                      R.find(R.propEq('id', meeting.group_id))(groups)?.name
                    }
                    key={meeting.id}
                    id={meeting.id}
                    authorId={meeting.author_id}
                    author={meeting.author}
                    isJoiningPermitted={meeting.is_joining_permitted}
                    nextOccurrence={meeting.next_occurrence}
                  />
                ),
                currentMeetings
              )
            : null}
        </div>
      </StyledMeetings>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.meetings.isLoading,
  currentMeetings: state.meetings.currentMeetings,
  groups: state.announcements.groups,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getMeetings,
      postMeeting,
      deleteMeeting,
      patchMeeting,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meetings);
