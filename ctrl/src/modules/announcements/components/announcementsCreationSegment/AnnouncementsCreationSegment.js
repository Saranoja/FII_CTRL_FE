import React, { useState } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTeacher } from 'hocs';
import { localStorageManager, STORE_KEYS } from 'utils';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateIcon from '@material-ui/icons/Create';
import { postAnnouncement } from 'modules/announcements/actions';
import StyledAnnouncementsCreationSegment from './AnnouncementsCreationSegment.style';

const AnnouncementsCreationSegment = ({ actions }) => {
  const [isDialogOpen, setOpen] = useState(false);
  const [titleValue, setTitleValue] = useState('');
  const [textValue, setTextValue] = useState('');

  const getLastVisitedGroup = () => {
    return localStorageManager.get(STORE_KEYS.LAST_VISITED_GROUP);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTitleValue('');
    setTextValue('');
    setOpen(false);
  };

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handlePostClick = async () => {
    const announcementPayload = {
      title: titleValue,
      text: textValue,
    };
    const currentGroupId = getLastVisitedGroup().id;
    await actions.postAnnouncement(currentGroupId, announcementPayload);
    setTitleValue('');
    setTextValue('');
    setOpen(false);
  };

  return (
    <StyledAnnouncementsCreationSegment>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClickOpen}
        size="small"
        startIcon={<CreateIcon />}
      >
        Add announcement
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add a new announcement to this group
        </DialogTitle>
        <DialogContent>
          <TextField
            color="secondary"
            autoFocus
            variant="outlined"
            id="name"
            label="Title"
            type="text"
            value={titleValue}
            onChange={handleTitleChange}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <TextField
            color="secondary"
            variant="outlined"
            id="standard-multiline-static"
            multiline
            rows={3}
            label="Text"
            type="text"
            value={textValue}
            onChange={handleTextChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePostClick} color="secondary">
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </StyledAnnouncementsCreationSegment>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.announcements.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      postAnnouncement,
    },
    dispatch
  ),
});

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTeacher
)(AnnouncementsCreationSegment);
