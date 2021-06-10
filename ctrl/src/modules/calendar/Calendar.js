import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import { LinearProgress, Typography } from '@material-ui/core';
import { Layout } from 'components';
import { getEvents } from 'modules/calendar/actions';
import CalendarWidget from './components/calendarWidget';
import StyledCalendar from './Calendar.style';

import { transformEventsArray } from './helpers';

const Calendar = ({ isLoading, currentEvents, actions }) => {
  const theme = useTheme();

  useEffect(() => {
    actions.getEvents();
  }, [actions]);

  const transformedEventsArray = transformEventsArray(currentEvents, theme);

  return (
    <Layout>
      <StyledCalendar elevation={3}>
        <div className="header-wrapper">
          <Typography variant="h5">Your calendar</Typography>
        </div>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <div className="calendar-wrapper">
            <CalendarWidget events={transformedEventsArray} />
          </div>
        )}
      </StyledCalendar>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.calendar.isLoading,
  currentEvents: state.calendar.currentEvents,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      getEvents,
    },
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
