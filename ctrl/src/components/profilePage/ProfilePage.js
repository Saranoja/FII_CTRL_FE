import React, { useEffect } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadProfileDetails } from 'modules/profile/actions';
import {
  Typography,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import { Layout } from 'components';
import { contactFields } from 'modules/profile/helpers';
import StyledProfile from './ProfilePage.style';

const ProfilePage = ({
  name,
  email,
  subjects,
  degree,
  secondaryEmail,
  phoneNumber,
  officeNumber,
  schedule,
  fields,
  thesisExamples,
  isLoading,
  actions,
}) => {
  const { teacher_id } = useParams();

  useEffect(() => {
    const retrieveData = async (teacher_id) => {
      await actions.loadProfileDetails(teacher_id);
    };
    retrieveData(teacher_id);
  }, [actions, teacher_id]);

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
                  {`${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`}
                </Avatar>
                <Typography variant="h5">{name}</Typography>
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
          </>
        )}
      </StyledProfile>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  name: state.profile.profileDetails.name,
  email: state.profile.profileDetails.email,
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
      loadProfileDetails,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
