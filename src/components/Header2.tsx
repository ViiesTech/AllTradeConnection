import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import SVGXml from './SVGXml';
import svgIcons from '../assets/icons';
import { responsiveFontSize, responsiveHeight } from '../utils';
import { colors } from '../assets/colors';
import { useNavigation } from '@react-navigation/native';

const Header2 = () => {

  const nav = useNavigation()

  return (
    <View style={styles.headerView}>
      <TouchableOpacity onPress={() => nav.goBack()}>
            <SVGXml width={'25'} height={'25'} icon={svgIcons.arrowleft} />
      </TouchableOpacity>
      <Text style={styles.textStyle}>Open Project</Text>
      <TouchableOpacity onPress={() => nav.goBack()}>
        <Text style={[styles.textStyle,{fontWeight: 'thin',fontSize: responsiveFontSize(2.5)}]}>Cancel</Text>
        </TouchableOpacity>
    </View>
  )
};

export default Header2;

const styles = StyleSheet.create({
  headerView:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsiveHeight(2.5),
    paddingTop: responsiveHeight(7),
    justifyContent: 'space-between',
  },
  textStyle:{
    color: colors.textColor2,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.8)
  }
});