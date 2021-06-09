import React, { useState } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uploadFileToBucket } from 'modules/assignments/actions';
import { loadResourcesForFile } from 'modules/resources/actions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import { recurrenceIntervals, intervalsMap } from 'modules/meetings/constants';
import { getResetState } from 'modules/resources/actions';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

const EditMeetingDialog = ({
  meetingTitle,
  meetingTimestamp,
  meetingUrl,
  meetingRecurrence,
  isMeetingRecurrent,
  isOpen,
  handleClose,
  handleSave,
  actions,
}) => {
  const [titleValue, setTitleValue] = useState(meetingTitle);
  const [urlValue, setUrlValue] = useState(meetingUrl);
  const [recurrenceValue, setRecurrenceValue] = useState(
    intervalsMap[meetingRecurrence] || ''
  );
  const [isRecurrent, setRecurrent] = useState(isMeetingRecurrent);
  const [selectedTimsetamp, setSelectedTimestamp] = useState(meetingTimestamp);

  const handleTitleChange = (event) => {
    setTitleValue(event.target.value);
  };

  const handleTextChange = (event) => {
    setUrlValue(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedTimestamp(date);
  };

  const handleDialogClose = () => {
    handleClose();
    setTitleValue(meetingTitle);
    setSelectedTimestamp(meetingTimestamp);
    setRecurrent(isMeetingRecurrent);
    setSelectedTimestamp(meetingTimestamp);
    setRecurrenceValue(intervalsMap[meetingRecurrence] || '');
  };

  const handleDialogSave = async () => {
    const meetingData = {
      title: titleValue,
      url: urlValue,
      recurrent: isRecurrent,
      recurrence_interval: recurrenceValue.length > 0 ? recurrenceValue : null,
      timestamp: selectedTimsetamp,
    };

    handleSave(meetingData);
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Edit meeting details</DialogTitle>
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
          label="Url"
          type="text"
          value={urlValue}
          onChange={handleTextChange}
          fullWidth
          style={{ marginBottom: '16px' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isRecurrent}
              onChange={(e) => setRecurrent(e.target.checked)}
              name="isRecurrent"
              color="secondary"
            />
          }
          label="Meeting is recurrent"
          style={{ marginBottom: '16px' }}
        />
        <FormControl
          variant="outlined"
          color="secondary"
          fullWidth
          style={{ marginBottom: '16px' }}
        >
          <InputLabel id="interval-label">Recurrence Interval</InputLabel>
          <Select
            onChange={(e) => setRecurrenceValue(e.target.value)}
            value={recurrenceValue}
            disabled={!isRecurrent}
            label="Recurrence Interval"
          >
            {R.map(
              (element) => (
                <MenuItem key={element.key} value={element.value}>
                  {element.text}
                </MenuItem>
              ),
              recurrenceIntervals
            )}
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            autoOk
            label="Timestamp"
            variant="inline"
            inputVariant="outlined"
            value={selectedTimsetamp}
            onChange={handleDateChange}
            format="dd/MM/yyyy hh:mm a"
            disablePast
            style={{ marginBottom: '16px' }}
          />
        </MuiPickersUtilsProvider>
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
