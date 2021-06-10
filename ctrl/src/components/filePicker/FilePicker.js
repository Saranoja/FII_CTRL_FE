import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { FilePicker } from 'react-file-picker';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import StyledCustomFilePicker from './FilePicker.style';

const CustomFilePicker = ({
  onFileUploadSuccess,
  availableExtensions,
  uploadMessage,
  handleFileRemove,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [fileName, setFileName] = useState(uploadMessage);

  const handleFileUploadSuccess = (file) => {
    setErrorMessage('');
    setFileName(file.name);
    onFileUploadSuccess(file);
  };

  const handleFileUploadRemove = () => {
    if (handleFileRemove) handleFileRemove();
    setFileName('');
  };

  return (
    <StyledCustomFilePicker>
      <div className="filepicker-wrapper">
        <FilePicker
          extensions={availableExtensions}
          onChange={(file) => handleFileUploadSuccess(file)}
          onError={(errorMessage) => setErrorMessage(errorMessage)}
          maxSize="100"
        >
          <Button color="primary" variant="contained" disableElevation>
            Browse
          </Button>
        </FilePicker>
        <label className="uploaded-filename">
          {fileName || uploadMessage || 'Upload a file'}
        </label>
        <IconButton
          size="small"
          className="remove-upload-button"
          onClick={handleFileUploadRemove}
        >
          <DeleteIcon />
        </IconButton>
      </div>

      <label className="upload-error">{errorMessage}</label>
    </StyledCustomFilePicker>
  );
};

export default CustomFilePicker;
