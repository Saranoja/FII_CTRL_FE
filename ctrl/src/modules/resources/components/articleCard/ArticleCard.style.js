import styled from 'styled-components';
import Card from '@material-ui/core/Card';

const StyledArticleCard = styled(Card)`
  ${({ theme }) => `
		margin-top: ${theme.spacing(2)}px;

		.article-title,
		.article-author {
			font-weight: normal;
		}
	`}
`;

export default StyledArticleCard;
