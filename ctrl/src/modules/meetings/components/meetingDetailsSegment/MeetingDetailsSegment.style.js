import styled from 'styled-components';

const StyledMeetingSegment = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(1)}px;
    margin-bottom: ${theme.spacing(2)}px;
    border-radius: ${theme.spacing(1)}px;
    background-color: ${
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[200]
    };

    .meeting-header-wrapper {
      display: flex;
      flex-direction: column;

        ${theme.breakpoints.up('sm')} {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }

      .info-wrapper {
        display: block;

        ${theme.breakpoints.up('sm')} {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
        }
      }
    }

    .meeting-title {
      font-weight: ${theme.typography.fontWeightMedium};
      margin: ${theme.spacing(1)}px 0;
    }

    .actions-info-wrapper {
      margin-top: ${theme.spacing(3)}px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  `}
`;

export default StyledMeetingSegment;
