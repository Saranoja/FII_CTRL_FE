import styled from 'styled-components';

const StyledErrorPage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .container {
    .error-text {
      text-align: center;
    }

    .large-image {
      width: 100%;
      display: block;
      margin: auto;
    }
  }
`;

export default StyledErrorPage;
