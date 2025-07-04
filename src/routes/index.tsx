import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from '../utils';
import AuthStack from './AuthStack';
import AppStatusBar from '../components/AppStatusBar';
import DrawerStack from './DrawerStack';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import TaskDetail from '../screens/main/User/TaskDetail';
import Login from '../screens/auth/Login';
import AddLocation from '../screens/auth/AddLocation';

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  const token = useSelector((state: RootState) => state?.user?.token);

  return (
    <>
      <AppStatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {token ? (
            <Stack.Screen name={ROUTES.DRAWER_STACK} component={DrawerStack} />
          ) : (
            <Stack.Screen name={ROUTES.AUTHSTACK} component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default Routes;
