import styled, { css } from 'styled-components';


const StyledDividedGrid = styled.div`
${({ theme }) => {
        const { spacing, palette } = theme;

        return css`

            .divided-grid-segment {
                border-radius: ${`${spacing(1)}px`};
                border: none;
                box-shadow: 6px 10px 14px -6px rgba(119,125,128,0.5);
                padding: ${`${spacing(3)}px`} ${`${spacing(8)}px`};
            }
            
            .grid-divider {
                .grid-divider-text {
                    background: linear-gradient(0deg, ${palette.secondary} 0%, ${palette.primary} 75%);
                    padding: ${`${spacing(3)}px`}
                    border-radius: 50%;
                }

                .grid-divider-loader {
                    transform: translateY(-${`${spacing(4)}px`});
                }
            }

            .grid-divider {
                height: calc(100% - 3rem);
            }
    `;
    }}
`


export default StyledDividedGrid;