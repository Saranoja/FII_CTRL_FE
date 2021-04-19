import styled, { css } from 'styled-components';
import { Card } from '@material-ui/core';


const StyledResourceCard = styled(Card)`
${({ theme }) => {
        const { spacing } = theme;

        return css`

            margin-right: ${`${spacing(2)}px`};

            .resource-title, .resource-author {
                font-weight: normal;
            }

            .bookmark-icon-root {
                min-width: auto;
                margin-right: ${`${spacing(1)}px`};
            }

            .pages-list-line-wrapper {
                display: flex;
                justify-content: space-between;
                flex: 0 0 auto;

                .page-numbers-item {
                    margin-right: ${`${spacing(1)}px`};
                }
            }

    }`;
    }}
`


export default StyledResourceCard;