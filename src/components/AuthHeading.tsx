import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {responsiveFontSize, responsiveHeight} from '../utils';
import {colors} from '../assets/colors';

interface HeadingProps {
  text: string;
  desc: string;
  image: ImageSourcePropType;
}

const AuthHeading = (props: HeadingProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingStyle}>{props?.text}</Text>
      <Text style={styles.descStyle}>{props?.desc}</Text>
      <Image source={props?.image} style={styles.imageStyle} />
    </View>
  );
};

export default AuthHeading;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: responsiveHeight(6.5),
  },
  headingStyle: {
    color: colors.dark_purple,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.8),
  },
  descStyle: {
    color: colors.dark_purple,
    marginTop: responsiveHeight(0.5),
    fontSize: responsiveFontSize(2),
  },
  imageStyle: {
    marginTop: responsiveHeight(5),
    height: responsiveHeight(19),
    width: responsiveHeight(25),
  },
});
