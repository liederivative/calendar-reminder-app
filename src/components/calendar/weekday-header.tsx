import moment from 'moment';
import {CalendarState} from '../../state/calendar';
import {useRecoilValue} from 'recoil';
import React from 'react';

const CalendarWeekdayHeader = () => {
    const pivoteDate = useRecoilValue(CalendarState);
    const daysFormat = "dddd";
    let startDate = moment(pivoteDate).startOf('week');
    // the idea is that in the future we could with a simple change 
    // start from a different day instead of sunday in the calendar
    let weekdayNames = moment.weekdays().map( (day,idx) => moment(startDate).add(idx,'day').format(daysFormat) );

       return <div className="days row">{
           weekdayNames.map(name =><div className="column col-center" key={name}>{name}</div>)
       }</div>
       
    };
export default CalendarWeekdayHeader;