import {StyleSheet, ViewStyle} from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {colors} from '../assets/colors';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from '../utils';

interface CheckBoxProps {
  text: string;
  checkBoxStyle?: ViewStyle; 
}

const CheckBoxText = ({text, checkBoxStyle}: CheckBoxProps) => {
  return (
    <BouncyCheckbox
      size={25}
      fillColor={colors.primary}
      unFillColor={colors.primary}
      text={text}
      textStyle={[styles.text, {marginLeft: -5}]}
      iconStyle={{marginLeft: responsiveHeight(3.5)}}
      innerIconStyle={{borderWidth: 0}}
      onPress={(isChecked: boolean) => {
        console.log(isChecked);
      }}
    />
  );
};

export default CheckBoxText;

const styles = StyleSheet.create({
  text: {
    color: colors.dark_purple,
    width: responsiveWidth(75),
    fontSize: responsiveFontSize(1.8),
    marginLeft: responsiveWidth(2),
  },
});
