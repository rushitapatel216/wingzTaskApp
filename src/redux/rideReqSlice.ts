import { createSlice } from '@reduxjs/toolkit';

interface Ride {
  id: string;
  userId: string;
  driverId: string | null;
  pickupLocation: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  status: 'pending' | 'accepted' | 'declined';
  pickupTime: Date;
  timestamp: Date;
}

interface RideState {
  requests: Ride[];
  selectedRide: Ride | null;
}
 
const initialState: RideState = {
  requests: [],
  selectedRide: null,
};

const rideRequestsSlice = createSlice({
  name: 'rideRequests',
  initialState,
  reducers: {
    setRideRequests: (state, action) => {
      state.requests = action.payload;
    },
    selectRideRequest: (state, action) => {
      state.selectedRide = action.payload;
    },
    updateRideStatus: (state, action) => {
      const { rideId, status } = action.payload;
      const ride = state.requests.find(r => r.id === rideId);
      if (ride) ride.status = status;
    },
  },
});

export const { setRideRequests, selectRideRequest, updateRideStatus } = rideRequestsSlice.actions;
export default rideRequestsSlice.reducer;
