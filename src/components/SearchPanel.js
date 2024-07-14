import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks/redux.ts';
import { changeGeolocation, setCityName } from '../app/slices/geolocationSlice.ts';
import { setWeatherInformation } from '../app/slices/weatherSlice.ts';

export default function SearchPanel() {
  const APIkey = '5131f785595a7dbb2e5f721c00417bf6';
  const cityName = useAppSelector((state) => state.geolocation.cityName);
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useAppDispatch();

  const searchCity = async () => {
    const limit = 5;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${APIkey}`;

    const res = await fetch(url);
    const data = await res.json();

    setSearchResults(data);
  };

  useEffect(() => {
    if (!cityName) return;

    let timerId = setTimeout(searchCity, 800);

    return () => clearTimeout(timerId);
  }, [cityName]);

  const inputCityNameHandler = (event) => {
    dispatch(setCityName(event.target.value));
  };

  const getCurrentPositionHandler = () => {
    const success = (pos) => {
      selectCityHandler({ lat: pos.coords.latitude, lon: pos.coords.longitude });
    };

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const getWeatherInformation = async ({ lat, lon }) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`;

    const res = await fetch(url);
    const weatherData = await res.json();

    return weatherData;
  };

  const selectCityHandler = async (cityCoords) => {
    let weatherData = await getWeatherInformation(cityCoords);

    dispatch(setWeatherInformation(weatherData));
    dispatch(changeGeolocation());

    setSearchResults([]);
  };

  return (
    <div className='search-panel'>
      <form action=''>
        <input
          id='searchInput'
          type='text'
          placeholder='Enter city...'
          autoComplete='off'
          value={cityName}
          onInput={inputCityNameHandler}
          autoFocus
        />
        <button type='button' onClick={() => getCurrentPositionHandler()} id='currentLocation'>
          <img className='currentLocationIcon' src='/location.png' alt='Change location to current' />
        </button>
      </form>
      <ul className='search-results'>
        {searchResults.map((res) => {
          return (
            <li
              onClick={() => selectCityHandler({ lat: res.lat, lon: res.lon })}
              className='search-item'
              key={res.lat + res.lon}
            >
              {res.name} ({res.country})
            </li>
          );
        })}
      </ul>
    </div>
  );
}
