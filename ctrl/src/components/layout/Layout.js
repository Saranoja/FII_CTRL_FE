import React from 'react';
import Sidebar from 'modules/dashboard/components/sidebar';
import StyledLayout from './Layout.style';

const Layout = ({ children, username, isCentered }) => (
  <StyledLayout>
    <Sidebar className="sidebar-wrapper" username={username} />
    <div
      className={isCentered ? 'content-wrapper' : 'uncentered-content-wrapper'}
    >
      {children}
    </div>
  </StyledLayout>
);

export default Layout;
