import React from 'react';
import { Button, Typography, Chip } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import StyledAssignmentSegment from './AssignmentSegment.style';
import { openLinkInNewTab } from 'utils';
import ActionsSegment from '../actionsSegment';

const AssignmentSegment = ({
  assignmentId,
  title,
  description,
  author,
  authorId,
  createdAt,
  deadline,
  fileUrl,
  groupName,
  groupId,
}) => {
  return (
    <StyledAssignmentSegment>
      <div className="assignment-container">
        <div className="assignment-header-wrapper">
          <Typography color="primary" variant="overline">
            {author}
          </Typography>
          <div className="info-wrapper">
            <Chip label={groupName} color="default" size="small" />
            <ActionsSegment
              authorId={authorId}
              assignmentId={assignmentId}
              assignmentText={description}
              assignmentTitle={title}
              assignmentFileUrl={fileUrl}
              deadline={deadline}
            />
          </div>
        </div>
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
            className="attachment-button"
          >
            Open attached file
          </Button>
        ) : null}
        <Typography variant="button" color="textPrimary" component="div">
          Deadline: {deadline}
        </Typography>
        <Typography variant="overline" color="textSecondary">
          {createdAt}
        </Typography>
      </div>
    </StyledAssignmentSegment>
  );
};

export default AssignmentSegment;
