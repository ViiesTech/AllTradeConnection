import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../utils';
import Signup from '../screens/auth/Signup';
import Login from '../screens/auth/Login';
import OTP from '../screens/auth/OTP';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ResetPassword from '../screens/auth/ResetPassword';
import SelectExperience from '../screens/auth/SelectExperience';
import CreateProfile from '../screens/auth/CreateProfile';
import SelectGender from '../screens/auth/SelectGender';
import AddLocation from '../screens/auth/AddLocation';

export type AuthParams = {
  Signup: undefined;
  Login: undefined;
  OTP: {
    type: string;
  };
  ResetPassword: undefined;
  SelectExperience: undefined;
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
      <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={ROUTES.RESET_PASSWORD} component={ResetPassword} />
      <Stack.Screen name={ROUTES.SELECT_EXPERIENCE} component={SelectExperience} />
      <Stack.Screen name={ROUTES.CREATE_PROFILE} component={CreateProfile} />
      <Stack.Screen name={ROUTES.SELECT_GENDER} component={SelectGender} />
      <Stack.Screen name={ROUTES.ADD_LOCATION} component={AddLocation} />
    </Stack.Navigator>
  );
};

export default AuthStack;

