import { createSlice } from '@reduxjs/toolkit';

const driverLocationSlice = createSlice({
  name: 'driverLocation',
  initialState: {
    latitude: 0,
    longitude: 0,
  },
  reducers: {
    setDriverLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { setDriverLocation } = driverLocationSlice.actions;
export default driverLocationSlice.reducer;
