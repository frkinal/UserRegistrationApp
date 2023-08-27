import * as React from 'react';
import {HomeScreen, ProfileScreen} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const UserStack = () => {
  return (
    <>
      <Stack.Screen name="home-screen" component={HomeScreen} />
      <Stack.Screen name="profile-screen" component={ProfileScreen} />
    </>
  );
};
