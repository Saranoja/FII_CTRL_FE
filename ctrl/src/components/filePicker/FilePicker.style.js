import styled from 'styled-components';

const StyledCustomFilePicker = styled.div`
	${({ theme }) => `
		.filepicker-wrapper {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			border: 1px solid ${theme.palette.grey[700]};
			padding: ${theme.spacing(0.5)}px;
			padding-right: ${theme.spacing(1)}px;
			border-radius: ${theme.spacing(1)}px;

			.uploaded-filename {
				color: ${theme.palette.grey[400]};
				width: ${theme.spacing(20)}px;
				margin-left: ${theme.spacing(1)}px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	`}
`;

export default StyledCustomFilePicker;
