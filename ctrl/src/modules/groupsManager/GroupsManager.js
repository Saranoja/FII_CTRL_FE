import React, { useState } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout } from 'components';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import EditIcon from '@material-ui/icons/Edit';
import SettingsIcon from '@material-ui/icons/Settings';

import {
  deleteGroup,
  patchGroup,
  putMembers,
  deleteMembers,
  getMembers,
} from 'modules/groupsManager/actions';

import GroupsCreationSegment from './components/groupsCreationSegment';
import StyledGroupsManager from './GroupsManager.style';
import { LinearProgress, Typography } from '@material-ui/core';
import DeleteGroupDialog from './components/DeleteGroupDialog';
import UploadGroupAvatarDialog from './components/UploadGroupAvatarDialog';
import MembersEditDialog from './components/MembersEditDialog';

const GroupsManager = ({
  groups,
  areGroupsLoading,
  currentGroupMembers,
  actions,
  studentsList,
  teachersList,
  isLoading,
  width,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isAvatarUploadDialogOpen, setAvatarUploadDialogOpen] = useState(false);
  const [isMembersEditDialogOpen, setMembersEditDialogOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const handleClick = (event, element) => {
    setAnchorEl(event.currentTarget);
    setSelectedGroupId(element.id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGroupDeletion = () => {
    setDeleteDialogOpen(false);
    actions.deleteGroup(selectedGroupId);
  };

  const handleAvatarUpload = (newGroupAvatar) => {
    setAvatarUploadDialogOpen(false);
    actions.patchGroup(selectedGroupId, newGroupAvatar);
  };

  const handleMembersEdit = async () => {
    await actions.getMembers(selectedGroupId);
    setMembersEditDialogOpen(true);
  };

  return (
    <Layout>
      <StyledGroupsManager elevation={3}>
        <div className="header-wrapper">
          <Typography variant="h5">Manage your groups</Typography>
        </div>
        {areGroupsLoading ? (
          <LinearProgress />
        ) : (
          <>
            <div className="groups-wrapper">
              <List>
                {R.map(
                  (element) => (
                    <ListItem key={element.id}>
                      <ListItemAvatar>
                        {element.avatar ? (
                          <Avatar src={element.avatar} />
                        ) : (
                          <Avatar>
                            {R.join(
                              '',
                              R.map(
                                (word) => word[0],
                                R.split(' ', element.name)
                              )
                            ).substring(0, 2)}
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <ListItemText primary={element.name} />
                      <ListItemSecondaryAction>
                        <Tooltip title="Edit group settings">
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={(e) => handleClick(e, element)}
                          >
                            {isWidthUp('sm', width) ? (
                              <EditIcon />
                            ) : (
                              <SettingsIcon />
                            )}
                          </IconButton>
                        </Tooltip>

                        {isWidthUp('sm', width) && (
                          <Tooltip title="Delete group">
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => {
                                setSelectedGroupId(element.id);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}

                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          elevation={2}
                        >
                          <MenuItem
                            onClick={() => {
                              handleClose();
                              setAvatarUploadDialogOpen(true);
                            }}
                          >
                            <ListItemIcon>
                              <PhotoCameraIcon size="small" />
                            </ListItemIcon>
                            <ListItemText primary="Update group picture" />
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              handleClose();
                              setMembersEditDialogOpen(true);
                              handleMembersEdit();
                            }}
                          >
                            <ListItemIcon>
                              <GroupAddIcon size="small" />
                            </ListItemIcon>
                            <ListItemText primary="Manage group members" />
                          </MenuItem>

                          {!isWidthUp('sm', width) && (
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                setSelectedGroupId(element.id);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <ListItemIcon>
                                <DeleteIcon size="small" />
                              </ListItemIcon>
                              <ListItemText primary="Delete this group" />
                            </MenuItem>
                          )}
                        </Menu>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ),
                  groups
                )}
              </List>
            </div>
            <GroupsCreationSegment />
          </>
        )}
        <DeleteGroupDialog
          isOpen={isDeleteDialogOpen}
          handleClose={() => setDeleteDialogOpen(false)}
          handleDelete={handleGroupDeletion}
        />
        <UploadGroupAvatarDialog
          isOpen={isAvatarUploadDialogOpen}
          handleClose={() => setAvatarUploadDialogOpen(false)}
          handleSubmit={(newGroupAvatar) => handleAvatarUpload(newGroupAvatar)}
        />
        <MembersEditDialog
          isOpen={isMembersEditDialogOpen}
          handleClose={() => setMembersEditDialogOpen(false)}
          handleDelete={(toDelete) => {
            if (toDelete.id.length > 0)
              actions.deleteMembers(selectedGroupId, toDelete);
          }}
          handleAdd={(toAdd) => {
            if (toAdd.id.length > 0) actions.putMembers(selectedGroupId, toAdd);
          }}
          currentMembers={currentGroupMembers}
          studentsList={studentsList}
          teachersList={teachersList}
          isLoading={isLoading}
        />
      </StyledGroupsManager>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  groups: state.announcements.groups,
  areGroupsLoading: state.announcements.isLoading,
  currentGroupMembers: state.groups.currentGroupMembers,
  studentsList: state.usersService.studentsList,
  teachersList: state.usersService.teachersList,
  isLoading: state.groups.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      deleteGroup,
      patchGroup,
      putMembers,
      deleteMembers,
      getMembers,
    },
    dispatch
  ),
});

export default R.compose(
  connect(mapStateToProps, mapDispatchToProps),
  withWidth()
)(GroupsManager);
