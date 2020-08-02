import * as React from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { CalendarState } from '../../state/calendar';
import { ReminderHashTable } from '../../state/reminder';
import ReminderForm from '../reminder/form';
const modalStyle = {
    content: {
        top: '30%',
        bottom: '30%',
        left: '30%',
        right: '30%',
    }
}
const CalendarHeader = ({ }) => {
    const [pivoteDate, setPivoteDate] = useRecoilState(CalendarState);
    const resetReminders = useResetRecoilState(ReminderHashTable);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    const getNextMonth = () => {
        const nextMonth = moment(pivoteDate).add(1, 'month').toISOString();
        setPivoteDate(nextMonth);
    }
    const getPrevMonth = () => {
        const prevMonth = moment(pivoteDate).subtract(1, 'month').toISOString();
        setPivoteDate(prevMonth);
    }
    const openModalCreateReminder = () => {
        setIsOpen(true);
    }

    const dateFormat = "MMMM YYYY";

    return (
        <div className="header row flex-middle">
            <div className="column button" >
                <span className="hint--bottom hint--rounded hint--medium" aria-label="Add Reminder">
                    <div className="icon" onClick={openModalCreateReminder}>
                        add
                    </div>
                </span>
                <Modal isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={modalStyle}
                    ariaHideApp={false}
                    contentLabel="Create a reminder">
                        <ReminderForm onClose={closeModal}/>
                    </Modal>
            </div>
            <div className="column button" >
                <span className="hint--bottom hint--rounded hint--medium" aria-label="Remove all reminders">
                    <div className="icon" onClick={resetReminders}>delete</div>
                </span>
            </div>
            <div className="column col-start">
                <div className="icon" onClick={getPrevMonth}>
                    chevron_left
                </div>
            </div>
            <div className="column col-center">
                <span>{moment(pivoteDate).format(dateFormat)}</span>
            </div>
            <div className="column col-end">
                <div className="icon" onClick={getNextMonth}>
                    chevron_right
                </div>
            </div>
        </div>
    );
};

export default CalendarHeader;