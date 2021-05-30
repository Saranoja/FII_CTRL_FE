import React, { useState } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uploadFileToBucket } from 'modules/assignments/actions';
import { loadResourcesForFile } from 'modules/resources/actions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import { FilePicker } from 'components';
import { getResetState } from 'modules/resources/actions';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

const EditAssignmentDialog = ({
  assignmentText,
  assignmentTitle,
  assignmentDeadline,
  assignmentFileUrl,
  isOpen,
  handleClose,
  handleSave,
  current_file,
  actions,
}) => {
  const [titleValue, setTitleValue] = useState(assignmentTitle);
  const [textValue, setTextValue] = useState(assignmentText);
  const [uploadedFileName, setUploadedFileName] = useState(assignmentFileUrl);
  const [selectedDeadline, setSelectedDeadline] = useState(assignmentDeadline);
  const [wasFileUploaded, setWasFileUploaded] = useState(false);

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDeadline(date);
  };

  const handleFileRemove = (event) => {
    setWasFileUploaded(false);
    setUploadedFileName('');
    actions.getResetState();
  };

  const handleDialogClose = () => {
    handleClose();
    setTitleValue(assignmentTitle);
    setTextValue(assignmentText);
    setSelectedDeadline(assignmentDeadline);
    setUploadedFileName(assignmentFileUrl);
    actions.getResetState();
  };

  const handleDialogSave = async () => {
    let fileUrl = null;

    if (wasFileUploaded)
      fileUrl = R.path(
        ['payload', 'data'],
        await actions.uploadFileToBucket(current_file)
      );

    await handleSave({
      title: titleValue,
      description: textValue,
      deadline: assignmentDeadline,
      file_url: fileUrl?.public_url ?? null,
    });

    actions.getResetState();
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
          style={{ marginBottom: '16px' }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            autoOk
            label="Deadline"
            variant="inline"
            inputVariant="outlined"
            value={selectedDeadline}
            onChange={handleDateChange}
            format="dd/MM/yyyy hh:mm a"
            disablePast
            style={{ marginBottom: '16px' }}
          />
        </MuiPickersUtilsProvider>
        <div className="file-manager-wrapper" style={{ display: 'flex' }}>
          <FilePicker
            onFileUploadSuccess={(file) => {
              actions.loadResourcesForFile(file);
              setWasFileUploaded(true);
            }}
            availableExtensions={null}
            uploadMessage={uploadedFileName}
            handleFileRemove={handleFileRemove}
          />
        </div>
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

const mapStateToProps = (state) => ({
  current_file: state.resources.current_file,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadResourcesForFile,
      uploadFileToBucket,
      getResetState,
    },
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAssignmentDialog);
