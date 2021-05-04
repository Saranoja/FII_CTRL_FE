import styled, { css } from 'styled-components';
import Card from '@material-ui/core/Card';

const StyledArticleCard = styled(Card)`
	${({ theme }) => {
		const { spacing } = theme;

		return css`
			margin-top: ${`${spacing(2)}px`};

			.article-title,
			.article-author {
				font-weight: normal;
			}
		`;
	}}
`;

export default StyledArticleCard;
