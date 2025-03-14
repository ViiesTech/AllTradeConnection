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
  MAIN_STACK: 'MainStack',
  SIGNUP: 'Signup',
  GET_STARTED: 'GetStarted',
  LOGIN: 'Login',
  OTP: 'OTP',
  FORGOT_PASSWORD: 'ForgotPassword',
  RESET_PASSWORD: 'ResetPassword',
  SELECT_EXPERIENCE: 'SelectExperience',
  CREATE_PROFESSIONAL_PROFILE: 'CreateProfessionalProfile',
  CREATE_PROFILE_YOURSELF: 'CREATE_PROFILE_YOURSELF',
  CREATE_PROFILE: 'CreateProfile',
  SUBSCRIPTION_PACKAGES: 'SubscriptionPackages',
  GET_GOLD: 'GetGold',
  PROFESSIONALS_PAYMENTMETHOD: 'ProfessionalsPaymentMethod',
  ADD_NEW_CARD: 'AddNewCard',
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
  SUPPORT: 'Support',
  REPORT_JOB: 'ReportJob',
  MAP: 'Map',
  MY_JOBS: 'MyJobs',
  NOTIFICATION: 'Notification',
  PROFILE: 'Profile',
  POST_JOB: 'PostJob',
  POST_LOCATION_JOB: 'PostLocationJob',
  MY_LOCATION: 'MyLocation',
  SElECT_SERVICE_ADDINAL: 'SelectServiceAddinal',
  CONGRATULATION: 'Congratulation',
  LIST_OF_PRO: 'ListOfPro',
  CHAT_MESSAGES: 'ChatMessages',
  WALLET: 'Wallet',
  EDIT_PROFILE: 'EditProfile',
  CHANGE_PASSWORD: 'ChangePassword',
  SEE_ALL_REVIEWS: 'SeeAllReviews',
  GIVE_REVIEW: 'GiveReview',
  PAYMENT_METHODS: 'PaymentMethods',
  PAYMENT_METHOD_PAY: 'PaymentMethodPay',
  CONFIRM_PAYMENT: 'ConfirmPayment',
  TRANSACTION: 'Transaction',
  CASH_IN_PERSON: 'CashInPerson',
  PROPOSAL: 'Proposal',
  LOCATION_FILTER: 'LocationFilter',
  SKILLS: 'Skills',
  FILL_PROPOSAL: 'FillProposal',
  SUBSCRIBE_PACKAGES: 'SubscribePackages',
  PAYMENT_CARD: 'PaymentCard',
  ADD_NEW_BANK: 'AddNewBank',
  MY_BANK_ACCOUNT: 'MyBankAccount',
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

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
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

interface createProfileYourSelfTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  textAlign: string;
  line: boolean;
  height: number;
  multiline: boolean;
  dropdownIcon: boolean;
  tags?: { id: number; title: string }[];
}

export const createProfileYourSelfProfileFields: createProfileYourSelfTypes[] = [
  {
    name: 'postal code',
    placeholder: '1242312332',
    keyboardType: 'numeric',
    line: true,
  },
  {
    name: 'select service',
    placeholder: 'Plumbing',
    keyboardType: 'numeric',
    line: true,
    dropdownIcon: true,
    tags: [
      {id: 1, title: 'Plumbing'}, {id: 2, title: 'Plumbing'}
      ],
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

interface AddNewBankTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  line: boolean;
  multiline: boolean;
  dropdownIcon: boolean;
}

export const AddNewBankFields: AddNewBankTypes[] = [
  {
    name: 'bank name',
    placeholder: 'Dummy Bank',
    keyboardType: 'text',
    line: true,
    dropdownIcon: true,
  },
  {
    name: 'ac tittle',
    placeholder: 'James john',
    keyboardType: 'text',
    line: true,
    dropdownIcon: true,
  },
  {
    name: 'account number',
    placeholder: '523423423423',
    keyboardType: 'numeric',
    line: true,
  }
]

interface postTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  line: boolean;
}

export const postJobFields: postTypes[] = [
  {
    name: 'fullname',
    placeholder: 'Name',
    line: true,
  },
  {
    name: 'email',
    placeholder: 'Email',
    keyboardType: 'email-address',
    line: true
  },
  {
    name: 'number',
    placeholder: 'Phone Number',
    line: true,
    keyboardType: 'numeric',
  }
]

interface editProjectTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  line: boolean;
}

export const editProjectFields: editProjectTypes[] = [
  {
    name: 'address',
    placeholder: 'Street no 120 lorem ispum',
    line: true,
  },
  {
    name: 'apartment',
    placeholder: 'Apartment/Suite#',
    keyboardType: 'text',
    line: true
  },
]

