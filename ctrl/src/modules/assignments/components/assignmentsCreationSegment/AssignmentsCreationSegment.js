import 'date-fns';
import React, { useState } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTeacher } from 'hocs';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import CreateIcon from '@material-ui/icons/Create';
import { FilePicker } from 'components';
import {
  postAssignment,
  uploadFileToBucket,
} from 'modules/assignments/actions';
import { loadResourcesForFile } from 'modules/resources/actions';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { assignmentFormData } from './helpers';
import StyledAssignmentsCreationSegment, {
  StyledInput,
  StyledFormControl,
  StyledSelect,
} from './AssignmentsCreationSegment.style';

const AssignmentsCreationSegment = ({
  actions,
  groups,
  current_file,
  availableSubjects,
  subjects,
}) => {
  const initialState = {
    isDialogOpen: false,
    title: '',
    description: '',
    subject: '',
    deadline: null,
  };
  const [state, setState] = useState(initialState);
  const [checkedGroups, setCheckedGroups] = useState([]);
  const [selectedDeadline, setSelectedDeadline] = useState(new Date());
  const [wasFileUploaded, setWasFileUploaded] = useState(false);

  const handleClickOpen = () => {
    setState({
      ...state,
      isDialogOpen: true,
    });
    setWasFileUploaded(false);
  };

  const checkSubmit = () => {
    if (state.title === '' || state.description === '' || state.subject === '')
      return true;
    if (checkedGroups.length === 0) return true;
    return false;
  };

  const handleClose = () => {
    setState(initialState);
    setCheckedGroups([]);
    setWasFileUploaded(false);
  };

  const handleFieldChange = (event, fieldId) => {
    setState({
      ...state,
      [fieldId]: event.target.value,
    });
  };

  const handleDateChange = (date) => {
    setSelectedDeadline(date);
  };

  const handlePostClick = async () => {
    const announcementPayload = {
      description: state.description,
      title: state.title,
      deadline: selectedDeadline,
      subject_id: subjects[state.subject],
    };

    let allGroups = [];

    R.forEach(
      (group) => allGroups.push(R.find(R.propEq('name', group))(groups).id),
      checkedGroups
    );

    let fileUrl = null;

    if (wasFileUploaded)
      fileUrl = R.path(
        ['payload', 'data'],
        await actions.uploadFileToBucket(current_file)
      );

    R.forEach(
      async (group) =>
        await actions.postAssignment(group, {
          ...announcementPayload,
          file_url: fileUrl?.public_url ?? null,
        }),
      allGroups
    );

    //TODO: subscribe to notification in order to refresh announcements
  };

  return (
    <StyledAssignmentsCreationSegment>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        size="small"
        startIcon={<CreateIcon />}
      >
        Add assignment
      </Button>
      <Dialog
        open={state.isDialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add a new assignment to one or more of your groups
        </DialogTitle>
        <DialogContent>
          {R.map(
            (field) => (
              <TextField
                color="primary"
                autoFocus={field.autofocus}
                variant="outlined"
                id={field.id}
                key={field.id}
                label={field.label}
                type="text"
                value={state[field.id]}
                onChange={(event) => handleFieldChange(event, field.id)}
                fullWidth
                style={{ marginBottom: '16px' }}
              />
            ),
            assignmentFormData
          )}
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: '16px' }}
          >
            <InputLabel id="outlined-label">Subject</InputLabel>
            <Select
              value={state.subject}
              onChange={(event) => handleFieldChange(event, 'subject')}
              label="Subject"
            >
              {R.map(
                (subject) => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ),
                availableSubjects
              )}
            </Select>
          </FormControl>
          <StyledFormControl
            fullWidth
            variant="outlined"
            classes={{
              root: 'input-form-control-root',
            }}
          >
            <InputLabel id="select-outlined">Groups</InputLabel>
            <StyledSelect
              label="Groups"
              multiple
              value={checkedGroups}
              onChange={(event) => setCheckedGroups(event.target.value)}
              input={
                <StyledInput
                  classes={{
                    formControl: 'input-form-control',
                  }}
                  disableUnderline
                />
              }
              renderValue={(selected) => selected.join(', ')}
              classes={{
                select: 'input-select',
              }}
            >
              {R.map(
                (group) => (
                  <MenuItem key={group.name} value={group.name}>
                    <Checkbox
                      checked={R.includes(group.name, checkedGroups)}
                      color="primary"
                    />
                    <ListItemText primary={group.name} />
                  </MenuItem>
                ),
                groups
              )}
            </StyledSelect>
          </StyledFormControl>
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
          <FilePicker
            onFileUploadSuccess={(file) => {
              actions.loadResourcesForFile(file);
              setWasFileUploaded(true);
            }}
            availableExtensions={[
              'pdf',
              'docx',
              'doc',
              'ppt',
              'pptx',
              'jpeg',
              'png',
              'jpg',
              'txt',
            ]}
            uploadMessage="Upload a resource"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handlePostClick}
            color="primary"
            disabled={checkSubmit()}
          >
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </StyledAssignmentsCreationSegment>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.announcements.isLoading,
  groups: state.announcements.groups,
  current_file: state.resources.current_file,
  subjects: state.assignments.subjects,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      postAssignment,
      loadResourcesForFile,
      uploadFileToBucket,
    },
    dispatch
  ),
});

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTeacher
)(AssignmentsCreationSegment);
