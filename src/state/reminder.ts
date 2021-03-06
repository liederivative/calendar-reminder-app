import {atom} from 'recoil';


const initialCityList = [
    "madrid",
    "london",
    "wolverhampton",
    "bogota"
]
// we might want to create cities in a future
export const CityList = atom({
    key: 'CityList',
    default: initialCityList
})

const initialColorList = [
    {name: "teal", value: "#008080"},
    {name: "blue", value: "blue"},
    {name: "red", value: "red"},
    {name: "black", value: "black"},
]
// TODO: allow the user to insert 
// new custom colors
export const ColorList = atom({
    key: 'ColorList',
    default: initialColorList
})
// global generator of ids
export const IdPool = atom({
    key: 'IdPool',
    default: 1
})
export type Reminder ={
    id: number,
    city: string,
    title: string,
    date: string,
    time: string,
    color: string
}

// A hash table to match the date with the multiple reminders
// e.g. { '2020-08-02': [{id: 1, city: 'london' ...}] }

export type ReminderHashTableType = { [key: string]: Array<Reminder> }
const initialReminderHashTable: ReminderHashTableType  = {}

export const ReminderHashTable = atom({
    key: 'ReminderState',
    default: initialReminderHashTable
})