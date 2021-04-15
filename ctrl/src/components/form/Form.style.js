import styled, { css } from 'styled-components';

const StyledForm = styled.form`
${() => {
        return css`
            margin-top: 16px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            .form-input {
                margin-bottom: 16px;
            }

            .form-submit-button {
                align-self: flex-start;
            }
        `;
    }}
`

StyledForm.displayName = 'StyledForm';

export default StyledForm;