import styled from 'styled-components';

const StyledForm = styled.form`
  ${({ theme }) => `
		margin-top: ${theme.spacing(2)}px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		.form-input {
			margin-bottom: ${theme.spacing(2)}px;
		}

		.form-submit-button {
			align-self: flex-start;
		}
	`}
`;

export default StyledForm;
