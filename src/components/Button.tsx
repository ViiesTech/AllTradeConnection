import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../assets/colors';
import {responsiveHeight, responsiveWidth} from '../utils';

interface ButtonProps {
  buttonText: string;
  style: ViewStyle;
  onPress: () => void;
}

const Button = ({buttonText, onPress,style}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{alignItems: 'center'}}
      onPress={onPress}
      activeOpacity={0.7}>
      <LinearGradient
        start={{x: 0.1, y: 1}}
        end={{x: 0.8, y: 0.7}}
        colors={['rgba(2, 104, 188, 1)', colors.primary]}
        style={[styles.buttonStyle,style]}>
        <Text style={styles.textStyle}>{buttonText}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    padding: responsiveHeight(2),
    borderRadius: 8,
    width: responsiveWidth(82),
    justifyContent: 'center',
  },
  textStyle: {
    color: colors.secondary,
    fontSize: responsiveHeight(2),
    fontWeight: 'bold',
  },
});
