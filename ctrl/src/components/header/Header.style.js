import styled from 'styled-components';

const StyledHeader = styled.div`
  ${({ theme }) => `
		.logo-fii {
			z-index: ${theme.zIndex.tooltip};
			display: block;
			cursor: pointer;
			position: absolute;
			top: 0.5em;
			left: 1em;

			width: ${theme.spacing(4)}px;

			${theme.breakpoints.up('lg')} {
				position: fixed;
			}
		}
	`}
`;

StyledHeader.displayName = 'StyledHeader';

export default StyledHeader;
