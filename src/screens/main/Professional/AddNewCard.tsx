import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../../assets/images';
import { addNewCardFields, professionalPaymentMethodFields, responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import { colors } from '../../../assets/colors';
import Button from './../../../components/Button';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import CustomInputForm from '../../../components/InputField';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string(),
    cardnumber: Yup.string(),
})

const AddNewCard = () => {
    const navigation = useNavigation();

    const handleButtonPress = () => {
        navigation.navigate(ROUTES.CONGRATULATION, {subscribing: 'subscribing'});
    };

    return (
        <MainContainer scrollEnabled={false}>
         <Header2 headerText3='' hideCancel text={''} subHeading={''} />

            <View style={{flex: 0.8, justifyContent: 'center', alignItems: 'center'}}>
            <ImageBackground 
                source={images.cardBg} 
                imageStyle={{ borderRadius: 15 }} 
                style={{ width: responsiveWidth(90), paddingVertical: responsiveHeight(2) }}
            >
                <View style={{ alignItems: 'center', paddingBottom: responsiveHeight(2), borderBottomWidth: 1, borderBottomColor: colors.secondary }}>
                    <Text style={{ fontSize: responsiveFontSize(3), fontWeight: 'bold', color: colors.secondary }}>Add New Card</Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: responsiveHeight(3) }}>
                    
            <CustomInputForm hideButton inputContainer={{width: responsiveWidth(80),}} buttonStyle={{width: responsiveWidth(80)}} inputStyle={{color: 'black'}} inputContainerStyle={{marginTop: responsiveHeight(0)}} onSubmit={(values) => navigation.navigate(ROUTES.ADD_NEW_CARD)} initialValues={{name: 'Jordan Delgado',cardnumber: '***** ***** **** 789',}} validationSchema={validationSchema} buttonText='' fields={addNewCardFields} />

                    <Button 
                        isWhiteBtnBG={true} 
                        textStyle={{ color: colors.black }}
                        style={{width: responsiveWidth(80), backgroundColor: colors.secondary }} 
                        buttonText={'Add Card'} 
                        onPress={handleButtonPress} 
                    />
                </View>
            </ImageBackground>
            </View>
        </MainContainer>
    );
};

export default AddNewCard;
