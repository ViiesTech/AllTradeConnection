import { StyleSheet,TouchableOpacity, View } from 'react-native';
import React from 'react';
import SVGXml from './SVGXml';
import svgIcons from '../assets/icons';
import { responsiveHeight } from '../utils';
import { DrawerActions, useNavigation } from '@react-navigation/native';

interface headerprops {

}

const Header = (props: headerprops) => {

  const navigation = useNavigation()

    return (
    <View style={styles.headerView}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <SVGXml icon={svgIcons.bars} />
        </TouchableOpacity>
        <TouchableOpacity>
        <SVGXml icon={svgIcons.notification} />
        </TouchableOpacity>
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