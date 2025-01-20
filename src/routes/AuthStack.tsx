import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from '../utils';
import Signup from '../screens/auth/Signup';
import Login from '../screens/auth/Login';
import OTP from '../screens/auth/OTP';

export type AuthParams = {
  Signup: undefined;
  Login: undefined;
  OTP: undefined;
};

const Stack = createNativeStackNavigator<AuthParams>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={ROUTES.SIGNUP} component={Signup} />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.OTP} component={OTP} />
    </Stack.Navigator>
  );
};

export default AuthStack;

