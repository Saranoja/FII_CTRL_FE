import styled from 'styled-components';

const StyledLayout = styled.div`
  ${({ theme }) => `
        padding: ${theme.spacing(6)}px ${theme.spacing(4)}px 0;

        ${theme.breakpoints.up('sm')} {
            padding: ${theme.spacing(8)}px ${theme.spacing(8)}px;
        }

        ${theme.breakpoints.up('md')} {
            padding: ${theme.spacing(8)}px ${theme.spacing(20)}px;
        }

        ${theme.breakpoints.up('lg')} {
            padding: ${theme.spacing(8)}px ${theme.spacing(24)}px;
        }

        ${theme.breakpoints.up('xl')} {
            padding: ${theme.spacing(8)}px ${theme.spacing(48)}px;
        }

        .notifications-icon {
            position: absolute;
            top: ${theme.spacing(0.5)}px;;
            right: ${theme.spacing(2)}px;
        }

        .hamburger-menu {
          position: absolute;
          top: 0;
          left: ${theme.spacing(6)}px;
        }
    `}
`;

export default StyledLayout;
