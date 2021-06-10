import styled from 'styled-components';

const StyledCalendarWidget = styled.div`
  ${({ theme }) => `
        .fc-button-primary {
            background-color: ${theme.palette.primary.main};
            border: none;
        }
        
        .fc-button-primary:hover {
            background-color: ${theme.palette.primary.dark};
        }

        .fc-button-primary:not(:disabled).fc-button-active {
            background-color: ${theme.palette.primary.dark};
        }

        .fc-button-primary:disabled {
            background-color: ${theme.palette.grey[500]};
        }

        .fc-theme-standard .fc-list-day-cushion {
            background-color: ${
              theme.palette.type === 'dark'
                ? theme.palette.grey[900]
                : theme.palette.grey[200]
            };
        }

        .fc-list-event:hover td {
            background-color: inherit;
        }

        .fc-daygrid-day.fc-day-today {
            background-color: ${
              theme.palette.type === 'dark'
                ? theme.palette.grey[900]
                : theme.palette.grey[100]
            };
        }

        .fc-timegrid-slot-minor {
            border-top-style: hidden;
        }

        .fc .fc-timegrid-col.fc-day-today {
            background-color: ${
              theme.palette.type === 'dark'
                ? theme.palette.grey[900]
                : theme.palette.grey[100]
            };
        }

        a {
            color: ${
              theme.palette.type === 'dark'
                ? theme.palette.text.primary
                : theme.palette.common.black
            };
        }
  `}
`;

export default StyledCalendarWidget;
