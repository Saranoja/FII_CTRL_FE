import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';

const StyledNotificationsDrawer = styled(Drawer)`
  ${({ theme }) => `
    .drawer-paper {
      min-width: 30vw;
      max-width: 80vw;

      ${theme.breakpoints.up('sm')} {
        max-width: 60vw;
      }

      ${theme.breakpoints.up('md')} {
        max-width: 40vw;
      }

      ${theme.breakpoints.up('lg')} {
        min-width: 16vw;
        max-width: 30vw;
      }
    }

    .snackbar-notification-content, .empty-drawer-text {
      margin: ${theme.spacing(0.5)}px ${theme.spacing(1)}px;
    }
  `}
`;

export default StyledNotificationsDrawer;
