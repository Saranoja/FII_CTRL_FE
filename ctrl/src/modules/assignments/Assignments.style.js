import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const StyledAssignments = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(3)}px;
    min-height: 80vh;

    .header-wrapper {
      margin-bottom: ${theme.spacing(3)}px;
    }
  `}
`;

export default StyledAssignments;
