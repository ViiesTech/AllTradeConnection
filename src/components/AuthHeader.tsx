import {Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import React from 'react';
import SVGXml from './SVGXml';
import svgIcons from '../assets/icons';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from '../utils';
import {colors} from '../assets/colors';
import { useNavigation } from '@react-navigation/native';

interface Headerprops {
  image: ImageSourcePropType;
  text: string;
  desc: string;
  contentStyle: ViewStyle,
}

const AuthHeader = ({image, text, desc,contentStyle}: Headerprops) => {

  const nav = useNavigation();

  return (
    <View style={styles.mainContainer}>
     <TouchableOpacity onPress={() =>  nav.goBack()}> 
      <SVGXml icon={svgIcons.arrowleft} width={'12'} />
      </TouchableOpacity>
      <View style={[styles.contentWrapper,contentStyle]}>
        {image &&
        <Image source={image} style={styles.logoStyle} />
      }
      {text &&
        <Text style={styles.headingStyle}>{text}</Text>
      }
      {desc &&
        <Text style={styles.desc}>{desc}</Text>
      }
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
    // paddingTop: responsiveHeight(3),
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
