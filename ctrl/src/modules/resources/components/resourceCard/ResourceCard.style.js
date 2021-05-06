import styled from 'styled-components';
import { Card } from '@material-ui/core';

const StyledResourceCard = styled(Card)`
  ${({ theme }) => `
        margin-right: ${theme.spacing(2)}px;
        margin-top: ${theme.spacing(2)}px;
        
        opacity: 0;
		transition: opacity 0.2s linear;
		animation: fadeIn 0.2s ease-in;
		animation-fill-mode: forwards;

        .resource-title, .resource-author {
            font-weight: normal;
        }

        .bookmark-icon-root {
            min-width: auto;
            margin-right: ${theme.spacing(1)}px;
        }

        .pages-list-line-wrapper {
            display: flex;
            justify-content: space-between;
            flex: 0 0 auto;

            .page-numbers-item {
                margin-right: ${theme.spacing(1)}px;
            }
        }

    `}
`;

export default StyledResourceCard;
