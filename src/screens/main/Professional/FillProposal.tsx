/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
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
import {
  createProposal,
  getProposalByProjectIdAndProfessionalId,
  getProposalsByProjectIdAndStatus,
  updateProposal,
} from '../../../GlobalFunctions/userMain';
import Toast from 'react-native-toast-message';
import {colors} from '../../../assets/colors';

const validationSchema = Yup.object().shape({
  price: Yup.string(),
  proposal: Yup.string(),
});

const FillProposal = ({route}) => {
  const professionalId = route?.params?.professionalId;
  const projectId = route?.params?.projectId;
  const update = route?.params?.update;
  const nav = useNavigation();
  const [isLoading, setIsloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState(false);

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

  const updateOnSubmit = async values => {
    setIsloading(true);
    const res = await updateProposal({
      id: getData?._id,
      price: values?.price,
      proposal: values?.proposal,
    });

    if (res?.success) {
      setIsloading(false);
      nav.navigate(ROUTES.MAIN_STACK, {screen: 'BottomStack'});
      Toast.show({
        type: 'success',
        text1: 'Successfully Updated',
        text2: res?.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to update proposal',
        text2: res?.message,
      });
      setIsloading(false);
    }
  };

  const getProposalByProposalId = async (projectId, professionalId) => {
    setLoading(true);
    const res = await getProposalByProjectIdAndProfessionalId({
      projectId: projectId,
      proProfileId: professionalId,
    });

    if (res?.success) {
      setGetData(!!res?.data?.length ? res?.data[0] : []);
      setLoading(false);
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Failed to fetch proposal',
        text2: res?.message,
      });
    }
  };

  useEffect(() => {
    if (update) {
      getProposalByProposalId(projectId, professionalId);
    }
  }, [update, route?.params]);

  return (
    <MainContainer>
      <Header2
        headerText3=""
        hideCancel
        text={update ? 'Edit Proposal' : 'Fill This Proposal'}
        subHeading={'Enter Your Details'}
      />

      {loading ? (
        <ActivityIndicator size={'large'} color={colors.primary} />
      ) : (
        <View style={{padding: responsiveHeight(2.8), paddingTop: 0}}>
          <CustomInputForm
            inputContainer={{width: responsiveWidth(90)}}
            buttonStyle={{width: responsiveWidth(80)}}
            inputStyle={{color: 'black'}}
            inputContainerStyle={{marginTop: responsiveHeight(0)}}
            onSubmit={values => {
              if(update){
                updateOnSubmit(values);
              }else {
                onSubmit(values);
              }
            }}
            initialValues={{
              price: getData ? JSON.stringify(getData?.price) : '',
              proposal: getData ? getData?.proposal : '',
            }}
            validationSchema={validationSchema}
            buttonText={update ? 'Update & Save' : 'Submit Now'}
            isLoading={isLoading}
            fields={fillProposalFields}
          />
        </View>
      )}

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
