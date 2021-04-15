import styled, { css } from 'styled-components';

const StyledDarkThemeToggle = styled.div`
${() => {
        return css`
            .toggle-root {
                position: absolute;
                top: 0;
                right: 0;
            }
        `;
    }}
`

export default StyledDarkThemeToggle;