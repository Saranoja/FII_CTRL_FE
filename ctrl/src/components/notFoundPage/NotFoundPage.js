import * as React from 'react';
import RouterLink from '../routerLink';
import images from '../../assets/images/errors';
import StyledNotFoundPage from './NotFoundPage.style';

const NotFoundPage = () => (
    <StyledNotFoundPage>
        <div className="container">
            <img src={images.NotFound} alt="not-found" className="large-image" />
            <h2 className="error-text"> Oops... the page you are looking for is not here. </h2>
            <h2 className="error-text"> <RouterLink to="/"> Go back home 🏠 </RouterLink> </h2>
        </div>
    </StyledNotFoundPage>
)

export default NotFoundPage;
