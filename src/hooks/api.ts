import {useEffect, useState} from 'react';
import moment from 'moment';
const APPID = process.env.WEATHER_APP_API;

export const useFetch = <Response>(url: string, options?: any) => {
    const [response, setResponse] = useState<Response | null>(null);
    const [error, setError] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(url, options);
          const json = await res.json();
          setResponse(json);
        } catch (error) {
          setError(error);
        }
      };
      fetchData();
    }, []);
    return { response, error };
  };

type ForecastRequest = {
    list: {
        dt_txt: string
        weather: {
            main: string,
            description: string
        }[]
    }[]
}

export const useOpenWeatherAPI = (city: string, date: string, time: string) =>{
    const { response, error } = useFetch<ForecastRequest>(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${APPID}`);
    
    if (error) {
        return 'Error guessing the weather.'
    }
    if (!response) {
        return 'Loading ...'
    }
    let weather = response.list.find(openweatherItem => {
        const dateFormat = "YYYY-MM-DD HH:MM:SS";
        let reminderDatetime = moment.utc(`${date} ${time}:00`, dateFormat);
        let start = moment(reminderDatetime).subtract(3, 'hour');
        let end = moment(reminderDatetime).add(3, 'hour');
        return moment(openweatherItem.dt_txt).isBetween(start, end)
    })
    
    if (weather &&  weather.weather && weather.weather[0]) {
        return `${weather.weather[0].main}, ${weather.weather[0].description}`;
    }
    return 'No weather for this date and time';
}