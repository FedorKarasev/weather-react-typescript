import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks/redux.ts';
import { changeGeolocation } from '../app/slices/geolocationSlice.ts';
import './weatherInformation.css';

export default function WeatherInformation() {
  const { name, temp, feelsLike, humidity, icon } = useAppSelector((state) => state.weather);

  const [tempInfo, setTempInfo] = useState({
    temp,
    tempDef: 'celcius',
  });

  const dispatch = useAppDispatch();

  const changeCityHandler = () => {
    dispatch(changeGeolocation());
  };

  const convertTemperatureHandler = () => {
    if (tempInfo.tempDef === 'celcius') {
      setTempInfo({
        temp: Math.round(temp * (9 / 5) + 32),
        tempDef: 'fahrenheit',
      });
    }
    if (tempInfo.tempDef === 'fahrenheit') {
      setTempInfo({
        temp,
        tempDef: 'celcius',
      });
    }
  };

  return (
    <div className='weather-information'>
      <div className='weather-information_weather-icon-container'>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt='' className='weather-icon' />
      </div>
      <div onClick={() => convertTemperatureHandler()} className='weather-information_temperature'>
        {tempInfo.temp}
        <span>{tempInfo.tempDef === 'celcius' ? '°C' : '°F'}</span>
      </div>
      <div className='weather-information_city'>
        <h3 className='city-name'>{name}</h3>
        <button id='changeCityBtn' onClick={() => changeCityHandler()}>
          Change city
        </button>
      </div>
      <div className='weather-information_additional'>
        <div className='weather-information__wind'>
          2 <span>m/s</span>
        </div>
        <div className='weather-information__feels-like'>
          {feelsLike} <span>°C</span>
        </div>
        <div className='weather-information__humidity'>
          {humidity} <span>%</span>
        </div>
      </div>
    </div>
  );
}
