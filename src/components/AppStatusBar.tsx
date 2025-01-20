import {StatusBar} from 'react-native';
import React from 'react';

const AppStatusBar = () => {
  return (
    <StatusBar
      backgroundColor={'transparent'}
      barStyle={'dark-content'}
      translucent={true}
    />
  );
};

export default AppStatusBar;
