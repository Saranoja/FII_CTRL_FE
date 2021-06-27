import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Typography, Tabs, Tab, LinearProgress } from '@material-ui/core';
import { TabPanel, TabContext } from '@material-ui/lab';
import { loadAssignments } from 'modules/assignments/actions';
import { Layout } from 'components';
import AssignmentSegment from './components/assignmentSegment';
import StyledAssignments from './Assignments.style';
import AssignmentsCreationSegment from './components/assignmentsCreationSegment';

class Assignments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: false,
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.loadAssignments().then((result) =>
      this.setState({
        currentTab: R.path(['payload', 'data'], result)[0].subject,
      })
    );
  }

  render() {
    const {
      isLoading,
      currentAssignments,
      groups,
      isTeacher,
      subjects,
    } = this.props;
    const { currentTab } = this.state;
    let availableSubjects = [];

    if (!isTeacher && currentAssignments) {
      availableSubjects = R.keys(currentAssignments);
    }

    if (isTeacher && subjects) {
      availableSubjects = R.keys(subjects);
    }

    return (
      <Layout>
        <StyledAssignments elevation={3}>
          <>
            <div className="header-wrapper">
              <Typography variant="h5">Your Assignments</Typography>
            </div>
            {isLoading ? (
              <LinearProgress />
            ) : (
              <div className="assignments-container">
                <TabContext value={currentTab || ''}>
                  <Tabs
                    value={currentTab}
                    onChange={(event, newValue) =>
                      this.setState({ currentTab: newValue })
                    }
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="label tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                  >
                    {R.map(
                      (subject) => (
                        <Tab label={subject} value={subject} key={subject} />
                      ),
                      availableSubjects
                    )}
                  </Tabs>
                  <div className="assignment-segments-wrapper">
                    {currentAssignments && currentAssignments[currentTab] ? (
                      <TabPanel
                        value={currentTab}
                        classes={{
                          root: 'tab-panel-root',
                        }}
                      >
                        {R.map(
                          (assignment) => (
                            <AssignmentSegment
                              key={assignment.id}
                              assignmentId={assignment.id}
                              title={assignment.title}
                              description={assignment.description}
                              author={assignment.author}
                              authorId={assignment.author_id}
                              createdAt={assignment.created_at}
                              deadline={assignment.deadline}
                              fileUrl={assignment.file_url}
                              groupName={
                                R.find(
                                  R.propEq('id', assignment.discussion_group_id)
                                )(groups)?.name
                              }
                              groupId={assignment.discussion_group_id}
                            />
                          ),
                          currentAssignments[currentTab]
                        )}
                      </TabPanel>
                    ) : (
                      <Typography variant="subtitle1" color="textSecondary">
                        {' '}
                        No assignment published for this subject yet{' '}
                      </Typography>
                    )}
                  </div>
                </TabContext>
                <AssignmentsCreationSegment />
              </div>
            )}
          </>
        </StyledAssignments>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  currentAssignments: state.assignments.currentAssignments,
  groups: state.announcements.groups,
  isLoading: state.assignments.isLoading,
  isTeacher: state.userManager.teaching,
  subjects: state.userManager.subjects,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadAssignments,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);
