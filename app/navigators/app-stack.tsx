import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppDrawerNavigator, AuthStack} from './';
import {useSelector} from 'react-redux';
import {SplashScreen} from '../screens';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  const {authanticated} = useSelector((state: any) => state.user);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {authanticated === '1' ? (
          <Stack.Screen name="drawer" component={AppDrawerNavigator} />
        ) : authanticated === '0' ? (
          <Stack.Screen name="auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="splash-screen" component={SplashScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
