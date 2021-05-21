import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';

const StyledSidebar = styled(Drawer)`
  ${({ theme }) => `
        .sidebar-paper {
          border-right: none;
          padding: ${theme.spacing(6)}px ${theme.spacing(2)}px;
          max-width: 80vw;

          ${theme.breakpoints.up('sm')} {
            max-width: 60vw;
          }

          ${theme.breakpoints.up('md')} {
            max-width: 40vw;
          }

          ${theme.breakpoints.up('lg')} {
            max-width: 30vw;
          }
        }

       
        .signout-button {
          position: absolute;
          bottom: ${theme.spacing(1)}px;
          left: 1em;
        }
    `}
`;

export default StyledSidebar;
