import React, { useState } from 'react';
import * as R from 'ramda';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { editableFields } from './helpers';

const EditProfileDialog = ({
  secondaryEmail,
  phoneNumber,
  office,
  interests,
  thesis,
  isOpen,
  handleClose,
  handleSave,
}) => {
  const initialData = {
    secondary_email: secondaryEmail,
    phone_number: phoneNumber,
    office_number: office,
    interest_field: interests,
    thesis_examples: thesis,
  };

  const [data, setData] = useState(initialData);

  const handleDataChange = (event, item) => {
    setData({
      ...data,
      [item]: event.target.value,
    });
  };

  const handleDialogClose = () => {
    handleClose();
    setData(initialData);
  };

  const handleDialogSave = () => {
    handleSave(data);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit your profile</DialogTitle>
      <DialogContent>
        {R.map(
          (field) => (
            <TextField
              key={field.id}
              color="secondary"
              variant="outlined"
              label={field.label}
              type="text"
              value={data[field.id]}
              onChange={(event) => handleDataChange(event, field.id)}
              fullWidth
              style={{ marginBottom: '16px' }}
              multiline={field.multiline}
              rows={field.rows}
            />
          ),
          editableFields
        )}
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

export default EditProfileDialog;
