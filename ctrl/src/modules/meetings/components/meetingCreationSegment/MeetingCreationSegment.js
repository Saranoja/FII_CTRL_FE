import React, { useState } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTeacher } from 'hocs';
import { postMeeting } from 'modules/meetings/actions';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CreateIcon from '@material-ui/icons/Create';

const MeetingCreationSegment = ({ actions, groups }) => {
  const [isDialogOpen, setOpen] = useState(false);

  const initialMeetingState = {
    title: '',
    url: '',
    isRecurrent: false,
    recurrenceInterval: '1 day',
    group: groups[0] || null,
    timestamp: new Date(),
  };

  const dropdownOptions = [
    {
      key: 1,
      value: '1 day',
      text: 'Daily',
    },
    {
      key: 7,
      value: '1 week',
      text: 'Weekly',
    },
    {
      key: 14,
      value: '2 weeks',
      text: 'Every 2 weeks',
    },
    {
      key: 30,
      value: '1 month',
      text: 'Monthly',
    },
  ];

  const [meetingState, setMeetingState] = useState(initialMeetingState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMeetingState(initialMeetingState);
  };

  const handleTextFieldChange = (e, field) => {
    setMeetingState({
      ...meetingState,
      [field]: e.target.value,
    });
  };

  const handleCheckboxChange = (event) => {
    setMeetingState({
      ...meetingState,
      [event.target.name]: event.target.checked,
    });
  };

  const handlePostClick = async () => {
    const payload = {
      group_id: meetingState.group.id,
      recurrence_interval: meetingState.isRecurrent
        ? meetingState.recurrenceInterval
        : null,
      recurrent: meetingState.isRecurrent,
      title: meetingState.title,
      url: meetingState.url,
      timestamp: meetingState.timestamp,
    };

    await actions.postMeeting(payload);
    handleClose();
  };

  const checkSubmit = () => {
    if (meetingState.title === '' || meetingState.url === '') return true;
    return false;
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClickOpen}
        size="small"
        startIcon={<CreateIcon />}
        style={{ marginBottom: '16px' }}
      >
        Create a new meeting
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="meeting-creation-dialog"
        fullWidth
      >
        <DialogTitle id="fmeeting-creation-title">
          Create a new meeting for a group.
        </DialogTitle>
        <DialogContent>
          <TextField
            color="secondary"
            autoFocus
            variant="outlined"
            id="title"
            label="Title of the meeting"
            type="text"
            value={meetingState.title}
            onChange={(e) => handleTextFieldChange(e, 'title')}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <TextField
            color="secondary"
            variant="outlined"
            id="url"
            label="URL"
            type="text"
            value={meetingState.url}
            onChange={(e) => handleTextFieldChange(e, 'url')}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={meetingState.isRecurrent}
                onChange={handleCheckboxChange}
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
              onChange={(e) => handleTextFieldChange(e, 'recurrenceInterval')}
              value={meetingState.recurrenceInterval}
              disabled={!meetingState.isRecurrent}
              label="Interval"
            >
              {R.map(
                (element) => (
                  <MenuItem key={element.key} value={element.value}>
                    {element.text}
                  </MenuItem>
                ),
                dropdownOptions
              )}
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              autoOk
              label="Date and time"
              variant="inline"
              inputVariant="outlined"
              value={meetingState.timestamp}
              onChange={(date) =>
                setMeetingState({ ...meetingState, timestamp: date })
              }
              format="dd/MM/yyyy hh:mm a"
              disablePast
              style={{ marginBottom: '16px' }}
              color="secondary"
            />
          </MuiPickersUtilsProvider>
          <Autocomplete
            value={meetingState.group}
            onChange={(event, newGroups) => {
              setMeetingState({ ...meetingState, group: newGroups });
            }}
            id="all-groups"
            options={groups}
            getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option?.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Group"
                variant="outlined"
                color="secondary"
              />
            )}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handlePostClick}
            color="secondary"
            disabled={checkSubmit()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.announcements.isLoading,
  groups: state.announcements.groups,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      postMeeting,
    },
    dispatch
  ),
});

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTeacher
)(MeetingCreationSegment);
