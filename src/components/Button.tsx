import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../assets/colors';
import { responsiveHeight, responsiveWidth } from '../utils';

interface ButtonProps {
  buttonText: string;
  style: ViewStyle;
  textStyle: ViewStyle;
  onPress: () => void;
  gradient: boolean;
  isWhiteBtnBG?: boolean;
  isLoading?: boolean;
}

const Button = ({ buttonText, onPress, isLoading, style, textStyle,gradient,isWhiteBtnBG }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{ alignItems: 'center' }}
      onPress={onPress}
      activeOpacity={0.7}>
     {!gradient ?
      <LinearGradient
        start={{ x: 0.1, y: 1 }}
        end={{ x: 0.7, y: 0.5 }}
        colors={isWhiteBtnBG ? ['rgb(246, 251, 255)', colors.secondary] : ['rgba(2, 104, 188, 1)', colors.primary]}
        style={[styles.buttonStyle,style]}>
          {isLoading && (
            <ActivityIndicator size={'small'} color={isWhiteBtnBG ? '#000' : '#fff'} />
          )}
       {!isLoading && <Text style={[styles.textStyle, textStyle]}>{buttonText}</Text>}
      </LinearGradient>
      :
      <TouchableOpacity onPress={onPress} style={[styles.buttonStyle,style]}>
               <Text style={[styles.textStyle, textStyle]}>{buttonText}</Text>
      </TouchableOpacity>
      }
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
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 10,
  },
  textStyle: {
    color: colors.secondary,
    fontSize: responsiveHeight(2),
    fontWeight: 'bold',
  },
});
