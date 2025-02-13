import { Dimensions, ImageSourcePropType } from 'react-native';
import * as Yup from 'yup';
import svgIcons from '../assets/icons';
import { images } from '../assets/images';
interface RoutePaths {
  [key: string]: string;
}

export const ROUTES: RoutePaths = {
  AUTHSTACK: 'AuthStack',
  DRAWER_STACK: 'DrawerStack',
  SIGNUP: 'Signup',
  LOGIN: 'Login',
  OTP: 'OTP',
  FORGOT_PASSWORD: 'ForgotPassword',
  RESET_PASSWORD: 'ResetPassword',
  SELECT_EXPERIENCE: 'SelectExperience',
  CREATE_PROFILE: 'CreateProfile',
  SELECT_GENDER: 'SelectGender',
  ADD_LOCATION: 'AddLocation',
  AUTH_INTRO: 'AuthIntro',
  AUTH_PROFILE_COMPLETE: 'AuthProfileComplete',
  USER_STACK: 'UserStack',
  HOME: 'Home',
  MESSAGE: 'Message',
  PROJECT: 'Project',
  PROFILE: 'Profile',
  TASK_DETAIL: 'TaskDetail',
  TERMS_CONDITIONS: 'TermsConditions',
  PRIVACY_POLICY: 'PrivacyPolicy',
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
  const { height, width } = Dimensions.get('window');
  return fontCalculation(height, width, f);
};
export const responsiveHeight = (h: number): number => {
  const { height } = Dimensions.get('window');
  return height * (h / 100);
};
export const responsiveWidth = (w: number): number => {
  const { width } = Dimensions.get('window');
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
]

export const forgotFields: signupFieldsTypes = [
  {
    name: 'email',
    placeholder: 'Exampleemail@gmail.com',
    keyboardType: 'email-address',
    icon: svgIcons.email,
  },
]

export const resetPasswordFields: signupFieldsTypes = [
  {
    name: 'password',
    placeholder: '*********',
    keyboardType: 'default',
    icon: svgIcons.lock,
    secureTextEntry: true,
  },
  {
    name: 'cPassword',
    placeholder: '*********',
    keyboardType: 'default',
    icon: svgIcons.lock,
    secureTextEntry: true,
  },
]

interface experienceTypes {
  id: number,
  image: ImageSourcePropType;
  text: string;
};

export const AllExperiences: experienceTypes[] = [
  {
    id: 1,
    image: images.exp1,
    text: 'User'
  }, {
    id: 2,
    image: images.exp2,
    text: 'Pro'
  },
];

interface createTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  icon: string;
  textAlign: string;
  line: boolean;
  height: number;
  multiline: boolean;
}

export const createProfileFields: createTypes[] = [
  {
    name: 'fullname',
    placeholder: 'Full Name',
    icon: svgIcons.user
  },
  {
    name: 'number',
    placeholder: 'Contact Number',
    keyboardType: 'numeric',
    icon: svgIcons.call,
  },
  {
    name: 'bio',
    placeholder: 'Bio',
    textAlign: 'top',
    line: true,
    multiline: true,
    height: responsiveHeight(20)
  }
]

interface genderTypes {
  id: number,
  image: ImageSourcePropType;
  text: string;
};

export const Genders: genderTypes[] = [
  {
    id: 1,
    image: images.exp1,
    text: 'Male'
  }, {
    id: 2,
    image: images.female,
    text: 'Female'
  },
];

interface locationTypes {
  name: string;
  placeholder: string;
  icon: string;
}

export const locationField: locationTypes[] = [
  {
    name: 'location',
    placeholder: 'Search Location',
    icon: svgIcons.search,
  }
]

interface locationInfoTypes {
  id: number;
  heading: string;
  text: string;
}

export const locationData: locationInfoTypes[] = [
  {
    id: 1,
    heading: 'Location Name',
    text: 'Home'
  },
  {
    id: 2,
    heading: 'Complete Address',
    text: 'Street lorem ispum'
  }, 
  {
    id: 3,
    heading: 'Zip Code',
    text: '1234567890'
  },
  {
    id: 4,
    heading: 'City',
    text: 'New York'
  }
]

interface slideTypes {
  key: number;
  title: string;
  text: string;
  image: ImageSourcePropType;
};

export const slides: slideTypes = [
  {
    key: 1,
    title: 'How To Use',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor exercitation.',
    image: images.slide1,
  },
  {
    key: 2,
    title: 'Instructions',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor exercitation.',
    image: images.slide2,
  },
  {
    key: 3,
    title: 'Features',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor exercitation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor exercitation.',
    image: images.slide3,
  },
];

interface taskDetailTypes {
  id: number,
  title: string,
  icon: string,
};

export const taskDetails:  taskDetailTypes[] = [
  {
    id: 1,
    title: 'August/24/24',
    icon:  svgIcons.calendar,
   },
   {
    id: 2,
    title: '9:00 PM',
    icon:  svgIcons.clock,
   },
   {
    id: 3,
    title: 'Los Angeles',
    icon:  svgIcons.location,
   },
];

interface Tasktypes {
  id: number,
  title: string,
  image: ImageSourcePropType,
  price: string,
  desc: string,
};

export const multipleTasks: Tasktypes[] = [
  {
    id: 1,
    image: images.task1,
    title: 'Task Name',
    desc: 'We are looking for a Senior Plumber • Install, repair, and maintain pipes, valves, fittings, drainage systems, and fixtures.',
    price: '$455',
  },
  {
    id: 2,
    image: images.task1,
    title: 'Task Name',
    desc: 'We are looking for a Senior Plumber • Install, repair, and maintain pipes, valves, fittings, drainage systems, and fixtures.',
    price: '$455',
  },
  {
    id: 3,
    image: images.task1,
    title: 'Task Name',
    desc: 'We are looking for a Senior Plumber • Install, repair, and maintain pipes, valves, fittings, drainage systems, and fixtures.',
    price: '$455',
  },
];

interface drawerItemsTypes {
  id: 1,
  icon: string,
  title: string,
  navTo: string;
};

export const drawerItems: drawerItemsTypes[] = [
  {
    id: 1,
    title: 'Home',
    icon: svgIcons.drawer_home,
    navTo: 'Home',
  },
  {
    id: 2,
    title: 'Profile',
    icon: svgIcons.drawer_profile,
    navTo: '',
  }, 
   {
    id: 3,
    title: 'My Jobs',
    icon: svgIcons.drawer_jobs,
    navTo: '',
  },
  {
    id: 4,
    title: 'Wallet',
    icon: svgIcons.drawer_wallet,
    navTo: '',
  },
  {
    id: 5,
    title: 'Chat',
    icon: svgIcons.drawer_chat,
    navTo: '',
  },
  {
    id: 6,
    title: 'Privacy Policy',
    icon: svgIcons.drawer_privacy,
    navTo: ROUTES.PRIVACY_POLICY,
  },
  {
    id: 7,
    title: 'Terms & Conditions',
    icon: svgIcons.drawer_terms,
    navTo: ROUTES.TERMS_CONDITIONS,
  },
  {
    id: 8,
    title: 'Report a Problem',
    icon: svgIcons.drawer_report,
    navTo: '',
  },
  {
    id: 9,
    title: 'Change Password',
    icon: svgIcons.drawer_password,
    navTo: '',
  },
  {
    id: 10,
    title: 'Logout',
    icon: svgIcons.drawer_logout,
  }
];






