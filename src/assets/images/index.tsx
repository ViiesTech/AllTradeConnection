import { ImageSourcePropType } from 'react-native';

interface ImageTypes {
  logo: ImageSourcePropType;
  splash_background: ImageSourcePropType;
  splash_background2: ImageSourcePropType;
  otp: ImageSourcePropType;
  forgot: ImageSourcePropType;
  exp1: ImageSourcePropType;
  exp2: ImageSourcePropType;
  background: ImageSourcePropType;
  female: ImageSourcePropType;
  map: ImageSourcePropType;
}

export const images: ImageTypes = {
  logo: require('../images/logo.png'),
  splash_background: require('../images/splash_background.png'),
  splash_background2: require('../images/splash_background2.png'),
  otp: require('../images/otp.png'),
  forgot: require('../images/forgot.png'),
  exp1: require('../images/exp1.png'),
  exp2: require('../images/exp2.png'),
  female: require('../images/female.png'),
  background: require('../images/background.png'),
  map: require('../images/map.png'),
};
