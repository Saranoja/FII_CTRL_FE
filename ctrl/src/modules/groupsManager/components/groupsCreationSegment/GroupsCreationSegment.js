import React, { useState, useEffect } from 'react';
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
import CreateIcon from '@material-ui/icons/Create';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { loadStudents, loadTeachers } from 'modules/usersService/actions';
import { postGroup } from 'modules/groupsManager/actions';
import StyledGroupsCreationSegment from './GroupsCreationSegment.style';

const GroupsCreationSegment = ({
  actions,
  studentsList,
  teachersList,
  currentUserId,
}) => {
  useEffect(() => {
    const retrieveData = async () => {
      await actions.loadStudents();
      await actions.loadTeachers();
    };
    retrieveData();
  }, [actions]);

  const [isDialogOpen, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);
  const [teacherMembers, setTeacherMembers] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const checkSubmit = () => {
    if (name === '' || (members.length === 0 && teacherMembers.length === 0))
      return true;
    return false;
  };

  const handleClose = () => {
    setName('');
    setMembers([]);
    setSelectedGroups([]);
    setTeacherMembers([]);
    setOpen(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePostClick = async () => {
    const mappedMembers = R.map((member) => member.id, members);
    const mappedTeachers = R.map((teacher) => teacher.id, teacherMembers);
    const groupPayload = {
      name,
      members: [...mappedMembers, ...mappedTeachers],
    };
    await actions.postGroup(groupPayload);
    setName('');
    setMembers([]);
    setSelectedGroups([]);
    setTeacherMembers([]);
    setOpen(false);
  };

  const students = R.map(
    (option) => ({
      groupAndYear: `${option.year}${option.group}`,
      ...option,
    }),
    studentsList
  );

  const groups = R.uniq(
    R.map(
      (student) => ({
        year: student.year,
        group: student.group,
      }),
      studentsList
    )
  );

  return (
    <StyledGroupsCreationSegment>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        size="small"
        startIcon={<CreateIcon />}
      >
        Create a new group
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">
          Create a new group. You will be automatically added.
        </DialogTitle>
        <DialogContent>
          <TextField
            color="primary"
            autoFocus
            variant="outlined"
            id="name"
            label="Name of the group"
            type="text"
            value={name}
            onChange={handleNameChange}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <Autocomplete
            value={selectedGroups}
            onChange={(event, newGroup, reason, element) => {
              setSelectedGroups(newGroup);
              if (reason === 'select-option')
                setMembers([
                  ...members,
                  ...R.filter(
                    (student) =>
                      student.group === element.option.group &&
                      student.year === element.option.year,
                    students
                  ),
                ]);
              if (reason === 'remove-option')
                setMembers([
                  ...R.filter(
                    (student) =>
                      student.group !== element.option.group &&
                      student.year !== element.option.year,
                    members
                  ),
                ]);
            }}
            getOptionSelected={(option, value) =>
              option.year === value.year && option.group === value.group
            }
            multiple
            disableCloseOnSelect
            filterSelectedOptions
            id="all-groups"
            options={groups.sort((a, b) => a.year - b.year)}
            groupBy={(option) => option.year}
            getOptionLabel={(option) => `${option.year}${option.group}`}
            renderInput={(params) => (
              <TextField {...params} label="Groups" variant="outlined" />
            )}
            renderOption={(option) => `${option.group}`}
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <Autocomplete
            value={members}
            onChange={(event, newMembers) => {
              setMembers(newMembers);
            }}
            getOptionSelected={(option, value) => option.id === value.id}
            multiple
            disableCloseOnSelect
            filterSelectedOptions
            id="grouped-students"
            options={students.sort(
              (a, b) => -b.groupAndYear.localeCompare(a.groupAndYear)
            )}
            groupBy={(option) => option.groupAndYear}
            getOptionLabel={(option) =>
              `${option.year}${option.group} ${option.last_name} ${option.first_name}`
            }
            renderInput={(params) => (
              <TextField {...params} label="Students" variant="outlined" />
            )}
            renderOption={(option) =>
              `${option.last_name} ${option.first_name}`
            }
            fullWidth
            style={{ marginBottom: '16px' }}
          />
          <Autocomplete
            value={teacherMembers}
            onChange={(event, newMembers) => {
              setTeacherMembers(newMembers);
            }}
            getOptionSelected={(option, value) => option.id === value.id}
            multiple
            disableCloseOnSelect
            filterSelectedOptions
            id="teachers-list"
            options={R.filter(
              (teacher) => teacher.id !== currentUserId,
              teachersList
            )}
            getOptionLabel={(option) =>
              `${option.last_name} ${option.first_name}`
            }
            renderInput={(params) => (
              <TextField {...params} label="Teachers" variant="outlined" />
            )}
            fullWidth
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
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </StyledGroupsCreationSegment>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.announcements.isLoading,
  studentsList: state.usersService.studentsList,
  teachersList: state.usersService.teachersList,
  currentUserId: state.userManager.id,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadStudents,
      loadTeachers,
      postGroup,
    },
    dispatch
  ),
});

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTeacher
)(GroupsCreationSegment);
