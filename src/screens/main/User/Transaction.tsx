import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import { confirmPaymentFields, responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES, transactionFirstSectionFields } from '../../../utils';
import { colors } from '../../../assets/colors';
import CustomInputForm from '../../../components/InputField';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import svgIcons from '../../../assets/icons';
import SVGXml from '../../../components/SVGXml';
import Button from '../../../components/Button';

const validationSchema = Yup.object().shape({
    paymenttype: Yup.string(),
    phonenumber: Yup.string(),
    nameaccount: Yup.string(),
    account: Yup.string(),
    fee: Yup.string(),
})

const Transaction = () => {
            const nav = useNavigation()
    
  return (
    <MainContainer>
    <Header2 headerText3='' hideCancel text={''} subHeading={''} />

    <View style={{padding: responsiveHeight(3), }}>
        <View style={{gap: 10, marginBottom: responsiveHeight(1), justifyContent: 'center', alignItems: 'center'}}>
        <View style={{backgroundColor: colors.gray, padding: responsiveHeight(2), borderRadius: 100, marginBottom: responsiveHeight(2)}}>
            <View style={{backgroundColor: 'green', padding: responsiveHeight(1), borderRadius: 100}}>
            <SVGXml width={'20'} height={'20'} icon={svgIcons.checkWhite} />
            </View>
        </View>
        <Text style={{fontSize: responsiveFontSize(3), color: colors.black, fontWeight: 'bold'}}>Transaction Successfully</Text>
        <Text style={{fontSize: responsiveFontSize(1.8), color: colors.gray}}>You Have Successfully Transferred $228</Text>
        </View>
        
        <View style={{width: responsiveWidth(80), alignSelf: 'center', marginVertical: responsiveHeight(3), backgroundColor: colors.line_color, height: responsiveHeight(0.1)}} />

        <View style={{gap: 10, marginBottom: responsiveHeight(2), justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: responsiveFontSize(1.8), color: colors.gray}}>Total Payment</Text>
        <Text style={{fontSize: responsiveFontSize(3), color: colors.black, fontWeight: 'bold'}}>$ 1,000,000</Text>
        </View>

        <CustomInputForm hideButton inputContainer={{width: responsiveWidth(80)}} buttonStyle={{width: responsiveWidth(80)}} inputStyle={{color: 'black'}} inputContainerStyle={{marginTop: responsiveHeight(0)}} onSubmit={(values) => nav.navigate(ROUTES.TRANSACTION)} initialValues={{paymenttype: 'plumbing',phonenumber: '043223423423', nameaccount: 'John', amount: '$250.00', fee: '$120.00'}} validationSchema={validationSchema} buttonText='Pay Now' fields={transactionFirstSectionFields} />

          <View style={styles.inputContainerWrapper}>
              <View style={styles.row}>
                <View style={[styles.inputContainer, false && styles.errorInput]}>
                  <Text style={styles.label}>{'From'}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={'Aria Zidaniro'}
                    placeholderTextColor={colors.black}
                  />
                </View>
                <View style={[styles.inputContainer, false && styles.errorInput]}>
                  <Text style={styles.label}>{'To'}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={'Zayn Malik'}
                    placeholderTextColor={colors.black}
                  />
                </View>
              </View>
            </View>

        <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(80) }} onPress={() => nav.navigate(ROUTES.CASH_IN_PERSON)} buttonText='Go Back' />}
    </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  inputContainerWrapper: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: responsiveWidth(80),
    gap: 20
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
  inputContainerTwo: {
    borderWidth: 0.1,
    borderRadius: 10,
    paddingHorizontal: responsiveHeight(4),
    backgroundColor: colors.secondary,
    borderColor: colors.black,
    width: responsiveWidth(30)
},
  input: {
    flex: 1,
    borderRadius: 8,
    padding: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
    color: colors.black,
    marginTop: -7,
    marginLeft: -15
  },
  inputTwo: {
    flex: 1,
    borderRadius: 8,
    padding: responsiveHeight(2),
    fontSize: responsiveFontSize(2),
    color: colors.black,
    marginLeft: -15,
    height: responsiveHeight(20),
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
})

export default Transaction;