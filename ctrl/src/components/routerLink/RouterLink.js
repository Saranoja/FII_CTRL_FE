import React from 'react';
import StyledRouterLink from './RouterLink.style';

const RouterLink = ({ children, className, to, onClick }) => {
	return (
		<StyledRouterLink to={to} className={className} onClick={onClick}>
			{children}
		</StyledRouterLink>
	);
};

export default RouterLink;
