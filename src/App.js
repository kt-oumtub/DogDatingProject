import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="AddDog" component={AddDog} />
        <Stack.Screen name="DogProfile" component={DogProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="EditDogProfile" component={EditDogProfile} /> */}

        {/* Guset */}
        {/* <Stack.Screen name="GuestHome" component={GuestHome} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
