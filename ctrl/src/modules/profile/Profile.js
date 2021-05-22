import React, { useEffect, useState } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTeacher } from 'hocs';
import { loadAccountDetails } from 'modules/userManager/actions';
import {
  loadProfileDetails,
  patchProfileDetails,
} from 'modules/profile/actions';
import {
  Avatar,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  Tooltip,
  LinearProgress,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Layout } from 'components';
import { contactFields } from './helpers';
import StyledProfile from './Profile.style';
import EditProfileDialog from './components/editProfileDialog';

const Profile = ({
  id,
  firstName,
  lastName,
  email,
  subjects,
  degree,
  secondaryEmail,
  phoneNumber,
  officeNumber,
  schedule,
  fields,
  thesisExamples,
  actions,
  isLoading,
}) => {
  useEffect(() => {
    const retrieveData = async (id) => {
      await actions.loadProfileDetails(id);
    };
    retrieveData(id);
  }, [actions, id]);

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleSaveEditClick = (newDetailsData) => {
    setEditDialogOpen(false);
    actions
      .patchProfileDetails(id, newDetailsData)
      .then(() => actions.loadProfileDetails(id));
  };

  const fieldToPropMap = {
    degree: degree,
    subjects: subjects ? R.join(', ', subjects) : null,
    email: email,
    secondaryEmail: secondaryEmail,
    phoneNumber: phoneNumber,
    office: officeNumber,
    schedule: schedule ? (
      <Link href={schedule} target="_blank">
        {schedule}
      </Link>
    ) : null,
    fields: fields,
    thesisExamples: thesisExamples ? (
      <List>
        {R.map(
          (example) => (
            <ListItem key={example} dense disableGutters>
              <ListItemText component={'span'} primary={`- ${example}`} />
            </ListItem>
          ),
          R.split('\n', thesisExamples)
        )}
      </List>
    ) : null,
  };

  return (
    <Layout>
      <StyledProfile elevation={3}>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <>
            <div className="top-wrapper">
              <div className="header-wrapper">
                <Avatar
                  classes={{
                    root: 'avatar-root',
                  }}
                >
                  {firstName[0]}
                  {lastName[0]}
                </Avatar>
                <Typography variant="h5">
                  {firstName} {lastName}
                </Typography>
              </div>
              <div className="edit-section">
                <Tooltip title="Edit">
                  <IconButton
                    className="edit-announcement-button"
                    onClick={handleEditClick}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div className="info-wrapper ">
              {R.map((field) => {
                return (
                  <div className="field" key={field.id}>
                    <Typography color="textPrimary" variant="subtitle2">
                      {field.label}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                      component={'span'}
                    >
                      {fieldToPropMap[field.field] || '-'}
                    </Typography>
                  </div>
                );
              }, contactFields)}
            </div>
            <EditProfileDialog
              secondaryEmail={secondaryEmail}
              phoneNumber={phoneNumber}
              office={officeNumber}
              interests={fields}
              thesis={thesisExamples}
              isOpen={isEditDialogOpen}
              handleClose={() => setEditDialogOpen(false)}
              handleSave={handleSaveEditClick}
            />
          </>
        )}
      </StyledProfile>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  id: state.userManager.id,
  firstName: state.userManager.first_name,
  lastName: state.userManager.last_name,
  email: state.userManager.email,
  teaching: state.userManager.teaching,
  degree: state.profile.profileDetails.degree,
  fields: state.profile.profileDetails.fields,
  phoneNumber: state.profile.profileDetails.phone_number,
  officeNumber: state.profile.profileDetails.office,
  schedule: state.profile.profileDetails.schedule,
  secondaryEmail: state.profile.profileDetails.secondary_email,
  subjects: state.profile.profileDetails.subjects,
  thesisExamples: state.profile.profileDetails.thesis_examples,
  isLoading: state.profile.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadAccountDetails,
      loadProfileDetails,
      patchProfileDetails,
    },
    dispatch
  ),
});

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTeacher
)(Profile);
