import React from 'react';
import { useOpenWeatherAPI } from '../../hooks/api';

type Props = {
    city: string,
    date: string,
    time: string
}


const ReminderForcast: React.FunctionComponent<Props> = ({ city, date, time }) => {
    const result = useOpenWeatherAPI(city, date, time);
    return <div>{result}</div>

}

export default ReminderForcast;