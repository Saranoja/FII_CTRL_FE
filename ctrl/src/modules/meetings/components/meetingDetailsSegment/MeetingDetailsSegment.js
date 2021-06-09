import React from 'react';
import { Typography, Link, Chip } from '@material-ui/core';
// import ActionsSegment from 'modules/meetings/components/actionsSegment';
import StyledMeetingSegment from './MeetingDetailsSegment.style';

const MeetingDetailsSegment = ({
  title,
  url,
  groupName,
  isRecurrent,
  recurrenceInterval,
  timestamp,
  isJoiningPermitted,
  nextOccurrence,
  id,
  author,
  authorId,
}) => {
  const recurrenceToTimeMap = {
    '1 day': 'Daily',
    '7 days': 'Weekly',
    '14 days': 'Every 2 weeks',
    '30 days': 'Monthly',
  };

  return (
    <StyledMeetingSegment>
      <div className="meeting-container">
        <div className="meeting-header-wrapper">
          <Typography color="secondary" variant="overline">
            {nextOccurrence}
          </Typography>
          <div className="info-wrapper">
            <Chip label={groupName} color="default" size="small" />
            {/* <ActionsSegment
              authorId={authorId}
              groupId={groupId}
              assignmentId={assignmentId}
              assignmentText={description}
              assignmentTitle={title}
              assignmentFileUrl={fileUrl}
              deadline={deadline}
            /> */}
          </div>
        </div>
        <Typography variant="subtitle1" className="meeting-title">
          {title}
        </Typography>
        {isJoiningPermitted && (
          <Link href={url} target="_blank">
            Click here to join the meeting
          </Link>
        )}
        <div className="actions-info-wrapper">
          <Typography variant="overline" color="textSecondary">
            {isRecurrent
              ? `Recurrent, ${
                  recurrenceToTimeMap[recurrenceInterval.slice(0, -9)]
                }`
              : null}
          </Typography>
        </div>
      </div>
    </StyledMeetingSegment>
  );
};

export default MeetingDetailsSegment;
