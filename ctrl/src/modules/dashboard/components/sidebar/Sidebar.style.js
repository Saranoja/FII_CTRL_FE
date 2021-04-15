import styled, { css } from 'styled-components';
import Paper from '@material-ui/core/Card';


const StyledSidebar = styled(Paper)`
${({ theme }) => {
        const { spacing } = theme;

        return css`
        z-index: -1;
        background-color: white;
        box-shadow: 0px 0px 45px -30px rgba(23,23,23,0.9);
        padding: ${`${spacing(6)}px`} ${`${spacing(2)}px`};
        
    }`;
    }}
`


export default StyledSidebar;