import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface headerprops {

}

const Header = (props: headerprops) => {
  return (
    <View style={styles.headerView}>
      <Text>Header</Text>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  headerView:{

  }
})