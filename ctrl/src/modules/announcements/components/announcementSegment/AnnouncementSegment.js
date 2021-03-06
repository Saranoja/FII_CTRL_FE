import React from 'react';
import { Typography } from '@material-ui/core';
import ActionsSegment from 'modules/announcements/components/actionsSegment';
import StyledAnnouncementSegment from './AnnouncementSegment.style';

const AnnouncementSegment = ({
  announcementId,
  title,
  text,
  author,
  authorId,
  createdAt,
}) => {
  return (
    <StyledAnnouncementSegment>
      <div className="announcement-container">
        <Typography color="secondary" variant="overline">
          {author}
        </Typography>
        <Typography variant="subtitle1" className="announcement-title">
          {title}
        </Typography>
        <Typography variant="body2" className="announcement-subtitle">
          {text}
        </Typography>
        <div className="actions-info-wrapper">
          <Typography variant="overline" color="textSecondary">
            {createdAt}
          </Typography>
          <ActionsSegment
            authorId={authorId}
            announcementId={announcementId}
            announcementText={text}
            announcementTitle={title}
          />
        </div>
      </div>
    </StyledAnnouncementSegment>
  );
};

export default AnnouncementSegment;
