import styled from 'styled-components';

const StyledLayout = styled.div`
  ${({ theme }) => `
        display: block;
        margin-top: ${theme.spacing(6)}px;

        ${theme.breakpoints.up('lg')} {
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

            ${theme.breakpoints.up('lg')} {
                display: block;
                grid-area: sidebar-wrapper;
                position: fixed;
                height: 100vh;
                width: ${theme.spacing(32)}px;
            }
        }
        }

        .content-wrapper { 
            grid-area: content-wrapper;
            margin: auto;
            padding: ${theme.spacing(4)}px;
        }

        .uncentered-content-wrapper {
            grid-area: content-wrapper;
            padding: ${theme.spacing(1)}px;

            ${theme.breakpoints.up('lg')} {
                padding: ${theme.spacing(6)}px ${theme.spacing(4)}px;
            }
        }

        .notifications-icon {
            z-index: ${theme.zIndex.mobileStepper};
            position: absolute;
            top: 0;
            right: 0;
        }
    `}
`;

export default StyledLayout;
