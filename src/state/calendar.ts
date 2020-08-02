import {atom} from 'recoil';

const initialCalendarState = new Date().toISOString();


export const CalendarState = atom({
    key: 'CalendarState',
    default: initialCalendarState
})