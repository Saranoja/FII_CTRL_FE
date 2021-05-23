import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { loadTeachers } from 'modules/usersService/actions';
import { loadProfileDetails } from 'modules/profile/actions';
import { Layout } from 'components';
import StyledTeachersPage from './TeachersPage.style';
import { LinearProgress, Typography } from '@material-ui/core';
import routePaths from 'routes/routePaths';
import RouterLink from 'components/routerLink';

const TeachersPage = ({ teachersList, isLoading, actions }) => {
  useEffect(() => {
    const retrieveData = async () => {
      await actions.loadTeachers();
    };
    retrieveData();
  }, [actions]);

  const byName = R.groupBy((teacher) => teacher.last_name[0]);
  const availableLetters = [];

  if (teachersList)
    R.forEachObjIndexed(
      (v, k) => availableLetters.push(k),
      byName(teachersList)
    );

  return (
    <Layout>
      <StyledTeachersPage elevation={3}>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <>
            <div className="header-wrapper">
              <Typography variant="h5">Your teachers</Typography>
            </div>
            <div className="list-wrapper ">
              {R.map(
                (letter) => (
                  <div key={letter}>
                    <h2>{letter}</h2>
                    {R.map(
                      (teacher) => (
                        <RouterLink
                          to={`${routePaths.TEACHERS_ROOT}/${teacher.id}`}
                          key={teacher.id}
                        >
                          <Typography color="primary" variant="body2">
                            {teacher.last_name} {teacher.first_name}
                          </Typography>
                        </RouterLink>
                      ),
                      byName(teachersList)[letter]
                    )}
                  </div>
                ),
                availableLetters
              )}
            </div>
          </>
        )}
      </StyledTeachersPage>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadTeachers,
      loadProfileDetails,
    },
    dispatch
  ),
});

const mapStateToProps = (state) => ({
  teachersList: state.usersService.teachersList,
  isLoading: state.usersService.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(TeachersPage);
