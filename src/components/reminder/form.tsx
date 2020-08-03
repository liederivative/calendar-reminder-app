import moment from 'moment';
import { ColorList, CityList, Reminder } from '../../state/reminder';
import { useRecoilValue } from 'recoil';
import React, { useReducer } from 'react';
import { setValueReducer, useReminderActions } from '../../hooks/reminder';
import './form.css';

type Props = {
    onClose?: ()=>void,
    item?: Reminder,
    itemID?: number
}


const ReminderForm: React.FunctionComponent<Props> = ({onClose, item, itemID}) => {
    const colorList = useRecoilValue(ColorList);
    const cityList = useRecoilValue(CityList);
    const { addReminder, updateReminder } = useReminderActions();
    const defaultFormValue = {
        title: '',
        city: cityList[0],
        date: moment().format("YYYY-MM-DD"),
        time: moment().format("HH:MM"),
        color: colorList[0].name
    }
    const intialFormValue = item || defaultFormValue;
    const [{ color, title, city, date, time }, dispatch] = useReducer(setValueReducer, intialFormValue);

    const setValue = (type: string) => ({ target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        dispatch({ type: 'set-value', field: type, value: target.value });
    }
    const changeItem = () =>{
        if(itemID && item) {
            updateReminder(itemID, item.date, { color, title, city, date, time })
        }else{
            addReminder({ color, title, city, date, time });
        }
        if(onClose) onClose();
    }
    return <div className="reminder-cascade-padding">
        <div className="row">
            <input type="text" maxLength={30} className="form-control" value={title} placeholder="Title" onChange={setValue('title')} />
        </div>
        <div className="row">
            <div className="column">
                <label htmlFor="date" className="reminder-padding">Date</label>
                <input name="date" type="date" value={date} placeholder="date" onChange={setValue('date')} />
            </div>
            <div className="column">
                <label htmlFor="time" className="reminder-padding">Time</label>
                <input name="time" type="time" value={time} placeholder="time" onChange={setValue('time')}/>
            </div>
        </div>
        <div className="row">
            <div className="column">
                <label htmlFor="color" className="reminder-padding">Pick a Color</label>

                <select name="color" value={color} style={{ background: color }} onChange={setValue('color')} className="reminder-padding">
                    {colorList.map(color => <option key={color.value} value={color.value} style={{ background: color.value }}></option>)}
                </select>
            </div>
        
            <div className="column">
                <label htmlFor="city" className="reminder-padding">Choose a City</label>
                <select name="city" value={city} className="reminder-padding" onChange={setValue('city')}>
                    {cityList.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
            </div>
        </div>

        <div className="row">
            <div className="column">
                <button onClick={onClose}>Cancel</button>
            </div>
            <div className="column">
                <button disabled={title == ''} onClick={changeItem}>{ itemID?'Update':'Save'}</button>
            </div>
        </div>

    </div>

}

export default ReminderForm;