import styled from 'styled-components';

const StyledAnnouncementSegment = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(1)}px;
    margin-bottom: ${theme.spacing(2)}px;
    border-radius: ${theme.spacing(1)}px;
    background-color: ${
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[200]
    };

    .announcement-title {
      font-weight: ${theme.typography.fontWeightMedium};
      margin: ${theme.spacing(1)}px 0;
    }

    .announcement-subtitle {
      margin: ${theme.spacing(0.5)}px 0;
    }
  `}
`;

export default StyledAnnouncementSegment;
