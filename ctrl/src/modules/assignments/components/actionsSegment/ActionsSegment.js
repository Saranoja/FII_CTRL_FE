import React, { useState } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withAuthor } from 'hocs';
import { patchAssignment, deleteAssignment } from 'modules/assignments/actions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditAssignmentDialog from './EditAssignmentDialog';
import DeleteAssignmentDialog from './DeleteAssignmentDialog';
import StyledActionsSegment from './ActionsSegment.style';

const ActionsSegment = ({
  groupId,
  authorId,
  assignmentId,
  assignmentText,
  assignmentTitle,
  assignmentFileUrl,
  deadline,
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

  const handleAssignmentSaveEdit = (newAssignmentData) => {
    setEditDialogOpen(false);
    actions.patchAssignment(groupId, assignmentId, newAssignmentData);
  };

  const handleAssignmentDeletion = () => {
    setDeleteDialogOpen(false);
    actions.deleteAssignment(groupId, assignmentId);
  };

  return (
    <StyledActionsSegment>
      <Tooltip title="Edit">
        <IconButton
          size="small"
          className="edit-assignment-button"
          onClick={handleEditClick}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          size="small"
          className="remove-assignment-button"
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <EditAssignmentDialog
        assignmentText={assignmentText}
        assignmentTitle={assignmentTitle}
        assignmentDeadline={deadline}
        assignmentFileUrl={assignmentFileUrl}
        isOpen={isEditDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        handleSave={handleAssignmentSaveEdit}
      />
      <DeleteAssignmentDialog
        isOpen={isDeleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        handleDelete={handleAssignmentDeletion}
      />
    </StyledActionsSegment>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      patchAssignment,
      deleteAssignment,
    },
    dispatch
  ),
});

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthor
)(ActionsSegment);
