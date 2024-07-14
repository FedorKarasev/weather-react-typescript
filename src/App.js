import SearchPanel from './components/SearchPanel';
import WeatherInformation from './components/WeatherInformation.js';
import './App.css';

import { useAppSelector } from './app/hooks/redux.ts';

function App() {
  const { changingCity } = useAppSelector((state) => state.geolocation);

  return <>{changingCity === true ? <SearchPanel /> : <WeatherInformation />}</>;
}

export default App;
