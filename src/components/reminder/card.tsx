import { ReminderHashTable} from '../../state/reminder';
import { useReminderActions } from '../../hooks/reminder';
import { useRecoilValue } from 'recoil';
import React, { useState } from 'react';
import ReminderForcast from './forcast';
import ReminderForm from './form';
import './card.css';
type Props = {
    id: number,
    date:string,
    closeModal?:()=>void
}


const ReminderCard: React.FunctionComponent<Props> = ({id, date: dateProp, closeModal}) => {
    const {deleteReminder} = useReminderActions();
    const hashTable = useRecoilValue(ReminderHashTable);
    const [editMode, setEditMode] = useState(false);
    // const [editMode, setEditMode] = useState(false);
    let remindersInDate = hashTable[dateProp];
    let item = remindersInDate.find(i => i.id === id);

    if(!item){
        return <div>Something went wrong</div>
    }
    let { title, city, date, time } = item;
    const toggleEditMode = ()=>{
        setEditMode(!editMode);
    }
    const deleteItem = ()=>{
        if(closeModal) closeModal();
        deleteReminder(id, date);
    }
    return <>{!editMode && <div>
        <div className="row">
            <div className="column col-end icon-button">
                <span className="hint--bottom hint--rounded hint--medium" aria-label="Edit Reminder">
                    <div className="icon" onClick={toggleEditMode}>edit</div>
                </span>
            </div>
            <div className="column col-end icon-button">
                <span className="hint--bottom hint--rounded hint--medium" aria-label="Delete Reminder">
                    <div className="icon" onClick={deleteItem}>delete</div>
                </span>
            </div>
        </div>
        <div className="row">
            <div className="column">Title</div>
            <div className="column">{title}</div>
        </div>
        <div className="row">
            <div className="column">Date</div>
            <div className="column">{date}</div>
        </div>
        <div className="row">
            <div className="column">Time</div>
            <div className="column">{time}</div>
        </div>
        <div className="row">
            <div className="column">City</div>
            <div className="column">{city}</div>
        </div>
        <div className="row">
            <div className="column">Weather Forcast</div>
            <div className="column"><ReminderForcast city={city} date={date} time={time} /></div>
        </div>
    </div>}
    {editMode && <ReminderForm item={item} itemID={id} onClose={toggleEditMode}/>}
    </>
}

export default ReminderCard;