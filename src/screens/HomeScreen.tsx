import { PermissionsAndroid , StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { setRideRequests } from '../redux/rideReqSlice';
import Geolocation from 'react-native-geolocation-service';
import { mockRequests } from '../Utils/DummyData';

export default function HomeScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const rideRequests = useSelector((state: any) => state.rideRequests.requests);
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    dispatch(setRideRequests(mockRequests));
    getLocation();
  }, [dispatch]);



  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error('Location permission error', err);
      return false;
    }
  };

  const getLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      Geolocation.getCurrentPosition(
        (position) => setLocation(position),
        (error) => console.error('Geolocation error', error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  };

  return location ? (
    <MapView
      style={styles.map}
      followsUserLocation
      region={{
        latitude: location?.coords?.latitude || 0,
        longitude: location?.coords?.longitude || 0,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      showsUserLocation
    >
      {rideRequests.map((request: any) => (
        <Marker
          key={request.id}
          coordinate={request.pickupLocation}
          pinColor={
            request.status === 'pending'
              ? 'orange'
              : request.status === 'accepted'
              ? 'green'
              : 'red'
          }
        >

          <Callout onPress={() => navigation.navigate('RideDetails', { rideId: request.id })}>
            <View style={styles.callout}>
              <Text style={styles.calloutTitle}>{request.pickupLocation.name}</Text>
              <Text style={styles.calloutText}>Status:  {request.status}</Text>
              <Text style={styles.calloutText}>Destination: {request.destination.name}</Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  ) : null;
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
  callout: {
    padding: "4%",
    height:100,
    width:200
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5, 
  },
  calloutText: {
    fontSize: 14,
    color: '#555',
  },
});
