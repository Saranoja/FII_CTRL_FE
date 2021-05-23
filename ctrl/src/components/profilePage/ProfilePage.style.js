import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const StyledProfile = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(3)}px;
    min-height: 80vh;

    .top-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: ${theme.spacing(3)}px;

      .header-wrapper {
        display: flex;
        align-items: center;
        
        .avatar-root {
          margin-right: ${theme.spacing(2)}px;
        }
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
