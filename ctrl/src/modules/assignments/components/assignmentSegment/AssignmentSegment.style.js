import styled from 'styled-components';

const StyledAssignmentSegment = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(1)}px;
    margin-bottom: ${theme.spacing(2)}px;
    border-radius: ${theme.spacing(1)}px;
    background-color: ${
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[200]
    };

    .assignment-header-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .info-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }
    }

    .assignment-title {
      font-weight: ${theme.typography.fontWeightMedium};
      margin: ${theme.spacing(1)}px 0;
    }

    .assignment-subtitle {
      margin: ${theme.spacing(1)}px 0;
    }

    .attachment-button {
      margin-bottom: ${theme.spacing(1)}px;
    }

  `}
`;

export default StyledAssignmentSegment;
