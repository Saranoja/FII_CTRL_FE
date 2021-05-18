import React from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout } from 'components';
import { loadNotification } from 'modules/notifications/actions';
import { loadGroups, loadGroupAnnouncements } from './actions';
import { availableGroupsTitle } from './constants';
import StyledAnnouncements from './Announcements.style';
import {
  LinearProgress,
  Paper,
  Typography,
  Chip,
  Avatar,
} from '@material-ui/core';
import { localStorageManager, STORE_KEYS } from 'utils';
import AnnouncementSegment from './components/announcementSegment';
import AnnouncementsCreationSegment from './components/announcementsCreationSegment';

class Announcements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGroup: {},
      announcements: [],
    };
  }

  getLastVisitedGroup = () => {
    return localStorageManager.get(STORE_KEYS.LAST_VISITED_GROUP);
  };

  setLastVisitedGroup = (lastAccessedGroup) => {
    localStorageManager.set(STORE_KEYS.LAST_VISITED_GROUP, lastAccessedGroup);
  };

  handleAnnouncementsInit = () => {
    const { groups, actions } = this.props;

    const lastVisitedGroup = this.getLastVisitedGroup() || groups[0];
    this.setState({ currentGroup: lastVisitedGroup });
    this.setLastVisitedGroup(lastVisitedGroup);
    actions.loadGroupAnnouncements(lastVisitedGroup.id);
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.loadGroups().then(this.handleAnnouncementsInit);
  }

  handleGroupChipClick = async (newGroup) => {
    const { actions } = this.props;
    this.setState({ currentGroup: newGroup });
    this.setLastVisitedGroup(newGroup);
    await actions.loadGroupAnnouncements(newGroup.id);
  };

  //TODO: create separate components for the 2 papers

  render() {
    const {
      groups,
      areAnnouncementsLoading,
      currentGroupAnnouncements,
    } = this.props;
    return (
      <Layout isCentered={false}>
        <StyledAnnouncements>
          <Paper elevation={3} className="announcements-segment">
            {this.state.currentGroup ? (
              <Typography variant="h5" color="secondary">
                {this.state.currentGroup.name} Announcements
              </Typography>
            ) : null}
            <div className="announcements-wrapper">
              {areAnnouncementsLoading ? (
                <LinearProgress color="secondary" />
              ) : null}
              {R.map(
                (announcement) => (
                  <AnnouncementSegment
                    key={announcement.id}
                    title={announcement.title}
                    text={announcement.text}
                    author={announcement.author}
                    createdAt={announcement.created_at}
                  />
                ),
                currentGroupAnnouncements
              )}
            </div>
          </Paper>
          <Paper className="available-groups-segment">
            <Typography variant="subtitle1" color="secondary">
              {availableGroupsTitle}
            </Typography>
            <div className="available-groups-wrapper">
              {groups &&
                R.map(
                  (groupElement) => (
                    <Chip
                      className="group-chip"
                      clickable
                      onClick={() => this.handleGroupChipClick(groupElement)}
                      key={groupElement.id}
                      label={groupElement.name}
                      avatar={
                        groupElement.avatar ? (
                          <Avatar src={groupElement.avatar} />
                        ) : (
                          <Avatar>{groupElement.name[0]}</Avatar>
                        )
                      }
                      color="secondary"
                      variant={
                        groupElement?.id === this.state.currentGroup?.id
                          ? 'default'
                          : 'outlined'
                      }
                    />
                  ),
                  groups
                )}
            </div>
            <AnnouncementsCreationSegment />
          </Paper>
        </StyledAnnouncements>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.announcements.groups,
  currentGroupAnnouncements: state.announcements.currentGroupAnnouncements,
  areAnnouncementsLoading: state.announcements.areAnnouncementsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadGroups,
      loadGroupAnnouncements,
      loadNotification,
    },
    dispatch
  ),
});

export default R.compose(connect(mapStateToProps, mapDispatchToProps))(
  Announcements
);
