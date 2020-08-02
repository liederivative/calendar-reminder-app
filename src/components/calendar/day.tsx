import moment from 'moment';
import { CalendarState } from '../../state/calendar';
import { ReminderHashTable } from '../../state/reminder';
import { useRecoilValue } from 'recoil';
import React, { ClassAttributes } from 'react';
import ReminderList from '../reminder/list';
type Props = {
    date: string,
    format?: string
} & ClassAttributes<HTMLDivElement>

const CalendarDay: React.FunctionComponent<Props> = ({ date: dateString, format, ...restProps }) => {
    let pivoteDate = useRecoilValue(CalendarState);
    const hashTable = useRecoilValue(ReminderHashTable);
    let reminders = hashTable[dateString] || [];
    let scrollStyle: React.CSSProperties = (reminders.length > 4)?{overflowY: 'scroll'}:{};

    let day = moment(dateString).startOf('day');
    let number = day.format(format || 'D');
    let className = 'column cell';
    // check if same day
    if (day.isSame(moment(new Date().toISOString()).startOf('day'))) className += ' selected';
    // disable day of different months
    if (!day.isSame(moment(pivoteDate).startOf('day'), 'month')) className += ' disabled';
    const onClickHandler = () => {

    }
    return <div {...restProps} className={className} style={scrollStyle} onClick={onClickHandler}>
        <span className="number">{number}</span>
        <ReminderList date={dateString} />
    </div>
}

export default CalendarDay;