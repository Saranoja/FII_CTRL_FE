import React from 'react';
import { withAuthor } from 'hocs';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import StyledActionsSegment from './ActionsSegment.style';

const ActionsSegment = ({ postAuthorId }) => {
  return (
    <StyledActionsSegment>
      <IconButton size="small" className="edit-announcement-button">
        <EditIcon />
      </IconButton>
      <IconButton size="small" className="remove-announcement-button">
        <DeleteIcon />
      </IconButton>
    </StyledActionsSegment>
  );
};

export default withAuthor(ActionsSegment);
