import React from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { images } from '../assets/images'
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../utils'
import { colors } from '../assets/colors'
import { useNavigation } from '@react-navigation/native'
import Button from './Button'

const CongratulationCard = (props: any) => {
                const nav = useNavigation();
  return (
    <View>
                <ImageBackground source={images.cardBg} imageStyle={{borderRadius: 8}} style={{width: responsiveWidth(90), height: responsiveHeight(48)}}>
                    <View style={{alignItems: 'center', marginTop: responsiveHeight(2), paddingBottom: responsiveHeight(2), borderBottomWidth: 1, borderBottomColor: colors.secondary}}>
                        <Text style={{fontSize: responsiveFontSize(3), fontWeight: 'bold', color: colors.secondary}}>{props?.review ? 'Review' : 'Congratulation'}</Text>
                    </View>
                    <View style={{alignItems: 'center', gap: 15, marginTop: responsiveHeight(3)}}>
                        <Image source={images.correct} />
                        <Text style={{color: colors.secondary, width: responsiveWidth(50), textAlign: 'center'}}>{props?.changePasswordScreen ? 'You have earned 100 points' : props?.review ? 'Your Review Post Successfully' : 'Job has been posted successfully'}</Text>
                     <Button isWhiteBtnBG={true} textStyle={{color: colors.black}}  style={{marginTop: responsiveHeight(2), width: responsiveWidth(80), backgroundColor: colors.secondary}} buttonText={props?.changePasswordScreen ? 'Go To Wallet' : props?.review ? 'Go Back' : 'Get Started'} onPress={() => {
                        if(props?.changePasswordScreen){
                            nav.navigate(ROUTES.WALLET)
                        }else if(props?.review) {
                            nav.navigate(ROUTES.MY_JOBS)
                        }else {
                            nav.navigate(ROUTES.LIST_OF_PRO)
                        }
                     }} /> 
                    {props?.changePasswordScreen && <TouchableOpacity>
                     <Text style={{color: colors.secondary, width: responsiveWidth(50), textAlign: 'center',}}>Go Back</Text>
                     </TouchableOpacity>}
                    </View>
                </ImageBackground>
            </View>
  )
}

export default CongratulationCard