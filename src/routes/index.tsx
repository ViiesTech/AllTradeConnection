import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from '../utils';
import AuthStack from './AuthStack';
import AppStatusBar from '../components/AppStatusBar';

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  return (
    <>
    <AppStatusBar />
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={ROUTES.AUTHSTACK} component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};

export default Routes;
