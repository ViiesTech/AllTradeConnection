import React from 'react'
import { View, Text, ImageBackground, Image } from 'react-native'
import { images } from '../assets/images'
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../utils'
import { colors } from '../assets/colors'
import { useNavigation } from '@react-navigation/native'
import Button from './Button'

const CongratulationCard = () => {
                const nav = useNavigation();
  return (
    <View>
                <ImageBackground source={images.cardBg} imageStyle={{borderRadius: 8}} style={{width: responsiveWidth(90), height: responsiveHeight(47)}}>
                    <View style={{alignItems: 'center', marginTop: responsiveHeight(2), paddingBottom: responsiveHeight(2), borderBottomWidth: 1, borderBottomColor: colors.secondary}}>
                        <Text style={{fontSize: responsiveFontSize(3), fontWeight: 'bold', color: colors.secondary}}>Congratulation</Text>
                    </View>
                    <View style={{alignItems: 'center', gap: 15, marginTop: responsiveHeight(3)}}>
                        <Image source={images.correct} />
                        <Text style={{color: colors.secondary, width: responsiveWidth(50), textAlign: 'center'}}>Job has been posted successfully</Text>
                     <Button isWhiteBtnBG={true} textStyle={{color: colors.black}}  style={{marginTop: responsiveHeight(2), width: responsiveWidth(80), backgroundColor: colors.secondary}} buttonText={'Get Started'} onPress={() => nav.navigate(ROUTES.LIST_OF_PRO)} /> 
                    </View>
                </ImageBackground>
            </View>
  )
}

export default CongratulationCard