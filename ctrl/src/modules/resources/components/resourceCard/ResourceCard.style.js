import styled, { css } from 'styled-components';
import { Card } from '@material-ui/core';


const StyledResourceCard = styled(Card)`
${({ theme }) => {
        const { spacing } = theme;

        return css`
            .page-numbers-item {
                margin-right: ${`${spacing(1)}px`};
            }
    }`;
    }}
`


export default StyledResourceCard;