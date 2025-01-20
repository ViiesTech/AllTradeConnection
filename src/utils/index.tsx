import {Dimensions} from 'react-native';
import * as Yup from 'yup';
import svgIcons from '../assets/icons';

interface RoutePaths {
  AUTHSTACK: string;
  SIGNUP: string;
  LOGIN: string;
  OTP: string;
}

export const ROUTES: RoutePaths = {
  AUTHSTACK: 'AuthStack',
  SIGNUP: 'Signup',
  LOGIN: 'Login',
  OTP: 'OTP'
};

const percentageCalculation = (max: number, val: number): number =>
  max * (val / 100);

const fontCalculation = (
  height: number,
  width: number,
  val: number,
): number => {
  const widthDimension = height > width ? width : height;
  const aspectRatioBasedHeight = (16 / 9) * widthDimension;
  return percentageCalculation(
    Math.sqrt(
      Math.pow(aspectRatioBasedHeight, 2) + Math.pow(widthDimension, 2),
    ),
    val,
  );
};
export const responsiveFontSize = (f: number): number => {
  const {height, width} = Dimensions.get('window');
  return fontCalculation(height, width, f);
};
export const responsiveHeight = (h: number): number => {
  const {height} = Dimensions.get('window');
  return height * (h / 100);
};
export const responsiveWidth = (w: number): number => {
  const {width} = Dimensions.get('window');
  return width * (w / 100);
};

interface signupFieldsTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  secureTextEntry?: boolean;
  icon: string;
}

export const signupFields: signupFieldsTypes[] = [
  {
    name: 'email',
    placeholder: 'Exampleemail@gmail.com',
    keyboardType: 'email-address',
    icon: svgIcons.email,
  },
  {
    name: 'phone',
    placeholder: '1234567890',
    keyboardType: 'numeric',
    icon: svgIcons.call,
  },
  {
    name: 'password',
    placeholder: '*********',
    keyboardType: 'default',
    secureTextEntry: true,
    icon: svgIcons.lock,
  },
  {
    name: 'cPassword',
    placeholder: '*********',
    keyboardType: 'default',
    secureTextEntry: true,
    icon: svgIcons.lock,
  },
];

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Phone number is not valid')
    .required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  cPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const loginFields: signupFieldsTypes[] = [
  {
    name: 'email',
    placeholder: 'Exampleemail@gmail.com',
    keyboardType: 'email-address',
    icon: svgIcons.email,
  },
  {
    name: 'password',
    placeholder: '*********',
    keyboardType: 'default',
    secureTextEntry: true,
    icon: svgIcons.lock,
  },
];
