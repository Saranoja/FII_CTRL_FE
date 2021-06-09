import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const StyledMeetings = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px;
    min-height: 60vh;

    .header-wrapper {
      margin-bottom: ${theme.spacing(3)}px;
    }

    .meetings-wrapper {
      max-height: 60vh;
      overflow: auto;
      margin: ${theme.spacing(2)}px 0;
    }
  `}
`;

export default StyledMeetings;
