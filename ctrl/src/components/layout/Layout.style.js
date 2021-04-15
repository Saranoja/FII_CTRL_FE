import styled, { css } from 'styled-components';

const StyledLayout = styled.div`
${({ theme }) => {
        const { spacing } = theme;

        return css`
            display: grid;
            height: 100vh;
            grid-template-columns: 0.4fr 1.6fr;
            grid-template-rows: 1fr;
            gap: 0px 0px;
            grid-template-areas: "sidebar-wrapper content-wrapper";
    
            .sidebar-wrapper { 
                grid-area: sidebar-wrapper;
                position: fixed;
                height: 100vh;
                width: ${`${spacing(32)}px`};
            }

            .content-wrapper { 
                grid-area: content-wrapper;
                margin: auto;
                padding: ${`${spacing(4)}px`};
            }

            .uncentered-content-wrapper {
                grid-area: content-wrapper;
                padding: ${`${spacing(4)}px`};
            }
        `;
    }}
`


export default StyledLayout;