import styled, { css } from 'styled-components';

const StyledLoginPage = styled.div`
${() => {
        return css`
            display: flex;
            flex-direction: column;
            margin: auto;
            justify-content: space-around;
            align-items: center;
            max-width: 70%;
            margin-top: 10vh;

            .login-title {
                text-align: center;
            }

            .login-progress {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 10vh;
            }
        `;
    }}
`;

export default StyledLoginPage;