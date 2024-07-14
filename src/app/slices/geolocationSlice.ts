import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

const initialGeolocation = JSON.parse(localStorage.getItem('geolocation'));

const initialState = {
  cityName: initialGeolocation.cityName || '',
  coords: {
    lon: initialGeolocation.coords.lon || 0,
    lat: initialGeolocation.coords.lat || 0,
  },
  changingCity: initialGeolocation ? false : true,
};

export const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    setCityName: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
    changeGeolocation: (state) => {
      state.changingCity = !state.changingCity;
    },
  },
});

export const { setCityName, changeGeolocation } = geolocationSlice.actions;
export default geolocationSlice.reducer;
