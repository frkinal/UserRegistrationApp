import * as React from 'react';
import {
  CarrierScreen,
  EducationScreen,
  KVKKScreen,
  LoginScreen,
  RegisterScreen,
  ResumeScreen,
} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="login-screen" component={LoginScreen} />
      <Stack.Screen name="register-screen" component={RegisterScreen} />
      <Stack.Screen name="carrier-screen" component={CarrierScreen} />
      <Stack.Screen name="education-screen" component={EducationScreen} />
      <Stack.Screen name="resume-screen" component={ResumeScreen} />
      <Stack.Screen name="kvkk-screen" component={KVKKScreen} />
    </Stack.Navigator>
  );
};
