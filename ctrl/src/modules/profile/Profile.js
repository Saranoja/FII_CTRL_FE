import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTeacher } from 'hocs';
import { loadAccountDetails } from 'modules/userManager/actions';
import { Avatar, Paper, Typography } from '@material-ui/core';
import { Layout } from 'components';
import { contactFields } from './helpers';
import StyledProfile from './Profile.style';

const Profile = ({
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
}) => {
  const fieldToPropMap = {
    degree: degree,
    subjects: subjects,
    email: email,
    secondaryEmail: secondaryEmail,
    phoneNumber: phoneNumber,
    office: officeNumber,
    schedule: schedule,
    fields: fields,
    thesisExamples: thesisExamples,
  };

  return (
    <Layout>
      <StyledProfile elevation={3}>
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
          <Typography variant="subtitle2">Faculty email: </Typography>
          <Typography variant="body2">{email}</Typography>
          {R.map((field) => {
            return (
              <div className="field" key={field.id}>
                <Typography variant="subtitle2">{field.label}</Typography>
                <Typography variant="body2">
                  {fieldToPropMap[field.field] || '-'}
                </Typography>
              </div>
            );
          }, contactFields)}
        </div>
      </StyledProfile>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  firstName: state.userManager.first_name,
  lastName: state.userManager.last_name,
  email: state.userManager.email,
  teaching: state.userManager.teaching,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadAccountDetails,
    },
    dispatch
  ),
});

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTeacher
)(Profile);
