import React, { useEffect } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTeacher } from 'hocs';
import { loadAccountDetails } from 'modules/userManager/actions';
import { loadProfileDetails } from 'modules/profile/actions';
import {
  Avatar,
  CircularProgress,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Layout } from 'components';
import { contactFields } from './helpers';
import StyledProfile from './Profile.style';

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
              <ListItemText>- {example}</ListItemText>
            </ListItem>
          ),
          R.split('*', thesisExamples)
        )}
      </List>
    ) : null,
  };

  return (
    <Layout>
      <StyledProfile elevation={3}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
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
            <div className="info-wrapper ">
              {R.map((field) => {
                return (
                  <div className="field" key={field.id}>
                    <Typography color="textPrimary" variant="subtitle2">
                      {field.label}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {fieldToPropMap[field.field] || '-'}
                    </Typography>
                  </div>
                );
              }, contactFields)}
            </div>
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
    },
    dispatch
  ),
});

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTeacher
)(Profile);
