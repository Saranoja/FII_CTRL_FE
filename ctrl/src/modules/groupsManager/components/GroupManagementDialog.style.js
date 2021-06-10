import styled from 'styled-components';
import List from '@material-ui/core/List';

export const StyledMembersList = styled(List)`
  ${({ theme }) => `
        max-height: ${theme.spacing(24)}px;
        overflow: auto;
  `}
`;
