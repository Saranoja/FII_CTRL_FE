import styled, { css } from 'styled-components';

const StyledLayout = styled.div`
${({ theme }) => {
        const { spacing, breakpoints } = theme;

        return css`
            display: block;
            margin-top: ${`${spacing(6)}px`};

            ${breakpoints.up('lg')} {
                margin-top: 0;
                display: grid;
                height: 100vh;
                grid-template-columns: 0.4fr 1.6fr;
                grid-template-rows: 1fr;
                gap: 0px 0px;
                grid-template-areas: "sidebar-wrapper content-wrapper";
            }
    
            .sidebar-wrapper { 
                display: none;

                ${breakpoints.up('lg')} {
                    display: block;
                    grid-area: sidebar-wrapper;
                    position: fixed;
                    height: 100vh;
                    width: ${`${spacing(32)}px`};
                }
            }
            }

            .content-wrapper { 
                grid-area: content-wrapper;
                margin: auto;
                padding: ${`${spacing(4)}px`};
            }

            .uncentered-content-wrapper {
                grid-area: content-wrapper;
                padding: ${`${spacing(1)}px`};

                ${breakpoints.up('lg')} {
                    padding: ${`${spacing(4)}px`};
                }
            }
        `;
    }}
`


export default StyledLayout;