import React from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import {
  myLocationFields,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from '../../../utils';
import MapCom from '../../../components/MapCom';
import Button from '../../../components/Button';
import CustomInputForm from '../../../components/InputField';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  apartment: Yup.string().required('Appartment is required'),
  city: Yup.string().required('City is required'),
  zipcode: Yup.string().required('Zip Code is required'),
});

const MyLocation = ({ route }) => {
  const nav = useNavigation();

  const screen = route?.params?.screen;
  const data = route?.params?.data;

  const onSubmitHandler = values => {
    const details = {
      myLocationDetails: values,
      postJobDetails: data,
    };
    nav.navigate(ROUTES.SElECT_SERVICE_ADDINAL, { details });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
      <MainContainer style={{flexGrow: 1}}>
        <Header2
          headerText3=""
          hideCancel
          text={screen ? '' : 'My Location'}
          subHeading={''}
        />

        <View style={{ padding: responsiveHeight(2.5), paddingTop: 0 }}>
          <MapCom isShowDirection={true} screen={screen} />
          {!screen && (
            <CustomInputForm
              inputContainer={{ width: responsiveWidth(90) }}
              buttonStyle={{ width: responsiveWidth(90) }}
              inputStyle={{ color: 'black' }}
              inputContainerStyle={{ marginTop: responsiveHeight(0) }}
              onSubmit={values => onSubmitHandler(values)}
              initialValues={{
                address: '',
                apartment: '',
                city: '',
                zipcode: '',
              }}
              validationSchema={validationSchema}
              buttonText="Next"
              fields={myLocationFields}
            />
          )}

          {screen && (
            <Button
              style={{ marginTop: responsiveHeight(2), width: responsiveWidth(90) }}
              buttonText={'Apply Location'}
              onPress={() => { }}
            />
          )}
        </View>
      </MainContainer>
    </KeyboardAvoidingView>
  );
};

export default MyLocation;
