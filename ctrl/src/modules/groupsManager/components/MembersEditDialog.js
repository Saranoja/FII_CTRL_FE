import React, { useState } from 'react';
import * as R from 'ramda';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { CircularProgress } from '@material-ui/core';

const MembersEditDialog = ({
  isOpen,
  handleClose,
  handleDelete,
  handleAdd,
  currentMembers,
  studentsList,
  teachersList,
  isLoading,
}) => {
  const initialWannabeMembers = R.filter(
    (element) =>
      !R.includes(
        element.id,
        R.map((member) => member.id, currentMembers)
      ),
    R.union(studentsList, teachersList)
  );

  const [members, setMembers] = useState([]);
  const [usedMembers, setUsedMembers] = useState([]);

  const handleDialogClose = () => {
    handleClose();
    setMembers([]);
    setUsedMembers([]);
  };

  const handleSave = async () => {
    const deletingIds = R.map((user) => user.id, usedMembers);
    const addingIds = R.map((user) => user.id, members);

    await handleAdd({
      id: addingIds,
    });

    await handleDelete({
      id: deletingIds,
    });

    handleDialogClose();
  };

  const availableMembers = R.map(
    (option) => ({
      key: option.id,
      category: option.year ? `${option.year}${option.group}` : 'Teachers',
      ...option,
    }),
    initialWannabeMembers
  );

  const alreadyMembers = R.map(
    (option) => ({
      key: option.id,
      category: option.year ? `${option.year}${option.group}` : 'Teachers',
      ...option,
    }),
    currentMembers
  );

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">
        Change this group's members
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <DialogContentText id="dialog-description">
              Select users you want to remove...
            </DialogContentText>
            <Autocomplete
              value={usedMembers}
              onChange={(event, newMembers) => {
                setUsedMembers(newMembers);
              }}
              getOptionSelected={(option, value) => option.id === value.id}
              multiple
              disableCloseOnSelect
              filterSelectedOptions
              id="grouped-students-added"
              options={alreadyMembers.sort(
                (a, b) => -b.category.localeCompare(a.category)
              )}
              groupBy={(option) => option.category}
              getOptionLabel={(option) =>
                `${option.last_name} ${option.first_name}`
              }
              renderInput={(params) => (
                <TextField {...params} label="People" variant="outlined" />
              )}
              renderOption={(option) =>
                `${option.last_name} ${option.first_name}`
              }
              fullWidth
              style={{ marginBottom: '16px' }}
            />

            <DialogContentText id="dialog-description-secondary">
              ...or type in users you want to add!
            </DialogContentText>
            <Autocomplete
              value={members}
              onChange={(event, newMembers) => {
                setMembers(newMembers);
              }}
              getOptionSelected={(option, value) => option.id === value.id}
              multiple
              disableCloseOnSelect
              filterSelectedOptions
              id="grouped-students-unadded"
              options={availableMembers.sort(
                (a, b) => -b.category.localeCompare(a.category)
              )}
              groupBy={(option) => option.category}
              getOptionLabel={(option) =>
                `${option.last_name} ${option.first_name}`
              }
              renderInput={(params) => (
                <TextField {...params} label="People" variant="outlined" />
              )}
              renderOption={(option) =>
                `${option.last_name} ${option.first_name}`
              }
              fullWidth
              style={{ marginBottom: '16px' }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MembersEditDialog;
