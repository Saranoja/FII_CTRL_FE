import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Sidebar from 'modules/dashboard/components/sidebar';
import StyledLayout from './Layout.style';

const Layout = ({ children, username, isCentered }) => {
    const theme = useTheme();
    return (
        <StyledLayout theme={theme}>
            <Sidebar className="sidebar-wrapper" username={username} />
            <div className={isCentered ? "content-wrapper" : "uncentered-content-wrapper"}>
                {children}
            </div>
        </StyledLayout>
    );
}

export default Layout;