import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  cityName: '',
  coords: {
    lon: 0,
    lat: 0,
  },
  changingCity: true,
};

export const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    setCityName: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
    setCurrentLocation: (state, action: PayloadAction<object>) => {},
    changeGeolocation: (state) => {
      state.changingCity = !state.changingCity;
    },
  },
});

export const { setCityName, changeGeolocation } = geolocationSlice.actions;
export default geolocationSlice.reducer;
