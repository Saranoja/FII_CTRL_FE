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

class Assignments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: false,
    };
  }

  componentDidMount() {
    const { actions, currentAssignments } = this.props;
    actions.loadAssignments().then((result) =>
      this.setState({
        currentTab: R.path(['payload', 'data'], result)[0].subject,
      })
    );
  }

  render() {
    const { isLoading, currentAssignments } = this.props;
    const { currentTab } = this.state;
    const availableSubjects = [];

    if (currentAssignments) {
      R.forEachObjIndexed(
        (v, k) => availableSubjects.push(k),
        currentAssignments
      );
    }

    return (
      <Layout>
        <StyledAssignments elevation={3}>
          {isLoading ? (
            <LinearProgress />
          ) : (
            <>
              <div className="header-wrapper">
                <Typography variant="h5">Your Assignments</Typography>
              </div>
              <div className="assignmens-wrapper">
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
                    {currentAssignments && currentTab ? (
                      <TabPanel value={currentTab}>
                        {R.map(
                          (assignment) => (
                            <AssignmentSegment
                              assignmentId={assignment.id}
                              title={assignment.title}
                              description={assignment.description}
                              author={assignment.author}
                              createdAt={assignment.created_at}
                              deadline={assignment.deadline}
                              fileUrl={assignment.file_url}
                            />
                          ),
                          currentAssignments[currentTab]
                        )}
                      </TabPanel>
                    ) : (
                      <p> Nothing to display :) </p>
                    )}
                  </div>
                </TabContext>
              </div>
            </>
          )}
        </StyledAssignments>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  currentAssignments: state.assignments.currentAssignments,
  isLoading: state.assignments.isLoading,
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
