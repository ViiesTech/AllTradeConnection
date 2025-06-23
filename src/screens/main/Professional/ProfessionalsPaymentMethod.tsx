/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import {
  professionalPaymentMethodFields,
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
  ROUTES,
} from '../../../utils';
import svgIcons from '../../../assets/icons';
import { images } from '../../../assets/images';
import { colors } from '../../../assets/colors';
import SVGXml from '../../../components/SVGXml';
import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import CheckBoxText from '../../../components/CheckBoxText';
import CustomInputForm from '../../../components/InputField';
import * as Yup from 'yup';

const cardData = [
  { id: '1', icon: svgIcons.plus, isImage: false },
  { id: '2', icon: images.visa, isImage: true },
  { id: '3', icon: images.master, isImage: true },
];

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  cardnumber: Yup.string(),
});

const ProfessionalsPaymentMethod = () => {
  const nav = useNavigation();

  return (
    <MainContainer>
      <Header2 headerText3='' hideCancel text='Payment Method' subHeading='' />

      <View style={{ padding: responsiveHeight(2.5), paddingTop: 0, gap: 20 }}>
        <FlatList
          data={cardData}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 20 }}
          renderItem={({ item }) => (
            <View>
              {item.isImage ? (
                <Image source={item.icon} resizeMode='contain' style={{ height: 160,  }} />
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.primary,
                    padding: responsiveHeight(8),
                    paddingHorizontal: responsiveWidth(5),
                    borderRadius: 10,
                  }}
                >
                  <SVGXml width={'30'} height={'30'} icon={item.icon} />
                </TouchableOpacity>
              )}
            </View>
          )}
        />

        <CustomInputForm
          hideButton
          inputContainer={{ width: responsiveWidth(90) }}
          buttonStyle={{ width: responsiveWidth(80) }}
          inputStyle={{ color: 'black' }}
          inputContainerStyle={{ marginTop: responsiveHeight(0) }}
          onSubmit={(values) => nav.navigate(ROUTES.ADD_NEW_CARD)}
          initialValues={{
            name: 'Jordan Delgado',
            cardnumber: '***** ***** **** 789',
          }}
          validationSchema={validationSchema}
          buttonText=''
          fields={professionalPaymentMethodFields}
        />

        <View style={styles.inputContainerWrapper}>
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{'Expiry Date'}</Text>
              <TextInput
                style={styles.input}
                placeholder='10-27-2025'
                placeholderTextColor={colors.black}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{'CVV'}</Text>
              <TextInput
                style={styles.input}
                placeholder='*******'
                placeholderTextColor={colors.black}
              />
            </View>
          </View>
        </View>

        <CheckBoxText text='Save Detail Information' />

        <Button
          style={{ width: responsiveWidth(90) }}
          onPress={() => nav.navigate(ROUTES.ADD_NEW_CARD)}
          buttonText='Continue'
        />
      </View>
    </MainContainer>
  );
};

export default ProfessionalsPaymentMethod;

const styles = StyleSheet.create({
  inputContainerWrapper: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(90),
    gap: 20,
  },
  inputContainer: {
    flex: 1,
    borderWidth: 0.1,
    borderRadius: 10,
    paddingHorizontal: responsiveHeight(2),
    backgroundColor: colors.secondary,
    borderColor: colors.black,
    width: responsiveWidth(30),
  },
  input: {
    flex: 1,
    borderRadius: 8,
    padding: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
    color: colors.black,
    marginTop: -7,
    marginLeft: -15,
  },
  label: {
    marginTop: responsiveHeight(1),
    color: colors.gray,
    textTransform: 'capitalize',
  },
  errorInput: {
    borderColor: colors.red,
    borderWidth: 1,
  },
});
