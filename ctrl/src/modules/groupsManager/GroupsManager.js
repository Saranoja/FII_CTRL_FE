import React, { useState } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout } from 'components';
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

import { deleteGroup } from 'modules/groupsManager/actions';

import GroupsCreationSegment from './components/groupsCreationSegment';
import StyledGroupsManager from './GroupsManager.style';
import { LinearProgress, Typography } from '@material-ui/core';
import DeleteGroupDialog from './components/DeleteGroupDialog';

const GroupsManager = ({ groups, areGroupsLoading, actions }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGroupDeletion = () => {
    setDeleteDialogOpen(false);
    actions.deleteGroup(selectedGroupId);
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
                            onClick={handleClick}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          elevation={2}
                        >
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <PhotoCameraIcon size="small" />
                            </ListItemIcon>
                            <ListItemText primary="Update group picture" />
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <GroupAddIcon size="small" />
                            </ListItemIcon>
                            <ListItemText primary="Manage group members" />
                          </MenuItem>
                        </Menu>
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
      </StyledGroupsManager>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  groups: state.announcements.groups,
  areGroupsLoading: state.announcements.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      deleteGroup,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupsManager);
