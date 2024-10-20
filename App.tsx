import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import RideDetailsScreen from './src/screens/RideDetailsScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <View style={{flex:1}}>
      <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="RideDetails" component={RideDetailsScreen} />

        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    </View>
  )
}

const styles = StyleSheet.create({})