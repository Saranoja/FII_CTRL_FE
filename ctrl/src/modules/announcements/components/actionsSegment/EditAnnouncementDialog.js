import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const EditAnnouncementDialog = ({
  announcementText,
  announcementTitle,
  isOpen,
  handleClose,
  handleSave,
}) => {
  const [titleValue, setTitleValue] = useState(announcementTitle);
  const [textValue, setTextValue] = useState(announcementText);

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleDialogClose = () => {
    handleClose();
    setTitleValue(announcementTitle);
    setTextValue(announcementText);
  };

  const handleDialogSave = () => {
    handleSave({
      title: titleValue,
      text: textValue,
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit your announcement</DialogTitle>
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
        <Button onClick={handleDialogClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleDialogSave} color="secondary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAnnouncementDialog;
