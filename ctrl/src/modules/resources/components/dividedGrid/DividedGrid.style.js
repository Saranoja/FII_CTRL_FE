import styled, { css } from 'styled-components';


const StyledDividedGrid = styled.div`
${({ theme }) => {
        const { spacing, breakpoints } = theme;

        return css`

            .divided-grid-segment {
                border-radius: ${`${spacing(1)}px`};
                border: none;
                padding: ${`${spacing(3)}px`} ${`${spacing(8)}px`};
            
                ${breakpoints.down('sm')} {
                    padding: ${`${spacing(3)}px`};
                }

                margin-bottom: ${`${spacing(3)}px`};
            }

            .grid-divider-loader {
                margin: ${`${spacing(2)}px`};
            }
    `;
    }}
`


export default StyledDividedGrid;