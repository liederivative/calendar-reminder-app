import * as React from 'react';
import CalendarHeader from '../../components/calendar/header';
import CalendarWeekdayHeader from '../../components/calendar/weekday-header';
import WeekdayList from '../../components/calendar/weekday-list';
import './index.css';

const Calendar = () => {
    return <div>
        <div className="center">Calendar-Reminder App</div>
        <div className="calendar">
            <CalendarHeader />
            <CalendarWeekdayHeader />
            <WeekdayList />
        </div>
    </div>
}

export default Calendar;