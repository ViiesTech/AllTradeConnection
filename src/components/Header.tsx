import { Alert, StyleSheet,Text,TouchableOpacity, View } from 'react-native';
import React from 'react';
import SVGXml from './SVGXml';
import svgIcons from '../assets/icons';
import { responsiveHeight, ROUTES } from '../utils';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { colors } from '../assets/colors';

interface headerprops {
hideNotification: boolean;
showEdit: boolean;
showMyLocation?: boolean;
};

const Header = (props: headerprops) => {

  const navigation = useNavigation();

    return (
    <View style={styles.headerView}>
      <View style={props.showMyLocation ? {flexDirection: 'row', alignItems: 'center', gap: 20} : {}}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <SVGXml icon={svgIcons.bars} />
        </TouchableOpacity>
      {props.showMyLocation &&  <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOCATION_FILTER)}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
          <Text style={{color: colors.gray}}>My Location</Text>
          <SVGXml width={'12'} height={'12'} icon={svgIcons.dropdownBlack} />
          </View>
          <Text style={{color: colors.dark_purple, fontWeight: 'bold'}}>New York, USA</Text>
        </TouchableOpacity>}
      </View>
        
        {!props?.hideNotification  &&
        <TouchableOpacity onPress={() => navigation.navigate('SecondaryStack',{screen:ROUTES.NOTIFICATION})}>
        <SVGXml icon={svgIcons.notification} />
        </TouchableOpacity>
        }
        {props?.showEdit &&
            <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EDIT_PROFILE)}>
              <SVGXml icon={svgIcons.edit2} />
            </TouchableOpacity>
        }
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  headerView:{
    padding: responsiveHeight(2),
    paddingTop: responsiveHeight(5),
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})