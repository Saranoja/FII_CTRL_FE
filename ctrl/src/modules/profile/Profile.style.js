import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const StyledProfile = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(3)}px;

    .header-wrapper {
      display: flex;
      align-items: center;
      
      .avatar-root {
        margin-right: ${theme.spacing(2)}px;
      }
    }
    
  `}
`;

export default StyledProfile;
