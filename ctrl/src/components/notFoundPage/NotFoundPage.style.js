import styled, { css } from 'styled-components';

const StyledNotFoundPage = styled.div`
${() => {
        return css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .container 

            .error-text {
                text-align: center;
            }

            .large-image {
                width: 100%;
                display: block;
                margin: auto;
            }
        }
        
    `;
    }}
`

StyledNotFoundPage.displayName = 'StyledNotFoundPage';

export default StyledNotFoundPage;