import React, {useState} from 'react';
import {View} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import {
  changePasswordFields,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from '../../../utils';
import CustomInputForm from '../../../components/InputField';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {changePassword} from '../../../GlobalFunctions/userMain';
import {useSelector} from 'react-redux';

const validationSchema = Yup.object().shape({
  oldpassword: Yup.string().required(),
  newpassword: Yup.string().required(),
  confirmpassword: Yup.string().required(),
});

const ChangePassword = () => {
  const nav = useNavigation();
  const [showPass, setShowPass] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state: RootState) => state.user.userData);

  const onSubmitHandler = async values => {
    // nav.navigate(ROUTES.CONGRATULATION, {
    //   changePassword: 'Change_pasword_success',
    // });
    if (isLoading) {
      return null;
    }

    setIsLoading(true);
    const res = await changePassword({
      id: userData?._id,
      password: values?.oldpassword,
      newPassword: values?.newpassword,
    });

    console.log({
      id: userData?._id,
      password: values?.oldpassword,
      newPassword: values?.newpassword,
    })

    if (res.success) {
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Password has been changed successfully',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to change password',
        text2: res?.message,
      });
      setIsLoading(false);
    }
  };

  return (
    <MainContainer>
      <Header2
        headerText3=""
        hideCancel
        text={'Change Password'}
        subHeading={'Please change password'}
      />

      <View style={{padding: responsiveHeight(2), paddingTop: 0}}>
        <CustomInputForm
          inputContainer={{width: responsiveWidth(90)}}
          buttonStyle={{width: responsiveWidth(90)}}
          inputStyle={{color: 'black'}}
          isSecure={showPass}
          setIsSecure={() => setShowPass(!showPass)}
          inputContainerStyle={{marginTop: responsiveHeight(0)}}
          onSubmit={values => onSubmitHandler(values)}
          initialValues={{
            oldpassword: '',
            newpassword: '',
            confirmpassword: '',
          }}
          isLoading={isLoading}
          validationSchema={validationSchema}
          buttonText="Save"
          fields={changePasswordFields}
        />
      </View>
    </MainContainer>
  );
};

export default ChangePassword;
