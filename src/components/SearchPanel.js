import { useEffect, useState } from 'react';

export default function SearchPanel() {
  const APIkey = '5131f785595a7dbb2e5f721c00417bf6';

  const [cityName, setCityName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({ lat: '', lon: '' });

  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);

  const searchCity = async () => {
    const limit = 5;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${APIkey}`;

    const res = await fetch(url);
    const data = await res.json();
    console.log(data[0]);

    setSearchResults(data);
  };

  useEffect(() => {
    if (!cityName) return;

    let timerId = setTimeout(searchCity, 800);

    return () => clearTimeout(timerId);
  }, [cityName]);

  const inputCityNameHandler = (event) => {
    setCityName(event.target.value);
  };

  const getCurrentPositionHandler = () => {
    const success = (pos) => {
      setCurrentLocation({ lat: pos.coords.lat, lon: pos.coords.lon });
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

    setTemperature(weatherData.main.temp);
    setSearchResults([]);

    console.log(weatherData);
  };

  return (
    <div className='search-panel'>
      <form action=''>
        <input
          id='searchInput'
          type='text'
          placeholder='Enter city...'
          value={cityName}
          onInput={inputCityNameHandler}
        />
        <button onClick={getCurrentPositionHandler} id='currentLocation'>
          <img className='currentLocationIcon' src='/location.png' alt='Change location to current' />
        </button>
        <button className='search-city-button' type='submit'>
          Search
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
