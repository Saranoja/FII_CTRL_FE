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
    if (lastVisitedGroup) actions.loadGroupAnnouncements(lastVisitedGroup?.id);
  };

  componentDidMount() {
    this.handleAnnouncementsInit();
  }

  handleGroupChipClick = async (newGroup) => {
    const { actions } = this.props;
    this.setState({ currentGroup: newGroup });
    this.setLastVisitedGroup(newGroup);
    await actions.loadGroupAnnouncements(newGroup.id);
  };

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
                    authorId={announcement.author_id}
                    createdAt={announcement.created_at}
                    announcementId={announcement.id}
                  />
                ),
                currentGroupAnnouncements
              )}
              {!areAnnouncementsLoading && !currentGroupAnnouncements.length ? (
                <Typography variant="subtitle1" color="textSecondary">
                  No announcements published yet
                </Typography>
              ) : null}
            </div>
            <AnnouncementsCreationSegment />
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

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);
