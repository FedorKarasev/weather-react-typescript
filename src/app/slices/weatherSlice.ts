import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialWeather = JSON.parse(localStorage.getItem('weather'));

const initialState = {
  name: initialWeather?.name || '',
  temp: initialWeather?.temp || 0,
  feelsLike: initialWeather?.feelsLike || 0,
  humidity: initialWeather?.humidity || 0,
  icon: initialWeather?.icon || '',
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherInformation: (state, action: PayloadAction<object>) => {
      state.name = action.payload.name;
      state.temp = Math.round(action.payload.main.temp);
      state.feelsLike = Math.round(action.payload.main.feels_like);
      state.humidity = Math.round(action.payload.main.humidity);
      state.icon = action.payload.weather[0].icon;

      localStorage.setItem('weather', JSON.stringify(state));
    },
  },
});

export const { setWeatherInformation } = weatherSlice.actions;

export default weatherSlice.reducer;
