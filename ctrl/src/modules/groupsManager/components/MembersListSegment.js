import React from 'react';
import * as R from 'ramda';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { CircularProgress } from '@material-ui/core';

import { StyledMembersList } from './GroupManagementDialog.style';

const MembersListSegment = ({
  membersList,
  isOpen,
  handleClose,
  isLoading,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Group members</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <DialogContentText>
              <StyledMembersList dense disablePadding>
                {R.map(
                  (member) => (
                    <ListItem disableGutters divider>
                      <ListItemText
                        primary={`${member.first_name} ${member.last_name}`}
                      />
                    </ListItem>
                  ),
                  membersList
                )}
              </StyledMembersList>
            </DialogContentText>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MembersListSegment;
