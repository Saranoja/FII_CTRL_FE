import styled from 'styled-components';
import Card from '@material-ui/core/Card';

const StyledArticleCard = styled(Card)`
  ${({ theme }) => `
		opacity: 0;
		transition: opacity 0.2s linear;
		animation: fadeIn 0.2s ease-in;
		animation-fill-mode: forwards;

		margin-top: ${theme.spacing(2)}px;

		.article-title,
		.article-author {
			font-weight: normal;
		}
	`}
`;

export default StyledArticleCard;
