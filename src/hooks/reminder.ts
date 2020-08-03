import { IdPool, ReminderHashTable, ReminderHashTableType, Reminder } from '../state/reminder';
import { useRecoilState } from 'recoil';

export type FormState = {
    title: string,
    city: string,
    date: string,
    time: string,
    color: string
}
type Action = {
    type: 'set-value',
    field: string,
    value: string | number | boolean | Date
}
export const setValueReducer = (state: FormState, action: Action) => {
    switch (action.type) {
        case 'set-value':
            return { ...state, [action.field]: action.value };
        default:
            return state
    }
}

// TODO: add these functions to its own file [utils]
// so far it was not done due to time constraint
const replaceItemAtIndex = (arr: Array<any>, index: number, newValue: any) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

const removeItemAtIndex = (arr: Array<any>, index: number) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export const useReminderActions = () => {
    let [id, setId] = useRecoilState(IdPool);
    let [reminder, setReminder] = useRecoilState(ReminderHashTable);

    const insertReminder = (currentState: ReminderHashTableType, key: string, remindersInDate: Array<Reminder>)=>{
        remindersInDate = remindersInDate.sort((a: FormState, b: FormState) => a.time.localeCompare(b.time));
        setReminder({ ...currentState, [key]: remindersInDate });
    }

    const addReminder = (item: FormState, titleMaxLength = 30) => {
        let remindersInDate = reminder[item.date] || [];
        remindersInDate = [...remindersInDate];
        remindersInDate.push({ ...item, title: item.title.substring(0, titleMaxLength), id });
        insertReminder(reminder, item.date, remindersInDate);
        setId(id + 1);
    }

    const updateReminder = (id: number, currentDate: string, newValue: FormState) => {
        let remindersInDate = reminder[currentDate];
        remindersInDate = [...remindersInDate];
        const index = remindersInDate.findIndex((item) => item.id === id);
        // we don't want to update a non-existing item
        if(index < 0) return;
        remindersInDate = replaceItemAtIndex(remindersInDate, index, { ...newValue, id });
        insertReminder(reminder, currentDate, remindersInDate);
    }

    const deleteReminder = (id: number, currentDay: string) => {
        let remindersInDate = reminder[currentDay];
        remindersInDate = [...remindersInDate];
        const index = remindersInDate.findIndex((item) => item.id === id);
        // we don't want to delete a non-existing item
        if(index < 0) return;
        remindersInDate = removeItemAtIndex(remindersInDate, index);
        insertReminder(reminder, currentDay, remindersInDate);
    }
    return { addReminder, deleteReminder, updateReminder };
}