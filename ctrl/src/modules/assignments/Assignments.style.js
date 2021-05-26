import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const StyledAssignments = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px;
    min-height: 80vh;

    .header-wrapper {
      margin-bottom: ${theme.spacing(3)}px;
    }

    .assignment-segments-wrapper {
      max-height: 70vh;
      overflow: auto;
      margin: ${theme.spacing(4)}px 0;

      .tab-panel-root {
        padding: 0;
      }
    }
  `}
`;

export default StyledAssignments;
