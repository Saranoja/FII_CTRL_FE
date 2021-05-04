import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { FilePicker } from 'react-file-picker';
import StyledCustomFilePicker from './FilePicker.style';

const CustomFilePicker = ({ onFileUploadSuccess }) => {
	const [fileName, setFileName] = useState('Upload your .pdf course');
	const [errorMessage, setErrorMessage] = useState('');

	const handleFileUploadSuccess = (file) => {
		setErrorMessage('');
		setFileName(file.name);
		onFileUploadSuccess(file);
	};

	return (
		<StyledCustomFilePicker>
			<div className="filepicker-wrapper">
				<FilePicker
					extensions={['pdf']}
					onChange={(file) => handleFileUploadSuccess(file)}
					onError={(errorMessage) => setErrorMessage(errorMessage)}
					maxSize="100"
				>
					<Button color="primary" variant="contained">
						{' '}
						Browse{' '}
					</Button>
				</FilePicker>
				<label className="uploaded-filename">{fileName}</label>
			</div>
			<label className="upload-error">{errorMessage}</label>
		</StyledCustomFilePicker>
	);
};

export default CustomFilePicker;
