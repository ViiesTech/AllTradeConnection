import {ImageSourcePropType} from 'react-native';

interface ImageTypes {
  logo: ImageSourcePropType;
  splash_background: ImageSourcePropType;
  splash_background2: ImageSourcePropType;
  otp: ImageSourcePropType;
}

export const images: ImageTypes = {
  logo: require('../images/logo.png'),
  splash_background: require('../images/splash_background.png'),
  splash_background2: require('../images/splash_background2.png'),
  otp: require('../images/otp.png')
};