interface editProjectCityTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  line: boolean;
}

export const editProjectCityFields: editProjectCityTypes[] = [
  {
    name: 'city',
    placeholder: 'New York',
    line: true,
  },
  {
    name: 'state',
    placeholder: 'California',
    keyboardType: 'text',
    line: true
  },
]

export const editProjectZipCodFields: editProjectCityTypes[] = [
  {
    name: 'zip code',
    placeholder: '12242354235',
    line: true,
  },
]

export const editProjectSerivceSecFields: editProjectCityTypes[] = [
  {
    name: 'price',
    placeholder: 'price',
    keyboardType: 'numeric',
    line: true
  },
  {
    name: 'select date',
    placeholder: 'date',
    line: true,
    keyboardType: 'time',
  },
]

interface myLocationTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  line: boolean;
}

export const myLocationFields: myLocationTypes[] = [
  {
    name: 'address',
    placeholder: 'Address',
    line: true,
  },
  {
    name: 'apartment/Suite#',
    placeholder: 'Apartment/Suite#',
    keyboardType: 'text',
    line: true
  },
  {
    name: 'city',
    placeholder: 'Now York',
    line: true,
    keyboardType: 'text',
  },
  {
    name: 'zip code',
    placeholder: '1234434322',
    line: true,
    keyboardType: 'numeric',
  }
]

interface giveReviewTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  line: boolean;
  multiline: boolean;
  textAlign: string;
  height: number;
}

export const giveReviewFields: giveReviewTypes[] = [
  {
    name: 'review',
    placeholder: 'Write a review',
    line: true,
    multiline: true,
    textAlign: 'top',
    height: responsiveHeight(15),
  },
]

interface changePasswordTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  line: boolean;
  secureTextEntry: boolean;
}

export const changePasswordFields: changePasswordTypes[] = [
  {
    name: 'old password',
    placeholder: '***********************877',
    line: true,
    secureTextEntry: true,
  },
  {
    name: 'new password',
    placeholder: '***********************877',
    keyboardType: 'text',
    line: true,
    secureTextEntry: true,
  },
  {
    name: 'confirm password',
    placeholder: '***********************877',
    line: true,
    keyboardType: 'text',
    secureTextEntry: true,
  },
]

interface editProfileTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  line: boolean;
  height?: number;
  multiline?: boolean;
  textAlign?: string;
}

export const editProfileFields: editProfileTypes[] = [
  {
    name: 'full name',
    placeholder: 'john smith',
    line: true,
  },
  {
    name: 'phone number',
    placeholder: '03234234234',
    keyboardType: 'text',
    line: true
  },
  {
    name: 'bio',
    placeholder: 'Bio',
    line: true,
    keyboardType: 'text',
    multiline: true,
    textAlign: 'top',
    height: responsiveHeight(15),
  },
]

interface editProfessionalProfileTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  line: boolean;
  height?: number;
  multiline?: boolean;
  textAlign?: string;
  tags?: { id: number; title: string }[];
  dropdownIcon: boolean;
}

export const editProfessionalProfileFields: editProfessionalProfileTypes[] = [
  {
    name: 'full name',
    placeholder: 'john smith',
    line: true,
  },
  {
    name: 'phone number',
    placeholder: '03234234234',
    keyboardType: 'numeric',
    line: true
  },
  {
    name: 'state',
    placeholder: 'California',
    keyboardType: 'text',
    line: true,
    dropdownIcon: true,
  },
  {
    name: 'zip code',
    placeholder: '03234234234',
    keyboardType: 'numeric',
    line: true
  },
  {
    name: 'postal code',
    placeholder: '03234234234',
    keyboardType: 'numeric',
    line: true
  },
  {
    name: 'select service',
    placeholder: 'Plumber',
    keyboardType: 'text',
    line: true,
    dropdownIcon: true,
    tags: [
      {id: 1, title: 'Plumbing'}, {id: 2, title: 'Plumbing'}
      ],
  },
  {
    name: 'address',
    placeholder: 'Street No 4567892 Lorem ispum',
    keyboardType: 'text',
    line: true
  },
  {
    name: 'bio',
    placeholder: 'Bio...',
    line: true,
    keyboardType: 'text',
    multiline: true,
    textAlign: 'top',
    height: responsiveHeight(15),
  },
]

interface confirmPaymentTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  line: boolean;
}

