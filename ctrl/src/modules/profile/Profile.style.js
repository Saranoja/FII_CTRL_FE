import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const StyledProfile = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(3)}px;
    min-height: 80vh;

    .header-wrapper {
      display: flex;
      align-items: center;
      margin-bottom: ${theme.spacing(3)}px;
      
      .avatar-root {
        margin-right: ${theme.spacing(2)}px;
      }
    }

    .info-wrapper {
      .field {
        margin-bottom: ${theme.spacing(2)}px;
      }
    }
    
  `}
`;

export default StyledProfile;
