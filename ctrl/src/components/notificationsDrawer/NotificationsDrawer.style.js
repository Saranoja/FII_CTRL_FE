import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';

const StyledNotificationsDrawer = styled(Drawer)`
  ${({ theme }) => `
    .drawer-paper {
      min-width: ${theme.spacing(35)}px;
    }

    .snackbar-notification-content, .empty-drawer-text {
      margin: ${theme.spacing(0.5)}px ${theme.spacing(1)}px;
    }
  `}
`;

export default StyledNotificationsDrawer;
