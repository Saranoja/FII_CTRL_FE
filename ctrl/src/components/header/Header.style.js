import styled, { css } from 'styled-components';

const StyledHeader = styled.div`
${({ theme }) => {
        const { spacing, breakpoints } = theme;

        return css`
            .logo-fii {
                display: block;
                cursor: pointer;
                position: absolute;
                top: 0.5em;
                left: 1em;

                width: ${`${spacing(5)}px`};

                ${breakpoints.up('sm')} {
                    width: ${`${spacing(4)}px`};
                }
            }
        `;
    }}
`

StyledHeader.displayName = 'StyledHeader';

export default StyledHeader;