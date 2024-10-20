import { configureStore } from '@reduxjs/toolkit';
import rideRequestsReducer from './rideReqSlice';
import driverLocationReducer from './driverLocationSlice';

const store = configureStore({
    reducer: {
      rideRequests: rideRequestsReducer,
      driverLocation: driverLocationReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  export default store;
