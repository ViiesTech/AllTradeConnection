import React from 'react'
import { View, Text } from 'react-native'
import MainContainer from '../../../components/MainContainer'
import Header2 from '../../../components/Header2'
import { fillProposalFields, professionalPaymentMethodFields, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils'
import Button from '../../../components/Button'
import CustomInputForm from '../../../components/InputField'
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string(),
    cardnumber: Yup.string(),
})

const FillProposal = () => {
  return (
    <MainContainer>
      <Header2 headerText3='' hideCancel text={'Fill This Proposal'} subHeading={'Enter Your Details'} />

      <View style={{padding: responsiveHeight(2.8), paddingTop: 0}}>
      <CustomInputForm hideButton inputContainer={{width: responsiveWidth(90)}} buttonStyle={{width: responsiveWidth(80)}} inputStyle={{color: 'black'}} inputContainerStyle={{marginTop: responsiveHeight(0)}} onSubmit={(values) => nav.navigate(ROUTES.ADD_NEW_CARD)} initialValues={{name: 'Jordan Delgado',cardnumber: '***** ***** **** 789',}} validationSchema={validationSchema} buttonText='' fields={fillProposalFields} />
      </View>

      <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: responsiveHeight(2)}}>
        <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }} onPress={() => nav.navigate(ROUTES.MY_JOBS)} buttonText='Submit Now' />}
    </View>
    </MainContainer>
  )
}

export default FillProposal