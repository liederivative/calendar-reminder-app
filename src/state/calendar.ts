import {atom} from 'recoil';

const initialCalendarState = new Date().toISOString();

// this state has a pivote date that will be shift 
// when the changing the calendar months
export const CalendarState = atom({
    key: 'CalendarState',
    default: initialCalendarState
})