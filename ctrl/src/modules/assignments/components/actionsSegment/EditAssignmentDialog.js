import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const EditAssignmentDialog = ({
  assignmentText,
  assignmentTitle,
  isOpen,
  handleClose,
  handleSave,
}) => {
  const [titleValue, setTitleValue] = useState(assignmentTitle);
  const [textValue, setTextValue] = useState(assignmentText);

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleDialogClose = () => {
    handleClose();
    setTitleValue(assignmentTitle);
    setTextValue(assignmentText);
  };

  const handleDialogSave = () => {
    handleSave({
      title: titleValue,
      description: textValue,
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit your assignment</DialogTitle>
      <DialogContent>
        <TextField
          color="primary"
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
          color="primary"
          variant="outlined"
          id="standard-multiline-static"
          multiline
          rows={3}
          label="Description"
          type="text"
          value={textValue}
          onChange={handleTextChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDialogSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAssignmentDialog;
