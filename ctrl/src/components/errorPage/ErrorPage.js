import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { reloadPage } from '../../utils';
import images from '../../assets/images/errors';
import { GENERIC_ERROR_TEXT } from './constants';
import StyledErrorPage from './ErrorPage.style';

const ErrorPage = ({ image, errorText }) => (
  <StyledErrorPage>
    <div className="container">
      <img src={image} alt="error-pic" className="large-image" />
      <h2 className="error-text">
        {' '}
        {errorText}
        {' '}
      </h2>
      <h2 className="error-text" onClick={reloadPage}>
        <Link onClick={reloadPage}> Reload page 🏠 </Link>
      </h2>
    </div>
  </StyledErrorPage>
);

ErrorPage.defaultProps = {
  errorText: GENERIC_ERROR_TEXT,
  image: images.InternalServerError,
};

ErrorPage.propTypes = {
  image: PropTypes.string,
  errorText: PropTypes.string,
};

export default ErrorPage;
