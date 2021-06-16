import React, { useState } from 'react';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Dropdown, FilePicker } from 'components';
import {
  Button,
  LinearProgress,
  Typography,
  TextField,
} from '@material-ui/core';
import {
  NOTIFICATION_TYPES,
  EVENT_TYPES,
  DOMAINS,
} from 'modules/notifications/constants';
import { coursesList } from 'modules/resources/helpers';
import {
  loadResourcesForFile,
  getResetSearch,
  getResetState,
} from 'modules/resources/actions';
import { uploadFileToBucket } from 'modules/assignments/actions';
import { postBibliography } from 'modules/resourcesManager/actions';
import { loadNotification } from 'modules/notifications/actions';
import StyledResourcesManager from './ResourcesManager.style';

const ResourcesManager = ({ actions, current_file, isLoading, id }) => {
  const initialState = {
    subjectId: null,
    resourceTitle: '',
    resourceAuthor: '',
  };
  const [state, setState] = useState(initialState);

  const handleResourceSubmit = () => {
    actions
      .uploadFileToBucket(current_file, 'resources')
      .then((data) => {
        const payload = {
          title: `${state.resourceTitle} by ${state.resourceAuthor}`,
          hash: R.path(['payload', 'data'], data)
            .name.split('/')[1]
            .split('.')[0],
        };
        actions.postBibliography(payload, state.subjectId);
      })
      .catch(() =>
        actions.loadNotification({
          type: NOTIFICATION_TYPES.error,
          author_id: id,
          event: EVENT_TYPES.post,
          timestamp: Date.now(),
          group: '',
          domain: DOMAINS.BIBLIOGRAPHY,
        })
      )
      .then(() => {
        actions.getResetState();
        actions.getResetSearch();
        setState(initialState);
        actions.loadNotification({
          type: NOTIFICATION_TYPES.success,
          author_id: id,
          event: EVENT_TYPES.post,
          timestamp: Date.now(),
          group: '',
          domain: DOMAINS.BIBLIOGRAPHY,
        });
      });
  };

  return (
    <Layout>
      <StyledResourcesManager>
        <div className="header-wrapper">
          <Typography variant="h5">Upload resources</Typography>
        </div>
        <div className="resources-upload-wrapper">
          <Dropdown
            className="resources-subject-picker"
            options={coursesList}
            placeholder="Select target course"
            actionOnChange={(value) => setState({ ...state, subjectId: value })}
          />
          <TextField
            id="title-input-field"
            label="Title"
            variant="outlined"
            color="primary"
            type="text"
            onChange={(e) =>
              setState({ ...state, resourceTitle: e.target.value })
            }
            value={state.resourceTitle}
            name="title"
            style={{ marginBottom: '16px' }}
            fullWidth
          />
          <TextField
            id="author-input-field"
            label="Author(s)"
            variant="outlined"
            color="primary"
            type="text"
            onChange={(e) =>
              setState({ ...state, resourceAuthor: e.target.value })
            }
            value={state.resourceAuthor}
            name="author"
            style={{ marginBottom: '16px' }}
            fullWidth
          />
          <FilePicker
            onFileUploadSuccess={(file) => {
              actions.loadResourcesForFile(file);
            }}
            availableExtensions={['pdf']}
            uploadMessage="Upload a .pdf"
            handleFileRemove={actions.getResetSearch}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={handleResourceSubmit}
            disabled={
              !(
                state.subjectId &&
                current_file &&
                state.resourceTitle.length > 0 &&
                state.resourceAuthor.length > 0
              )
            }
            style={{ marginBottom: '16px' }}
          >
            Submit
          </Button>
        </div>
        {isLoading && <LinearProgress />}
      </StyledResourcesManager>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  id: state.userManager.id,
  current_file: state.resources.current_file,
  isLoading: state.assignments.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getResetSearch,
      getResetState,
      loadResourcesForFile,
      uploadFileToBucket,
      postBibliography,
      loadNotification,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesManager);
