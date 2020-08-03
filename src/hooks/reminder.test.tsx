import { renderHook } from "@testing-library/react-hooks";
import { useRecoilValue, RecoilRoot } from "recoil";
import {useEffect} from 'react';
import { ReminderHashTable } from '../state/reminder';
import { useReminderActions, FormState } from './reminder';
import {initializeHashTableRoot} from './test-helpers';

describe("Reminder Actions", () => {
    const formValue: FormState = {
        date: '2020-08-02', time: '11:11',
        title: '', color: 'teal', city: 'london'
    };
    
    it("should add a new reminder", () => {
        const { result } = renderHook(() => {
        const hashTable = useRecoilValue(ReminderHashTable);
        const { addReminder } = useReminderActions();
        useEffect( ()=>{
            addReminder(formValue);
        }, [])
        return hashTable[formValue.date];        
        }, { wrapper: RecoilRoot });

        expect(result.current).toEqual([{...formValue, id: 1}]);
    });

    it("should add a new reminder but the title should has 30 chars max", () => {
        let newFormState = {...formValue, title: Array(41).join('a')};
        let resultTitle = Array(31).join('a');
        const { result } = renderHook(() => {
        const hashTable = useRecoilValue(ReminderHashTable);
        const { addReminder } = useReminderActions();
        useEffect( ()=>{
            addReminder(newFormState);
        }, [])
        return hashTable[newFormState.date][0].title;        
        }, { wrapper: RecoilRoot });

        expect(result.current).toEqual(resultTitle);
    });

    it("should update an existing reminder", () => {
        const { result } = renderHook(() => {
        const hashTable = useRecoilValue(ReminderHashTable);
        const { updateReminder } = useReminderActions();
    
        useEffect( ()=>{
            updateReminder(1,formValue.date, {...formValue, city: 'madrid'});
        }, [])
        return hashTable[formValue.date][0].city;        
        }, { wrapper: initializeHashTableRoot({ [formValue.date]: [{...formValue, id: 1}] }) });

        expect(result.current).toEqual('madrid');
    });

    it("should delete an existing reminder", () => {
        const { result } = renderHook(() => {
        const hashTable = useRecoilValue(ReminderHashTable);
        const { deleteReminder } = useReminderActions();
    
        useEffect( ()=>{
            deleteReminder(1,formValue.date);
        }, [])
        return hashTable[formValue.date];        
        }, { wrapper: initializeHashTableRoot({ [formValue.date]: [{...formValue, id: 1}] }) });

        expect(result.current).toEqual([]);
    });
});