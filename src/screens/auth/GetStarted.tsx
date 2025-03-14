import React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import MainContainer from '../../components/MainContainer';
import Button from '../../components/Button';
import { responsiveFontSize, responsiveHeight, responsiveWidth, ROUTES } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../assets/images';
import { colors } from '../../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetStarted = () => {

  const nav = useNavigation();

  const onClickHandler = async (type: string) => {
    const setType = await AsyncStorage.setItem('type', type);
    nav.navigate(ROUTES.LOGIN);
  };

  return (
    <MainContainer>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={images.logoWithoutBg} style={{width: responsiveWidth(90), height: responsiveHeight(35)}} />
        <View style={{marginTop: responsiveHeight(2)}}>
        <Text style={{fontSize: responsiveFontSize(2.8), fontStyle: 'italic', color: colors.dark_purple, fontWeight: 'bold'}}>Welcome To All Trades Connection</Text>
        </View>
      <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }} onPress={() => onClickHandler('user')} buttonText='Continue As User' />}
      <Button style={{ marginTop: responsiveHeight(3.5), width: responsiveWidth(90) }} isWhiteBtnBG textStyle={{color: colors.dark_purple}} onPress={() => onClickHandler('professional')} buttonText='Continue As Professional' />}
      </View>
    </MainContainer>
  );
};

export default GetStarted;