import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice.ts';
import geolocationReducer from './slices/geolocationSlice.ts';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    geolocation: geolocationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
