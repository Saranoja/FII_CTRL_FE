import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const StyledGroupsManager = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px;
    min-height: 80vh;

    .header-wrapper {
      margin-bottom: ${theme.spacing(3)}px;
    }

    .groups-wrapper {
      max-height: 70vh;
      overflow: auto;
      margin: ${theme.spacing(4)}px 0;
    }
  `}
`;

export default StyledGroupsManager;