export const confirmPaymentFields: confirmPaymentTypes[] = [
  {
    name: 'payment type',
    placeholder: 'plumbing',
    line: true,
  },
  {
    name: 'phone number',
    placeholder: '03234234234',
    keyboardType: 'numeric',
    line: true
  },
  {
    name: 'name account',
    placeholder: 'john',
    keyboardType: 'text',
    line: true
  },
  {
    name: 'amount',
    placeholder: '$250.00',
    keyboardType: 'text',
    line: true
  },
  {
    name: 'fee',
    placeholder: '$120.00',
    keyboardType: 'text',
    line: true
  },
]

interface transactionFirstSectionTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  line: boolean;
}

export const transactionFirstSectionFields: transactionFirstSectionTypes[] = [
  {
    name: 'transaction date',
    placeholder: '25 Feb 2024, 13:22',
    line: true,
  },
  {
    name: 'service type',
    placeholder: 'Plumbing',
    keyboardType: 'text',
    line: true
  },
  {
    name: 'transaction iD',
    placeholder: 'WTR516515651190551',
    keyboardType: 'text',
    line: true
  },
]

interface professionalPaymentMethodTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  line: boolean;
}

export const professionalPaymentMethodFields: professionalPaymentMethodTypes[] = [
  {
    name: 'name',
    placeholder: 'Jordan Delgado',
    line: true,
  },
  {
    name: 'card number',
    placeholder: '***** ***** **** 789',
    keyboardType: 'numeric',
    line: true
  },
]

interface fillProposalTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  line: boolean;
  textAlign: string;
  height: number;
  multiline: boolean;
}

export const fillProposalFields: fillProposalTypes[] = [
  {
    name: 'fixed price',
    placeholder: '$45.00',
    line: true,
  },
  {
    name: 'proposal',
    placeholder: '',
    keyboardType: 'numeric',
    line: true,
    textAlign: 'top',
    multiline: true,
    height: responsiveHeight(20),
  },
]

interface addNewCardTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  line: boolean;
  dropdownIcon?: boolean;
}

export const addNewCardFields: addNewCardTypes[] = [
  {
    name: 'select bank',
    placeholder: 'US bank',
    line: true,
    dropdownIcon: true,
  },
  {
    name: 'account number',
    placeholder: '***** ***** **** 789',
    keyboardType: 'numeric',
    line: true
  },
  {
    name: 'card number',
    placeholder: '***** ***** **** 789',
    keyboardType: 'numeric',
    line: true
  },
  {
    name: 'CCV',
    placeholder: '***** ***** **** 789',
    keyboardType: 'numeric',
    line: true
  },
]

interface selectServiceAddionalTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  line: boolean;
  tags?: { id: number; title: string }[];
}

export const selectServiceAddionalFields: selectServiceAddionalTypes[] = [
  {
    name: 'add category',
    placeholder: 'category',
    line: true,
    tags: [
    {id: 1, title: 'Plumbing'}, {id: 2, title: 'Flooring'}
    ],
  },
  {
    name: 'price',
    placeholder: 'price',
    keyboardType: 'numeric',
    line: true
  },
  {
    name: 'select date',
    placeholder: 'date',
    line: true,
    keyboardType: 'time',
  },
]

interface supportTypes {
  name: string;
  placeholder: string;
  keyboardType: string;
  textAlign: string;
  line: boolean;
  height: number;
  multiline: boolean;
}

