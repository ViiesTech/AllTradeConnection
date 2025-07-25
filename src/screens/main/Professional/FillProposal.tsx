/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import {
  fillProposalFields,
  professionalPaymentMethodFields,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from '../../../utils';
import Button from '../../../components/Button';
import CustomInputForm from '../../../components/InputField';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {createProposal} from '../../../GlobalFunctions/userMain';
import Toast from 'react-native-toast-message';

const validationSchema = Yup.object().shape({
  price: Yup.string(),
  proposal: Yup.string(),
});

const FillProposal = ({route}) => {
  const professionalId = route?.params?.professionalId;
  const projectId = route?.params?.projectId;
  const nav = useNavigation();
  const [isLoading, setIsloading] = useState(false);

  const onSubmit = async values => {
    // nav.navigate(ROUTES.MY_JOBS)
    setIsloading(true);
    const res = await createProposal({
      projectId: projectId,
      proProfileId: professionalId,
      price: values?.price,
      proposal: values?.proposal,
    });

    if (res?.success) {
      setIsloading(false);
      nav.navigate(ROUTES.MAIN_STACK, {screen: 'BottomStack'});
      Toast.show({
        type: 'success',
        text1: 'Successfully submitted',
        text2: res?.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to submit proposal',
        text2: res?.message,
      });
      setIsloading(false);
    }
  };

  return (
    <MainContainer>
      <Header2
        headerText3=""
        hideCancel
        text={'Fill This Proposal'}
        subHeading={'Enter Your Details'}
      />

      <View style={{padding: responsiveHeight(2.8), paddingTop: 0}}>
        <CustomInputForm
          inputContainer={{width: responsiveWidth(90)}}
          buttonStyle={{width: responsiveWidth(80)}}
          inputStyle={{color: 'black'}}
          inputContainerStyle={{marginTop: responsiveHeight(0)}}
          onSubmit={values => onSubmit(values)}
          initialValues={{
            price: '',
            proposal: '',
          }}
          validationSchema={validationSchema}
          buttonText="Submit Now"
          isLoading={isLoading}
          fields={fillProposalFields}
        />
      </View>

      {/* <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: responsiveHeight(2),
        }}>
        <Button
          style={{marginTop: responsiveHeight(3.5), width: responsiveWidth(90)}}
          onPress={() => nav.navigate(ROUTES.MY_JOBS)}
          buttonText="Submit Now"
        />
      </View> */}
    </MainContainer>
  );
};

export default FillProposal;
