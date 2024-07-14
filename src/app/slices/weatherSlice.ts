import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  temp: 0,
  feelsLike: 0,
  humidity: 0,
  icon: '',
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
    },
  },
});

export const { setWeatherInformation } = weatherSlice.actions;

export default weatherSlice.reducer;
