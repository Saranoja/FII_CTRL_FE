import React from 'react';
import { Typography } from '@material-ui/core';
import StyledAnnouncementSegment from './AnnouncementSegment.style';

const AnnouncementSegment = ({ title, text, author, createdAt }) => {
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
        <Typography variant="overline" color="textSecondary">
          {createdAt}
        </Typography>
      </div>
    </StyledAnnouncementSegment>
  );
};

export default AnnouncementSegment;
