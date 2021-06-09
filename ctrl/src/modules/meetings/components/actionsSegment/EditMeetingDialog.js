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

// TODO: ....

const EditMeetingDialog = ({
  meetingTitle,
  meetingTimestamp,
  meetingUrl,
  meetingRecurrence,
  isOpen,
  handleClose,
  handleSave,
  actions,
}) => {
  const [titleValue, setTitleValue] = useState(meetingTitle);
  const [textValue, setTextValue] = useState(meetingUrl);
  const [selectedDeadline, setSelectedDeadline] = useState(meetingTimestamp);
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
    actions.getResetState();
  };

  const handleDialogClose = () => {
    handleClose();
    setTitleValue(meetingTitle);
    setSelectedDeadline(meetingTimestamp);
    actions.getResetState();
  };

  const handleDialogSave = async () => {};

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
        {/* <FilePicker
          onFileUploadSuccess={(file) => {
            actions.loadResourcesForFile(file);
            setWasFileUploaded(true);
          }}
          availableExtensions={null}
          uploadMessage={uploadedFileName}
          handleFileRemove={handleFileRemove}
        /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditMeetingDialog);
