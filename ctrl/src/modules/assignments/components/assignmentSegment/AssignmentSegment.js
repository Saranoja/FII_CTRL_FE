import React from 'react';
import { Button, Link, Typography } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import StyledAssignmentSegment from './AssignmentSegment.style';
import { openLinkInNewTab } from 'utils';

const AssignmentSegment = ({
  assignmentId,
  title,
  description,
  author,
  authorId,
  createdAt,
  deadline,
  fileUrl,
}) => {
  return (
    <StyledAssignmentSegment>
      <div className="assignment-container">
        <Typography color="primary" variant="overline">
          {author}
        </Typography>
        <Typography variant="subtitle1" className="assignment-title">
          {title}
        </Typography>
        <Typography variant="body2" className="assignment-subtitle">
          {description}
        </Typography>
        {fileUrl ? (
          <Button
            size="small"
            color="primary"
            variant="outlined"
            startIcon={<AttachFileIcon />}
            onClick={() => openLinkInNewTab(fileUrl)}
          >
            Open attached file
          </Button>
        ) : null}
        <Typography variant="button" color="textPrimary" component="div">
          Deadline: {deadline}
        </Typography>
        <Typography variant="overline" color="textSecondary">
          Created at: {createdAt}
        </Typography>
      </div>
    </StyledAssignmentSegment>
  );
};

export default AssignmentSegment;
