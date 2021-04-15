import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import StyledRouterLink from './RouterLink.style';

const RouterLink = ({ children, className, to, onClick }) => {
    const theme = useTheme();

    return (
        <StyledRouterLink to={to} className={className} onClick={onClick} theme={theme}>
            {children}
        </StyledRouterLink>
    )
};

export default RouterLink;