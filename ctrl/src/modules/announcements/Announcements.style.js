import styled from 'styled-components';

const StyledAnnouncements = styled.div`
  ${({ theme }) => `
      display: flex;
      flex-direction: column-reverse;

      ${theme.breakpoints.up('lg')} {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
			}
      
      .announcements-segment {
        flex-grow: 3;
        width: 100%;
        height: 70vh;
        padding: ${theme.spacing(2)}px;

        ${theme.breakpoints.up('sm')} {
          height: 80vh;
        }

        ${theme.breakpoints.up('lg')} {
          height: 90vh;
          padding: ${theme.spacing(3)}px;
          max-width: 75%;
          margin-right: ${theme.spacing(2)}px;
        }

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .announcements-wrapper {
          flex-grow: 1;
          max-height: 70vh;
          overflow: auto;
          margin: ${theme.spacing(2)}px 0;
        }

      }

      .available-groups-segment {
        flex-grow: 1;
        padding: ${theme.spacing(2)}px;
        margin-bottom: ${theme.spacing(1)}px;

        ${theme.breakpoints.up('lg')} {
          padding: ${theme.spacing(3)}px;
          margin-bottom: 0;
        }

        .available-groups-wrapper {
          display: flex;
          align-items: center;
          overflow: auto;

          ::-webkit-scrollbar-thumb {
            background-color: transparent;
          }
          
          ${theme.breakpoints.up('lg')} {
            height: 70vh;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: ${theme.spacing(2)}px;
          }

          .group-chip {
            margin: ${theme.spacing(1)}px ${theme.spacing(0.5)}px 0;

            ${theme.breakpoints.up('lg')} {
              margin: ${theme.spacing(0.5)}px 0;
            }
          }
        }
      }
  `}
`;

export default StyledAnnouncements;
