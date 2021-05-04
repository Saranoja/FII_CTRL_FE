import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const StyledRouterLink = styled(Link)`
	${({ theme }) => {
		const { palette } = theme;
		return css`
			text-decoration: none;
			color: ${palette.primary.main};
			::visited {
				color: ${palette.primary.main};
			}
		`;
	}}
`;

StyledRouterLink.displayName = 'StyledRouterLink';

export default StyledRouterLink;
