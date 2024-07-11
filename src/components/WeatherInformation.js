export default function WeatherInformation() {
  return (
    <div className='weather-information'>
      <div className='weather-information_weather-icon-container'>
        <img src='' alt='' className='weather-icon' />
      </div>
      <div className='weather-information_temperature'>
        19<span>°C</span>
      </div>
      <div className='weather-information_city'>
        <div className='city-name'>Moscow</div>
        <button id='changeCityBtn'>Change city</button>
      </div>
      <div className='weather-information_additional'>
        <div className='weather-information__wind'>2 m/s</div>
        <div className='weather-information__feels-like'>19 °C</div>
        <div className='weather-information__humidity'>83 %</div>
      </div>
    </div>
  );
}
