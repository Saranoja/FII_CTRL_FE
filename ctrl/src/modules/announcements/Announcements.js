import React, { useEffect, useState } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout } from 'components';
import { loadGroups, loadGroupAnnouncements } from './actions';
import { availableGroupsTitle } from './constants';
import StyledAnnouncements from './Announcements.style';
import {
  CircularProgress,
  Paper,
  Typography,
  Chip,
  Avatar,
} from '@material-ui/core';
import { localStorageManager, STORE_KEYS } from 'utils';
import AnnouncementSegment from './components/announcementSegment';

const Announcements = ({
  groups,
  currentGroupAnnouncements,
  isLoading,
  areAnnouncementsLoading,
  actions,
}) => {
  const [currentGroup, setCurrentGroup] = useState();

  const setLastVisitedGroup = (lastAccessedGroup) => {
    localStorageManager.set(STORE_KEYS.LAST_VISITED_GROUP, lastAccessedGroup);
  };

  const getLastVisitedGroup = () => {
    return localStorageManager.get(STORE_KEYS.LAST_VISITED_GROUP);
  };

  useEffect(() => {
    const lastVisitedGroup = getLastVisitedGroup() || groups[0];
    if (groups.length) {
      setCurrentGroup(lastVisitedGroup);
      setLastVisitedGroup(lastVisitedGroup);
      actions.loadGroupAnnouncements(lastVisitedGroup.id);
    } else {
      actions.loadGroups();
    }
  }, [actions, groups]);

  const handleGroupChipClick = async (newGroup) => {
    setCurrentGroup(newGroup);
    setLastVisitedGroup(newGroup);
    await actions.loadGroupAnnouncements(newGroup.id);
  };

  //TODO: create separate components for the 2 papers

  return (
    <Layout isCentered={false}>
      <StyledAnnouncements>
        <Paper elevation={3} className="announcements-segment">
          {currentGroup ? (
            <Typography variant="h5" color="secondary">
              {currentGroup.name} announcements
            </Typography>
          ) : null}
          <div className="announcements-wrapper">
            {areAnnouncementsLoading ? (
              <CircularProgress color="secondary" />
            ) : (
              R.map(
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
              )
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
                    onClick={() => handleGroupChipClick(groupElement)}
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
                      groupElement?.id === currentGroup?.id
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
};

const mapStateToProps = (state) => ({
  groups: state.announcements.groups,
  currentGroupAnnouncements: state.announcements.currentGroupAnnouncements,
  isLoading: state.announcements.isLoading,
  areAnnouncementsLoading: state.announcements.areAnnouncementsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      loadGroups,
      loadGroupAnnouncements,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);
