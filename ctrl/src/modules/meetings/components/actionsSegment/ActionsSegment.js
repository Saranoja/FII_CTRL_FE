import React, { useState } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withAuthor } from 'hocs';
import { patchMeeting, deleteMeeting } from 'modules/meetings/actions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditMeetingDialog from './EditMeetingDialog';
import DeleteMeetingDialog from './DeleteMeetingDialog';
import StyledActionsSegment from './ActionsSegment.style';

const ActionsSegment = ({
  authorId,
  meetingId,
  meetingTitle,
  meetingUrl,
  timestamp,
  isRecurrent,
  recurrenceInterval,
  actions,
}) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleMeetingSaveEdit = (newMeetingData) => {
    setEditDialogOpen(false);
    actions.patchMeeting(meetingId, newMeetingData);
  };

  const handleMeetingDeletion = () => {
    setDeleteDialogOpen(false);
    actions.deleteMeeting(meetingId);
  };

  return (
    <StyledActionsSegment>
      <Tooltip title="Edit">
        <IconButton
          size="small"
          className="edit-meeting-button"
          onClick={handleEditClick}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          size="small"
          className="remove-meeting-button"
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <EditMeetingDialog
        meetingTitle={meetingTitle}
        meetingTimestamp={timestamp}
        meetingUrl={meetingUrl}
        isMeetingRecurrent={isRecurrent}
        meetingRecurrence={recurrenceInterval}
        isOpen={isEditDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        handleSave={handleMeetingSaveEdit}
      />
      <DeleteMeetingDialog
        isOpen={isDeleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        handleDelete={handleMeetingDeletion}
      />
    </StyledActionsSegment>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      patchMeeting,
      deleteMeeting,
    },
    dispatch
  ),
});

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthor
)(ActionsSegment);
