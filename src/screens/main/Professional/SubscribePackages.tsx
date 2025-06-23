import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import MainContainer from '../../../components/MainContainer';
import Header2 from '../../../components/Header2';
import Button from '../../../components/Button';
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../../../utils';
import { images } from '../../../assets/images';
import { colors } from '../../../assets/colors';
import { useNavigation } from '@react-navigation/native';

const SubscribePackages = () => {
    const nav = useNavigation();
  return (
    <MainContainer>
      <Header2 headerText3='' hideCancel text={'Subscribed Package'} subHeading={''} />

        <View style={{alignItems: 'center'}}>
        <ImageBackground imageStyle={{borderRadius: 25}} source={images.cardBg} style={{padding: responsiveHeight(2), width: responsiveWidth(90),}}>
                                    <View style={{marginHorizontal: responsiveHeight(2), marginTop: responsiveHeight(2)}}>
                                    <Text style={{fontSize: responsiveFontSize(3), color: colors.secondary}}>Gold</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{fontSize: responsiveFontSize(4),  fontWeight: 'bold', color: colors.secondary}}>28-Days Plan</Text>
                                    </View>
                                    </View>

                                <View style={{marginHorizontal: responsiveHeight(0.8)}}>
                                    <Text style={{color: colors.secondary, fontSize: responsiveFontSize(2.3), width: responsiveWidth(80), marginTop: responsiveHeight(1)}}>Next Billing Date - July 27, 2024</Text>
                                </View>

                            <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(80), marginBottom: responsiveHeight(2)}} isWhiteBtnBG textStyle={{color: colors.dark_purple}} onPress={() => nav.navigate(ROUTES.GET_GOLD)} buttonText='Upgrade Plan' />}
                                    </ImageBackground>
        </View>
            <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: responsiveHeight(2)}}>
                <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }} onPress={() => nav.navigate(ROUTES.MY_JOBS)} buttonText='Cancel Subscription' />}
            </View>
    </MainContainer>
  )
}

export default SubscribePackages;