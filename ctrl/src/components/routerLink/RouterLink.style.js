import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledRouterLink = styled(Link)`
  ${({ theme }) => `
		text-decoration: none;
		color: ${theme.palette.primary.main};
		::visited {
			color: ${theme.palette.primary.main};
		}
	`}
`;

export default StyledRouterLink;
