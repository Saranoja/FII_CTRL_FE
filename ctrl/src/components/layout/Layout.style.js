import styled from 'styled-components';

const StyledLayout = styled.div`
  ${({ theme }) => `
        padding: ${theme.spacing(6)}px ${theme.spacing(4)}px 0;

        ${theme.breakpoints.up('sm')} {
            padding: ${theme.spacing(6)}px ${theme.spacing(3)}px;
        }

        ${theme.breakpoints.up('md')} {
            padding: ${theme.spacing(6)}px ${theme.spacing(20)}px;
        }

        ${theme.breakpoints.up('lg')} {
            padding: ${theme.spacing(6)}px ${theme.spacing(24)}px;
        }

        ${theme.breakpoints.up('xl')} {
            padding: ${theme.spacing(6)}px ${theme.spacing(48)}px;
        }

        .content-wrapper {
            
        }

        .notifications-icon {
            z-index: ${theme.zIndex.mobileStepper};
            position: absolute;
            top: 0;
            right: 0;
        }

        .hamburger-menu {
          z-index: ${theme.zIndex.tooltip};
          position: absolute;
          top: 0;
          left: ${theme.spacing(6)}px;
        }
    `}
`;

export default StyledLayout;
