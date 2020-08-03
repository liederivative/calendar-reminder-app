
import { ReminderHashTable } from '../../state/reminder';
import { useRecoilValue } from 'recoil';
import React from 'react';
import Modal from 'react-modal';
import ReminderCard from './card';

type Props = {
    date: string
}
const modalStyle = {
    overlay: {
        backgroundColor: 'none'
    },
    content: {
        top: '30%',
        bottom: '30%',
        left: '30%',
        right: '30%',
    }
}

const ReminderList = React.forwardRef<HTMLDivElement, Props>( ({ date }, ref) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    // we use a selected id in order to update the reminder card of 
    // the selected reminder
    const [selectedID, setSelectedID] = React.useState(0);
    const hashTable = useRecoilValue(ReminderHashTable);
    
    let reminders = hashTable[date] || [];
    
    const openModal = (id: number) => () =>{
        setSelectedID(id);
        setIsOpen(true);
    }
    
    const closeModal = () => {
        setIsOpen(false);
    }
    return <div ref={ref}>
        {reminders.map(reminder => <div key={`${reminder.id}-container`}>
            <div className="reminder" key={`${reminder.id}-reminder`} style={{ background: reminder.color }} onClick={openModal(reminder.id)}>
                {`${reminder.time} ${reminder.title}`}
            </div>
            <Modal
                key={`${reminder.id}-modal`}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyle}
                ariaHideApp={false}
                contentLabel="List of reminders">
                    <ReminderCard key={`${reminder.id}-show`} closeModal={closeModal} id={selectedID} date={reminder.date} /> 
            </Modal>
        </div>)
        }
    </div>
})

export default ReminderList;