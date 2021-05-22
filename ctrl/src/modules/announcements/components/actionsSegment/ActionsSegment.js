import React, { useState } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withAuthor } from 'hocs';
import {
  patchAnnouncement,
  deleteAnnouncement,
} from 'modules/announcements/actions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { localStorageManager, STORE_KEYS } from 'utils';
import EditAnnouncementDialog from './EditAnnouncementDialog';
import DeleteAnnouncementDialog from './DeleteAnnouncementDialog';
import StyledActionsSegment from './ActionsSegment.style';

const ActionsSegment = ({
  announcementId,
  announcementText,
  announcementTitle,
  actions,
}) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const getCurrentGroup = () => {
    return localStorageManager.get(STORE_KEYS.LAST_VISITED_GROUP);
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleAnnouncementSaveEdit = (newAnnouncementData) => {
    setEditDialogOpen(false);
    actions.patchAnnouncement(
      getCurrentGroup().id,
      announcementId,
      newAnnouncementData
    );
  };

  const handleAnnouncementDeletion = () => {
    setDeleteDialogOpen(false);
    actions.deleteAnnouncement(getCurrentGroup().id, announcementId);
  };

  return (
    <StyledActionsSegment>
      <Tooltip title="Edit">
        <IconButton
          size="small"
          className="edit-announcement-button"
          onClick={handleEditClick}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          size="small"
          className="remove-announcement-button"
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <EditAnnouncementDialog
        announcementText={announcementText}
        announcementTitle={announcementTitle}
        isOpen={isEditDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        handleSave={handleAnnouncementSaveEdit}
      />
      <DeleteAnnouncementDialog
        isOpen={isDeleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        handleDelete={handleAnnouncementDeletion}
      />
    </StyledActionsSegment>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      patchAnnouncement,
      deleteAnnouncement,
    },
    dispatch
  ),
});

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthor
)(ActionsSegment);
