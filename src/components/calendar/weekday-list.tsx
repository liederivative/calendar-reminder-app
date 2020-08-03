import React from 'react';
import moment from 'moment';
import { CalendarState } from '../../state/calendar';
import { useRecoilValue } from 'recoil';
import CalendarDay from './day';

const CalendarWeekDayList = () => {
    const pivoteDate = useRecoilValue(CalendarState);
    const monthStart = moment(pivoteDate).startOf('month');
    const monthEnd = moment(pivoteDate).endOf('month').startOf('day');
    const startOfWeek = moment(monthStart).startOf('week');
    const endOfWeek = moment(monthEnd).endOf('week').startOf('day');

    const rows = [];
    let weekdayDate = moment(startOfWeek);
    // we create 7 days per row 
    while (weekdayDate.isBetween(startOfWeek, endOfWeek, undefined, '[]')) {
        let weekdays = moment.weekdays().map( (dayName,idx) =>{
            let Component = <CalendarDay date={weekdayDate.format('YYYY-MM-DD')} key={`${weekdayDate.toISOString()}-day`}/>;
            weekdayDate.add(1, 'day');
            return Component;
        } );
        
        rows.push(
            <div className="row" key={`${weekdayDate.toISOString()}-row-day`}> {weekdays} </div>
        );
    }
    return <div className="body">{rows}</div>;
}

export default CalendarWeekDayList;