export const supportFields: supportTypes[] = [
  {
    name: 'fullname',
    placeholder: 'Full Name',
  },
  {
    name: 'email',
    placeholder: 'Email Address',
    keyboardType: 'email-address',
  },
  {
    name: 'number',
    placeholder: 'Phone Number',
    keyboardType: 'numeric',
  },
  {
    name: 'message',
    placeholder: 'Your Message',
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

interface searchTypes {
  name: string;
  placeholder: string;
  icon: string;
}

export const searchField: searchTypes[] = [
  {
    name: 'search',
    placeholder: 'Search...',
    icon: svgIcons.search,
  }
]

interface listSearchTypes {
  name: string;
  placeholder: string;
  icon: string;
}

export const listSearchField: listSearchTypes[] = [
  {
    name: 'search',
    placeholder: 'Search Pro...',
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

export const taskDetails: taskDetailTypes[] = [
  {
    id: 1,
    title: 'August/24/24',
    icon: svgIcons.calendar,
  },
  {
    id: 2,
    title: '9:00 PM',
    icon: svgIcons.clock,
  },
  {
    id: 3,
    title: 'Los Angeles',
    icon: svgIcons.location,
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
    navTo: ROUTES.MAIN_STACK,
  },
  {
    id: 2,
    title: 'Profile',
    icon: svgIcons.drawer_profile,
    navTo: ROUTES.PROFILE,
  },
  {
    id: 3,
    title: 'My Jobs',
    icon: svgIcons.drawer_jobs,
    navTo: ROUTES.MY_JOBS,
  },
  {
    id: 4,
    title: 'Wallet',
    icon: svgIcons.drawer_wallet,
    navTo: ROUTES.WALLET,
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
    navTo: ROUTES.SUPPORT,
  },
  {
    id: 9,
    title: 'Change Password',
    icon: svgIcons.drawer_password,
    navTo: ROUTES.CHANGE_PASSWORD,
  },
  {
    id: 10,
    title: 'Logout',
    icon: svgIcons.drawer_logout,
    navTo: ROUTES.AUTH_PROFILE_COMPLETE,
  },
];

interface reportListtypes {
  id: number,
  text: string,
};

export const reportList: reportListtypes[] = [
  {
    id: 1,
    text: `I'm Not Interested`,
  },
  {
    id: 2,
    text: `Fake Profile`,
  },
  {
    id: 3,
    text: `Spam`,
  },
  {
    id: 4,
    text: `Inappropriate Prompts`
  },
];


interface threadsTypes {
  id: number,
  image: ImageSourcePropType,
  name: string,
  icon: string,
  message: string,
};

export const chatThreads: threadsTypes[] = [
  {
    id: 1,
    name: `Michael John`,
    image: images.thread1,
    message: 'I’ll check it for a moment, please wait',
  },
  {
    id: 2,
    name: `Jonathan`,
    image: images.thread1,
    message: 'Ok will talk to you soon.',
    icon: svgIcons.check2,
  },
  {
    id: 3,
    name: `Lord Justin`,
    image: images.thread1,
    message: 'Thank you, I’ll make it up soon',
  },
  {
    id: 4,
    name: `Michael John`,
    image: images.thread1,
    message: 'I’ll check it for a moment, please wait',
  },
  {
    id: 5,
    name: `Jonathan`,
    image: images.thread1,
    message: 'Ok will talk to you soon.',
    icon: svgIcons.check2,
  },
  {
    id: 6,
    name: `Lord Justin`,
    image: images.thread1,
    message: 'Thank you, I’ll make it up soon',
  },
  {
    id: 7,
    name: `Michael John`,
    image: images.thread1,
    message: 'I’ll check it for a moment, please wait',
  },
];

interface notificationTypes {
  id: number,
  title: string,
  desc: string,
  time: string,
}

export const notificationsData: notificationTypes[] = [
  {
    id: 1,
    title: 'Congratulation',
    time: '12:44 am',
    desc: 'You have earned 1000 Points',
  },
  {
    id: 2,
    title: 'Task Completed',
    time: '12:44 am',
    desc: 'You have earned 1000 Points',
  },
  {
    id: 3,
    title: 'Task Completed',
    time: '12:44 am',
    desc: 'You have earned 1000 Points',
  },
  {
    id: 4,
    title: 'Task Completed',
    time: '12:44 am',
    desc: 'You have earned 1000 Points',
  },
  {
    id: 5,
    title: 'Task Completed',
    time: '12:44 am',
    desc: 'You have earned 1000 Points',
  },
  {
    id: 6,
    title: 'Task Completed',
    time: '12:44 am',
    desc: 'You have earned 1000 Points',
  },
  {
    id: 7,
    title: 'Task Completed',
    time: '12:44 am',
    desc: 'You have earned 1000 Points',
  },
];

interface categoryTypes {
  id: number;
  text: string;
};

export const categoryData: categoryTypes[] = [
  {
    id: 1,
    text: 'In Discussion',
  },
  {
    id: 2,
    text: 'Hired',
  },
  {
    id: 3,
    text: 'Done',
  },
  {
    id: 4,
    text: 'Reject',
  },
];

interface reviewTypes {
  id: number,
  image: ImageSourcePropType,
  name: string;
  desc: string;
  rating: string;
  days: string;
};

export const reviews: reviewTypes[] = [
  {
    id: 1,
    image: images.review1,
    name: 'James Andrew',
    desc: 'Many thanks to james he is professional, Cleaner..',
    rating: '5.0',
    days: '1 day ago',
  },
  {
    id: 2,
    image: images.review1,
    name: 'James Andrew',
    desc: 'Many thanks to james he is professional, Cleaner..',
    rating: '5.0',
    days: '1 day ago',
  },
  {
    id: 3,
    image: images.review1,
    name: 'James Andrew',
    desc: 'Many thanks to james he is professional, Cleaner..',
    rating: '5.0',
    days: '1 day ago',
  }
];

interface postJobTypes {
  id: number;
  image: ImageSourcePropType;
}

export const PostJobImages: postJobTypes[] = [
  {
    id: 1,
    image: images.certificate1,
  },
  {
    id: 2,
    image: images.certificate2,
  }
]






