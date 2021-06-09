import React from 'react';
import { Typography, Link, Chip } from '@material-ui/core';
import ActionsSegment from 'modules/meetings/components/actionsSegment';
import { recurrenceToTimeMap } from 'modules/meetings/constants';
import StyledMeetingSegment from './MeetingDetailsSegment.style';

const MeetingDetailsSegment = ({
  id,
  title,
  url,
  groupName,
  isRecurrent,
  recurrenceInterval,
  timestamp,
  isJoiningPermitted,
  nextOccurrence,
  author,
  authorId,
}) => {
  return (
    <StyledMeetingSegment>
      <div className="meeting-container">
        <div className="meeting-header-wrapper">
          <Typography color="secondary" variant="overline">
            {nextOccurrence}
          </Typography>
          <div className="info-wrapper">
            <Chip label={groupName} color="default" size="small" />
            <ActionsSegment
              authorId={authorId}
              meetingId={id}
              meetingTitle={title}
              meetingUrl={url}
              timestamp={timestamp}
              recurrenceInterval={recurrenceInterval}
              isRecurrent={isRecurrent}
            />
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
              ? `Recurrent, ${recurrenceToTimeMap[recurrenceInterval]}`
              : null}
          </Typography>
        </div>
      </div>
    </StyledMeetingSegment>
  );
};

export default MeetingDetailsSegment;
