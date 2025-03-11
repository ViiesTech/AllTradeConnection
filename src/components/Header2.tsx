import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import SVGXml from './SVGXml';
import svgIcons from '../assets/icons';
import { responsiveFontSize, responsiveHeight } from '../utils';
import { colors } from '../assets/colors';
import { useNavigation } from '@react-navigation/native';

interface headerprops {
  text: string,
  hideCancel: boolean,
  subHeading: string;
  onCancel: () => void;
  headerText2: string;
  hideBack: boolean;
  headerText3: string;
  messagingIcon?: boolean;
}

const Header2 = (props: headerprops) => {

  const nav = useNavigation();

  return (
    <View style={[styles.headerView,!props?.hideCancel && {flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center'}]}>
      {!props?.hideBack &&
      <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
      <TouchableOpacity onPress={() => nav.goBack()}>
            <SVGXml width={'25'} height={'25'} icon={svgIcons.arrowleft} />
      </TouchableOpacity>
    {props?.messagingIcon &&  <TouchableOpacity onPress={() => {}} style={{elevation: 5, padding: 10, borderRadius: 10, backgroundColor: '#f6f6f6'}}>
            <SVGXml width={'20'} height={'20'} icon={svgIcons.messaging} />
      </TouchableOpacity>}
      </View>
      }
      <Text style={[styles.textStyle,{marginTop: props?.hideCancel && responsiveHeight(4)}]}>{props?.text}</Text>
      {props?.subHeading &&
          <Text style={styles.subHeadingStyle}>{props?.subHeading || 'Details'}</Text>
      }
      {props?.headerText3 &&
        <Text style={[styles.textStyle,{marginTop:responsiveHeight(2)}]}>{props?.headerText3}</Text>
      }
      {!props?.hideCancel &&
      <TouchableOpacity onPress={props?.onCancel}>
        <Text style={[styles.textStyle,{fontWeight: 'thin',fontSize: responsiveFontSize(2.5)}]}>{props?.headerText2}</Text>
        </TouchableOpacity>
        }
    </View>
  )
};

export default Header2;

const styles = StyleSheet.create({
  headerView:{
    // flexDirection: 'row',
    // alignItems: 'center',
    padding: responsiveHeight(2.5),
    paddingTop: responsiveHeight(7),
    // justifyContent: 'space-between',
  },
  textStyle:{
    color: colors.textColor2,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.8)
  },
  subHeadingStyle:{
    color: colors.textColor2,
    marginTop: responsiveHeight(0.4),
    fontSize: responsiveFontSize(2)
  }
});