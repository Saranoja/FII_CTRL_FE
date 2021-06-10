import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { openLinkInNewTab } from 'utils';
import StyledCalendarWidget from './CalendarWidget.style';

const CalendarWidget = ({ events }) => {
  return (
    <StyledCalendarWidget>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventBackgroundColor="green"
        headerToolbar={{
          left: 'title',
          center: '',
          right: 'today,dayGridMonth,timeGridWeek,listWeek,prev,next',
        }}
        slotMinTime="08:00:00"
        firstDay={1}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          if (info.event.url) {
            openLinkInNewTab(info.event.url);
          }
        }}
      />
    </StyledCalendarWidget>
  );
};

export default CalendarWidget;
