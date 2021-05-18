import styled from 'styled-components';

const StyledAnnouncements = styled.div`
  ${({ theme }) => `
      ${theme.breakpoints.up('sm')} {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
			}
      
      .announcements-segment {
        flex-grow: 3;
        width: 100%;
        padding: ${theme.spacing(3)}px;
        height: 90vh;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        ${theme.breakpoints.up('sm')} {
          max-width: 75%;
          margin-right: ${theme.spacing(2)}px;
        }

        .announcements-wrapper {
          flex-grow: 1;
          max-height: 70vh;
          overflow: auto;
          margin: ${theme.spacing(2)}px 0;
        }

      }

      .available-groups-segment {
        flex-grow: 1;
        padding: ${theme.spacing(3)}px;

        .available-groups-wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-top: ${theme.spacing(2)}px;
          height: 70vh;
          overflow: auto;

          .group-chip {
            margin: ${theme.spacing(0.5)}px 0;
          }
        }
      }
  `}
`;

export default StyledAnnouncements;
