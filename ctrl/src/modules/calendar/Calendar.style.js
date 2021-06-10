import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const StyledCalendar = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px;
    min-height: 40vh;

    .header-wrapper {
      margin-bottom: ${theme.spacing(3)}px;
    }

    .calendar-wrapper {
      margin: ${theme.spacing(2)}px 0;
    }
  `}
`;

export default StyledCalendar;
