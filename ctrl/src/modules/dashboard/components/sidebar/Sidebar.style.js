import styled from 'styled-components';
import Paper from '@material-ui/core/Card';

const StyledSidebar = styled(({ theme, ...otherProps }) => (
  <Paper {...otherProps} />
))`
  ${({ theme }) => `
        padding: ${theme.spacing(6)}px ${theme.spacing(2)}px;
        .signout-button {
          position: absolute;
          bottom: ${theme.spacing(1)}px;
          left: 1em;
        }
    `}
`;

export default StyledSidebar;
