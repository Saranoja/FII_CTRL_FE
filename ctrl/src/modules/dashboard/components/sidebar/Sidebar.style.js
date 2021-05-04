import styled from 'styled-components';
import Paper from '@material-ui/core/Card';

const StyledSidebar = styled(({ theme, ...otherProps }) => (
	<Paper {...otherProps} />
))`
	${({ theme }) => `
        z-index: -1;
        padding: ${theme.spacing(6)}px ${theme.spacing(2)}px;
    `}
`;

export default StyledSidebar;
