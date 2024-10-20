import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateRideStatus } from '../redux/rideReqSlice';

const RideDetailsScreen = ({ route, navigation }: any) => {
  const { rideId } = route.params;
  const dispatch = useDispatch();

  // Using a selector to find the ride by ID
  const ride = useSelector((state: any) => 
    state.rideRequests.requests.find((r: any) => r.id === rideId)
  );

  // Handle accepting the ride
  const handleAccept = () => {
    dispatch(updateRideStatus({ rideId, status: 'accepted' }));
    navigation.goBack();
  };

  // Handle declining the ride
  const handleDecline = () => {
    dispatch(updateRideStatus({ rideId, status: 'declined' }));
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride Request Details</Text>

      {/* Display user details */}
      <DetailBox label="User Name" value={ride.user.name} />
      <DetailBox label="Phone" value={ride.user.phone} />
      <DetailBox 
        label="Pickup Location" 
        value={`${ride.pickupLocation.latitude}, ${ride.pickupLocation.longitude}`} 
      />
      <DetailBox 
        label="Destination" 
        value={`${ride.destination.latitude}, ${ride.destination.longitude}`} 
      />
      <DetailBox label="Status" value={ride.status} />

      {/* Action buttons */}  
      <View style={styles.buttonContainer}>
        <ActionButton title="Accept Ride" onPress={handleAccept} style={styles.acceptButton} />
        <ActionButton title="Decline Ride" onPress={handleDecline} style={styles.declineButton} />
      </View>
    </View>
  );
};

// Component for rendering detail boxes
const DetailBox = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailBox}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

// Component for rendering action buttons
const ActionButton = ({ title, onPress, style }: { title: string; onPress: () => void; style?: any }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

// Styles for the components
const styles = StyleSheet.create({
  container: {  
    flex: 1,
    padding: "4%",
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  detailBox: {
    padding: "4%",
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: "2%",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: "4%",
  },
  button: {
    flex: 1,
    paddingVertical: "4%",
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: "2%",
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  declineButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default RideDetailsScreen;
