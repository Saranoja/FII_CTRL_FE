import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const StyledAssignments = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px;
    min-height: 80vh;

    .header-wrapper {
      margin-bottom: ${theme.spacing(3)}px;
    }

    ${theme.breakpoints.up('lg')} {
      padding: ${theme.spacing(3)}px;
    }

    .assignments-container {
      height: 70vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      ${theme.breakpoints.up('sm')} {
        height: 80vh;
      }

      ${theme.breakpoints.up('lg')} {
        height: 75vh;
      }

      .assignment-segments-wrapper {
        max-height: 70vh;
        overflow: auto;
        flex-grow: 1;
        margin: ${theme.spacing(2)}px 0;

        .tab-panel-root {
          padding: 0;
        }
      }

    }
  `}
`;

export default StyledAssignments;
