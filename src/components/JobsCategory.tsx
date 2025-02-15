import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { responsiveFontSize, responsiveHeight } from '../utils';

interface CategoryProps {
  onPress: () => void;
  textColor: string;
  backgroundColor: string;
  text: string;
}

const JobsCategory = (props: CategoryProps) => {
  return (
    <TouchableOpacity style={[styles.categoryView,{backgroundColor: props?.backgroundColor}]} onPress={props?.onPress}>
      <Text style={[styles.text,{color: props?.textColor}]}>{props?.text}</Text>
    </TouchableOpacity>
  )
};

export default JobsCategory;

const styles = StyleSheet.create({
  categoryView:{
    // backgroundColor: 'rgb(211, 229, 242)',
    padding: responsiveHeight(1.7),
    // width: responsiveWidth(30),
    paddingHorizontal: responsiveHeight(3),
    alignItems: 'center',
    borderRadius: 8,
  },
  text:{
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.9),
  }
});