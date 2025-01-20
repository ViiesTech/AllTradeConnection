import {Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {images} from '../assets/images';
import SVGXml from './SVGXml';
import svgIcons from '../assets/icons';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from '../utils';
import {colors} from '../assets/colors';
import { useNavigation } from '@react-navigation/native';

interface Headerprops {
  image: ImageSourcePropType;
  text: string;
  desc: string;
}

const AuthHeader = ({image, text, desc}: Headerprops) => {

  const nav = useNavigation()

  return (
    <View style={styles.mainContainer}>
     <TouchableOpacity onPress={() => nav.goBack()}> 
      <SVGXml icon={svgIcons.arrowleft} width={'12'} />
      </TouchableOpacity>
      <View style={styles.contentWrapper}>
        <Image source={images.otp} style={styles.logoStyle} />
        <Text style={styles.headingStyle}>Enter OTP</Text>
        <Text style={styles.desc}>
          We have sent you an email containing 6 digits verification code.
          Please enter the code to verify your identity
        </Text>
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  mainContainer: {
    padding: responsiveHeight(2.5),
    paddingTop: responsiveHeight(6),
  },
  contentWrapper: {
    alignItems: 'center',
    paddingTop: responsiveHeight(3),
  },
  logoStyle: {
    height: responsiveHeight(20),
    width: responsiveHeight(20),
  },
  headingStyle: {
    color: colors.dark_purple,
    fontWeight: 'bold',
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(2.5),
  },
  desc:{
    color: colors.dark_purple,
    textAlign: 'center',
    marginTop: responsiveHeight(0.8),
    width: responsiveWidth(85),
    fontSize: responsiveFontSize(2)
  }
});
