import React, { useState } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { FilePicker } from 'components';
import { loadResourcesForFile } from 'modules/resources/actions';
import { uploadAvatarToBucket } from 'modules/groupsManager/actions';
import { getResetState } from 'modules/resources/actions';

const UploadGroupAvatarDialog = ({
  isOpen,
  handleClose,
  handleSubmit,
  actions,
  current_file,
}) => {
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [wasFileUploaded, setWasFileUploaded] = useState(false);

  const handleFileRemove = (event) => {
    setWasFileUploaded(false);
    setUploadedFileName('');
    actions.getResetState();
  };

  const handleDialogClose = () => {
    handleClose();
    setUploadedFileName('');
    actions.getResetState();
  };

  const handleDialogSubmit = async () => {
    let fileUrl = null;

    if (wasFileUploaded)
      fileUrl = R.path(
        ['payload', 'data'],
        await actions.uploadAvatarToBucket(current_file)
      );

    await handleSubmit({
      avatar: fileUrl?.public_url ?? null,
    });

    actions.getResetState();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Change this group's avatar
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Upload a new avatar. Save without uploading to remove the current
          picture.
        </DialogContentText>
        <FilePicker
          onFileUploadSuccess={(file) => {
            actions.loadResourcesForFile(file);
            setWasFileUploaded(true);
          }}
          availableExtensions={['png', 'jpg', 'jpeg']}
          uploadMessage={uploadedFileName}
          handleFileRemove={handleFileRemove}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDialogSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  current_file: state.resources.current_file,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadResourcesForFile,
      uploadAvatarToBucket,
      getResetState,
    },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadGroupAvatarDialog);
